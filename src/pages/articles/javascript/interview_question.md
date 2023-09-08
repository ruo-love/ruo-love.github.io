---
layout: doc

# vue

 vue特点

- 组件化
- 双向绑定
- 轻量级框架
- 渐进式
- 数据、视图相分离、前后端分离

#### new Vue 后续过程

创建Vue实例

1. vue只能通过new关键字初始化
2. 合并传入的options

3. 初始化生命周期

4. 初始化事件中心

5. 初始化渲染

6. 初始化data

7. 初始化props

8. 初始化computed

9. 初始化watch

10. 最后检测是否有el属性，有的话就把上面渲染好的代码挂载到页面上

    ```
    Vue构造函数的核心代码只有一行：this._init(options)
    _init 方法中主要做了下边几件事情：
    
    合并配置：_init 的参数 options 就是 new Vue(options) 时传入的选项，在这里通过 mergeOptions 方法把 options 合并到 vm.$options 中。
    调用 initLifecycle(vm)、initEvents(vm)、initRender(vm)、initState(vm) 函数进行生命周期的初始化、事件中心的初始化、渲染的初始化、data、props、computed、watch的初始化等等。其中 initState 就是将vue实例中的data、props、computed、watch等数据项做进一步得处理，其实就是做代理以及转化成可观测对象。
    另外，我们可以看到在 initState(vm) 执行之前，我们执行了 beforeCreate 方法，在 initState(vm) 执行之后，我们执行了 created 方法。因此在 beforeCreate 方法中，我们无法直接引用data，method，computed，watch等在 initState(vm) 中才开始存在的属性。
    检测是否有el属性，有的话就调用 vm.$mount(vm.$options.el) 进行挂载渲染成真实dom。
    
    ```

    

#### 父组件触发子组件的方法

1. this.$refs.child.say()

2. $emit、$on  （vue3中 从实例中完全移除了 `$on`、`$off` 和 `$once` 方法 ）

   ```vue
   //子组件
   <template>
       <div>child</div>
   </template>
   
   <script>
   export default {
       created() {
           this.$on('paraentHandler', this.say)
       },
       methods: {
           say() {
               console.log('child say')
           }
       }
   }
   </script>
   
   
   //父组件
   ...
   this.$refs.child.$emit('paraentHandler')
   ...
   
   ```

#### vue异步请求放在哪个生命周期中

```
created 阶段的优势是：请求时间比较早，页面 loading 时间相对较短；（调用异步请求最佳，用户就越早感知页面的已加载）
mounted 阶段的优势是：页面已经渲染完成，如果想请求之后进行 DOM 操作的话，必须在 mounted 阶段发起请求
```

#### vue插件

Vue.js 的插件应该暴露一个 `install` 方法。这个方法的第一个参数是 Vue实例对象，第二个参数是一个可选的选项对象：

```js
MyPlugin.install = function (Vue, options) {
  // 1. 添加全局方法或 property
  Vue.myGlobalMethod = function () {
    // 逻辑...
  }

  // 2. 添加全局资源
  Vue.directive('my-directive', {
    bind (el, binding, vnode, oldVnode) {
      // 逻辑...
    }
    ...
  })

  // 3. 注入组件选项
  Vue.mixin({
    created: function () {
      // 逻辑...
    }
    ...
  })

  // 4. 添加实例方法
  Vue.prototype.$myMethod = function (methodOptions) {
    // 逻辑...
  }
   Vue.provide('i18n', options)
}
    
```

```
Vue.use(MyPlugin, { someOption: true })
```

#### vue-loader

vue-loader 会解析Vue文件，提取出每个语言块[html\js\css],交给对应的loader处理，如果有必要会调用其他loader处理，最后将他们组装成一个common.js模块，module.exports出一个vue组件对象

#### 修饰符



##### 事件修饰符

- .stop 阻止事件继续传播
- .prevent 阻止标签默认行为
- .capture 使用事件捕获模式,即元素自身触发的事件先在此处处理，然后才交由内部元素进行处理
- .self 只当在 event.target 是当前元素自身时触发处理函数
- .once 事件将只会触发一次
- .passive 告诉浏览器你不想阻止事件的默认行为
- .native 组件根节点绑定原生事件

##### v-model的修饰符

- .lazy默认情况下，v-model同步输入框的值和数据。可以通过这个修饰符，转变为在change事件再同步。<input v-model.lazy="msg">
- .number 自动将用户的输入值转化为数值类型 <input v-model.number="msg">
- .trim 自动过滤用户输入的首尾空格 <input v-model.trim="msg">

##### 按键修饰符

#### vue中extend、mixins、extends的区别

#### Vue.extend

有时候由于业务需要我们可能要去动态的`生成一个组件`并且要独立`渲染到其它元素节点`中，这时它们就派上了用场；

##### extend 原理

- `Vue.extend` 作用是扩展组件生成一个构造器，它接受一个组件对象，使用原型继承的方法返回了`Vue`的子类，并且把传入组件的`options`和父类的`options`进行了合并；通常会与 `$mount` 一起使用。
- 所以，我们使用`extend`可以将组件转为构造函数，在实例化这个这个构造函数后，就会得到组件的真实`Dom`，这个时候我们就可以使用 `$mount` 去挂载到`DOM`上；





```

<div id="mount-point"></div>
// 创建构造器
var Profile = Vue.extend({
  template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
  data: function () {
    return {
      firstName: 'Walter',
      lastName: 'White',
      alias: 'Heisenberg'
    }
  }
})
// 创建 Profile 实例，并挂载到一个元素上。
new Profile().$mount('#mount-point')
 
// 结果如下：
<p>Walter White aka Heisenberg</p>

```

mixins可以混入多个，当组件使用混入对象时，所有混入对象的选项将被“混合”进入该组件本身的选项。当组件和混入对象含有同名选项时，这些选项将以恰当的方式进行“合并”。数据对象在内部会进行递归合并，并在发生冲突时以组件数据优先。
同名钩子函数将合并为一个数组，因此都将被调用。另外，混入对象的钩子将在组件自身钩子之前调用。其缺点是容易产生命名冲突、不能传参

```
// mixins示例
var mixinA = {
  created: function () { console.log(1) }
}
 var mixinB = {
  created: function () { console.log(2) }
}
var vm = new Vue({
  created: function () { console.log(3) },
  mixins: [mixinA ,mixinB ]
})
//依次打印出 1 2 3
```


extends声明扩展另一个组件(可以是一个简单的选项对象或构造函数)无需使用 Vue.extend。这主要是为了便于扩展单文件组件。和 mixins 类似。但extends只能继承一个，`extends` 和 `mixins` 表达了不同的意图。`mixins` 选项主要用来组合功能，而 `extends` 主要用来考虑继承性。

```
var otherComp= { ... }

// 继承 otherComp
var comp = {
  extends: otherComp,
```

