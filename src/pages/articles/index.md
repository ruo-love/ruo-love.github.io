## 数组

#### arrayToTree

```js
function arrayToTree(
  array: TArray,
  parentId: number | string,
  idProp: string = "id",
  parentIdProp: string = "parentId",
  childrenProp: string = "children"
): TArray {
  return array
    .filter((item) => item[parentIdProp] === parentId)
    .map((item) => ({
      ...item,
      [childrenProp]: arrayToTree(array, item[idProp]),
    }));
}
```

http://175.178.39.125:10004/

#### new

```js
b = b - a;
a = a + b;
b = a - b;
```

```js
let a = 2;
let b = 3;
[a, b] = [b, a];
```

#### new

```js
function countDown(time) {
  const endTime = new Date(time);
  const nowTime = Date.now();
  const interval = endTime - nowTime;
  const day = Math.floor(interval / (1000 * 60 * 60 * 24))
    .toString()
    .padStart(2, "0");
  const t = Math.floor((interval / (1000 * 60 * 60)) % 24)
    .toString()
    .padStart(2, "0");
  const m = Math.floor((interval / (1000 * 60)) % 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor((interval / 1000) % 60)
    .toString()
    .padStart(2, "0");

  return `${day}天${t}时${m}分${s}秒`;
}

setInterval(function () {
  console.log(countDown("2022-10-1 00:00:00"));
}, 1000);
```

#### new

```js
function myNew(fn, ...args) {
  // 基于原型链 创建一个新对象
  let newObj = Object.create(fn.prototype);

  // 添加属性到新对象上 并获取obj函数的结果
  let res = fn.call(newObj, ...args);

  // 如果执行结果有返回值并且是一个对象, 返回执行的结果, 否则, 返回新创建的对象
  return typeof res === "object" ? res : newObj;
}
```

#### js 的

```
console.log("start");

setTimeout(() => {
    console.log("setTimeout1");
}, 0);

(async function foo() {
    console.log("async 1");

    await asyncFunction();

    console.log("async2");//await 会阻塞后续代码，可理解为后续为微任务，执行完当前宏任务中的同步代码后再执行，

})().then(console.log("foo.then"));//console.log()是函数调用，返回值也不是函数 所以直接打印

async function asyncFunction() {
    console.log("asyncFunction");

    setTimeout(() => {
        console.log("setTimeout2");
    }, 0);

    new Promise((res) => {
        console.log("promise1");

        res("promise2");
    }).then(console.log);//此处console.log 为函数‘promise2’ 会传入其中，微任务执行时候会调用打印函数
}

console.log("end");

start
a.html:20 async 1
a.html:29 asyncFunction
a.html:36 promise1
a.html:26 foo.then
a.html:42 end
promise2
a.html:24 async2
a.html:16 setTimeout1
a.html:32 setTimeout2
```

#### Call、apply、bind

https://blog.csdn.net/m0_46171043/article/details/123067986

##### call

```js
Function.prototype.myCall = function (ctx, ...args) {
  ctx = ctx || window;
  let fn = Symbol();
  ctx[fn] = this; //myCall函数调用者
  let result = ctx[fn](...args);
  delete ctx[fn];
  return result;
};
```

apply

```js
Function.prototype.myApply = function (ctx, args = []) {
  ctx = ctx || window;
  let fn = Symbol();
  ctx[fn] = this;
  let result;
  result = ctx[fn](...args);
  delete ctx[fn];
  return result;
};
```

bind

```
Function.prototype.myBind = function (ctx, ...args) {
    ctx = ctx || window;
    let self = this;
    let fn = function () { };
    let _fn = function () {
        return self.apply(this instanceof _fn ? this : ctx, args);
    }
    fn.prototype = this.prototype;
    _fn.prototype = new fn();
    return _fn;
}

//**简易版
 Function.prototype.MyBind = function (ctx, ...arg) {
            const self = this
            let fn = function () {
                return self.MyCall(ctx, ...arg)
            }
            return fn

        }
```

##### 排序

