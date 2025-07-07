/**
 * @file WebGLRenderer.ts
 * WebGL渲染器，提供高性能的图像渲染能力，替代传统的Canvas 2D渲染。
 * 支持纹理缓存、批量渲染和内存优化。
 * @author Zhonghan Li
 */

export class WebGLRenderer {
  private canvas: HTMLCanvasElement;
  private gl: WebGLRenderingContext | WebGL2RenderingContext;
  private program: WebGLProgram | null = null;
  private vertexBuffer: WebGLBuffer | null = null;
  private textureCache = new Map<ImageBitmap, WebGLTexture>();
  private maxTextureSize: number;
  private isInitialized = false;

  // 顶点着色器源码
  private readonly vertexShaderSource = `
    attribute vec2 a_position;
    attribute vec2 a_texcoord;
    
    varying vec2 v_texcoord;
    
    void main() {
      gl_Position = vec4(a_position, 0.0, 1.0);
      v_texcoord = a_texcoord;
    }
  `;

  // 片段着色器源码
  private readonly fragmentShaderSource = `
    precision mediump float;
    
    uniform sampler2D u_texture;
    varying vec2 v_texcoord;
    
    void main() {
      gl_FragColor = texture2D(u_texture, v_texcoord);
    }
  `;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    
    // 尝试获取WebGL2上下文，如果失败则使用WebGL1
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) {
      throw new Error('WebGL不受支持');
    }
    this.gl = gl;

    this.maxTextureSize = this.gl.getParameter(this.gl.MAX_TEXTURE_SIZE);
    console.log(`WebGL初始化成功，最大纹理尺寸: ${this.maxTextureSize}x${this.maxTextureSize}`);
  }

  /**
   * 初始化WebGL渲染器
   */
  public async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // 创建着色器程序
      this.program = this.createShaderProgram();
      if (!this.program) {
        throw new Error('无法创建着色器程序');
      }

      // 创建顶点缓冲区
      this.setupVertexBuffer();

      // 设置WebGL状态
      this.gl.useProgram(this.program);
      this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
      this.gl.disable(this.gl.DEPTH_TEST);
      this.gl.disable(this.gl.CULL_FACE);

      this.isInitialized = true;
      console.log('WebGL渲染器初始化完成');
    } catch (error) {
      console.error('WebGL渲染器初始化失败:', error);
      throw error;
    }
  }

  /**
   * 渲染ImageBitmap到Canvas
   * @param imageBitmap 要渲染的图像
   * @param frameToRelease (可选) 渲染后要释放的上一帧
   */
  public render(imageBitmap: ImageBitmap, frameToRelease?: ImageBitmap): void {
    if (!this.isInitialized || !this.program) {
      console.error('WebGL渲染器未初始化');
      return;
    }

    // 检查图像尺寸是否超过最大纹理尺寸
    if (imageBitmap.width > this.maxTextureSize || imageBitmap.height > this.maxTextureSize) {
      console.warn(`图像尺寸 ${imageBitmap.width}x${imageBitmap.height} 超过最大纹理尺寸 ${this.maxTextureSize}`);
      return;
    }

    // 获取或创建纹理
    let texture = this.textureCache.get(imageBitmap);
    if (!texture) {
      const newTexture = this.createTexture(imageBitmap);
      if (!newTexture) {
        console.error('无法创建纹理');
        return;
      }
      texture = newTexture;
      this.textureCache.set(imageBitmap, texture);
    }

    // 设置视口
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);

    // 清空画布
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);

    // 绑定纹理
    this.gl.activeTexture(this.gl.TEXTURE0);
    this.gl.bindTexture(this.gl.TEXTURE_2D, texture);

    // 设置uniform
    const textureLocation = this.gl.getUniformLocation(this.program, 'u_texture');
    this.gl.uniform1i(textureLocation, 0);

    // 绘制四边形
    this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);

    if (frameToRelease) {
      this.clearTexture(frameToRelease);
    }
  }

  /**
   * 清理纹理缓存中的指定ImageBitmap
   * @param imageBitmap 要清理的ImageBitmap
   */
  public clearTexture(imageBitmap: ImageBitmap): void {
    const texture = this.textureCache.get(imageBitmap);
    if (texture) {
      this.gl.deleteTexture(texture);
      this.textureCache.delete(imageBitmap);
    }
  }

  /**
   * 清理所有资源
   */
  public cleanup(): void {
    // 删除所有纹理
    for (const texture of this.textureCache.values()) {
      this.gl.deleteTexture(texture);
    }
    this.textureCache.clear();

    // 删除缓冲区
    if (this.vertexBuffer) {
      this.gl.deleteBuffer(this.vertexBuffer);
      this.vertexBuffer = null;
    }

    // 删除着色器程序
    if (this.program) {
      this.gl.deleteProgram(this.program);
      this.program = null;
    }

    this.isInitialized = false;
    console.log('WebGL渲染器资源已清理');
  }

  /**
   * 创建着色器程序
   */
  private createShaderProgram(): WebGLProgram | null {
    const vertexShader = this.compileShader(this.gl.VERTEX_SHADER, this.vertexShaderSource);
    const fragmentShader = this.compileShader(this.gl.FRAGMENT_SHADER, this.fragmentShaderSource);

    if (!vertexShader || !fragmentShader) {
      return null;
    }

    const program = this.gl.createProgram();
    if (!program) {
      return null;
    }

    this.gl.attachShader(program, vertexShader);
    this.gl.attachShader(program, fragmentShader);
    this.gl.linkProgram(program);

    if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
      console.error('着色器程序链接失败:', this.gl.getProgramInfoLog(program));
      this.gl.deleteProgram(program);
      return null;
    }

    // 清理着色器对象
    this.gl.deleteShader(vertexShader);
    this.gl.deleteShader(fragmentShader);

    return program;
  }

  /**
   * 编译着色器
   */
  private compileShader(type: number, source: string): WebGLShader | null {
    const shader = this.gl.createShader(type);
    if (!shader) {
      return null;
    }

    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);

    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      console.error('着色器编译失败:', this.gl.getShaderInfoLog(shader));
      this.gl.deleteShader(shader);
      return null;
    }

    return shader;
  }

  /**
   * 设置顶点缓冲区
   */
  private setupVertexBuffer(): void {
    // 定义全屏四边形的顶点数据（位置 + 纹理坐标）
    const vertices = new Float32Array([
      // 位置      纹理坐标
      -1.0, -1.0,  0.0, 1.0,  // 左下
       1.0, -1.0,  1.0, 1.0,  // 右下
      -1.0,  1.0,  0.0, 0.0,  // 左上
       1.0,  1.0,  1.0, 0.0   // 右上
    ]);

    this.vertexBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, vertices, this.gl.STATIC_DRAW);

    // 设置顶点属性
    const positionLocation = this.gl.getAttribLocation(this.program!, 'a_position');
    const texcoordLocation = this.gl.getAttribLocation(this.program!, 'a_texcoord');

    this.gl.enableVertexAttribArray(positionLocation);
    this.gl.enableVertexAttribArray(texcoordLocation);

    const stride = 4 * 4; // 4个float，每个4字节
    this.gl.vertexAttribPointer(positionLocation, 2, this.gl.FLOAT, false, stride, 0);
    this.gl.vertexAttribPointer(texcoordLocation, 2, this.gl.FLOAT, false, stride, 2 * 4);
  }

  /**
   * 从ImageBitmap创建WebGL纹理
   */
  private createTexture(imageBitmap: ImageBitmap): WebGLTexture | null {
    const texture = this.gl.createTexture();
    if (!texture) {
      return null;
    }

    this.gl.bindTexture(this.gl.TEXTURE_2D, texture);

    // 上传图像数据到纹理
    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, imageBitmap);

    // 设置纹理参数
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);

    return texture;
  }

  /**
   * 检查WebGL是否支持
   */
  public static isSupported(): boolean {
    try {
      const canvas = document.createElement('canvas');
      return !!(canvas.getContext('webgl') || canvas.getContext('webgl2'));
    } catch {
      return false;
    }
  }

  /**
   * 获取WebGL信息
   */
  public getInfo(): {
    renderer: string;
    vendor: string;
    version: string;
    maxTextureSize: number;
  } {
    return {
      renderer: this.gl.getParameter(this.gl.RENDERER),
      vendor: this.gl.getParameter(this.gl.VENDOR),
      version: this.gl.getParameter(this.gl.VERSION),
      maxTextureSize: this.maxTextureSize
    };
  }
}