总结：都是为了拓展组件的功能，优先级extend>extends>mixins

#### vue router 路由钩子

- beforeEach(callback(to, from, next))
- afterEach(callback(to, from))
- beforeEnter(callback(to, from, next))
- beforeRouteEnter(to, from, next) 
- beforeRouteUpdate(to, from, next) 
- beforeRouteLeave(to, from, next)

#### vue中错误监听

- window.onerror()  //全局监听js错误信息

  ```
  全局监听所有js错误
  可以捕捉到vue检测不到的一些错误，如可以监听到异步错误
  window.onerror()是js级别的，无法监听到vue组件的错误信息
  
  window.onerror = function(message, source, lineno, colno, error) { ... }
  ```

  

- errorCaptured()   //监听一些有风险的组件

  ```
  监听所有下降错误信息
  返回false 阻止错误向上传递
  不能监听到异步错误
  ```

  

- errorHandler   //全局监听vue中的错误信息

- warnHandler  //警

- 

- 告监听

  ```
  vue全局监听错误，所有组件报错都会汇总到这里
  如果内部errorCaptured() return false  则无法捕捉到对应的错误信息
  不能监听到异步错误
  
  Vue.config.errorHandler = function (err, vm, info) {
    #处理错误信息, 进行错误上报
    #err错误对象
    #vm Vue实例
    #`info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
    #只在 2.2.0+ 可用
  }
  ```

  

#### $nexttick

```
Vue.nextTick(callback)
```



- Vue 在更新 DOM 时是异步执行的。
- Vue是异步执行dom更新的，一旦观察到数据变化，Vue就会开启一个队列，然后把在同一个事件循环 (event loop) 当中观察到数据变化的 watcher 推送进这个队列。如果这个watcher被触发多次，只会被推送到队列一次。这种缓冲行为可以有效的去掉重复数据造成的不必要的计算和DOm操作，等所有数据变化完成之后才会去更新dom。这样做主要是为了提升性能，因为如果在主线程中更新DOM，循环100次就要更新100次DOM；但是如果等事件循环完成之后更新DOM，只需要更新1次,减少重绘、重排提升性能。
- ```
  nextTick是Vue提供的一个全局API,是在下次DOM更新循环结束之后执行延迟回调，在修改数据之后使用$nextTick，则可以在回调中获取更新后的DOM；
  Vue在更新DOM时是异步执行的。只要侦听到数据变化，Vue将开启1个队列，并缓冲在同一事件循环中发生的所有数据变更。如果同一个watcher被多次触发，只会被推入到队列中-次。这种在缓冲时去除重复数据对于避免不必要的计算和DOM操作是非常重要的。nextTick方法会在队列中加入一个回调函数，确保该函数在前面的dom操作完成后才调用；
  比如，我在干什么的时候就会使用nextTick，传一个回调函数进去，在里面执行dom操作即可；
  我也有简单了解nextTick实现，它会在callbacks里面加入我们传入的函数，然后用timerFunc异步方式调用它们，首选的异步方式会是Promise。这让我明白了为什么可以在nextTick中看到dom操作结果。
  
  在下次 DOM 更新循环结束之后执行延迟回调，在修改数据之后立即使用 nextTick 来获取更新后的 DOM。 nextTick主要使用了宏任务和微任务。 根据执行环境分别尝试采用Promise、MutationObserver、setImmediate，如果以上都不行则采用setTimeout定义了一个异步方法，多次调用nextTick会将方法存入队列中，通过这个异步方法清空当前队列。
  
  ```

  



####  keepalive

keep-alive组件用来缓存组件,避免多次加载相同的组件,减少性能消耗；将组件实例保存在内存的cache对象中，而不是直接将其销毁，它是一个抽象组件，不会被渲染到真实DOM中，也不会出现在父组件链中。缓存得都是vnode节点，created周期里 创建了一个cache这么一个缓存容器，再销毁周期里 清除这个容器。在存入之前会检测cache对象中是否已经存在该组件，如果存在则更新，如果不存在则检测是否超出最大缓存量，如果超出则删除最久未使用的组件，最终加入缓存cache对象中。

1. activated: keep-alive组件激活时调用
2. deactivated: keep-alive组件停用时调用
3. include与exclude两个属性，允许组件有条件地进行缓存。
3. max属性 设置最大缓存组件数量，默认10

#### 前端路由

##### hash模式

- 采用锚点链接，以#开头
- location.hash="#about"  改变hash
- window.onhahschange  检测hash变化，去渲染该hash所映射的视图组件
- hash 前后两个值相同，则不会重复加入历史栈
- hash 虽然出现在 [URL](https://so.csdn.net/so/search?q=URL&spm=1001.2101.3001.7020) 中，但不会被包括在 HTTP 请求中，对后端完全没有影响，因此改变 hash 不会重新加载页面。

##### history模式

- history—— 利用了 HTML5 History Interf 中新增的 pushState() 和 replaceState() 方法。
  这两个方法应用于浏览器的历史记录栈，在当前已有的 back、forward、go 的基础之上，它们提供了对历史记录进行修改的功能。只是当它们执行修改时，虽然改变了当前的 URL，但浏览器不会立即向后端发送请求。
  
- history前后两个值相同，则会重复加入历史栈

- 会请求后端，如果不存在会404，需要配合后端处理

- 切换历史状态包括`back`、`forward`、`go` 三个方法

  ```
  在history模式下，借助history.pushState实现页面的无刷新跳转；这种方式改变了url，如果重新刷新页面会造成一个新的http请求，因此会重新请求服务器，这也使得我们必须在服务端配置好地址，否则服务端会返回404，为确保不出问题，最好在项目中配置404页面
  
  那为什么hash模式不会出现这个问题呢?
  上文已讲，hash虽然可以改变URL，但不会被包括在HTTP请求中。它被用来指导浏览器动作，并不影响服务器端，因此，改变hash并没有改变url，所以页面路径还是之前的路径，nginx不会拦截。 因此，切记在使用history模式时，需要服务端允许地址可访问，否则就会出现404的尴尬场景。
  
  ```

  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <title>自定义对pushState、replaceState的监听</title>
  </head>
  <body>
  <button onclick="push()">点击切换路由</button>
  <button onclick="replace()">点击替换路由</button>
  <script>
      function push() {
          window.history.pushState({data:"from test1"}, "", "/test1");
      }
   
      function replace() {
          window.history.replaceState({data:"from test2"}, "", "/test2");
      }
   
      /**
       * 重写history的pushState和replaceState
       * @param action pushState|replaceState
       * @return {function(): *}
       */
      function wrapState(action) {
          // 获取原始定义
          let raw = history[action];
          return function () {
   
              // 经过包装的pushState或replaceState
              let wrapper = raw.apply(this, arguments);
   
              // 定义名为action的事件
              let e = new Event(action);
   
              // 将调用pushState或replaceState时的参数作为stateInfo属性放到事件参数event上
              e.stateInfo = {...arguments};
              // 调用pushState或replaceState时触发该事件
              window.dispatchEvent(e);
              return wrapper;
          }
      }
   
      //修改原始定义
      history.pushState = wrapState("pushState");
      history.replaceState = wrapState("replaceState");
   
      // 监听自定义的事件
      window.addEventListener("pushState", function (e) {
          console.info("pushState",e.stateInfo);
      })
      window.addEventListener("replaceState", function (e) {
          console.info("replaceState",e.stateInfo);
      })
  </script>
  </body>
  </html>
  ```
  
  

