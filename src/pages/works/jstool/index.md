### install
```
npm i @zrcode/jstool

```
### GITHUB

https://github.com/ruo-love/zrtool

### 文档


#### encrypto [Aes]

加密数据

```js
function encrypto(data: any, CryptoSecret: string) :string
```

#### decrypto [Aes]

解密数据

```js
function decrypto(cipherText: string, CryptoSecret: string):string
```

#### copyToClipboard 

一件复制

```js
function copyToClipboard(text: string)
```

#### isWeChatBrowser

- **Description**: Checks if the current environment is a WeChat browser or a WeChat Mini Program.
- **Parameters**: None
- **Returns**: boolean (true if the environment is WeChat, false otherwise)

#### isAndroid

- **Description**: Checks if the current environment is an Android device.
- **Parameters**: None
- **Returns**: boolean (true if the environment is Android, false otherwise)

#### isIOS

- **Description**: Checks if the current environment is an iOS device (iPhone, iPad, iPod, Mac, or iOS).
- **Parameters**: None
- **Returns**: boolean (true if the environment is iOS, false otherwise)

#### isPc

- **Description**: Checks if the current environment is a PC (Windows or Mac).
- **Parameters**: None
- **Returns**: boolean (true if the environment is a PC, false otherwise)

#### isIPad

- **Description**: Checks if the current environment is an iPad device.
- **Parameters**: None
- **Returns**: boolean (true if the environment is an iPad, false otherwise)

#### isIPhone

- **Description**: Checks if the current environment is an iPhone device.
- **Parameters**: None
- **Returns**: boolean (true if the environment is an iPhone, false otherwise)

#### isMacintosh

- **Description**: Checks if the current environment is a Macintosh computer.
- **Parameters**: None
- **Returns**: boolean (true if the environment is a Macintosh, false otherwise)

#### isWindows

- **Description**: Checks if the current environment is a Windows computer.
- **Parameters**: None
- **Returns**: boolean (true if the environment is Windows, false otherwise)

#### currentLanguage

- **Description**: Retrieves the current browser's language and language list.
- **Parameters**: None
- **Returns**: [string, readonly string[]] (a tuple containing the current language and a list of supported languages)

#### urlParamsMap