1. 冒泡排序

   ```js
   function bubbleSort(arr) {
     for (let i = 0; i < arr.length; i++) {
       for (let j = i + 1; j < arr.length; j++) {
         if (arr[i] > arr[j]) {
           //降序 arr[i] < arr[j]
           let maxValue = arr[i]; //let minValue = arr[i]
           arr[i] = arr[j];
           arr[j] = maxValue; // arr[j] = minValue
         }
       }
     }
     return arr;
   }
   ```

2. 快速排序

   ```js
   function quickSort(arr) {
     if (arr.length <= 1) {
       return arr;
     }

     let leftArr = [];
     let rightArr = [];
     let q = arr[0];
     for (let i = 1; i < arr.length; i++) {
       if (arr[i] > q) {
         rightArr.push(arr[i]);
       } else {
         leftArr.push(arr[i]);
       }
     }

     return [].concat(quickSort(leftArr), [q], quickSort(rightArr));

     //降序[].concat(quickSort(rightArr), [q], quickSort(leftArr))
   }
   ```

##### 找出下列正数组的最大差值比如

```js
输入 [10,5,11,7,8,9]

输出 6
这是通过一道题目去测试对于基本的数组的最大值的查找，很明显我们知道，最大差值肯定是一个数组中最大值与最小值的差。
```

##### 清空数组

```js
//方式一 通过将长度设置为0
var arr = [1, 2, 3, 4, 5];
arr.length = 0;

//方式二 通过splice方法
var arr = [1, 2, 3, 4, 5];
arr.splice(0, arr.length);

//方式三 通过将空数组 [] 赋值给数组(严格意义来说这只是将ary重新赋值为空数组，之前的数组如果没有引用在指向它将等待垃圾回收。)
var arr = [1, 2, 3, 4, 5];
arr = [];
```

##### 传入任意个数组，返回一个合并去重后的数组

```js
function getAllSet() {
  let arg = [...arguments];
  let result = [];
  arg.forEach((element) => {
    result = [...new Set(result.concat(element))];
  });
  return result;
}

console.log(
  getAllSet(
    [12, 2, 4, 4, 5, 6, "s"],
    ["d", "f", "gs", "f", "f", "d", "a"],
    [2, 0, 02, 4, 2, 1, 1, "0", 8, 8]
  )
);
```

##### 数组扁平化

```js
const arr1 = [1, 2, [3, 4]];
const arr2 = [1, 2, [3, 4, [5, 6, [7, 8]]]];

console.log([].concat(...arr1)); //[1, 2, 3, 4]   一层扁平化

console.log(arr2.flat(Infinity)); //[1, 2, 3, 4, 5, 6, 7, 8]  无限层扁平化

function arrFlat(arr) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(arrFlat(arr[i]));
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}

console.log(arrFlat(arr2)); //[1, 2, 3, 4, 5, 6, 7, 8]  //递归无限层扁平化
```

##### 数组分割

```js
 function chunk(item, size) {
        if (item.length <= 0 || size <= 0) {
          return item
        }
        let chunks = []
        for (let i = 0; i < item.length; i = i + size) {
          chunks.push(item.slice(i, i + size))
        }
        return chunks

0 0 3
1 3 6
2 6 9
3 9 12
 console.log(chunk([1, 2, 3, 4, 5, 6, 7], 3)) //  [[1, 2, 3],[4, 5, 6],[7]]
```

##### 交集

```js
var intersection = function (nums1, nums2) {
  let minLengthArr = nums1.length > nums2.length ? nums2 : nums1;
  let maxLengthArr = nums1.length > nums2.length ? nums1 : nums2;
  let result = [];
  for (let i = 0; i < minLengthArr.length; i++) {
    if (
      maxLengthArr.includes(minLengthArr[i]) &&
      !result.includes(minLengthArr[i])
    ) {
      result.push(minLengthArr[i]);
    }
  }
  return result;
};
```

##### 独一无二出现次数

```js
/*给你一个整数数组 arr，请你帮忙统计数组中每个数的出现次数。

如果每个数的出现次数都是独一无二的，就返回 true；否则返回 false。
*/
var uniqueOccurrences = function (arr) {
  let map = new Map();
  let valueArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (!map.get(arr[i])) {
      map.set(arr[i], 1);
    } else {
      let old = map.get(arr[i]);
      map.set(arr[i], old + 1);
    }
  }

  for (v of map) {
    if (valueArr.includes(arr[1]) && arr[1] != 1) {
      return false;
    } else {
      valueArr.push(v[1]);
    }
  }

  return true;
};
```

