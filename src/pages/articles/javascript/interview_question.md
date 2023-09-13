# JS

#### js为什么是单线程

js设计之初是为了加快客户端和服务器的访问，多线程的话，多个地方改变dom元素，会导致页面混乱，更难设计

#### JavaScript几种数据类型

- number：数字类型
- string：字符串类型
- boolean：布尔值类型
- undefined：未定义类型 NaN
- null：空值类型 0
- object：对象类型
- symbol：symbol类型；可以作为属性名，防止命名冲突
- bigint：大数字类型  |`BigInt`是ES10新加的一种JavaScript数据类型，用来表示表示大于 `2^53 - 1` 的整数，`2^53 - 1`是ES10之前，JavaScript所能表示最大的数字

#### var、const、let

- var 可以重复声明同一个变量，let、const不能
- var有变量提升，有初始化提升，值可变
- let有变量提升，没有初始化提升，值可变
- const有变量提升，没有初始化提升，值不可变，但如果是定义对象，则属性可变
- let、const拥有块级作用域

#### 获取对象中Symbol属性

```js
// 方法一
console.log(Object.getOwnPropertySymbols(obj)) // [ Symbol(gender) ]
// 方法二
console.log(Reflect.ownKeys(obj)) // [ 'name', 'age', Symbol(gender) ]
```

#### for in和 for of

- for in ：遍历方法，可遍历对象和数组  【key是健值】
- for of ：遍历方法，只能遍历数组，不能遍历非iterable对象  【key是value】

#### JS整数的表示