- **Description**: Parses query parameters from a URL.
- **Parameters**: 
  - url (string): The URL to parse query parameters from (default is the current page's URL).
- **Returns**: Object (a key-value map of query parameters)

Please note that the descriptions and return types are based on the provided code and may need further clarification or validation based on your specific use case.


#### filterValue

过滤数字，可用于表单 filter

```js
const FilterType = {
  uint: "uint",
  int: "int",
  ufloat: "ufloat",
  float: "float",
  udecimal: "udecimal",
  notSpacing: "notSpacing",
  rate: "rate",
  minus: "minus"
}
function filterValue(value: string | number, filterType: string)
```

```js
import { filterValue } from "zrtool";
```

#### arrayFlat

类似于 Array.flat()方法，用于数组拍平。接收两个参数，第一个参数为数组，第二个参数为布尔值，决定是否浅层拍平，默认为 false 深度拍平

```ts
function arrayFlat(array: TArray, shallow?: boolean): TArray;
```

```js
import { arrayFlat } from "zrtool";
const array = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];

console.log(arrayFlat(array, true)); // [1, 2, 3, 4,[5,6,[7,8,[9,10]]]]
console.log(arrayFlat(array)); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

#### arrayToTree

将数组转化为数结构

```js
/*
*array 数据源
*parentId 父级id
*idProp id属性名
*parentIdProp 父级id属性名
*childrenProp  子集id属性名
*/

function arrayToTree(
  array: TArray,
  parentId: number | string,
  idProp: string = "id",
  parentIdProp: string = "parentId",
  childrenProp: string = "children"
): TArray
```

```
import { arrayToTree } from "zrtool"

const arr = [
  {
    id: 2,
    name: "部门B",
    parentId: 0
  },
  {
    id: 3,
    name: "部门C",
    parentId: 1
  },
  {
    id: 1,
    name: "部门A",
    parentId: 2
  },
  {
    id: 4,
    name: "部门D",
    parentId: 1
  },
  {
    id: 5,
    name: "部门E",
    parentId: 2
  },
  {
    id: 6,
    name: "部门F",
    parentId: 3
  },
  {
    id: 7,
    name: "部门G",
    parentId: 2
  },
  {
    id: 8,
    name: "部门H",
    parentId: 4
  }
]


console.log(arrayToTree(arr,0))

/*
 [{
    id: 2,
    name: "部门B",
    parentId: 0,
    children: [
      {
        id: 1,
        name: "部门A",
        parentId: 2,
        children: [
          { id: 3, name: "部门C", parentId: 1, children: [{ id: 6, name: "部门F", parentId: 3, children: [] }] },
          { id: 4, name: "部门D", parentId: 1, children: [{ id: 8, name: "部门H", parentId: 4, children: [] }] }
        ]
      },
      { id: 5, name: "部门E", parentId: 2, children: [] },
      { id: 7, name: "部门G", parentId: 2, children: [] }
    ]
  }
]
*/

```

#### countDown

倒计时

```js
function countDown(time: string | number | Date):string
```

```
import { countDown } from "zrtool"

setInterval(() => {
  console.log(countDown("2023-6-4"))
}, 1000)

/*
 97天07时34分17秒
 97天07时34分16秒
 97天07时34分15秒
 97天07时34分14秒
 97天07时34分13秒
 97天07时34分12秒
 ...
 ...
 */
```

#### concatArray

多个数组合并去重

```js
function concatArray(...arg: TArray): TArray
```

```js
import { concatArray } from "zrtool";

console.log(concatArray([1, 2, 3], [3, 4], [1, 2, 4])); //[1, 2, 3, 4]
```

#### countBigInt

大数字相加

```js
function countBigInt(firstNum: string, secondNum: string): string
```

```js
import { countBigInt } from "zrtool";
console.log(countBigInt("1000000000000000", "22")); //1000000000000022
```

#### createWaterfallLayout

创建瀑布流布局

```js
/*
*cols 一行排列的个数
*需要设置瀑布流的统一类名
*/
function createWaterfallLayout(cols: number = 10, selector: string): void
```

```html
<body>
  <div>
    <a class="img-warp" href="#"><img src="a.png" alt="" /></a>
    <a class="img-warp" href="#"><img src="a.png" alt="" /></a>
    <a class="img-warp" href="#"><img src="a.png" alt="" /></a>
    <a class="img-warp" href="#"><img src="a.png" alt="" /></a>
    <a class="img-warp" href="#"><img src="a.png" alt="" /></a>
    <a class="img-warp" href="#"><img src="a.png" alt="" /></a>
    <a class="img-warp" href="#"><img src="a.png" alt="" /></a>
    <a class="img-warp" href="#"><img src="a.png" alt="" /></a>
    <a class="img-warp" href="#"><img src="a.png" alt="" /></a>
    <a class="img-warp" href="#"><img src="a.png" alt="" /></a>
    <a class="img-warp" href="#"><img src="a.png" alt="" /></a>
    <a class="img-warp" href="#"><img src="a.png" alt="" /></a>
    <a class="img-warp" href="#"><img src="a.png" alt="" /></a>
    <a class="img-warp" href="#"><img src="a.png" alt="" /></a>
  </div>
  <script type="module">
    import { createWaterfallLayout } from "zrtool";
    createWaterfallLayout(5, ".img-warp");
  </script>
</body>
```

#### cutArray

自定义数组分组

```JS
function cutArray(array:TArray, size: number):TArray
```

```JS
import { cutArray } from "zrtool"

console.log(cutArray([1, 2, 3, 5, 6, 7, 8, 9, 0],3))//[ [1, 2, 3],[5, 6, 7],[8, 9, 0]]

```

#### deepClone

深度拷贝

```js
function deepClone(target: any):any
```

#### findDataByKey

根据 id 查询数组中的对应数据

```js
/*
*data  数据源
*value 需要获取的数据Key value
*key Key属性属性名
*children 子集属性名
*/

function findDataByKey(data: Array<any>, value: any, key: string = "id", children: string = "children"): any
```

```js
import { findDataByKey } from "zrtool";
const arr = [
  {
    id: 1,
    name: "1",
    children: [
      {
        id: 11,
        name: "11",
      },
      {
        id: 12,
        name: "12",
      },
    ],
  },
  {
    id: 2,
    name: "2",
    children: [
      {
        id: 21,
        name: "21",
      },
      {
        id: 22,
        name: "22",
        children: [
          {
            id: 221,
            name: "221",
          },
          {
            id: 222,
            name: "222",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "3",
  },
];
console.log(findDataByKey(arr, 221)); //{id: 221, name: '221'}
```

#### getSearchParams

```js
/**
*url 需要解析的字符串
*type url类型|params类型
*/
function getSearchParams(url: string, type: "url" | "params" = "url"): object
```

```js
import { getSearchParams } from "zrtool"
console.log( getSearchParams("?ie=utf- 8&f=8&rsv_bp=1&tn=68018901_49_oem_dg&wd=%E7%B1%BB%E5%9E%8B%E2%80%9CURLSearchParams%E2%80%9D%E4%B8%8A%E4%B8%8D%E5%AD%98%E5%9C%A8%E5%B1%9E%E6%80%A7%E2%80%9Centries%E2%80%9D",
        "params"
))
//输出：{
      ie: "utf-8",
      f: "8",
      rsv_bp: "1",
      tn: "68018901_49_oem_dg",
      wd: "类型“URLSearchParams”上不存在属性“entries”"
    }
/******************************************************************************************************/
console.log(getSearchParams(
        "https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&tn=68018901_49_oem_dg&wd=%E7%B1%BB%E5%9E%8B%E2%80%9CURLSearchParams%E2%80%9D%E4%B8%8A%E4%B8%8D%E5%AD%98%E5%9C%A8%E5%B1%9E%E6%80%A7%E2%80%9Centries%E2%80%9D"
      ))
//输出：{
      ie: "utf-8",
      f: "8",
      rsv_bp: "1",
      tn: "68018901_49_oem_dg",
      wd: "类型“URLSearchParams”上不存在属性“entries”"
    }
```

#### intersectionArray

获取数组中的交集

```js
function intersectionArray(firstArry: TArray, sencondArray: TArray):TArray
```

```js
import { intersectionArray } from "zrtool";
console.log(intersectionArray([1, 2, 3, 4], [4, 2])); // [4, 2]
```

#### isEmpty

```js
function isEmpty(target: any): boolean
```

```js
import { isEmpty } from "zrtool"
console.log(isEmpty(null))//true
console.log(isEmpty([]))//true
console.log(isEmpty(''))//true
console.log(isEmpty(undefined))//true
console.log(isEmpty(new Map()))//true
console.log(isEmpty(new Set()))//true
...
```

#### fastSort

快速升序、倒序排序

```js
function fastSort(array: Array<number>, reverse: boolean = false): Array<number>
```

```js
import { fastSort } from "zrtool";
console.log(fastSort([1, 2, 4, 3])); //[1,2,3,4]
console.log(fastSort([1, 2, 4, 3], true)); //[4,3,2,1]
```

#### toRandom

生成指定范围内的随机整数或者指定长度的随机字符串

```js
function toRandom(min:number = 0, max:number = 10, type: "number" | "string" = "number"):
```

```js
import { toRandom } from "zrtool"
console.log(toRandom(1，4))//1|2|3|4
console.log(toRandom(，4,'strng'))/'fs2w'
```

#### typeOf

判断数据类型

```js
type TypeOfResult =
  | "Map"
  | "Set"
  | "Object"
  | "Array"
  | "FormData"
  | "String"
  | "Symbol"
  | "Number"
  | "Boolean"
  | "Null"
  | "Undefined"
  | "Fuction"

typeOf(target: any): TypeOfResult
```

#### MyPromise

与原生 Promise api 保持一致

```js
class MyPromise
```

#### debounce

防抖函数

```js
 /**
   * callback 函数
   * time 持续时间 毫秒
   * immediate 是否立即执行
   */
function debounce<T extends Function>(callback: T, time: number, immediate: boolean = false): T
```

```
import { debounce } from "zrtool"
```

#### throttle

节流函数

```js
 /**
   * callback 函数
   * time 持续时间 毫秒
   * date 定时器类型 | 时间类型  非必填
   */
function throttle<T extends Function>(fun: T, delay: number = 1000, date: boolean = true): T
```

```
import { throttle } from "zrtool"
```

#### isExist

```js
function isExist<T>(x: T): x is T
```

```js
//判断入参是否存在，仅null || undefined为false(不存在)
import { isExist } from "zrtool";
isExist(null); // false
isExist(undefined); // false
isExist(0); // true
isExist(""); // true
isExist([]); // true
isExist([1, 2, 3]); // true
```

#### isNumber

判断是否为数字类型

```js
function isNumber(x: any): boolean
```

```js
import { isNumber } from "zrtool";
isNumber(0); // true
isNumber(Infinity); // true
isNumber(NaN); // true
isNumber("0"); // false
isNumber(null); // false
```

#### once

装饰入参函数，返回仅执行一次的函数

```typescript
import { once } from "zrtool";
const array: number[] = [];
function push(t: number) {
  array.push(t);
}
// 调用 oncePush 仅会触发一次
const oncePush = once(push);
oncePush(1);
oncePush(2);
oncePush(3);
array; // [1]
```

#### sleep

```javascript
import { sleep } from "zrtool";
async () => {
  // 其他代码
  await sleep(3000); // 等待3秒
  // 其他代码
};
```

#### splitIntegerDecimal

拆分整数与小数部分

```typescript
import { splitIntegerDecimal } from "zrtool";
splitIntegerDecimal("85.66"); // ["85", "66"]
splitIntegerDecimal("10,000.34"); // ["10,000", "34"]
splitIntegerDecimal("1e15.66"); // ["1e15", "66"]
```

#### isSafeNumber

判断是否为安全数字

```
import { isSafeNumber } from "zrtool"
```

#### toAsync

不使用 Try catch ，优雅捕获 promise 异步任务错误

参考于：https://github.com/scopsy/await-to-js/blob/master/src/await-to-js.ts

```js
 function toAsync<T, U = Error>(promise: Promise<T>, errorExt?: object): Promise<[U, undefined] | [null, T]>
```

```js
import { toAsync } from "zrtool";
const queryFn = (id) => service.findUserById(id);

// 常规捕获错误
(async () => {
  this.loading = true;
  try {
    queryFn(1);
  } catch (e) {
    console.error(e);
  } finally {
    this.loading = false;
  }
})();

// 使用 toAsync 处理错误
(async () => {
  this.loading = true;
  const [err, data] = await to(queryFn(1));
  this.loading = false;
  if (err) console.error(e);
})();
```

#### pipe

管道函数，可以把前一个操作函数的返回值，传给后一个操作函数作为参数

```
function pipe(...fns: Function[]):any
```

```
import { pipe } from "zrtool"
const repeatStr = (str: string, count: number) => str.repeat(count);
const upperCase = (str: string) => str.toUpperCase();

const repeatAndUpperCase = pipe(
  repeatStr,
  upperCase,
);
repeatAndUpperCase("a", 2); // "AA"
```

#### toArray

转换为数组

```
function toArray<T>(*x*: any): Array<T>
```

#### toggle

在给定状态或函数中切换

```
function toggle<Args>(fns: Array<any>)
```

```typescript
import { toggle } from "zrtool";
const toggleStatus = toggle(["one", "two", () => "three"]);
toggleStatus(); // "one"
toggleStatus(); // "two"
toggleStatus(); // "three"
toggleStatus(); // "one"
```
