##  什么是Vue组件

什么是组件： 组件的出现，就是为了拆分Vue实例的代码量的，能够让我们以不同的组件，来划分不同的功能模块，将来我们需要什么样的功能，就可以去调用对应的组件即可；
组件化和模块化的不同：

- 模块化： 是从代码逻辑的角度进行划分的；方便代码分层开发，保证每个功能模块的职能单一；
- 组件化： 是从UI界面的角度进行划分的；前端的组件化，方便UI组件的重用；

### 全局组件定义的三种方式

1. 使用 Vue.extend 配合 Vue.component 方法：

```js
var login = Vue.extend({
      template: '<h1>登录</h1>'
    });
    Vue.component('login', login);
```

1. 直接使用 Vue.component 方法：

```js
Vue.component('register', {
      template: '<h1>注册</h1>'
    });
```

1. 将模板字符串，定义到`template`标签种：

```html
<template id="tmpl" type="x-template">
      <div><a href="#">登录</a> | <a href="#">注册</a></div>
</template>
```

同时，需要使用 Vue.component 来定义组件：

```js
Vue.component('account', {
      template: '#tmpl'
    });
```

> 注意： 组件中的DOM结构，有且只能有唯一的根元素（Root Element）来进行包裹！

### 组件中展示数据和响应事件

1. 在组件中，`data`需要被定义为一个方法，例如：

```
Vue.component('account', {
      template: '#tmpl',
      data() {
        return {
          msg: '大家好！'
        }
      },
      methods:{
        login(){
          alert('点击了登录按钮');
        }
      }
    });
```

1. 在子组件中，如果将模板字符串，定义到了script标签中，那么，要访问子组件身上的`data`属性中的值，需要使用`this`来访问；

### 【重点】为什么组件中的data属性必须定义为一个方法并返回一个对象

通过计数器案例演示

```html
<div id="app">
    <counter></counter>
    <hr>
    <counter></counter>
    <hr>
    <counter></counter>
  </div>


  <template id="tmpl">
    <div>
      <input type="button" value="+1" @click="increment">
      <h3>{{count}}</h3>
    </div>
  </template>

  <script>
    var dataObj = { count: 0 }

    // 这是一个计数器的组件, 身上有个按钮,每当点击按钮,让 data 中的 count 值 +1
    Vue.component('counter', {
      template: '#tmpl',
      data: function () {
        // return dataObj
        return { count: 0 }
      },
      methods: {
        increment() {
          this.count++
        }
      }
    })

    // 创建 Vue 实例，得到 ViewModel
    var vm = new Vue({
      el: '#app',
      data: {},
      methods: {}
    });
  </script>
```



### 使用`components`属性定义局部子组件(实例内部私有组件)

1. 组件实例定义方式：

```html
<script>
    // 创建 Vue 实例，得到 ViewModel
    var vm = new Vue({
      el: '#app',
      data: {},
      methods: {},
      components: { // 定义子组件
        account: { // account 组件
          template: '<div><h1>这是Account组件{{name}}</h1><login></login></div>', // 在这里使用定义的子组件
          components: { // 定义子组件的子组件
            login: { // login 组件
              template: "<h3>这是登录组件</h3>"
            }
          }
        }
      }
    });
  </script>
```

1. 引用组件：

```html
<div id="app">
    <account></account>
  </div>
```

## 使用`flag`标识符结合`v-if`和`v-else`切换组件

1. 页面结构：

```html
<div id="app">
    <input type="button" value="toggle" @click="flag=!flag">
    <my-com1 v-if="flag"></my-com1>
    <my-com2 v-else="flag"></my-com2>
  </div>
```

1. Vue实例定义：

```html
<script>
    Vue.component('myCom1', {
      template: '<h3>奔波霸</h3>'
    })

    Vue.component('myCom2', {
      template: '<h3>霸波奔</h3>'
    })

    // 创建 Vue 实例，得到 ViewModel
    var vm = new Vue({
      el: '#app',
      data: {
        flag: true
      },
      methods: {}
    });
  </script>
```

