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
      const r = performance.now() - e;
      return {
        id: a.id,
        success: !0,
        data: t,
        processingTime: r
      };
    } catch (t) {
      const r = performance.now() - e;
      return {
        id: a.id,
        success: !1,
        error: t instanceof Error ? t.message : "Unknown error",
        processingTime: r
      };
    }
  }
  async processBatch(a, e) {
    const t = [];
    for (const r of a) {
      const s = await this.processSingle(r, e);
      t.push(s);
    }
    return t;
  }
  async processSingle(a, e) {
    const t = new Blob([a]);
    let r = await createImageBitmap(t);
    return (e != null && e.width || e != null && e.height) && (r = await this.resizeImageBitmap(
      r,
      e.width || r.width,
      e.height || r.height
    )), r;
  }
  async resizeImage(a, e) {
    const t = new Blob([a]), r = await createImageBitmap(t), s = (e == null ? void 0 : e.width) || r.width, i = (e == null ? void 0 : e.height) || r.height, n = await this.resizeImageBitmap(
      r,
      s,
      i
    );
    return r.close(), n;
  }
  async resizeImageBitmap(a, e, t) {
    return this.canvas.width = e, this.canvas.height = t, this.ctx.clearRect(0, 0, e, t), this.ctx.drawImage(a, 0, 0, e, t), await createImageBitmap(this.canvas);
  }
  async blendImages(a, e) {
    if (a.length < 2)
      throw new Error("Blend operation requires at least 2 images");
    const t = await Promise.all(
      a.map((i) => createImageBitmap(new Blob([i])))
    ), r = t[0];
    this.canvas.width = r.width, this.canvas.height = r.height, this.ctx.clearRect(0, 0, r.width, r.height), this.ctx.drawImage(r, 0, 0);
    const s = (e == null ? void 0 : e.blendMode) || "source-over";
    this.ctx.globalCompositeOperation = s, (e == null ? void 0 : e.opacity) !== void 0 && (this.ctx.globalAlpha = e.opacity);
    for (let i = 1; i < t.length; i++)
      this.ctx.drawImage(t[i], 0, 0);
    return this.ctx.globalCompositeOperation = "source-over", this.ctx.globalAlpha = 1, t.forEach((i) => i.close()), await createImageBitmap(this.canvas);
  }
}
const l = new h();
self.onmessage = async (c) => {
  const a = c.data, e = await l.processTask(a);
  self.postMessage(e, {
    transfer: e.data ? Array.isArray(e.data) ? e.data : [e.data] : []
  });
};