![image-20220315103540374](https://gitee.com/zhaogancheng/typora-map-depot/raw/master/image-20220315103540374.png)

#### call、apply、bind

- call 可以改变函数this指向，第一个参数为this指向的目标，后续参数为传递给函数的实参
- apply  与call基本类似，区别在于传递参数是成一个数组集合 fun.apply(obj,[arg1,arg2])
- bind  与call基本类似，区别在于是否立即执行，它返回一个被bind  处理完成的函数，我们只需接受，在需要的时候调用

#### 事件流

- 捕获阶段，目标阶段，和冒泡阶段。

- IE提出的事件流是事件冒泡，即从下至上，从目标触发的元素逐级向上传播，直到window对象。[事件委托应用]

- 而Netscape的事件流就是事件捕获，即从document逐级向下传播到目标元素。由于IE低版本浏览器不支持，所以很少使用事件捕获。

  事件冒泡常应用于【事件委托】，避免不必要的多次定义事件监听

#### 普通函数和箭头函数的区别：

- 1、箭头函数不可作为构造函数，不能使用new
- 2、箭头函数没有自己的this
- 3、箭头函数没有arguments对象
- 4、箭头函数没有原型对象

#### new 的过程

(1) 创建一个新对象；
(2) 设置新对象的 constructor 属性为构造函数的名称，设置新对象的__proto__属性指向构造函数的 prototype 对象；
(3) 使用新对象调用函数，函数中的 this 被指向新实例对象：
(4) 返回新对象。 如果无返回值或者返回一个非对象值，则将新对象返回；如果返回值是一个新对象的话那么直接直接返回该对象。

```js
// 1. 创建空对象；
var obj = {};
// 2. 设置新对象的 constructor 属性为构造函数的名称，设置新对象的__proto__属性指向构造函数的 prototype 对象；
obj.__proto__ = ClassA.prototype;
// 3. 使用新对象调用函数，函数中的 this 被指向新实例对象：
ClassA.call(obj); //{}.构造函数();
// 4. 如果无返回值或者返回一个非对象值，则将新对象返回；如果返回值是一个新对象的话那么直接直接返回该对象。

or

function myNew(fn, ...args) {
  // 基于原型链 创建一个新对象
  let newObj = Object.create(fn.prototype)

  // 添加属性到新对象上 并获取obj函数的结果
  let res = fn.call(newObj, ...args)

  // 如果执行结果有返回值并且是一个对象, 返回执行的结果, 否则, 返回新创建的对象
  return res && typeof res === 'object' ? res : newObj;
}

```



#### JavaScript最大安全数字与最小安全数字？

```js
console.log(Number.MAX_SAFE_INTEGER)  2^53-1
// 9007199254740991

console.log(Number.MIN_SAFE_INTEGER) -2^53-1
// -9007199254740991

Number类型的最大值为2的53次方，即9007199254740992，如果超过这个值，比如900719925474099222，那么得到的值会不精确，也就是900719925474099200

```



#### 深拷贝与浅拷贝的区别

- 深拷贝层层拷贝，浅拷贝只拷贝第一层，深层只是引用

- 在深拷贝中，新对象中的更改不会影响原始对象，而在浅拷贝中，新对象中的更改，原始对象中也会跟着改。

- 在深拷贝中，原始对象不与新对象共享相同的属性，而在浅拷贝中，它们具有相同的属性。

  

#### 闭包是什么？

闭包是一个能读取其他函数内部变量的函数

- 优点：使外部能访问到局部的东西
-  1.可以将一个变量长期储存在内存中，用于缓存

  ​     2.可以避免全局变量的污染

  ​     3.加强封装性，是实现了对变量的隐藏和封装
- 缺点：使用不当容易造成内存泄漏的问题

#### 原型链

##### prototype和__proto__

这两个东西到底是啥呢？

- prototype: 显式原型
- __ proto__: 隐式原型

一般，`构造函数`的prototype和其`实例`的__proto__是指向同一个地方的，这个地方就叫做`原型对象`；那什么是构造函数呢？俗话说就是，可以用来`new`的函数就叫构造函数，箭头函数不能用来当做构造函数哦

##### 对象

咱们平常开发中，创建一个对象，通常会用以下几种方法。

- `构造函数创建对象`，他创建出来的对象都是此`Function构造函数`的实例，所以这里不讨论它

- `字面量创建对象`

- `new Object创建对象`

- `Object.create创建对象`，创建出来的是一个空原型的对象，这里不讨论它

- 工厂模式创建

  ```js
  function createObj(name) {
    const obj = new Object()
    obj.name = name
    return obj
  }
  const obj = createObj('Sunshine_Lin')
  ```

我们之前说过，`构造函数`的`prototype`和其`实例`的`__proto__`是指向同一个地方的，这里的`person2，person3`其实也都是`Object构造函数`的实例，那我们来验证一下吧

```js
const person2 = {name: '林三心', age: 10}//本质上也是通过 new Object()  创建的

const person3 = new Object()
person3.name = '林三心'
person3.age = 10

console.log(Object.prototype === person2.__proto__) // true
console.log(Object.prototype === person3.__proto__) // true
```

##### Function和Object

上面咱们常说

- `函数`是`Function构造函数`的实例
- `对象`是`Object构造函数`的实例

那`Function构造函数`和`Object构造函数`他们两个又是谁的实例呢？

- `function Object()`其实也是个函数，所以他是`Function构造函数`的实例
- `function Function()`其实也是个函数，所以他也是`Function构造函数`的实例，没错，他是他自己本身的实例

咱们可以试验一下就知道了

```js
console.log(Function.prototype === Object.__proto__) // true
console.log(Function.prototype === Function.__proto__) // true
```

##### constructor

constructor和prototype是成对的，你指向我，我指向你。prototype是构造函数的原型对象，而constructor作为prototype的一个属性，又指向该prototype对象的所对应的构造函数

##### Person.prototype 和 Function.prototype

讨论原型链之前，咱们先来聊聊这两个东西

- Person.prototype，它是`构造函数Person`的原型对象
- Function.prototype，他是`构造函数Function`的原型对象

都说了原型对象，原型对象，可以知道其实这两个本质都是`对象`

那既然是`对象`，本质肯定都是通过`new Object()`来创建的。既然是通过`new Object()`创建的，那就说明`Person.prototype 和 Function.prototype`都是`构造函数Object`的实例。也就说明了`Person.prototype 和 Function.prototype`他们两的`__proto__`都指向`Object.prototype`

咱们可以验证一下

```js
function Person(){}

console.log(Person.prototype.__proto__ === Object.prototype) // true
console.log(Function.prototype.__proto__ === Object.prototype) // true
```

##### 原型链终点

Object.prototype`其实也有__proto__，指向null，那才是原型链的终点

##### 原型继承

说到原型，就不得不说补充一下`原型继承`这个知识点了，`原型继承`就是，`实例`可以使用`构造函数上的prototype`中的方法

##### instanceof

使用方法

```js
A instanceof B
复制代码
```

作用：**判断B的prototype是否在A的原型链上**

例子

```js
function Person(name) { // 构造函数
  this.name = name
}

const person = new Person('林三心') // 实例

console.log(Person instanceof Function) // true
console.log(Person instanceof Object) // true
console.log(person instanceof Person) // true
console.log(person instanceof Object) // true
```

##### 习题：https://juejin.cn/post/7008526225207640078

#### 变量提升

- js预编译阶段，会将var的变量声明、以及函数声明提升到所属作用域顶部；然后依次向下执行																				

- 函数声明优先级高于变量声明；(变量提升时  函数声明会优先覆盖同名的变量提升)

- ```
    console.log(fun) // fun () {}  函数声明优先级高于变量声明，故此处不是undefined
   // 函数声明
   function fun() { }
   // 函数表达式
   var fun = function (name) { }
    
   console.log(fun) // fun (name) {}
  ```

#### 解决遍历对象时，把原型上的属性遍历出来了咋办？

使用`hasOwnProperty`判断是否属于自己的独立属性(非原型属性)

#### JavaScript变量在内存中具体存储形式？

- 基本数据类型：存在`栈内存`里
- 引用数据类型：指针存`栈内存`，指向`堆内存`中一块地址，内容存在堆内存中

#### 讲一讲JavaScript的装箱和拆箱？

##### 装箱：把基本数据类型转化为对应的引用数据类型的操作

看以下代码，s1只是一个基本数据类型，他是怎么能调用`indexOf`的呢？

```js
const s1 = 'Sunshine_Lin'
const index = s1.indexOf('_')
console.log(index) // 8
复制代码
```

原来是JavaScript内部进行了装箱操作

- 1、创建String类型的一个实例；
- 2、在实例上调用指定的方法；
- 3、销毁这个实例；

```js
var temp = new String('Sunshine_Lin')
const index = temp.indexOf('_')
temp = null
console.log(index) // 8
复制代码
```

##### 拆箱：将引用数据类型转化为对应的基本数据类型的操作

通过`valueOf`或者`toString`方法实现拆箱操作

```js
var objNum = new Number(123);  
var objStr =new String("123");   
console.log( typeof objNum ); //object
console.log( typeof objStr ); //object 
console.log( typeof objNum.valueOf() ); //number
console.log( typeof objStr.valueOf() ); //string

console.log( typeof objNum.toString() ); // string 
console.log( typeof objStr.toString() ); // string
```

#### null和undefined的异同点有哪些？

相同点

- 都是空变量
- 都是假值，转布尔值都是false
- null == undefined 为 true

不同点

- typeof判断null为object，判断undefined为undefined
- null转数字为0，undefined转数字为NaN
- null是一个对象未初始化，undefined是声明了，但未初始化 赋值
- null === undefined 为 false

#### 如何判断数据类型？

- typeof xxx：能判断出number，string，undefined，boolean，object，function（null是object），所有引用类型都是object

- Object.prototype.toString.call(xxx)：能判断出大部分类型

- Array.isArray(xxx)：判断是否为数组

- instanceof    判断具体的引用类型

  ```
  console.log(person instanceof Object) // true 判断Object的prototype是否在person的原型链上
  ```

#### 为什么typeof null 是object？

不同的数据类型在底层都是通过二进制表示的，二进制前三位为`000`则会被判断为`object`类型，而null底层的二进制全都是0，那前三位肯定也是`000`，所以被判断为`object`

#### 注意点

- undefined >= undefined    是 false 【按照`隐式转换规则`，可转换成`NaN >= NaN`，NaN 不等于 NaN，也不大于，所以是`false`】

- null >= null   是 true  【按照`隐式转换规则`，可转换成`0 >= 0`，0 等于 0，所以是`true`】

- [] == ![]  是 true 

- 0.1 + 0.2 === 0.3，对吗？【不对，JavaScript中小数是浮点数，需转二进制进行运算，有些小数无法用二进制表示，所以只能取近似值】

- 精度丢失解决方案

  ```
  对于整数，前端出现问题的几率可能比较低，毕竟很少有业务需要需要用到超大整数，只要运算结果不超过 Math.pow(2, 53) 就不会丢失精度。
  
  对于小数，前端出现问题的几率还是很多的，尤其在一些电商网站涉及到金额等数据。解决方式：把小数放到位整数(乘倍数)，再缩小回原来倍数(除倍数)
  
  例如0.1+0.2
  
  (0.1*10 + 0.2*10) / 10 == 0.3 // true
  
  关于数字超长的情况
  
  我是直接 num + ''
  
  转成字符串
  ```

  

- NaN是什么？有什么特点？

  - NaN不等于自身，也就是 `NaN === NaN` 为 `false`
  - NaN为假值，转布尔值为`false`
  - NaN本质是一个number，`typeof NaN === number`

- Set`的不重复性中，要注意`引用数据类型和NaN

- ```js
  
  // 两个对象都是不同的指针，所以没法去重
  const set1 = new Set([1, {name: '林三心'}, 2, {name: '林三心'}])
  console.log(set1) // Set(4) { 1, { name: '林三心' }, 2, { name: '林三心' } }
  
  
  // 如果是两个对象是同一指针，则能去重
  const obj = {name: '林三心'}
  const set2 = new Set([1, obj, 2, obj])
  console.log(set2) // Set(3) { 1, { name: '林三心' }, 2 }
  
  //咱们都知道 NaN !== NaN，NaN是自身不等于自身的，但是在Set中他还是会被去重
  const set = new Set([1, NaN, 1, NaN])
  console.log(set) // Set(2) { 1, NaN }
  ```

#### 类数组转数组、类数组借用数组方法

```js
function fn() {
        /* console.log(ar);
        // let arr = Array.from(ar); 方法1
        let arr = [...ar]; //  方法2
        console.log(arr); */
        // let arr = Array.prototype.slice.call(ar); //  方法3
        let arr = [].slice.call(ar); //  方法4 简写
        console.log(arr);
      }

      fn(30, 20, 10);
直接类数组借用数组方法
function fn() {
      [].forEach.call(ar, (item) => {
        console.log(item);
      });
    }
    fn(10, 20, 30);

```

#### 如果一个构造函数，bind了一个对象，用这个构造函数创建出的实例会继承这个对象的属性吗？为什么？

不会继承，因为根据 this 绑定四大规则，new 绑定的优先级高于 bind 显示绑定，通过 new 进行构造函数调用时，会创建一个新对象，这个新对象会代替 bind 的对象绑定，作为此函数的 this，并且在此函数没有返回对象的情况下，返回这个新建的对象

#### 如何阻止事件冒泡？如何阻止事件默认行为？

```js
function stopBubble(e) {
  if (e.stopPropagation) {
    e.stopPropagation()
  } else {
    window.event.cancelBubble = true;
  }
}


function stopDefault(e) {
  if (e.preventDefault) {
    e.preventDefault();
  } else {
    window.event.returnValue = false;
  }
}
```

#### 处理异步的方法有哪些？

- 回调函数
- promise
- 事件监听
- 发布订阅
- async await

#### JavaScript继承方式有几种？

- extends

- 原型链继承

  ```js
  var Parent = function(type){
      this.parentType = type;
  }
  var Child = function(type){
      this.childType = type
  }
  // 直接实例化之后赋值到Child.prototype
  Child.prototype = new Parent();
  
  ```

  

- 组合式继承
  

  ```js
  var Child = function(childType, parentType){
  	// 说了用apply也行，只不过入参是个数组
      Parent.call(this,parentType)
      this.childType = childType
  }
  Child.prototype = new Parent();
  Child.prototype.constructor = Child;
  ```

  

- 构造继承

  ```js
  function Cat(name) {
    Animal.call(this);
    this.name = name || 'Tom';
  }
  
  var cat = new Cat();
  ```

- 实例继承 ；核心：为父类实例添加新特性，作为子类实例返回

- ```js
  function Cat(name){
    var instance = new Animal();
    instance.name = name || 'Tom';
    return instance;
  }
  
  var cat = new Cat();
  ```

- 拷贝继承

  ```js
  function Cat(name){
    var animal = new Animal();
    for(var p in animal){
      Cat.prototype[p] = animal[p];
    }
    this.name = name || 'Tom';
  }
  
  ```

  

#### JavaScript的垃圾回收机制

- 引用法：就是判断一个对象的引用数，引用数`为0`就回收，引用数`大于0`就不回收。

- 标记法：标记法就是，将`可达`的对象标记起来，`不可达`的对象当成垃圾回收。言归正传，想要判断可不可达，就不得不说`可达性`了，`可达性`是什么？就是从初始的`根对象（window或者global）`的指针开始，向下搜索子节点，子节点被搜索到了，说明该子节点的引用对象可达，并为其进行标记，然后接着递归搜索，直到所有子节点被遍历结束。那么没有被遍历到节点，也就没有被标记，也就会被当成没有被任何地方引用，就可以证明这是一个需要被释放内存的对象，可以被垃圾回收器回收。

- ```js
  // 可达
  var name = '林三心'
  var obj = {
    arr: [1, 2, 3]
  }
  console.log(window.name) // 林三心
  console.log(window.obj) // { arr: [1, 2, 3] }
  console.log(window.obj.arr) // [1, 2, 3]
  console.log(window.obj.arr[1]) // 2
  
  function fn () {
    var age = 22
  }
  // 不可达
  console.log(window.age) // undefined。
  ```

#### js脚本加载问题，async、defer

- 正常模式：这种情况下 JS 会阻塞浏览器，浏览器必须等待 index.js 加载和执行完毕才能去做其它事情。

```
<script src="index.js"></script>

```
- async(异步) 模式，async 模式下，JS 不会阻塞浏览器做任何其它的事情。它的加载是异步的，当它加载结束，JS 脚本会立即执行。

```
<script async src="index.js"></script>

```
- defer(延缓) 模式；defer 模式下，JS 的加载是异步的，执行是被推迟的。等整个文档解析完成、DOMContentLoaded 事件即将被触发时，被标记了 defer 的 JS 文件才会开始依次执行。

```
<script defer src="index.js"></script>

```
从应用的角度来说，一般当我们的脚本与 DOM 元素和其它脚本之间的依赖关系不强时，我们会选用 async；当脚本依赖于 DOM 元素和其它脚本的执行结果时，我们会选用 defer。

```
1.js文件放在body里面，则是按照body的加载顺序（按先后顺序）进行加载
2.js文件放在<head>标签里面的文件，则是在body加载完之后，才加载头部的js文件
在body里面加载的 js文件 和 onload函数的加载顺序：onload函数会优先于 js文件的加载
```



#### 内存泄漏

影响：

- 什么是内存泄漏呢？就是有些理应被回收的垃圾，却没被回收，这就造成了垃圾越积越多。内存泄漏，听起来很遥远，但其实离我们很近很近，我们平时都直接或者间接地去接触过它。例如，有时候你的页面，用着用着就卡了起来，而且随着时间的延长，越来越卡，那这个时候，就要考虑是否是内存泄漏问题了，内存泄漏是影响用户体验的重大问题，所以平时通过正确的代码习惯去避免它，是非常有必要的。

避免：

1. 清除定时器
2. 尽量避免使用全局变量
3. 合理使用闭包



#### 数组去重

- 双重for循环
- 创建一个[],外层循环原数组，内层push元素到新数组；使用filters、findIndex、indexOf、includes等方法过滤
- let arr_set=new Set([数组])    =》Array.from(arrset)  or [...arr_set]
- const newArr = arr.filter((item, index) => arr.indexOf(item) === index)

#### 字符串去重

- [...new Set('ababbc')].join('');   // "abc"
- str.split('') 转数组；然后通过数组去重的方法过滤；最后.join(''); 转字符串

#### Objects 和 map的比较

- 一个对象的键只能是字符串、数字或者Symbols，但一个 `Map 的键可以是**任意值**。`
- 你可以通过size属性很容易地得到一个`Map的键值对个数，`而对象的键值对个数只能手动确认。
- map 可以用...展开，Objects 不可以展开
- map可以迭代，可以用for of 遍历，Objects 不可以

#### Set 与 Array 的比较

- set 不允许重复的元素出现
- set 通过size获取长度
- Set 结构的健值就是健名，所以第一个参数和第二个参数永远相同，Array 数组的健名是从 0 开始的有序整数。也称为索引。

Object.keys、Object.values、Object.entries

- Object.keys(obj)可以用来获取对象的键集合 [kye1,key2]
- Object.values(obj)可以用来获取对象的值集合[ value1,value2]
- Object.entries(obj)可以用来获取对象的键值对集合*[ [ 'name', '林三心' ], [ 'age', 22 ], [ 'gender', '男' ] ]*

#### EventLoop

```
JS`是单线程的，为了防止一个函数执行时间过长阻塞后面的代码，所以会先将同步代码压入执行栈中，依次执行，将异步代码推入异步队列，异步队列又分为宏任务队列和微任务队列，因为宏任务队列的执行时间较长，所以微任务队列要优先于宏任务队列。微任务队列的代表就是，`Promise.then`，`MutationObserver`，宏任务的话就是`setImmediate setTimeout setInterva
```

##### 1、微任务（MircoTask）

  在 HTML 标准中，并没有明确规定 Microtask，但是实际开发中包含以下四种：

- Promise中的then、catch、finally（原理参考：【js进阶】手撕Promise，一码一解析 包懂）

- MutationObserver（监视 DOM 变动的API，详情参考MDN）
- Object.observe(废弃：监听标准对象的变化)
- Process.nextTick（Node环境，通常也被认为是微任务）

##### 2、宏任务（MacroTask/Task）

  基本上，我们将javascript中非微任务（MircoTask）的所有任务都归为宏任务，比如：

- script中全部代码
- DOM操作
- 用户交互操作
- 所有的网路请求
- 定时器相关的 setTimeout、setInterval 等

···

#### 宏任务和微任务

宏任务和微任务都是异步任务，微任务优先级更高，微任务会立即执行先于宏任务。常见的微任务包含Promise.then、mutaionObeserve,宏任务包含script、setTimeout、setInterval..

```js
var p = new Promise(resolve=>{
    console.log(4)// 此处同步执行
    resolve(5)
})
function func1(){
    console.log(1)
}
function func2(){
    setTimeout(()=>{
        console.log(2)
    },0)
    func1()
    console.log(3)
    p.then(res=>{
        console.log(res)
    })
}

func2()
/*
4
1
3
5
2


*/ 
```



```js
async function async1() {
      console.log('async1 start');
      await async2();
      console.log('async1 end');//await 后面的会被作为微任务处理
    }
    async function async2() {
      console.log('async2');
    }
    console.log('script start');
    setTimeout(function () { console.log('setTimeout'); }, 0)
    async1();
    new Promise(function (resolve) {
      console.log('promise1');
      resolve();
      console.log('promise2')
    }).then(function () {
      console.log('promise3');
    });
    console.log('script end');
    
    /*
    script start
 async1 start
 async2
 promise1
 promise2
 script end
async1 end
 promise3
 setTimeou
    */
```

#### 深拷贝

1. JSON.parse(JSON.stringfy(obj))，它是不可以拷贝 undefined ， function， RegExp 等等类型的；
2. Object.assign(target, source),只能实现一层深拷贝
3. loadsh工具库有个 _.cloneDeep(value) https://lodash.com/docs/4.17.15
4. 递归拷贝

```dart
// 定义一个深拷贝函数  接收目标target参数
function deepClone(target) {
    // 定义一个变量
    let result;
    // 如果当前需要深拷贝的是一个对象的话
    if (typeof target === 'object') {
    // 如果是一个数组的话
        if (Array.isArray(target)) {
            result = []; // 将result赋值为一个数组，并且执行遍历
            for (let i in target) {
                // 递归克隆数组中的每一项
                result.push(deepClone(target[i]))
            }
         // 判断如果当前的值是null的话；直接赋值为null
        } else if(target===null) {
            result = null;
         // 判断如果当前的值是一个RegExp对象的话，直接赋值    
        } else if(target.constructor===RegExp){
            result = target;
        }else {
         // 否则是普通对象，直接for in循环，递归赋值对象的所有值
            result = {};
            for (let i in target) {
                result[i] = deepClone(target[i]);
            }
        }
     // 如果不是对象的话，就是基本数据类型，那么直接赋值
    } else {
        result =  target;
    }
     // 返回最终结果
    return result;
}
```

#### 深度拷贝-循环引用

```js
     function deepCopy(obj, map = new Map()) {
        if (typeof obj !== 'object' || !obj) return obj
        else if ([Date, RegExp].includes(obj.constructor)) return new obj.constructor(obj)
        else {
          if (map.get(obj)) return map.get(obj)
          let newObj = Array.isArray(obj) ? [] : {}
          map.set(obj, newObj)
          for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
              if (typeof obj[key] == 'object') {
                newObj[key] = deepCopy(obj[key], map)
              } else {
                newObj[key] = obj[key]
              }
            }
          }
          return newObj
        }
      }