##### 插入排序

```js
 */
var sortArray = function(nums) {
   let result = [nums[0]]
        for (let i = 1; i < nums.length; i++) {
          for (let j = 0; j < result.length; j++) {
            if (nums[i] <= result[j]) {  //降序  nums[i] >= result[j]
              result.splice(j, 0, nums[i])
              break //!!
            } else if (j == result.length - 1) {
              result.push(nums[i])

            }
          }
        }
        return result
};
```

#### 随机

##### 指定范围的整数

```js
function getRadomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Math.random()0-1 不包含1
```

##### 随机获取数组中的元素

```js
function getRadomFromArr(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
```

#### 字符串

##### 回文判断

```js
function checkPalindrom(str) {
  return str == str.split("").reverse().join("");
}
```

##### 最长回文数

```js
/*给定一个包含大写字母和小写字母的字符串 s ，返回 通过这些字母构造成的 最长的回文串 。
 输入:s = "abccccdd"
输出:7
解释:
我们可以构造的最长的回文串是"dccaccd", 它的长度是 7。
*/

var longestPalindrome = function (s) {
  var set = new Set();
  var count = 0;
  for (var i = 0; i < s.length; i++) {
    if (set.has(s[i])) {
      count += 2;
      set.delete(s[i]);
    } else {
      set.add(s[i]);
    }
  }
  return set.size > 0 ? count + 1 : count;
};
```

##### 回文数

```js
/*示例 1：

输入：x = 121
输出：true
示例 2：

输入：x = -121
输出：false
解释：从左向右读, 为 -121 。 从右向左读, 为 121- 。因此它不是一个回文数。

*/
var isPalindrome = function (x) {
  x = x.toString();
  if (x[0] == "-") return false;
  return x == x.split("").reverse().join("");
};
```

##### 统计一个字符串出现最多的字母

```js
function findMaxDuplicateChar(str) {
  if (str.length == 1) {
    return str;
  }
  let charObj = {};
  for (let i = 0; i < str.length; i++) {
    if (!charObj[str[i]]) {
      charObj[str[i]] = 1;
    } else {
      charObj[str[i]] += 1;
    }
  }
  let maxChar = "",
    maxValue = 1;
  for (var k in charObj) {
    if (charObj[k] >= maxValue) {
      maxChar = k;
      maxValue = charObj[k];
    }
  }
  return maxChar;
}
```

##### 大数字相加

```js
let a = "9007199254740991";
let b = "1234567899999999999";
function add(a, b) {
  //取两个数字的最大长度
  let maxLength = Math.max(a.length, b.length);
  //用0去补齐长度
  a = a.padStart(maxLength, 0); //"0009007199254740991"
  b = b.padStart(maxLength, 0); //"1234567899999999999"
  //定义加法过程中需要用到的变量
  let t = 0;
  let f = 0; //"进位"
  let sum = "";
  for (let i = maxLength - 1; i >= 0; i--) {
    //注意此处 是倒序循环遍历
    t = parseInt(a[i]) + parseInt(b[i]) + f;
    f = Math.floor(t / 10);
    sum = (t % 10) + sum;
  }
  if (f == 1) {
    sum = "1" + sum;
  }
  return sum;
}
console.log(add(a, b));
```

##### 获取字符串中第一个重复字符

```js
    function findStr(str) {
        let result
        for (let i = 0; i < str.length; i++) {
          // 判断字符是否在第一次出现之后的位置 再度出现过
          if (str.indexOf(str[i], i + 1) > -1) {
            result = str[i]
            break   //!!!!
          }
        }
        return result
      }
   }
```

##### 判断是否存在重复字符

```js
var containsDuplicate = function (nums) {
  for (let i = 0; i < nums.length; i++) {
    if (nums.indexOf(nums[i], i + 1) > -1) {
      return true;
    }
  }
  return false;
};
```

##### 随机生成指定长度的字符串

