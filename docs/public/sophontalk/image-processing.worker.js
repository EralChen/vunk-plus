class h {
  constructor() {
    this.isInitialized = !1, this.initializeCanvas();
  }
  initializeCanvas() {
    try {
      this.canvas = new OffscreenCanvas(1024, 1024);
      const a = this.canvas.getContext("2d");
      if (!a)
        throw new Error("Failed to get 2D context");
      this.ctx = a, this.isInitialized = !0;
    } catch (a) {
      console.error("Failed to initialize OffscreenCanvas:", a), this.isInitialized = !1;
    }
  }
  async processTask(a) {
    const e = performance.now();
    try {
      if (!this.isInitialized)
        throw new Error("Worker not initialized");
      let t;
      switch (a.type) {
        case "batch_process":
          t = await this.processBatch(
            a.data,
            a.options
          );
          break;
        case "single_process":
          t = await this.processSingle(
            a.data,
            a.options
          );
          break;
        case "resize":
          t = await this.resizeImage(
            a.data,
            a.options
          );
          break;
        case "blend":
          t = await this.blendImages(
            a.data,
            a.options
          );
          break;
        default:
          throw new Error(`Unknown task type: ${a.type}`);
      }
      const i = performance.now() - e;
      return {
        id: a.id,
        success: !0,
        data: t,
        processingTime: i
      };
    } catch (t) {
      const i = performance.now() - e;
      return {
        id: a.id,
        success: !1,
        error: t instanceof Error ? t.message : "Unknown error",
        processingTime: i
      };
    }
  }
  async processBatch(a, e) {
    const t = [];
    for (const i of a) {
      const s = await this.processSingle(i, e);
      t.push(s);
    }
    return t;
  }
  async processSingle(a, e) {
    const t = new Blob([a]);
    let i = await createImageBitmap(t);
    return (e != null && e.width || e != null && e.height) && (i = await this.resizeImageBitmap(
      i,
      e.width || i.width,
      e.height || i.height
    )), i;
  }
  async resizeImage(a, e) {
    const t = new Blob([a]), i = await createImageBitmap(t), s = (e == null ? void 0 : e.width) || i.width, r = (e == null ? void 0 : e.height) || i.height, n = await this.resizeImageBitmap(
      i,
      s,
      r
    );
    return i.close(), n;
  }
  async resizeImageBitmap(a, e, t) {
    return this.canvas.width = e, this.canvas.height = t, this.ctx.clearRect(0, 0, e, t), this.ctx.imageSmoothingEnabled = !1, this.ctx.imageSmoothingQuality = "low", this.ctx.drawImage(a, 0, 0, e, t), await createImageBitmap(this.canvas);
  }
  async blendImages(a, e) {
    if (a.length < 2)
      throw new Error("Blend operation requires at least 2 images");
    const t = await Promise.all(
      a.map((r) => createImageBitmap(new Blob([r])))
    ), i = t[0];
    this.canvas.width = i.width, this.canvas.height = i.height, this.ctx.clearRect(0, 0, i.width, i.height), this.ctx.drawImage(i, 0, 0);
    const s = (e == null ? void 0 : e.blendMode) || "source-over";
    this.ctx.globalCompositeOperation = s, (e == null ? void 0 : e.opacity) !== void 0 && (this.ctx.globalAlpha = e.opacity);
    for (let r = 1; r < t.length; r++)
      this.ctx.drawImage(t[r], 0, 0);
    return this.ctx.globalCompositeOperation = "source-over", this.ctx.globalAlpha = 1, t.forEach((r) => r.close()), await createImageBitmap(this.canvas);
  }
}
const l = new h();
self.onmessage = async (c) => {
  const a = c.data, e = await l.processTask(a);
  self.postMessage(e, {
    transfer: e.data ? Array.isArray(e.data) ? e.data : [e.data] : []
  });
};