#### 路由懒加载

SPA 项目，一个路由对应一个页面，如果不做处理，项目打包后，会把所有页面打包成一个文件，**当用户打开首页时，会一次性加载所有的资源**，造成首页加载很慢，降低用户体验

```
// 通过webpackChunkName设置分割后代码块的名字
const Home = () => import(/* webpackChunkName: "home" */ "@/views/home/index.vue");
const MetricGroup = () => import(/* webpackChunkName: "metricGroup" */ "@/views/metricGroup/index.vue");
…………
const routes = [
    {
       path: "/",
       name: "home",
       component: Home
    },
    {
       path: "/metricGroup",
       name: "metricGroup",
       component: MetricGroup
    },
    …………
 ]

```

整个网页默认是刚打开就去加载所有页面，路由懒加载就是只加载你当前访问的路由资源。懒加载路由对应的资源，提高首屏加载速度

实现原理：将路由相关的组件，不再直接导入了，而是改写成异步组件的写法，只有当函数被调用的时候，才去加载对应的组件内容。

懒加载前提的实现：ES6的动态地加载模块——import()

import from 静态加载，编译时候运行，需要放在文件头部。import()动态加载，返回一个promise,调用时运行，可以放在函数中指定时候去调用

调用 import() 之处，被作为分离的模块起点，意思是，被请求的模块和它引用的所有子模块，会分离到一个单独的 chunk 中

要实现懒加载，就得先将进行懒加载的子模块分离出来，打包成一个个单独的文件，webpackChunkName 作用是 webpack 在打包的时候，对异步引入的库代码（lodash）进行代码分割时，设置代码块的名字。webpack 会将任何一个异步模块与相同的块名称组合到相同的异步块中

#### 组件懒加载的使用场景

```
home 页面 和 about 页面，都引入了 dialogInfo 弹框组件，该弹框不是一进入页面就加载，而是需要用户手动触发后才展示出来
项目打包后，发现 home.js 和 about.js 均包括了该弹框组件的代码（在 dist 文件中搜索dialogInfo弹框组件）
懒加载：
<script>
const dialogInfo = () => import(/* webpackChunkName: "dialogInfo" */ '@/components/dialogInfo');
export default {
  name: 'homeView',
  components: {
    dialogInfo
  }
}
</script>
重新打包后，home.js 和 about.js 中没有了弹框组件的代码，该组件被独立打包成 dialogInfo.js，当用户点击按钮时，才会去加载 dialogInfo.js 和 dialogInfo.css
```

有时资源拆分的过细也不好，可能会造成浏览器 http 请求的增多

总结出三种适合组件懒加载的场景：

1）该页面的 JS 文件体积大，导致页面打开慢，可以通过组件懒加载进行资源拆分，利用浏览器并行下载资源，提升下载速度（比如首页）

2）该组件不是一进入页面就展示，需要一定条件下才触发（比如弹框组件）

3）该组件复用性高，很多页面都有引入，利用组件懒加载抽离出该组件，一方面可以很好利用缓存，同时也可以减少页面的 JS 文件大小（比如表格组件、图形组件等）

#### tree-shaking 原理：

项目中只使用了 targetType 方法，但未使用 deepClone 方法，项目打包后，deepClone 方法不会被打包到项目里

tree-shaking 原理：

依赖于ES6的模块特性，ES6模块依赖关系是确定的，和运行时的状态无关，可以进行可靠的静态分析，这就是 tree-shaking 的基础

静态分析就是不需要执行代码，就可以从字面量上对代码进行分析。ES6之前的模块化，比如 CommonJS 是动态加载，只有执行后才知道引用的什么模块，就不能通过静态分析去做优化，正是基于这个基础上，才使得 tree-shaking 成为可能

**无法通过静态分析判断出一个对象的哪些属性和方法未被使用，所以 tree-shaking 只对使用 export 导出的变量生效，export default 没法判断**



#### Composition API

##### Options API 的问题

- **难以维护**：`Vue2` 中只能固定用 `data`、`computed`、`methods` 等选项来组织代码，在组件越来越复杂的时候，一个功能相关的`属性`和`方法`就会在文件上中下到处都有，很分散，变越来越难维护
- **不清晰的数据来源、命名冲突**： `Vue2` 中虽然可以用 `minxins` 来做逻辑的提取复用，但是 `minxins`里的属性和方法名会和组件内部的命名冲突，还有当引入多个 `minxins` 的时候，我们使用的属性或方法是来于哪个 `minxins` 也不清楚

##### 和 Options API 区别和作用

- **更灵活的代码组织**：`Composition API` 是基于逻辑相关性组织代码的，将零散分布的逻辑组合在一起进行维护，也可以将单独的功能逻辑拆分成单独的文件；提高可读性和可维护性。
- **更好的逻辑复用**：解决了过去 `Options API` 中 `mixins` 的各种缺点；
- **同时兼容`Options API`**；
- **更好的类型推导**：`组合式 API`主要利用基本的变量和函数，它们本身就是类型友好的。用`组合式 API`重写的代码可以享受到完整的类型推导

##### Composition API 命名冲突

在使用组合式`API`时，可以通过在解构变量时对变量进行`重命名`来避免相同的键名



#### webpackChunkName的作用

```js
 () => import(/* webpackChunkName: 'ImportFuncDemo' */ '@/components/home')
 () => import(/* webpackChunkName: 'ImportFuncDemo' */ '@/components/index')
```

webpackChunkName的值相同的组件会被webpack打包在一个js文件中
webpackChunkName的值不相同的组件会被webpack打包在不同的js文件中

#### computed、watch区别

computed

- 根据其属性依赖进行计算，依赖变化则自动重新计算
- computed会被缓存，依赖不变，直接读取缓存
- 不能进行异步处理
- 它可以设置 getter 和 setter。

watch

- 监测属性的变化，执行回调，接受变化前后的值为参数
- 可以处理异步
- 默认初始化不执行，需配置

#### 响应式原理

