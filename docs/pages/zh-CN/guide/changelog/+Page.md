# Changelog 更新日志

## 1.12.2

+ [MonacoEditor] feat: 新增 prop `autoHeight`，优化编辑器加载体验

## 1.12.1

+ [BubbleList] feat: 内置滚动条 `hideAfter` 调整为 `800ms`，优化交互体验
+ [Thinking] fix: 修复 emits 定义，补齐 `ctx` 中声明的事件

## 1.12.0

+ [Thinking] 新增 component [Thinking](../../component/thinking/+Page.md): 用于展示 AI 模型思考过程的组件
+ [Thinking] feat: 默认隐藏 skip 按钮，激活态标题支持闪烁提示

## 1.11.10

+ [BroadcastingMarkdown] fix: 防止尾段落重复追加

## 1.11.9

+ [BroadcastingMarkdown] fix: 优化流式解析逻辑并补充测试

## 1.11.8

+ [PixiFrame] refactor: 移除冗余资源释放逻辑

## 1.11.7

+ [Sender] 新增 prop `attachmentsPlaceholder`: 附件上传区域占位文案
+ [PixiFrame] feat: 新增 `VkPixiFrameBufferImage`，优化位图清理

## 1.11.6

+ [PixiFrame] fix: 销毁纹理前关闭 bitmap 资源

## 1.11.5

+ [BroadcastingMarkdown] refactor: 移除段落组件重试逻辑

## 1.11.4

+ [build] build: dist 合并流程包含 element css

## 1.11.3

+ [BubbleList] refactor: 除去 `vue-element-plus-x` 依赖
+ [MetahumanBroadcasting] refactor: 重构 MetahumanBroadcasting 组件，使用更好的推理引擎
+ [BroadcastingMarkdown] fix: 修复段落执行顺序问题

## 1.10.1

+ [Scrollbar] 新增 prop `hideAfter`: 隐藏滚动条的延时，单位毫秒
+ [Scrollbar] 新增 emit `contentInsufficient`: 当内容不足时触发

## 1.10.0

+ [Drawer] 新增 component [VkDrawer](../../component/drawer/+Page.md): 抽屉组件

## 1.9.0

+ [Xgplayer] 新增 component [Xgplayer](../../component/xgplayer/+Page.md): 基于 xgplayer 的视频播放器组件

## 1.8.1
+ [Scrollbar] 新增 component [Scrollbar](../../component/scrollbar/+Page.md)

## 1.7.4
+ [MetahumanBroadcasting] fix: 修复 addChunk 时机导致的播放问题
+ [BroadcastingMarkdown] fix: 修复播报状态

## 1.7.0
+ [dependencies] `ant-design-x-vue` 依赖 1.3.2+

+ [BubbleList] 默认支持 templateType 改为 `VkMarkdown`

+ [BubbleList] 模板定义组件 `import { VkBubbleRenderTemplate } from '@vunk/plus/components/bubble-templates'`

+ [AgentChatProvider] 添加 [Basic](../../component/agent-chat-provider/+Page.md#basic) 用例

## 1.5.1

+ [Text] 新增 component [Text](../../component/text/+Page.md): 文本组件, 支持文本截断、Tooltip 提示

## 1.4.3

+ [TablesV1] 添加 prop `duplexFull`: 若为 false, 表格根据其内容高度自适应; 依赖 "@vunk/core": ">=1.4.6"

## 1.4.2

+ [PixiFrame] 新增 component [PixiFrame](../../component/pixi-frame/+Page.md): 帧动画播放组件

## 1.3.14

+ [BroadcastingMarkdown] 新增 component [BroadcastingMarkdown](../../component/broadcasting-markdown/+Page.md): 随播报展示的 TypingMarkdown 组件
+ [Sender] 新增 component [Sender](../../component/sender/+Page.md): 发送器组件
+ [SpeechButton] 新增 component [SpeechButton](../../component/speech-button/+Page.md): 语音按钮组件
+ [RecorderButton] 新增 component [RecorderButton](../../component/recorder-button/+Page.md): 按住说话按钮组件
+ [BubbleList] 新增 component [BubbleList](../../component/bubble-list/+Page.md): 气泡列表组件
+ [AgentChatProvider] 新增 component [AgentChatProvider](../../component/agent-chat-provider/+Page.md): 聊天提供者组件
+ [ChatIndependent] 新增 component [ChatIndependent](../../component/chat-independent/+Page.md): 独立聊天APP组件

## 1.2.0

+ [Avatar] 新增 component [Avatar](../../component/avatar/+Page.md): 一个更适合放 Icon 的 Avatar 组件。

## 1.1.4

+ [MonacoEditor] feat: 尺寸变化时, 自动调整布局 `editor.layout()`

## 1.1.3

+ [TablesV1Checkbox] 添加 prop `readonly`: 是否只读。样式与 `disabled` 区分

## 1.1.2

+ [TablesV1Checkbox] fix: 修复 `disabled`下 checkbox 可以选中的问题

+ [TablesV1Checkbox] 添加 prop `paginationDisabled`: 同 TableV1 disabled， 用于控制分页组件是否禁用。与组件 disabled 区分

## 1.1.1

+ [TablesV1Checkbox] 添加 prop `checkTrigger`: 选择 check 触发方式

## 1.1.0

+ [TablesV1] 新增 component `TablesV1`: ElTable、ElTableColumn、ElPagination 的集成组件

+ [TablesV1] feat: 兼容 currentPage 和 start 的双向绑定

+ [TablesV1Checkbox] 新增 component `TablesV1Checkbox`: 表格与选框集成, 从表格中选择 Row

+ [TablesV1Checkbox] pref: 单选时使用 Radio UI

+ [TablesV1Checkbox] 添加 prop `selectionHidden`:  隐藏选择列

## 1.0.1

+ [TypingMarkdown] 添加 prop `markdownItSetup`: markdown-it 配置
