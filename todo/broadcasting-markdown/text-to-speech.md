# text-to-speech

## 需求

给 broadcasting-markdown 组件添加自定义的语音合成功能

## 接口设计

```ts
type TextToSpeech = (e: string) => Promise<string>
```