```



#### js运行三步曲

创建window对象：window对象也叫全局执行环境，当页面产生时就被创建，所有的全局变量和函数都属于window的属性和方法，而DOM Tree也会映射在window的doucment对象上。当关闭网页或者关闭浏览器时，全局执行环境会被销毁。

1. 语法分析

   ```
   js引擎分析语法与词法是否合法，不合法会报错，合法则进入预编译
   ```

   

2. 预编译

   ```
   
   ```

   

3. 解释执行

   ```
   JS引擎解析过程：调用JS引擎执行JS代码（JS的解释阶段，预处理阶段，执行阶段生成执行上下文，VO，作用域链、回收机制等等）
   
   
   加载文件：完成js引擎分析它的语法与词法是否合法，如果合法进入预编译
   预编译：在预编译的过程中，浏览器会寻找全局变量声明，把它作为window的属性加入到window对象中，并给变量赋值为'undefined'；寻找全局函数声明，把它作为window的方法加入到window对象中，并将函数体赋值给他（匿名函数是不参与预编译的，因为它是变量）。而变量提升作为不合理的地方在ES6中已经解决了，函数提升还存在。
   解释执行：执行到变量就赋值，如果变量没有被定义，也就没有被预编译直接赋值，在ES5非严格模式下这个变量会成为window的一个属性，也就是成为全局变量。string、int这样的值就是直接把值放在变量的存储空间里，object对象就是把指针指向变量的存储空间。函数执行，就将函数的环境推入一个环境的栈中，执行完成后再弹出，控制权交还给之前的环境。JS作用域其实就是这样的执行流机制实现的。
   
   
   ```

   

#### 预编译

##### 在全局中预编译

1. 创建GO对象（Global Object）全局对象。
2. 找变量声明，将变量名作为GO属性名，值为undefined
3. 查找函数声明，作为GO属性，值赋予函数体

##### 函数中预编译

1. 在函数中创建AO对象
2. 寻找形参和变量的声明作为AO对象的属性名，值为undefined
3. 形参和实参相统一
4. 在函数体里面找函数声明，值赋予函数体。



#### 作用域



##### 全局作用域

- 全局作用域在页面打开的时候被创建，页面关闭时候被销毁
- 编写在script标签中的变量和函数作用域为全局，页面任意位置可访问
- 全局作用域中有个全局对象window,代表一个浏览器窗口,由浏览器创建，可直接调用
- 全局作用域中的变量和函数作为window的属性和方法保存

##### 函数作用域

- 函数调用的时候，函数作用域被创建,函数执行完毕的时候被销毁

- 每次调用函数都会创建一个新的函数作用域，它们相互独立

- 在函数作用域中可以访问到外层作用域的变量，遵循就近原则获取变量值；外层作用域无法访问内层的变量

  

##### 作用域链

```js
var global
function a(){
   function b(){
     var bb=234
     aa=0
   }
    var aa=123
    b()
}
a()
/////
var a = 10
function fun() {
   console.log(a)
}
function show(f) {
   var a = 20
   (function() {
      f()   //10，而不是20; 函数的外层作用域是在函数定义的时候就被决定了，与函数在哪里被调用无关！！！！！！
   })()
}
show(fun)
```



在函数执行的时候才会形成自己的AO对象，当函数执行完毕之后，作用域链会被剪断、销毁，当下次执行的时候又会被创建

#### this指向

```js
var name =222
var a ={
    name:111,
    say:function(){
        console.log(this.name)
    }
}
var fun = a.say
fun()//是 fun.call(window)的简写 //222
a.say()// a.say.call(a)//111
var b ={
    name:333,
    say:function(fn){
        fn()//fn.call(window)的简写 //222
    }
}
b.say(a.say)
b.say=a.say
b.say()//b.say.call(b)//33