```js
function randomString(n) {
  let str = 'abcdefghijklmnopqrstuvwxyz9876543210';
  let tmp = '',
  for (let i = 0; i < n; i++) {
    tmp += str.charAt(Math.floor(Math.random() * str.length));
  }
  return tmp;
}

```

##### 有效括号

```js
function isValid(str: string) {
  let stack = [];
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "[" || str[i] === "(" || str[i] === "{") {
      stack.push(str[i]);
    } else {
      let start = stack[stack.length - 1];
      if (
        (start === "[" && str[i] === "]") ||
        (start === "{" && str[i] === "}") ||
        (start === "(" && str[i] === ")")
      ) {
        stack.pop();
      } else {
        return false;
      }
    }
  }
  return stack.length === 0;
}

console.log(isValid("()}"));
```

##### 删除相同相邻字符

```js
function deleteSameChar(str: string) {
  let stack: Array<string> = [];
  for (let i = 0; i < str.length; i++) {
    if (stack[stack.length - 1] != str[i]) {
      stack.push(str[i]);
    } else {
      stack.pop();
    }
  }
  return stack.join("");
}
```

##### 最简路径

```js
var simplifyPath = function (path: string) {
  let stack: Array<string> = [];
  let str = "";
  let arr = path.split("/");
  console.log(arr);
  arr.forEach((val: string) => {
    if (val && val == "..") {
      stack.pop();
    } else if (val && val != ".") {
      stack.push(val);
    }
  });
  str = arr.length ? "/" + stack.join("/") : "/";
  return str;
};
```

##### 求中位数（传入两个正整数数组）

```js
function midleValue(nums1, nums2) {
  let concatArr = [...nums1, ...nums2].sort((a, b) => a - b); //合并数组，升序
  let mid = Math.floor(concatArr.length / 2); //找出中间值
  if (concatArr.length % 2 === 0) {
    return (concatArr[mid - 1] + concatArr[mid]) / 2;
  } else {
    return concatArr[mid];
  }
}
```

##### trim 正则

```js
function MyTrim(String) {
  return String.replace(/(^\s*)|(\s*$)/g, "");
}
```

#### 链表

##### 循环链表

```js
var hasCycle = function (head) {
  let f = head,
    s = head;
  while (f != null && f.next != null) {
    s = s.next;
    f = f.next.next;
    if (s == f) return true;
  }
  return false;
};
```

##### 合并两个有序链表

```js
var mergeTwoLists = function (l1, l2) {
  //递归的结束条件，如果l1和l2中有一个为空就返回
  if (l1 == null || l2 == null) {
    return l1 == null ? l2 : l1;
  }
  //如果l1的值<=l2的值，就继续递归，比较l1.next的值和l2的值
  if (l1.val <= l2.val) {
    //l1.next和l2比较完后，会产生一个更小的节点x，将x加到当前l1的后面
    l1.next = mergeTwoLists(l1.next, l2);
    return l1;
  } else {
    //如果l1的值>l2的值，就继续递归，比较l1的值和l2.next的值
    l2.next = mergeTwoLists(l1, l2.next);
    return l2;
  }
};
```

##### 翻转链表

```js
var reverseList = function (head) {
  let prev = null;
  let curr = head;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
};
```

#### 二叉树

##### 翻转二叉树

```js
var invertTree = function (root) {
  if (!root) return null;
  return {
    val: root.val,
    left: inverTree(root.right),
    right: inverTree(root.left),
  };
};
```

##### 二叉树前、中、后序遍历

```js
var traversalTree = function (root) {
  let result = [];
  fun(root, result);

  function fun(root, res) {
    if (!root) return;
    result.push(root.val); //前序遍历
    fun(root.left, res);
    fun(root.right, res);
  }
  return result;
};

var traversalTree = function (root) {
  let result = [];
  fun(root, result);

  function fun(root, res) {
    if (!root) return;
    fun(root.left, res);
    result.push(root.val); //中序遍历
    fun(root.right, res);
  }
  return result;
};

var traversalTree = function (root) {
  let result = [];
  fun(root, result);

  function fun(root, res) {
    if (!root) return;

    fun(root.left, res);
    fun(root.right, res);
    result.push(root.val); //后序遍历
  }
  return result;
};
```

