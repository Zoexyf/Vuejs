### **关于localStorage**

localStorage是HTML5中新加的一个特性，这个特性主要是用来作为本地存储来使用的，localStorage中一般浏览器支持的是5M大小，这个在不同的浏览器中localStorage会有所不同。

#### **localStorage的优势**

+ localStorage拓展了cookie的4K限制，解决了cookie存储空间不足的问题

+ localStorage会可以将第一次请求的数据直接存储到本地，这个相当于一个5M大小的针对于前端页面的数据库，相比于cookie可以节约带宽，但是这个却是只有在高版本的浏览器中才支持的

#### **localStorage的局限**

+ **IE8以上支持**——浏览器的大小不统一，并且在**IE8**以上的IE版本才支持localStorage这个属性

+ **所获得的值为string类型，需要用JSON转为对象**——目前所有的浏览器中都会把localStorage的值类型限定为string类型，这个在对我们日常比较常见的JSON对象类型需要一些转换

+ **隐私模式下不可读取**——localStorage在浏览器的隐私模式下面是不可读取的

+ **消耗内存空间**——localStorage本质上是对字符串的读取，如果存储内容多的话会消耗内存空间，会导致页面变卡

+ **不能被爬虫抓取到**



#### localStorage与sessionStorage的区别

​	localStorage属于**永久性存储**，而sessionStorage属于当会话结束的时候，sessionStorage中的键值对会被清空（**会话结束被清空**）



**localStorage的使用**

![1](.\1.PNG)

可以在图中看到，`window.loaclStroage`的Storage对象下的原型链中有clear ,getItem, setItem和removeItem 这几个方法，使用的时候写入使用`setItem(key:string,value:string）`方法，但注意写入的value一般为键值对，需要字符串化，通过`JSON：stringify( ) `实现。

写入语句为：

```js
window.localStorage.setItem('a',JSON.stringify({foo:'huxin'}))
```

get的时候注意，直接的到的为字符串，如图中所示`"{"foo":"huxin"}"`,所以这时候仍旧需要我们的JSON来帮忙

`JSON.parse()`

如下图的1代码所示

![2](.\2.jpg)

想要更改键值对的话，如代码2所示，基本就是上述方法的重复操作。