## 需求

实现一个表示 "结束节点" 的 Icon.

## 参考

根据已有的 Icon 实现规范进行开发:

参考以下 Icon 实现:

packages\icons\llm

## Path

index.ts: 入口组件, 根据 icon 名称, 导入对应的 svg, icon, avatar 组件

src/index.vue: 图标的 svg 实现

src/icon.ts: 是对 index.vue 组件的 icon 包装

src/avatar.ts: 是对 icon.ts 组件的 avatar 包装

## 设计规范

+ svg 中的主体内容占比要在 80% 以上, 不能太小
+ svg 中的主体内容要相对居中

## TIP

+ icon.ts: 包装函数, 拷贝即可
+ avatar.ts: 包装函数, 拷贝即可

## TODO

- [x] 实现 Icon