- vue是采用数据劫持配合发布者-订阅者模式的方式,通过0bject.definerProperty()来劫持各个属性的setter和getter,为每个属性创建一个Dep对象，在其内部的subs数组(依赖收集器)中存储依赖该属性的所有Watcher，在数据变动时,就会被setter拦截，此时发布消息给依赖收集器,去通知每个观察者Watcher,做出对应的回调函数update,去更新视图

- MVVM作为绑定的入口,整合Observer,Compile和Watcher三者,通过Observer来监听model数据变化,通过Compile来解析编译模板指令,最终利用Watcher搭起Observer,Compile之间的通信桥梁,达到数据变化=>视图更新;视图交互变化=→>数据model变更的双向绑定效果
- 注意：beforecreated之后 created之前进行响应式数据的劫持；beforemount之后mounted之前,组件会调用render函数，在此期间Compile解析模板，在遇到依赖属性时，会将他们作为该属性的一个Watcher，放入该属性的依赖收集器中，并向该属性添加一个update方法用于更新视图

#### Object.defineProperty与Proxy

**Proxy**

- Proxy可以直接监听对象而非属性，
- Proxy可以直接监听数组的变化，Proxy直接实现对象属性的新增/删除
- Proxy有多达13种拦截方法,不限于apply、ownKeys、deleteProperty、has等等是Object.defineProperty不具备的
- Proxy返回的是一个新对象,我们可以只操作新的对象达到目的,不需要像Object.defineProperty一样遍历每个属性有一定的性能提升
- Proxy作为新标准将受到浏览器厂商重点持续的性能优化，也就是传说中的新标准的性能红利

**Object.defineProperty**

- Object.defineProperty只能劫持对象的属性，需要遍历对象的每一个属性，如果属性值也是对象，就需要递归进行深度遍历。
- Object.defineProperty劫持的是对象的属性，所以新增属性时，需要重新遍历对象， 对其新增属性再次使用Object.defineProperty进行劫持。也就是Vue2.x中给数组和对象新增属性时，需要使用$set才能保证新增的属性也是响应式的, $set内部也是通过调用Object.defineProperty去处理的。
  

```js
//Proxy实现数据劫持


observe(data) {
  const that = this;
  let handler = {
   get(target, property) {
      return target[property];
    },
    set(target, key, value) {
      let res = Reflect.set(target, key, value);
      that.subscribe[key].map(item => {
        item.update();
      });
      return res;
    }
  }
  this.$data = new Proxy(data, handler);
}
```



####  为什么只对对象劫持，而要对数组进行方法重写？

因为对象最多也就几十个属性，拦截起来数量不多，但是数组可能会有几百几千项，拦截起来非常耗性能，所以直接重写数组原型上的方法，是比较节省性能的方案

#### Vue.set方法的原理

首先，判断在非生产环境，传入的target如果是undefined、null或是原始类型，则直接跑出错误。

其次，如果判断target如果是个数组，并且key是索引的话，那么就取当前数组长度与key这两者的最大值作为数组的新长度，然后使用数组的splice方法将传入的索引key对应的val值添加进数组。Array类型数据的变化侦测方式时说过，数组的splice方法已经被我们创建的拦截器重写了，也就是说，当使用splice方法向数组内添加元素时，该元素会自动被变成响应式的。

接下来，如果传入的target不是数组，那就当作是对象来处理。首先判断传入的key是否已经存在于target中，如果存在，表明这次操作不是新增属性，而是对已有的属性进行简单的修改值，那么就只修改属性值即可，接下来获取到traget的__ob__属性，我们说过，该属性是否为true标志着target是否为响应式对象，接着判断如果tragte是 Vue 实例，或者是 Vue 实例的根数据对象，则抛出警告并退出程序，接着判断如果ob属性为false，那么表明target不是一个响应式对象，那么我们只需简单给它添加上新的属性，不用将新属性转化成响应式，最后，如果target是对象，并且是响应式，那么就调用defineReactive方法将新属性值添加到target上，defineReactive方会将新属性添加完之后并将其转化成响应式，最后通知依赖更新。


```js
function set(target, key, val) {
    // 判断是否是数组
    if (Array.isArray(target)) {
        // 判断谁大谁小
        target.length = Math.max(target.length, key)
        // 执行splice
        target.splice(key, 1, val)
        return val
    }

    const ob = target.__ob__

    // 如果此对象没有不是响应式对象，直接设置并返回
    if (key in target && !(key in target.prototype) || !ob) {
        target[key] = val
        return val
    }

    // 否则，新增属性，并响应式处理
    defineReactive(target, key, val)
    return val
}



```

#### Vue.delete方法的原理？

```js
function del (target, key) {
    // 判断是否为数组
    if (Array.isArray(target)) {
        // 执行splice
        target.splice(key, 1)
        return
    }

    const ob = target.__ob__

    // 对象本身就没有这个属性，直接返回
    if (!(key in target)) return


    // 否则，删除这个属性
    delete target[key]

    // 判断是否是响应式对象，不是的话，直接返回
    if (!ob) return
    // 是的话，删除后要通知视图更新
    ob.dep.notify()
}
```




#### computed如何实现传参？

```js

<h1>{{ total('name') }}<h1/>

computed: {
    total() {
      return function(name) {
          return name+' hahahah'
         }
    },
  }
```

#### <span id="vue%Hook">vue Hook</span>



```vue
//父组件
<child @hook:created="handle"/>   //在父组件中 向子组件的生命周期  v3=> vnode-created

//js
method () {
  handle() {
    ...
  }
}
```

#### provide和inject是响应式的吗？

```js
// 祖先组件
provide(){
    return {
   // keyName: { name: this.name }, // value 是对象才能实现响应式，也就是引用类型
      keyName: ()=>this.name // 通过函数的方式也可以[注意，这里是把函数作为value，而不是this.changeValue()]
   // keyName: 'test' value 如果是基本类型，就无法实现响应式
    }
  },
data(){
  return {
	name:'张三'
}
  },
 
  
  // 后代组件
  inject:['keyName']
  create(){
	console.log(this.keyName) // 改变后的名字-李四
}
```

vue3 

```vue
const name=ref('zzz') 

provide: {
    user: computed(()=>name)  //传递一个计算属性 也是响应式的
},
```

#### 动态指令和参数

```js
<template>
    ...
    <aButton @[someEvent]="handleSomeEvent()" :[someProps]="1000" />...
</template>
<script>
  ...
  data(){
    return{
      ...
      someEvent: someCondition ? "click" : "dbclick",
      someProps: someCondition ? "num" : "price"
    }
  },
  methods: {
    handleSomeEvent(){
      // handle some event
    }
  }  
</script>
```

#### v-no绑定多个事件

```html
<input type="text" v-on="{ input:onInput,focus:onFocus,blur:onBlur}">//可以正常执行不同方法
<div v-on="{ mousedown:onInput,mouseup:onFocus,mouseenter:onBlur}" >盒子</div>//可以正常执行不同方法
<div v-on="{click:onInput,click:onFocus,click:onBlur}">盒子</div>//绑定多个相同事件，只执行最后一个方法

<div @click="{onInput,onFocus,onBlur}">盒子</div> //这样绑定无效

```



