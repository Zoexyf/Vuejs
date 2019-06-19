// 采用组件化构建方式
// 一个应用被一个根组件管理起来
// 根组件中嵌套了子组件
// 子组件还可以嵌套自己的子子组件


;(function () {
	// 不远的明天就是这么玩儿
	// const todoHeader = require('./todo-header')
	// const todoHeader = require('./todo-header')
	// const todoHeader = require('./todo-header')
	// const todoHeader = require('./todo-header')

	const template = `
<div>
	<section class="todoapp">
	<todo-header
		:todos="todos"
		:foo="foo"
		@addTodo="addTodo"></todo-header>
	<!--
		1. 在父组件中通过子组件标签声明属性的方式传递数据
			 注意：只有 v-bind 才可以传递动态数据
		2. 在子组件中声明 props 接收父组件传递给自己的数据
		3. 然后你就可以在子组件中对数据进行 “为所欲为”
			只能使用，不要修改
	 -->
	<todo-list
		:todos="todos"
		:filterText="filterText"></todo-list>
	<todo-footer :filterText="filterText"></todo-footer>
	</section>
	<app-footer></app-footer>
</div>
`
	const todos = [
		{
			id: 1,
			title: '吃饭',
			completed: true
		},
		{
			id: 2,
			title: '写代码',
			completed: true
		},
		{
			id: 3,
			title: '逛街',
			completed: false
		}
	]

	window.App = {
		template,
		components: {
			todoHeader,
			todoList,
			todoFooter,
			appFooter
		},
		data () {
			return {
				todos,
				foo: 'bar',
				filterText: 'all'
			}
		},
		beforeCreate () {
			console.log('beforeCreate', this.filterText)
		},
		// 实例的生命周期函数，当符合一定时机这些特定的函数就会被自动调用
		// 不同的钩子函数有差异，具体明天详细讲
		created () {
			// console.log('created', this.filterText)
			// const _this = this
			// window.onhashchange = function () {
			// 	console.log(_this.filterText)
			// }

			// 这里使用箭头函数的目的就是为了拿到组件实例 this
			window.onhashchange = () => {
				let hash = window.location.hash.substr('2')
				if (hash === '') {
					hash = 'all'
				}
				this.filterText = hash
			}
		},
		beforeMount () {
			console.log('beforeMount')
		},
		mounted () {
			console.log('mounted')
		},
		beforeUpdate () {
			console.log('beforeUpdate')
		},
		updated () {
			console.log('updated')
		},
		activated () {
			console.log('activated')
		},
		deactivated () {
			console.log('deactivated')
		},
		beforeDestroy () {
			console.log('beforeDestroy')
		},
		destroyed () {
			console.log('destroyed')
		},
		errorCaptured () {
			console.log('errorCaptured')
		},
		// 1. 在父组件中定义一个方法（纯业务方法）
		// 2. 在子组件内部调用父组件的方法
		//		在子组件中发布一个自定义事件，通知父亲我可以去添加任务了
		// 3. 在父组件使用子组件的标签上订阅子组件内部发布的自定义事件
		// 软件开发中没有银弹
		methods: {
			addTodo (titleText) {
				console.log('父组件的 addTodo 方法被调用了')
				titleText = titleText.trim()
				if (!titleText.length) {
					return
				}
				const todos = this.todos
				todos.push({
					id: todos[todos.length - 1].id + 1,
					title: titleText,
					completed: false
				})
			}
		}
	}

	// 这个时候这个代码应该写到组件的声明周期钩子函数中
	// 类似于咱们学习的指令的钩子
	// window.onhashchange = function () {
	// 	console.log(App.filterText)
	// }
})()

// 1. 组件化构建方式
// 2. 父子组件通信
//	 父亲给孩子：Props Down
//	 孩子通知父亲：Events Up
