# vue组件渲染和react组件渲染的区别

[案例代码](https://codesandbox.io/s/laughing-wright-hfjgqt?file=/src/App.vue)

Vue 为每个组件提供了一个 render watcher，它控制着当前组件的视图更新，但是并不会掌管子组件的更新，当组件更新到子组件的时候，会走 patchVnode 方法，对比新旧 VNode 是否相同，如果不同，则会触发子组件的更新。

pathVnode 方法？