##### 二叉树层序遍历

```js
var traversalTree = function (root) {
  let stack = [];
  let res = [];
  if (root) stack.push(root);
  while (stack.lenght) {
    let levelSize = stack.length;
    let level = [];
    for (let i = 0; i < leveSize; i++) {
      const n = stack.shif();
      level.push(n.val);
      n.left && stack.push(n.left);
      n.right && stack.push(n.right);
    }
    res.push(level);
  }
  return res;
};
```

##### 最大深度二叉树

```JS
var maxDepth = function (root) {
   let deep=0
   let stack=[]
   if(root) stack.push(root)
   while(stack.length){
       deep++
       let size=stack.length
       for(let i=0;i<size;i++){
         let n=stack.shift()
         n.left&&stack.push(n.left)
         n.right&&stack.push(n.right)
    }
  }
  return deep
};
```

##### 最小深度二叉树

```js
var minDepth = function (root) {
  let deep = 0;
  let stack = [];
  if (root) stack.push(root);
  while (stack.length) {
    deep++;
    let size = stack.length;
    for (let i = 0; i < size; i++) {
      let n = stack.shift();
      if (n.left == null && n.right == null) {
        return deep;
      }
      n.left && stack.push(n.left);
      n.right && stack.push(n.right);
    }
  }
  return deep;
};
```

##### 相同二叉树

```js
var isSameTree = function (p, q) {
  if (p == null && q == null) return true;
  if (p == null || q == null) return false;
  if (p.val != q.val) return false;
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
};
```

##### 对称二叉树

```js
var isSymmetric = function (root) {
  if (!root) return true;
  const isMirror = (l, r) => {
    if (!l && !r) return true;
    if (
      l &&
      r &&
      l.val === r.val &&
      isMirror(l.left, r.right) &&
      isMirror(l.right, r.left)
    ) {
      return true;
    }
    return false;
  };
  return isMirror(root.left, root.right);
};
```

##### 合并二叉树

```js
var mergeTrees = function (root1, root2) {
  // 如果root1为空，不管root2是否为空，直接返回root2
  if (root1 == null) return root2;
  // 同理对于root2也一样
  if (root2 == null) return root1;
  // 走到这里，肯定root1和root2都不为空了，这里直接相加赋值root1就行
  root1.val = root1.val + root2.val;
  // 递归的对左子树和右子树进行同样操作
  root1.left = mergeTrees(root1.left, root2.left);
  root1.right = mergeTrees(root1.right, root2.right);
  return root1;
};
```

#### 其他

##### 瀑布流

```js
//@params cols 列数
//@params selector 图片盒子选择器
function waterFall(cols, selector) {
  console.log("waterFall start");
  let heightArr = [];
  const boxs = document.querySelectorAll(selector);
  // const cols = parseInt(document.documentElement.clientWidth / boxs[0].clientWidth)
  const width = parseInt(document.documentElement.clientWidth / cols);
  boxs.forEach((el, index) => {
    el.style.width = width + "px";
    if (index < cols) {
      heightArr[index] = el.clientHeight;
      el.style.position = "absolute"; //第一行定位
      el.style.left = index * width + "px";
      el.style.top = 0;
    } else {
      const minHeight = Math.min(...heightArr); //获取最低列高度
      const minIndex = heightArr.indexOf(minHeight); //获取最低列高度索引
      el.style.position = "absolute"; //定位
      el.style.left = minIndex * width + "px"; //最低列高度索引*width
      el.style.top = minHeight + "px"; //最低列高度
      heightArr[minIndex] += el.clientHeight; //更新当前最低列高度值
    }
  });
}
```

##### 阶乘、求和

```js
function sum(n) {
  if (n === 1) return 1;
  return sum(n - 1) + n; //注意此次
}

function factorail(n) {
  if (n === 1) return 1;
  return sum(n - 1) * n; //注意此次
}
```

##### 爬楼梯

一个楼梯有 n 步，每次只能走 1 不或者 2 步，有多少走法

```js
function ways(n) {
  if (n === 1) return 1;
  if (n === 2) return 2;
  return ways(n - 1) + ways(n - 2); //注意此次
}

var climbStairs = function (n) {
  if (n <= 1) return n;

  const dp = new Array(n);
  dp[1] = 1;
  dp[2] = 2;
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
};
```