#### 相同的路由组件如何重新渲染？ 

> 开发人员经常遇到的情况是，多个路由解析为同一个Vue组件。问题是，Vue出于性能原因，默认情况下共享组件将不会重新渲染，如果你尝试在使用相同组件的路由之间进行切换，则不会发生任何变化。

```js
const routes = [
  {
    path: "/a",
    component: MyComponent
  },
  {
    path: "/b",
    component: MyComponent
  },
];
复制代码
```

> 如果依然想重新渲染，怎么办呢？可以使用`key`

```js
<template>
    <router-view :key="$route.path"></router-view>
</template>
```

#### MVC、MVVM 

MVC 的思想：

- **Model（模型）**是应用程序中用于处理应用程序数据逻辑的部分。
  　　通常模型对象负责在数据库中存取数据。

  **View（视图）**是应用程序中处理数据显示的部分。
  　　通常视图是依据模型数据创建的。

  **Controller（控制器）**是应用程序中处理用户交互的部分。
  　　通常控制器负责从视图读取数据交给view，控制用户输入，并向模型发送数据。

mvc中大量的DOM 操作使页面渲染性能降低，加载速度变慢，影响用户体验

MVVM ：

- MVVM 与 MVC 最大的区别就是：它实现了 View 和 Model 的自动同步，也就是当 Model 的属性改变时，我们不用再自己手动操作 Dom 元素，来改变 View 的显示，而是改变属性后该属性对应 View 层显示会自动改变（对应Vue数据驱动的思想）
- 整体看来，MVVM 比 MVC 精简很多，不仅简化了业务与界面的依赖，还解决了数据频繁更新的问题，不用再用选择器操作 DOM 元素。因为在 MVVM 中，View 不知道 Model 的存在，Model 和 ViewModel 也观察不到 View，这种低耦合模式提高代码的可重用性



#### 为什么 data 是一个函数

组件中的 data 写成一个函数，数据以函数返回值形式定义，这样每复用一次组件，就会返回一份新的 data，类似于给每个组件实例创建一个私有的数据空间，让各个组件实例维护各自的数据。而单纯的写成对象形式，就使得所有组件实例共用了一份 data，就会造成一个变了全都会变的结果

#### computed

