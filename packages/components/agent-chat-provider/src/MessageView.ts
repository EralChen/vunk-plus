export interface MessageView {
  content: string
  type: string
  updating: boolean
}

export class MessageViewManager {
  private views: MessageView[] = []

  getViews () {
    return this.views
  }

  createView (view: MessageView) {
    this.views.push(view)
  }

  /**
   * @description 创建或更新最后一个 view
   */
  upsertView (
    data: MessageView,
    callbacks: {
      onCreate?: (view: MessageView) => void
      onUpdate?: (view: MessageView) => void
    } = {},
  ): MessageView {
    let lastView = this.getLastUpdatingView(data.type)
    if (lastView) {
      lastView.content += data.content
      lastView.updating = data.updating

      callbacks.onUpdate?.(lastView)
    }
    else {
      lastView = data
      this.createView(lastView)
      callbacks.onCreate?.(lastView)
    }

    return lastView
  }

  /**
   * @description 获取当前view 的上一个 view
   */
  getPrevView (view: MessageView): MessageView | undefined {
    const index = this.views.indexOf(view)
    if (index > 0) {
      return this.views[index - 1]
    }
    return undefined
  }

  /**
   * @description 获取最后一个正在更新的 view
   */
  getLastUpdatingView (type: string): MessageView | undefined {
    return this.views.findLast(v => v.updating && v.type === type)
  }

  /**
   * @description 所有 view 更新结束
   */
  allViewUpdated () {
    this.views.forEach((v) => {
      v.updating = false
    })
  }
}
