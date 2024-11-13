--- 
title: MonacoEditor
lang: zh-CN
---

# MonacoEditor


[monaco-editor](https://www.npmjs.com/package/monaco-editor) for Vue


## Basic

:::demo 
monaco-editor/basic/index
>>>subs
[monaco-editor/basic/MonacoEnvironment]
>>>
:::


## MonacoEnvironment

:::warning
You must define a function MonacoEnvironment.getWorkerUrl or MonacoEnvironment.getWorker？
:::

在浏览器环境中，MonacoEditor 会加载 worker 来处理代码的解析和分析。你需要在全局中自定义配置 `MonacoEnvironment.getWorkerUrl` 或 `MonacoEnvironment.getWorker` 方法来指定 worker 的加载路径。

下面是在 `vite` 中的一个示例

:::source
components/monaco-environment/src/index.vue
:::


你可以把他放在 App.vue / Layout.vue 中，就像这样

```vue
  <template>
    <monaco-environment>
      <router-view /> <!-- router-view 中你可以使用 MonacoEditor -->
    </monaco-environment>
  </template>
```



## MonacoEditor Props
:::props
monaco-editor/src/ctx
:::