```

```js
var x =11;
var obj={
    x:22,
    say:()=>{
        console.log(this.x);//
    }
}
obj.say()//11
//箭头函数本身没有this，它的this是继承自父执行上下文的this,比如这里的箭头函数this.x,箭头函数本身域say平级，类似于Key:value的形式，也就是箭头函数本身所处的环境是obj, 所以它的this指向obj外侧的window,故输出 11
```

#### 闭包

##### 原理

- 内部函数引用外部函数的局部变量，延长外部函数的变量生命周期

- 外部访问内部变量

- 函数嵌套

  

```js
function a(){
    var aa=123
    
    return fuction(){ //b 函数
        var bb=234
        console.log(aa)
    }
}
var res = a()
res() //123

//闭包的底层原理就是 作用域链：
//由于b在被定义的是时候，在其作用域链上就能访问到aa,所以当它被return 出去的时候，AO.aa形成引用并未被垃圾回收；很好依然能被访问
//即 b定义的时候（能看见a函数的AO），和a执行的时候的作用域链相同，a执行完毕后作用域链被销毁，但b定义时候的 作用域链并未被销毁
```



#### 闭包应用

##### 单例模式

单例模式简述就是 一次生成多次使用，不重复生成

```html
<body>
    <button id="loginbtn">点击登录</button>

    <script>
      var createLogin = function () {
        var div = document.createElement('div')
        div.innerHTML = '我是登录的弹窗'
        div.style.display = 'none'
        document.body.appendChild(div)
        return div
      }
      var getSingle = function (fn) {
        var result
        return function () {//该函数在定义的时候就能访问到 result 所以return 到外层，依然可以访问
          return result || (result = fn.apply(this, arguments))
        }
      }
      var create = getSingle(createLogin)
      document.getElementById('loginbtn').onclick = function () {
        var loginLay = create() //第一次调用的时候 result=undefined ，然后创建div赋值给它, 之后调用都延用第一次未被销毁的result,不再去重新创建
  //注意：函数执行完毕会销毁其作用域，但此处的result属于外层ao，不是函数本身的作用域，会被缓存
        loginLay.style.display = 'block'
      }
    </script>
  </body>