##### 千分位

```js
function format(num) {
  return (num + "").replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, "$1,");
}
```

##### 斐波那契数列

```js
function fib(n) {
  //1 1 2 3 5 8 13
  let n1 = (n2 = sum = 1);
  if (n === 1 || n === 2) return sum;
  for (let i = 3; i <= n; i++) {
    sum = n1 + n2;
    n1 = n2;
    n2 = sum;
  }
  return sum;
}
```

##### 拷贝对象

```js
function deepCopy(obj, map = new Map()) {
  if (typeof obj !== "object" || !obj) return obj;
  else if ([Date, RegExp].includes(obj.constructor))
    return new obj.constructor(obj);
  else {
    if (map.get(obj)) return map.get(obj);
    let newObj = Array.isArray(obj) ? [] : {};
    map.set(obj, newObj);
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] == "object") {
          newObj[key] = deepCopy(obj[key], map);
        } else {
          newObj[key] = obj[key];
        }
      }
    }
    return newObj;
  }
}
```

##### instanceof

```js
function myInstanceof(target, obj) {
  while (target) {
    if (target == obj.prototype) {
      return true;
    } else {
      target = target.__proto__;
    }
  }
  return false;
}
```

##### Promise 封装 ajax

```js
<script>
    //  接口地址：http://poetry.apiopen.top/sentences （随机获取一句诗词）

    // 新建一个Promise对象
    const Pro = new Promise((resolve, reject) => {
        // 1.创建对象
        const xhr = new XMLHttpRequest();

        // 2.初始化,设置请求方式和接口地址
        xhr.open("GET", "http://poetry.apiopen.top/sentences");

        // 3.发送请求
        xhr.send();

        // 4.绑定事件，处理响应结果
        xhr.onreadystatechange = function () {
            // 判断
            if (xhr.readyState === 4) {
                // 判断响应状态码 200~299
                if (xhr.status >= 200 && xhr.status < 300) {
                    // 获取成功
                    resolve(xhr.response);
                    // console.log(xhr.response);
                } else {
                    // 获取失败
                    reject(xhr.status);
                    // console.log(xhr.status);
                }
            }
        }
    });

    // 处理状态
    Pro.then((value) => {
        console.log("成功：", value);
    }, (reason) => {
        console.log("失败：", reason);
    })
</script>



```

##### Fetch

```js
//fetch 兼容性不足
//未优化
fetch("/api/letter/list/1/5")
  .then(
    (res) => {
      console.log("联系服务器成功了", res);
      return res.json();
    },
    (err) => {
      console.log("联系服务器失败了", err);
      return new Promise(() => {});
    }
  )
  .then(
    (res) => {
      console.log(res);
    },
    (err) => {
      console.log("获取数据失败");
    }
  );

//优化1.0
fetch("/api/letter/list/1/5")
  .then((res) => {
    console.log("联系服务器成功了", res);
    return res.json();
  })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
//优化2.0
const response = await fetch("/api/letter/list/1/5");
const res = await response.json();
console.log(res);

//优化3.0   await 只能获取正确的响应结果

try {
  const response = await fetch("/api/letter/list/1/5");
  const res = await response.json();
  console.log(res);
} catch (err) {
  console.log(err);
}
```

```js

async function myFetch(url，options){
  const response=await fetch(url，options)
  return response.json()
}

```

##### 发布订阅模式

```js
class EventMap {
  constructor() {
    this.eventMap = {};
  }
  emit(eventName, params) {
    if (this.eventMap[eventName]) {
      this.eventMap[eventName].forEach((handler, i) => handler(params));
    }
  }
  on(eventName, handler) {
    if (!(handler instanceof Function))
      throw new Error("handler must be a function");
    if (!this.eventMap[eventName]) this.eventMap[eventName] = [];
    this.eventMap[eventName].push(handler);
  }
  off(eventName, handler) {
    if (this.eventMap[eventName]) {
      this.eventMap[eventName].splice(
        this.eventMap[eventName].indexOf(handler),
        1
      );
    }
  }
}
```