[vue-computed（原理篇） - 掘金 (juejin.cn)](https://juejin.cn/post/7008715822881325070)

#### 为什么v-for和v-if不建议用在一起

1.当 v-for 和 v-if 处于同一个节点时，v-for 的优先级比 v-if 更高，这意味着 v-if 将分别重复运行于每个 v-for 循环中。如果要遍历的数组很大，而真正要展示的数据很少时，这将造成很大的性能浪费（Vue2.x）
 2.这种场景建议使用 computed，先对数据进行过滤

注意：3.x 版本中 `v-if` 总是优先于 `v-for` 生效。由于语法上存在歧义，建议避免在同一元素上同时使用两者。比起在模板层面管理相关逻辑，更好的办法是通过创建计算属性筛选出列表，并以此创建可见元素。





#### 生命周期

必看：https://juejin.cn/post/7081436617788882975

从官网的生命周期图和源码看，可以大致将vue的生命周期分为4个阶段，分别是初始化阶段，模板编译阶段，挂载阶段，销毁阶段。

- 初始化阶段：为vue实例初始化属性、事件、数据观测等。
- 模板编译阶段：将模板字符串编译成渲染函数。（该阶段在runtime版本中不存在，因为已经编译好了。）
- 挂载阶段：将vue实例挂载到指定dom上，即将模板渲染到真实dom中。
- 销毁阶段：解绑指令，移除事件监听器，销毁子实例。

与vue生命周期密切相关的钩子函数有beforeCreate，created，beforeMount，mounted，beforeUpdate，updated，beforeDestroy，destroyed。 vue的api文档上，一共有11个和生命周期有关的钩子函数，另外三个分别是activated，deactivated，最后一个是vue2.5.0新增的，叫errorCaptured。



| 生命周期钩子  | 详细                                                         |
| :------------ | :----------------------------------------------------------- |
| beforeCreate  | 在实例初始化之后，数据观测(data observer) 和 event/watcher 事件配置之前被调用。 |
| created       | 实例已经创建完成之后被调用。在这一步，实例已完成以下的配置：数据观测(data observer)，属性和方法的运算， watch/event 事件回调。在执行data()方法前props属性有数据已经可以访问，watch和computed[监听](https://so.csdn.net/so/search?q=监听&spm=1001.2101.3001.7020)函数此时为null，此时this.computed里的计算属性值为undefined。data函数执行完后，watch和computed监听函数才可用，因为data函数执行完后，data函数return的属性这时才可用。然而，挂载阶段还没开始，$el 属性目前不可见。 |
| beforeMount   | 在挂载开始之前被调用：相关的 render 函数首次被调用。         |
| mounted       | el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。  |
| beforeUpdate  | 数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。你可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程。 |
| updated       | 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。 |
| activated     | keep-alive 组件激活时调用。                                  |
| deactivated   | keep-alive 组件停用时调用。                                  |
| beforeDestroy | 实例销毁之前调用。在这一步，实例仍然完全可用。               |



#### Vue 的父子组件生命周期钩子函数执行顺序

- 加载渲染过程

父 beforeCreate->父 created->父 beforeMount->子 beforeCreate->子 created->子 beforeMount->子 mounted->父 mounted

- 子组件更新过程

父 beforeUpdate->子 beforeUpdate->子 updated->父 updated

- 父组件更新过程

父 beforeUpdate->父 updated

- 销毁过程

父 beforeDestroy->子 beforeDestroy->子 destroyed->父 destroyed



#### 虚拟 DOM 是什么 有什么优缺点

**虚拟dom 并不能保障性能，它的价值在于研发体验和效率，实现很好的跨平台，同一套虚拟dom可以对接不同平台的渲染逻辑**

**它在性能方面的优化主要是差量更新、批量更新**

由于在浏览器中操作 DOM 是很昂贵的。频繁的操作 DOM，会产生一定的性能问题。这就是虚拟 Dom 的产生原因。Vue2 的 Virtual DOM 借鉴了开源库 snabbdom 的实现·。Virtual DOM 本质就是用一个原生的 JS 对象去描述一个 DOM 节点，是对真实 DOM 的一层抽象。

```
虚拟DOM的作用是什么？
兼容性好。因为Vnode本质是JS对象，所以不管Node还是浏览器环境，都可以操作；
减少了对Dom的操作。页面中的数据和状态变化，都通过Vnode对比，只需要在比对完之后【差量更新】DOM，在小范围数据更改时候，可以提高了页面性能，但大量数据修改，js也是非常耗时，此时dom更新与原生跟新差距不大，也不存在性能提升；
虚拟DOM和真实DOM的区别？
说到这里，那么虚拟DOM和真实DOM的区别是什么呢？总结大概如下：

虚拟DOM减少了重绘和重排；
真实DOM在频繁操作时引发的重绘和重排导致性能很低；
虚拟DOM频繁修改，然后一次性对比差异并修改真实DOM，最后【批量更新】进行一次性重绘和重排，减少了真实DOM中多次重绘和重排引起的性能损耗；
虚拟DOM有效降低大面积的重绘和重排，因为是和真实DOM对比，更新差异部分，所以只渲染局部；

```

**优点：**

1. 保证性能下限： 框架的虚拟 DOM 需要适配任何上层 API 可能产生的操作，它的一些 DOM 操作的实现必须是普适的，所以它的性能并不是最优的；但是比起粗暴的 DOM 操作性能要好很多，因此框架的虚拟 DOM 至少可以保证在你不需要手动优化的情况下，依然可以提供还不错的性能，即保证性能的下限；
2. 无需手动操作 DOM： 我们不再需要手动去操作 DOM，只需要写好 View-Model 的代码逻辑，框架会根据虚拟 DOM 和 数据双向绑定，帮我们以可预期的方式更新视图，极大提高我们的开发效率；
3. 跨平台： 虚拟 DOM 本质上是 JavaScript 对象,而 DOM 与平台强相关，相比之下虚拟 DOM 可以进行更方便地跨平台操作，例如服务器渲染、weex 开发等等。
3. 更新更快  V8---》js 相对dom快，**大量 DOM计算时候并不能保障性能**

**缺点:**

1. 无法进行极致优化： 虽然虚拟 DOM + 合理的优化，足以应对绝大部分应用的性能需求，但在一些性能要求极高的应用中虚拟 DOM 无法进行针对性的极致优化。
2. 首次渲染大量 DOM 时，由于多了一层虚拟 DOM 的计算，会比 innerHTML 插入慢。

#### Diff算法

- 在js中,渲染真实`DOM`的开销是非常大的, 比如我们修改了某个数据,如果直接渲染到真实`DOM`, 会引起整个`dom`树的重绘和重排。那么有没有可能实现只更新我们修改的那一小块dom而不要更新整个`dom`呢？此时我们就需要先根据真实`dom`生成虚拟`dom`， 当虚拟`dom`某个节点的数据改变后会生成有一个新的`Vnode`, 然后新的`Vnode`和旧的`Vnode`作比较，发现有不一样的地方就直接修改在真实DOM上，然后使旧的`Vnode`的值为新的`Vnode`。

- diff过程
  1. 进行同层比较。首先通过snameVode()去比较新旧vnode是否相似，在内部主要通过比较key、tag来判断。如果不相似，则以newVnode为基准去更新真实dom,如果相似则进行data比较包含style\attris\event等，如果属性不一致则调用对应的update方法去更新。
  
  2. 然后通过patchVnode进行子节点比较，判断newVnode是否有text,如果有text则再去判断oldVnode text 与newVnode text是否一致，如果不一致则以newVnode text去更新;
  
  3. 如果没有text则去判断是newVnode否有chidren,如果没有children，oldVnode有children,则说明删除;如果newVnode有childrem,oldVnode没有children则表示增加；如果都有children则去进行updateChildren()
  
  4. updateChildren(),会对oldVnode_children、newVnode_children、的每个节点进行索引编号，然后进行头头、尾尾、头尾、尾头比较，通过snameVnode()判断新旧节点是否相似,如果相似则调用patchVnode(),然后对应的索引向前或者向后推移，直至有一方startIndex>endIndex结束；如果四种比较都没有成功，则会进行key比较**patchKeyedChildren**，/ 尝试在oldChildren中寻找和newStartVnode的具有相同的key的Vnode,如果key相同则再去比较tag,如果两者都相等则patchVnode(),否则直接newVnode更新。,如果没有Key相同的节点直接更新
  
  5. 当新旧Vnode list中有一方的 endIndex>startIndex,则标识已经有一方已经对比完，这时需要取创建 newVnode 中star--end所有节点
  
  6. 旧节点遍历完还有新节点就新增新节点；
  
  7. 新节点遍历完还有旧节点就移除旧节点；
  
  8. https://blog.csdn.net/weixin_43638968/article/details/112686317
  
  9. ```js
     function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
         let oldStartIdx = 0 // 旧头索引
         let newStartIdx = 0 // 新头索引
         let oldEndIdx = oldCh.length - 1 // 旧尾索引
         let newEndIdx = newCh.length - 1 // 新尾索引
         let oldStartVnode = oldCh[0] // oldVnode的第一个child
         let oldEndVnode = oldCh[oldEndIdx] // oldVnode的最后一个child
         let newStartVnode = newCh[0] // newVnode的第一个child
         let newEndVnode = newCh[newEndIdx] // newVnode的最后一个child
         let oldKeyToIdx, idxInOld, vnodeToMove, refElm
     
         // removeOnly is a special flag used only by <transition-group>
         // to ensure removed elements stay in correct relative positions
         // during leaving transitions
         const canMove = !removeOnly
     
         // 如果oldStartVnode和oldEndVnode重合，并且新的也都重合了，证明diff完了，循环结束
         while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
           // 如果oldVnode的第一个child不存在
           if (isUndef(oldStartVnode)) {
             // oldStart索引右移
             oldStartVnode = oldCh[++oldStartIdx] // Vnode has been moved left
     
           // 如果oldVnode的最后一个child不存在
           } else if (isUndef(oldEndVnode)) {
             // oldEnd索引左移
             oldEndVnode = oldCh[--oldEndIdx]
     
           // oldStartVnode和newStartVnode是同一个节点
           } else if (sameVnode(oldStartVnode, newStartVnode)) {
             // patch oldStartVnode和newStartVnode， 索引左移，继续循环
             patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue)
             oldStartVnode = oldCh[++oldStartIdx]
             newStartVnode = newCh[++newStartIdx]
     
           // oldEndVnode和newEndVnode是同一个节点
           } else if (sameVnode(oldEndVnode, newEndVnode)) {
             // patch oldEndVnode和newEndVnode，索引右移，继续循环
             patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue)
             oldEndVnode = oldCh[--oldEndIdx]
             newEndVnode = newCh[--newEndIdx]
     
           // oldStartVnode和newEndVnode是同一个节点
           } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
             // patch oldStartVnode和newEndVnode
             patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue)
             // 如果removeOnly是false，则将oldStartVnode.eml移动到oldEndVnode.elm之后
             canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm))
             // oldStart索引右移，newEnd索引左移
             oldStartVnode = oldCh[++oldStartIdx]
             newEndVnode = newCh[--newEndIdx]
     
           // 如果oldEndVnode和newStartVnode是同一个节点
           } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
             // patch oldEndVnode和newStartVnode
             patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue)
             // 如果removeOnly是false，则将oldEndVnode.elm移动到oldStartVnode.elm之前
             canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm)
             // oldEnd索引左移，newStart索引右移
             oldEndVnode = oldCh[--oldEndIdx]
             newStartVnode = newCh[++newStartIdx]
     
           // 如果都不匹配
           } else {
             if (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)
     
             // 尝试在oldChildren中寻找和newStartVnode的具有相同的key的Vnode
             idxInOld = isDef(newStartVnode.key)
               ? oldKeyToIdx[newStartVnode.key]
               : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx)
     
             // 如果未找到，说明newStartVnode是一个新的节点
             if (isUndef(idxInOld)) { // New element
               // 创建一个新Vnode
               createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm)
     
             // 如果找到了和newStartVnodej具有相同的key的Vnode，叫vnodeToMove
             } else {
               vnodeToMove = oldCh[idxInOld]
               /* istanbul ignore if */
               if (process.env.NODE_ENV !== 'production' && !vnodeToMove) {
                 warn(
                   'It seems there are duplicate keys that is causing an update error. ' +
                   'Make sure each v-for item has a unique key.'
                 )
               }
     
               // 比较两个具有相同的key的新节点是否是同一个节点
               //不设key，newCh和oldCh只会进行头尾两端的相互比较，设key后，除了头尾两端的比较外，还会从用key生成的对象oldKeyToIdx中查找匹配的节点，所以为节点设置key可以更高效的利用dom。
               if (sameVnode(vnodeToMove, newStartVnode)) {
                 // patch vnodeToMove和newStartVnode
                 patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue)
                 // 清除
                 oldCh[idxInOld] = undefined
                 // 如果removeOnly是false，则将找到的和newStartVnodej具有相同的key的Vnode，叫vnodeToMove.elm
                 // 移动到oldStartVnode.elm之前
                 canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm)
     
               // 如果key相同，但是节点不相同，则创建一个新的节点
               } else {
                 // same key but different element. treat as new element
                 createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm)
               }
             }
     
             // 右移
             newStartVnode = newCh[++newStartIdx]
           }
         }
     
     ```
  
     



####  v-for 为什么要加 key

key属性主要用在Vue的虚拟DOM算法，在新旧nodes对比时辨识VNodes；如果不使用key，vue会使用一种最大限度减少动态元素并且尽可能尝试就地**修改/复用**相同类型元素的算法；而使用key时，它会**基于key的变化重新排列元素顺序**，并且会**移除/销毁**key不存在的元素。而当有key属性时，vue底层调用的是**patchKeyedChildren方法**

我们举一个例子，在a、b、c、d四个中插入f变成a、b、f、c、d，从源码的角度去理解这段话。

a、b、c、d

a、b、f、c、d，

当没有key属性时，vue底层调用的是patchUnkeyedChildren方法，理论上c、d并无任何改动，但是却因为f的插入，导致f之后的所有内容都要进行改动，最后新增一个VNode，diff算法的效率并不高。


#### SSR

SSR 也就是服务端渲染，也就是将 Vue 在客户端把vnode渲染成 HTML 的工作放在服务端完成，然后再把 html 直接返回给客户端。

**优点：**

SSR 有着更好的 SEO、并且首屏加载速度更快

**缺点：** 开发条件会受到限制，服务器端渲染只支持 beforeCreate 和 created 两个钩子，当我们需要一些外部扩展库时需要特殊处理，服务端渲染应用程序也需要处于 Node.js 的运行环境。服务器会有更大的负载需求

#### 单页面与多页面的区别

（1）单页应用（SinglePage Application ， SPA）
指只有一个主页面的应用，一开始只需要加载一次js，css等相关资源。所有的内容都包含在主页面，对每一个功能模块组件化。单页面应用跳转，就是切换相关组件，只刷新局部资源。（仅在 Web 页面初始化时加载相应的 HTML、JavaScript 和 CSS。一旦页面加载完成，SPA 不会因为用户的操作而进行页面的重新加载或跳转；取而代之的是利用路由机制实现 HTML 内容的变换，UI 与用户的交互，避免页面的重新加载）

（2）多页应用（MultiPage Application ， MPA）
指有多个独立的页面的应用，每个页面必须重复加载，js，css等相关资源。多页应用跳转需要整页资源刷新。

#### 单页应用项目过大首页加载慢如何解决

```
使用CDN资源,减小服务器带宽压力
路由懒加载
将一些静态js css放到其他地方（如OSS），减小服务器压力
按需加载三方资源，如iview,建议按需引入iview中的组件
使用nginx开启gzip减小网络传输的流量大小
webpack开启gzip压缩
若首屏为登录页，可以做成多入口，登录页单独分离为一个入口
SSR渲染
```

#### vue 中使用了哪些设计模式

1.工厂模式 - 传入参数即可创建实例

虚拟 DOM 根据参数的不同返回基础标签的 Vnode 和组件 Vnode

2.单例模式 - 整个程序有且仅有一个实例

vuex 和 vue-router 的插件注册方法 install 判断如果系统存在实例就直接返回掉

3.发布-订阅模式 (vue 事件机制)

4.观察者模式 (响应式数据原理)

5.装饰模式: (@装饰器的用法)

####  你都做过哪些 Vue 的性能优化

- 对象层级不要过深，否则性能就会差
- 不需要响应式的数据不要放到 data 中（可以用 Object.freeze() 冻结数据）
- v-if 和 v-show 区分使用场景
- computed 和 watch 区分使用场景
- v-for 遍历必须加 key，key 最好是 id 值，且避免同时使用 v-if
- 大数据列表和表格性能优化-虚拟列表/虚拟表格
- 防止内层泄漏，组件销毁后把全局变量和事件销毁
- 图片懒加载
- 路由懒加载
- 第三方插件的按需引入
- 适当采用 keep-alive 缓存组件
- 防抖、节流运用
- 服务端渲染 SSR or 预渲染

#### 路由参数映射props三种写法

- props布尔值写法

  ```js
   path: "/home",
   component: () => import("@/views/Home.vue"),
   props:true
  ```

- props对象写法

  ```js
   path: "/home",
   component: () => import("@/views/Home.vue"),
   props:{a:1,b:2}
  ```

- props函数写法

  ```js
   path: "/home",
   component: () => import("@/views/Home.vue"),
   props:($route)=>{
       return {keyword:$route.params.keyword,a:$route.query}
   }
  ```

#### Vue.use() 的源码中的逻辑



```jsx
export function initUse (Vue: GlobalAPI) {
 Vue.use = function (plugin: Function | Object) {
  const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
  if (installedPlugins.indexOf(plugin) > -1) {
   return this
  }
  const args = toArray(arguments, 1)
  args.unshift(this)
  if (typeof plugin.install === 'function') {
   plugin.install.apply(plugin, args)
  } else if (typeof plugin === 'function') {
   plugin.apply(null, args)
  }
  installedPlugins.push(plugin)
  return this
 }
}
```

在源码中首先限制了它传入的值的类型只能是Function或者Object，然后判断了该插件是不是已经注册过，防止重复注册，然后调用了该插件的install方法，源码中也有介绍到Vue.use()可以接受多个参数的，除第一个参数之后的参数我们都是以参数的形式传入到当前组件中。 

#### h函数、render函数、$mount

```
h函数就是render函数，本质上都是Vue中的createElement(tag,props,children)，其中children,也必须是createElement或者[createElement,createElement]
$mount 主要是调用render函数，没有render则会解析模板创建render去调用，最后将Vnode渲染到文档中成为真实dom,同时监听页面，数据改变后去重新渲染页面
```



#### Vue3新特性

##### ref

 ref用于将简单数据类型转换为一个响应式数据ref对象，能够再template 和 reactive中直接调用，在其他地方使用需要=》 响应式属性名.value

注意：值类型不具有响应式，所以需要ref() 来处理值类型，将其转换为ref对象。之所以用.value,是因为利用js对象的引用特性，保持数据变更前后能够关联在一起，而不是像值类型那样独立

##### reactive

reactive用于创建引用类型的响应式数据对象=》obj.响应式属性名

##### toRef、toRefs 延续响应式

因为reactive 创建了一个reactive响应式对象,所以state.属性名 是响应式的，但如果{...state}就是将state解构成了一组单独的值类型数据，此时就不具备响应式了，所以需要利用toRef、toRefs将reactive响应式对象的某个属性或全部属性转换为ref对象，这样即使通过...state}解构后，形成的这一组单独的数据任然是ref响应式对象，而不是值类型

##### 全局变量

```
app.config.globalProperties.num = "10"
```



```ts


import { getCurrentInstance } from 'vue'

const MyComponent = {
  setup() {
    const internalInstance = getCurrentInstance()

     internalInstance.appContext.config.num // 访问 globalProperties
      //或者
    const {proxy}=  getCurrentInstance()  //proxy.num
  }
}
```

##### 生命周期

- onBeforeMount

- onMounted

- onBeforeUpdate

- onUpdated

- onBeforeUnmount

- onUnmounted

- onActivated

- onDeactivated

- onErrorCaptured-> 当捕获一个来自子孙组件的异常时激活钩子函数;钩子函数要求我们返回一个布尔值，代表错误是否向上传递

- ```js
  /*
  在异步请求中必须要作的一件事情，就是要捕获错误，因为我们没办法后端给我们返回的结果，也有可能服务不通，所以一定要进行捕获异常和进行处理。
  
  在vue3.x的版本中，可以使用onErrorCaptured这个钩子函数来捕获异常。在使用这个钩子函数前，需要先进行引入
  import { onErrorCaptured} from "vue";
  
  有了onErrorCaptured就可以直接在setup()函数中直接使用了。钩子函数要求我们返回一个布尔值，代表错误是否向上传递，我们这里返回了true。
  
  */
  
  import { onErrorCaptured} from "vue";
  
  const app = {
    name: "App",
    components: { AsyncShow, GirlShow },
    setup() {
      onErrorCaptured((error) => {
        console.log(`error====>`,error)
        return true  
      })
      return {};
    },
  };
  
  ```

  

##### composition api

- 提升代码复用 灵活度

##### defineAsyncComponent

```vue
<template>
  <!-- 异步组件的使用 -->
  <AsyncPage />
</tempate>

<script>
import { defineAsyncComponent } from "vue";

export default {
  components: {
    // 无配置项异步组件
    AsyncPage: defineAsyncComponent(() => import("./NextPage.vue")),

    // 有配置项异步组件
    AsyncPageWithOptions: defineAsyncComponent({
   loader: () => import(".NextPage.vue"),
   delay: 200,
   timeout: 3000,
   errorComponent: () => import("./ErrorComponent.vue"),
   loadingComponent: () => import("./LoadingComponent.vue"),
 })
  },
}
</script>

```

##### **模板**

模板方面没有大的变更，只改了作用域插槽，2.x 的机制导致作用域插槽变了，父组件会重新渲染，而 3.0 把作用域插槽改成了函数的方式，这样只会影响子组件的重新渲染，提升了渲染的性能。

##### 支持 Fragment（多个根节点）

##### Suspense  

`Suspense` 只是一个带插槽的组件，只是它的插槽指定了`default` 和 `fallback` 两种状态。

```vue
 <Suspense>
        <template #default>
            <async-component></async-component>
        </template>
        <template #fallback>
            <div>
                Loading...
            </div>
        </template>
  </Suspense>
```

#### vue3为何比vue2快

##### Proxy响应式性能更好

Object.defineProperty在劫持各个属性的时候是一次性递归监听，而Proxy只会在对get到的属性或一级属性进行响应式劫持，性能更好

Object.defineProperty无法处理对象的属性和数组的增加或删除 ，而Proxy可以在set中处理属性的增加，同时多了一个deleteProperty,用于监听删除

##### PatchFlag

- 编译的时候为动态节点做标记，如指令、属性、类、插值
- 标记分为不同类型，如class\props\TEXT等
- diff算法可以区分出动态节点和其对应的类型，只对动态节点的前后进行比较

![image-20211228145559717](https://gitee.com/zhaogancheng/typora-map-depot/raw/master/image-20211228145559717.png)

##### hoistStatic

将静态节点的定义提升到父作用域，缓存起来，之后的渲染直接拿缓存，避免的不必要的多次定义

多个相邻的静态节点会合并在一起

##### cacheHandler

缓存事件，之后的渲染直接拿缓存，避免的不必要的多次定义

##### SSR优化

静态节点不在走VDOM对象去渲染,而是直接输出DOM字符串，会被直接innerHtml

##### Tree-shaking优化

更加模板里面使用的内容自动引入对应的功能模块，尽可能的减小体积

#### vite为何快速启动

vite在开发环境下，使用了ES6 Module 无需打包 直接引入,webpack需要将其打包编译成Es5耗时更长

Vue3 生命周期

基本上就是在 Vue2 生命周期钩子函数名基础上加了 on；
beforeDestory 和 destoryed 更名为 onBeforeUnmount 和 onUnmounted；
然后用 setup 代替了两个钩子函数 beforeCreate 和 created；
新增了两个开发环境用于调试的钩子，在组件更新时 onRenderTracked 会跟踪组件里所有变量和方法的变化、每次触发渲染时 onRenderTriggered 会返回发生变化的新旧值，可以让我们进行有针对性调试；

---