```



##### 防抖

所谓防抖(debounce)，就是指触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间

```js
  /**
   * @desc 函数防抖
   * @param func 函数
   * @param wait 延迟执行毫秒数
   * @param immediate true 表立即执行，false 表非立即执行
   */
    function debounce(fun, delay = 3000, immediate = false) {
            let timer;
            return function () {
                let ctx = this
                let arg = arguments
                if (timer) clearTimeout(timer);

                timer = setTimeout(() => {
                        fun.apply(ctx, arg);
                        
                    }, delay);

            }

        }
```

##### 节流

所谓节流(throttle)，就是指连续触发事件但是在 n 秒中只执行一次函数，节流会稀释函数的执行频率。

```js
/**
 * @desc 函数节流
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param type 1 表时间戳版，2 表定时器版
 */
        function throttle(fun, delay = 2000, immediate = false, type = 1) {
            let timer = null;
            let pre = 0;
            return function () {
                let ctx = this
                let arg = arguments
                if (type == 1) {
                    if (!timer) {
                        if (immediate) {
                            fun.apply(ctx, arg)
                            timer = setTimeout(() => {
                                timer = null
                            }, delay)
                        } else {
                            timer = setTimeout(() => {
                                fun.apply(ctx, arg)
                                timer = null
                            }, delay)
                        }
                    }
                } else {
                    let now = Date.now()
                    if (now - pre > delay) {
                        fun.apply(ctx, arg)
                        pre = now;

                    }
                }
            }
        }