## 使用`:is`属性来切换不同的子组件,并添加切换动画

1. 组件实例定义方式：

```js
  // 登录组件
    const login = Vue.extend({
      template: `<div>
        <h3>登录组件</h3>
      </div>`
    });
    Vue.component('login', login);

    // 注册组件
    const register = Vue.extend({
      template: `<div>
        <h3>注册组件</h3>
      </div>`
    });
    Vue.component('register', register);

    // 创建 Vue 实例，得到 ViewModel
    var vm = new Vue({
      el: '#app',
      data: { comName: 'login' },
      methods: {}
    });
```

1. 使用`component`标签，来引用组件，并通过`:is`属性来指定要加载的组件：

```html
  <div id="app">
    <a href="#" @click.prevent="comName='login'">登录</a>
    <a href="#" @click.prevent="comName='register'">注册</a>
    <hr>
    <transition mode="out-in">
      <component :is="comName"></component>
    </transition>
  </div>
```

1. 添加切换样式：

```html
  <style>
    .v-enter,
    .v-leave-to {
      opacity: 0;
      transform: translateX(30px);
    }

    .v-enter-active,
    .v-leave-active {
      position: absolute;
      transition: all 0.3s ease;
    }

    h3{
      margin: 0;
    }
  </style>
```

## 父组件向子组件传值

1. 组件实例定义方式，注意：一定要使用`props`属性来定义 父组件传递过来的数据

```html
<script>
    // 创建 Vue 实例，得到 ViewModel
    var vm = new Vue({
      el: '#app',
      data: {
        msg: '这是父组件中的消息'
      },
      components: {
        son: {
          template: '<h1>这是子组件 --- {{finfo}}</h1>',
          props: ['finfo']
        }
      }
    });
  </script>
```

1. 使用`v-bind`或简化指令，将数据传递到子组件中
   - 父组件，可以在引用子组件的时候， 通过 属性绑定（v-bind:） 的形式,  把 需要传递给 子组件的数据，以属性绑定的形式，传递到子组件内部，供子组件使用

```html
<div id="app">
    <son :finfo="msg"></son>
  </div>
```

- 子组件中，默认无法访问到 父组件中的 data 上的数据 和 methods 中的方法
- 注意： 子组件中的 data 数据，并不是通过 父组件传递过来的，而是子组件自身私有的，
  - 比如： 子组件通过 Ajax ，请求回来的数据，都可以放到 data 身上；
  - data 上的数据，都是可读可写的；
- 注意： 组件中的 所有 props 中的数据，都是通过 父组件传递给子组件的
  - props 中的数据，都是只读的，无法重新赋值
- 结论： 父组件 < son :finfo="msg"></ son>，子组件方法   props: ['finfo']

## 子组件向父组件传值

1. 原理：父组件将方法的引用，传递到子组件内部，子组件在内部调用父组件传递过来的方法，同时把要发送给父组件的数据，在调用方法的时候当作参数传递进去；
2. 父组件将方法的引用传递给子组件，其中，`getMsg`是父组件中`methods`中定义的方法名称，`func`是子组件调用传递过来方法时候的方法名称

```
<son @func="getMsg"></son>
```

1. 子组件内部通过`this.$emit('方法名', 要传递的数据)`方式，来调用父组件中的方法，同时把数据传递给父组件使用

```html
<div id="app">
    <!-- 引用父组件 -->
    <son @func="getMsg"></son>

    <!-- 组件模板定义 -->
    <script type="x-template" id="son">
      <div>
        <input type="button" value="向父组件传值" @click="sendMsg" />
      </div>
    </script>
  </div>

  <script>
    // 子组件的定义方式
    Vue.component('son', {
      template: '#son', // 组件模板Id
      methods: {
        sendMsg() { // 按钮的点击事件
          this.$emit('func', 'OK'); // 调用父组件传递过来的方法，同时把数据传递出去
        }
      }
    });

    // 创建 Vue 实例，得到 ViewModel
    var vm = new Vue({
      el: '#app',
      data: {},
      methods: {
        getMsg(val){ // 子组件中，通过 this.$emit() 实际调用的方法，在此进行定义
          alert(val);
        }
      }
    });
  </script>
```