```

#### 回调函数

回调函数即是函数指针的调用，即一个通过函数指针的调用，函数作为参数被传递到另外一个函数中，在适当的时候调用

```js
function foo(callback){
    callback&&callback()
}
foo(()=>{
    console.log("回调函数")
})
```

**问题**

回调函数有一个很大的问题 就是容易造车函数的多层嵌套，形成回调地狱，导致代码的可读性、可维护性非常差，函数之间的耦合性增强，一处变动多出随之发生改变，错误不好寻找或处理

**解决回调地狱**

promise、async/await

#### getter、setter

###### 第一种方式， 直接在对象内设置。 如代码所示。

```js
var obj1 = {
    name: 'shaanxi',
    get nameGet() {
        return this.name + 'a';
    },
    set nameSet(name) {
        this.name = name;
    }
};

console.info(obj1.nameGet); //shaanxia
obj1.nameSet = 'set by set keywords';
console.info(obj1.nameGet); //set by set keywordsa
```

###### 第二种方式，  如代码所示。

```js
var obj2 = {
    name: 'shaanxi'
};

obj2.__defineGetter__('nameGet', function() {
    return this.name;
});
obj2.__defineSetter__('nameSet', function(
    name) {
    this.name = name;
});
var ref1 = obj2.__lookupGetter__('nameGet');
var ref2 = obj2.__lookupSetter__('nameSet');
console.info(obj2.nameGet); //shaanxi
obj2.nameSet = 'set by __defineSetter__';
console.info(obj2.nameGet); //set by __defineSetter__
```

###### 第三种方式： 使用原型方法进行设置

```js
var obj3 = {
    name: "shaanxi"
};
Object.defineProperties(obj3, {
    nameGet: {
        value: function() {
            return this.name;
        }
    },
    nameSet: {
        value: function(name) {
            this.name = name;
        }
    }
});

console.info(obj3.nameGet()); //shaanxi
obj3.nameSet('set by Object.defineProperty');
console.info(obj3.nameGet()); //set by Object.defineProperty
```

#### Proxy对象

https://www.cnblogs.com/kdcg/p/9145385.html

#### Promise

##### 概述：

概述：【ES6】异步编程的新型解决方案；以前使用的是回调函数的形式；语法上来看它是一个构造函数，应用上来看我们可以通过promise对象封装我们的异步操作，并获取成功失败的结果。

- 支持链式调用、解决回调地狱问题；【回调地狱是指异步回调多层嵌套，不易阅读、不易异常处理】
- 有三种状态：pending、fullfilled、rejected
- pending====>fullfilled  or   pending====>rejected    只存在这两种状态的变化
- then 、catch 方法会默认返回一个成功的promise 对象；我们可以自定义返回一个promise对象以此实现链式调用
- throw 错误   也可以改变promise的状态
- promise 在链式调用过程中 可以在最后添加一个catch(),就能捕获所有异常；即”异常穿透“
- 也可以在then 中不写回调函数，继续链式调用 原理与异常穿透一样，都是给了一个默认回调
- 链式调用中  可以返回一个pending 状态的promise对象来终止后续链式执行   new Promise(()=>{}) //pending

##### 方法：

- Promise.resolve()   //返回一个正确的promise对象

  ```js
  const p1=Promise.resolve('123')  
  p2.then(res=>console.log(res))// 123
  ```

  

- Promise.reject()   //返回一个错误的promise对象

  ```js
  const p2=Promise.reject('err')  
  p2.catch(err=>console.log(err))//err
  ```

- Promise.all()  //接受一个promise对象数组；当所有的promise对象都成功会返回一个成功结果的数组，如果有其中一个失败，则返回失败对象

  ```js
  const p1=Promise.resolve('123')  
  const p2=Promise.reject('err')
  const p3=Promise.resolve('456')
  
  Promise.all([p1,p2,p3])
      .then(res=>{console.log(res)})   //全都成功   输出成功结果的集合
      .catch(err=>{console.log(err)})   // 一个失败；返回失败结果
  
  
  //一个出错 继续执行
    const p1 = Promise.resolve('123')
    const p2 = Promise.reject('err')
    const p3 = Promise.resolve('456')
    Promise.all([p1, p2, p3].map(p => p.catch(e => '出错了' + p)))//为每个promise对象添加catch 捕获
      .then(res => {
        console.log(res)// 
      })
      .catch(err => {
        console.log(err)
      })
  
  ```

- Promise.race()  和Promise 类似，但它只捕获最先改变状态的promise对象（无论成功失败）  有一种“比赛谁先跑的快的感觉”；接受promise对象数组；但只返回其中最快运行完毕的那个promise的结果（无论成功失败）

##### 封装

###### 构造函数

```js


function MyPromise(executor) {
    const _this = this;
    this.PromiseState = "pending";
    this.PromiseResult = null;
    this.callbacks = [];
       // 通过try catch  捕获异常  改变状态 结果
    try {
        executor(resolve, reject)
    } catch (err) {
        reject(err)
    }
    function resolve(data) {
        if (_this.PromiseState === "pending") { //通过判断确定 是否改变过状态；PromiseState 只能改变一次
            // 此次this 指向Window 所有需要  _this

            // 修改状态  （PromiseState)  fullfilled
            _this.PromiseState = "fullfilled";

            // 设置对象结果值 （PromiseResult) data
            _this.PromiseResult = data

            //为了保障回调异步执行所以此处加定时器
            setTimeout(() => {
                //如果有异步缓存正确回调 就遍历执行并传递结果
                _this.callbacks.forEach(item => {
                    item.onResolve(data)
                })
            });

        }


    }
    function reject(data) {
        if (_this.PromiseState === "pending") {

            // 修改状态  （PromiseState) rejected
            _this.PromiseState = "rejected";

            // 设置对象结果值 （PromiseResult) data
            _this.PromiseResult = data;

            //为了保障回调异步执行所以此处加定时器
            setTimeout(() => {
                //如果有异步缓存错误回调 就遍历执行并传递结果
                _this.callbacks.forEach(item => {
                    item.onRejected(data)
                })
            });
        }
    }

}

//添加then 方法
MyPromise.prototype.then =
    return new MyPromise((resolve, reject) => {   //因为then方法最终也是返回一个promise 实例 所有我们需要包裹执行
        const _this = this  //保持this
        function callback(type) {
            try {  //捕获错误 返回错误状态非promise
                let result = type(_this.PromiseResult)
                if (result instanceof MyPromise) {  //promise  转为成功其对应的状态
                    result.then(v => {
                        resolve(v)
                    }, r => {
                        reject(r)
                    })
                } else {
                    resolve(result)  //非promise  转为成功状态promise
                }
            } catch (error) {
                reject(error)
            }
        }
        if (this.PromiseState === 'fullfilled') {
            //为了保障回调异步执行所以此处加定时器
            setTimeout(() => {
                callback(onResolve)
            });

        } else if (this.PromiseState === 'rejected') {
            //为了保障回调异步执行所以此处加定时器
            setTimeout(() => {
                callback(onRejected)
            });


        } else if (this.PromiseState === 'pending') {  //此时异步任务 还未指向完毕 promise状态尚未改变
            this.callbacks.push({   //存储回调 等待状态改变后调用
                onResolve: () => {
                    callback(onResolve)
                },    // 因为可能会存在用户调用多次 then ；所有就会有多份回调；所有采用数组保持回调
                onRejected: () => {
                    callback(onRejected)
                }
            })
        }
    })
}

//添加catch 方法
MyPromise.prototype.catch = function (onRejected) {
    return this.then(undefined, onRejected)
}

//添加resolve 方法

MyPromise.resolve = function (value) {
    return new MyPromise((resolve, reject) => {
        try {  //捕获错误 返回错误状态非promise
            if (value instanceof MyPromise) {  //promise  转为成功其对应的状态
                value.then(v => {
                    resolve(v)
                }, r => {
                    reject(r)
                })
            } else {
                resolve(value)  //非promise  转为成功状态promise
            }
        } catch (error) {
            reject(value)
        }
    })
}

//添加reject 方法
MyPromise.reject = function (value) {
    return new MyPromise((resolve, reject) => {
        reject(value)
    })
}


//添加all 方法
MyPromise.all = function (promises) {
    return new MyPromise((resolve, reject) => {
        let count = 0
        let result = []
        for (let i = 0; i < promises.length; i++) {
            promises[i].then(v => {
                count++
                result[i] = v
                console.log(i)
                if (count === promises.length) {
                    resolve(result)
                }
            }, r => {
                reject(r)
            })
        }

    })
}

//添加race                方法
MyPromise.race = function (promises) {
    return new MyPromise((resolve, reject) => {
        for (let i = 0; i < promises.length; i++) {
            promises[i].then(v => {
                resolve(v)
            }, r => {
                reject(r)
            })
        }

    })
}