- 总结：子组件方法 this.$emit('func', this.sonmsg) ,子组件中 <com2 @func="show"> </com2>，父方法中show(data)

## 评论列表练习

目标：主要练习父子组件之间传值

```js
// <cmt-box @func="loadComments"></cmt-box>

var commentBox = {
      data() {
        return {
          user: '',
          content: ''
        }
      },
      template: '#tmpl',
      methods: {
        postComment() { 
          // 发表评论的方法
     // 分析：发表评论的业务逻辑
     // 1. 评论数据存到哪里去？？？   存放到了 localStorage 中  localStorage.setItem('cmts', '')
     // 2. 先组织出一个最新的评论数据对象
     // 3. 想办法，把 第二步中，得到的评论对象，保存到 localStorage 中：
     //  3.1 localStorage 只支持存放字符串数据， 要先调用 JSON.stringify 
     //  3.2 在保存 最新的 评论数据之前，要先从 localStorage 获取到之前的评论数据（string），
     //      转换为 一个  数组对象， 然后，把最新的评论， push 到这个数组
     //  3.3 如果获取到的 localStorage 中的 评论字符串，为空不存在，则可以返回一个 '[]'  让 JSON.parse 去转换
     //  3.4  把 最新的 评论列表数组，再次调用 JSON.stringify 转为数组字符串，然后调用 localStorage.setItem()

          var comment = { id: Date.now(), user: this.user, content: this.content }

          // 从 localStorage 中获取所有的评论
          var list = JSON.parse(localStorage.getItem('cmts') || '[]')
          list.unshift(comment)
          // 重新保存最新的 评论数据
          localStorage.setItem('cmts', JSON.stringify(list))

          this.user = this.content = ''

          // this.loadComments() // ?????
          this.$emit('func')
        }
      }
    }

    // 创建 Vue 实例，得到 ViewModel
    var vm = new Vue({
      el: '#app',
      data: {
        list: [
          { id: Date.now(), user: '李白', content: '天生我材必有用' },
          { id: Date.now(), user: '江小白', content: '劝君更尽一杯酒' },
          { id: Date.now(), user: '小马', content: '我姓马， 风吹草低见牛羊的马' }
        ]
      },
      beforeCreate(){ 
       // 注意：这里不能调用 loadComments 方法，因为在执行这个钩子函数的时候，data 和 methods 都还没有被初始化好

      },
      created(){
        this.loadComments()
      },
      methods: {
        loadComments() { // 从本地的 localStorage 中，加载评论列表
          var list = JSON.parse(localStorage.getItem('cmts') || '[]')
          this.list = list
        }
      },
      components: {
        'cmt-box': commentBox
      }
    });
```



## 使用 `this.$refs` 来获取元素和组件

```html
  <div id="app">
    <div>
      <input type="button" value="获取元素内容" @click="getElement" />
      <!-- 使用 ref 获取元素 -->
      <h1 ref="myh1">这是一个大大的H1</h1>

      <hr>
      <!-- 使用 ref 获取子组件 -->
      <my-com ref="mycom"></my-com>
    </div>
  </div>

  <script>
    Vue.component('my-com', {
      template: '<h5>这是一个子组件</h5>',
      data() {
        return {
          name: '子组件'
        }
      }
    });

    // 创建 Vue 实例，得到 ViewModel
    var vm = new Vue({
      el: '#app',
      data: {},
      methods: {
        getElement() {
          // 通过 this.$refs 来获取元素
          console.log(this.$refs.myh1.innerText);
          // 通过 this.$refs 来获取组件
          console.log(this.$refs.mycom.name);
        }
      }
    });
  </script>
```

## 