```

###### 类

```js
class MyPromise {
    constructor(executor) {
        const that = this;
        this.promiseStatus = 'pending';
        this.promiseResult = null;
        this.callbacks = [];//异步回调存储器
        try {
            executor(resolve, reject);
        } catch (err) {
            reject(err);
        }
        function resolve(data) {
            if (that.promiseStatus === 'pending') {
                that.promiseStatus = 'fullfilled';
                that.promiseResult = data;
                setTimeout(() => { //保障异步执行回调
                    that.callbacks.forEach(item => {

                        item.onResolve(data);
                    })
                }, 0);
            }
        }
        function reject(data) {
            if (that.promiseStatus === 'pending') {
                that.promiseStatus = 'rejected';
                that.promiseResult = data;
                setTimeout(() => { //保障异步执行回调
                   that.callbacks.forEach(item => {
                    item.onReject(data);
                })
                }, 0);
                
            }
        }
    }

    then(onResolve = (res) => res, onReject = (err) => { throw err }) { //设置默认回调 可以保障在不传递回调的情况下 then catch 任然可以返回一个promise
        const that = this;
        return new MyPromise((resolve, reject) => {
            if (this.promiseStatus === 'fullfilled') {//如果成功执行 then回调
                setTimeout(() => {  //保障回调异步执行
                    callbackHandle(onResolve)

                }, 0);;

            } else if (this.promiseStatus === 'rejected') {//如果失败 catch失败回调
                setTimeout(() => {
                    callbackHandle(onReject)
                }, 0);;

            } else {
                setTimeout(() => {
                    //可能存在链式调用多个异步回调 所以需要存储到集合中
                    this.callbacks.push({ onResolve: () => callbackHandle(onResolve), onReject: () => callbackHandle(onReject) })
                }, 0);
            }
            function callbackHandle(fun) {
                try {
                    const res = fun((that.promiseResult))
                    if (res instanceof MyPromise) {
                        res.then((r) => resolve(r), (e) => reject(e))
                    } else {
                        resolve(res)
                    }
                } catch (err) {
                    reject(err)
                }
            }
        })
    }
    catch(onReject) {
        return this.then(undefined, onReject);
    }
    static resolve(value) {
        return new MyPromise((resolve, reject) => {
            try {
                if (value instanceof MyPromise) {
                    value.then(r => resolve(r), e => reject(e))
                } else {
                    resolve(value)
                }
            } catch (err) {
                reject(err);
            }
        })
    }
    static reject(value) {
        return new MyPromise((resolve, reject) => {
            reject(value)
        })
    }
    static all(promises = []) {

        return new MyPromise((resolve, reject) => {
            let count = 0;//存储成功promise个数
            let result = []//存储成功结果
            for (let i = 0; i < promises.length; i++) {
                promises[i].then(r => {
                    count++
                    result[i] = r
                    if (count === promises.length) {
                        resolve(result)
                    }
                }, e => {
                    reject(e)
                })
            }
        })
    }
    static race(promises = [promises]) {
        return new MyPromise((resolve, reject) => {
            for (let i = 0; i < promises.length; i++) {
                promises[i].then(r => {
                    resolve(r)
                }, r => {
                    reject(e)
                })
            }

        })
    }
}

```



#### async\await

- async 函数返回一个promise 对象；返回结果类似于promise.then
- await 必须写在async函数中
- 如果await 右侧是 promise,则返回promise的成功值，失败值需要try catch 去捕获；如果await 右侧是非promise,则直接返回该值



### module 模式

```xml
<script type="module">import { a } from './a.js'</script>
复制代码
```

在主流的现代浏览器中，script 标签的属性可以加上 `type="module"`，浏览器会对其内部的 import 引用发起 HTTP 请求，获取模块内容。这时 script 的行为会像是 defer 一样，在后台下载，并且等待 DOM 解析

Vite 就是利用浏览器支持原生的 `es module` 模块，开发时跳过打包的过程，提升编译效率

### preload

link 标签的 preload 属性：用于提前加载一些需要的依赖，这些资源会优先加载

```
<link rel="preload" as="script" href="index.js"
```

preload 特点：

1）preload 加载的资源是在浏览器渲染机制之前进行处理的，并且不会阻塞 onload 事件；

2）preload 加载的 JS 脚本其加载和执行的过程是分离的，即 preload 会预加载相应的脚本代码，待到需要时自行调用；

```
实际上，预加载是一个广义的概念，prefetch只是具体实现方式之一，本节我们介绍下另外一种预加载方式preload。上文我们提到，preload与prefetch同属于浏览器的Resource-Hints，用于辅助浏览器进行资源优化。为了对两者进行区分，prefetch通常翻译为预提取，preload则翻译为预加载。

元素的rel属性的属性值preload能够让你在你的HTML页面中元素内部书写一些声明式的资源获取请求，可以指明哪些资源是在页面加载完成后即刻需要的。对于这种即刻需要的资源，你可能希望在页面加载的生命周期的早期阶段就开始获取，在浏览器的主渲染机制介入前就进行预加载。这一机制使得资源可以更早的得到加载并可用，且更不易阻塞页面的初步渲染，进而提升性能。

简单来说，就是通过<link rel=”preload” href=”xxx” as=”xx”>标签显式声明一个高优先级资源，强制浏览器提前请求资源，同时不阻塞文档正常onload。我们同样用一个实际案例进行详细介绍

```

### prefetch

```
<link rel="prefetch" as="script" href="index.js">
prefetch 是利用浏览器的空闲时间，加载页面将来可能用到的资源的一种机制；通常可以用于加载其他页面（非首页）所需要的资源，以便加快后续页面的打开速度

prefetch 特点：

1）pretch 加载的资源可以获取非当前页面所需要的资源，并且将其放入缓存至少5分钟（无论资源是否可以缓存）

2）当页面跳转时，未完成的 prefetch 请求不会被中断
```

https://cloud.tencent.com/developer/article/2164138

### axios、fetch 和 ajax 等的区别详解

https://www.cnblogs.com/bala/p/11650296.html

### 正则表达式api

https://blog.csdn.net/Jk200165/article/details/123158527