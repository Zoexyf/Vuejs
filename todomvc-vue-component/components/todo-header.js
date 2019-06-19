;(function () {
	const template = `
<header class="header">
	<h1>todos</h1>
	<input @keydown.enter="handleKeydown" class="new-todo" placeholder="What needs to be done?" autofocus>
</header>
`
	window.todoHeader = {
		template,
		// 组件接收到的 props 数据就可以像访问 data 中的数据一样来访问 props 中的数据
		props: ['todos', 'foo'],
		methods: {
			handleKeydown (e) {
				// 0. 获取文本框的值
				// 1. 非空校验
				// 2. 添加任务到 todos 中
				const target = e.target
				const value = target.value.trim()
				if (!value.length) {
					return
				}

				// 在子组件中数据已经准备就绪，可以交给父组件使用了
				// 子组件通知父组件你去 addTodo 去吧。
				// 子组件不关心父组员的业务
				// 父组件到底拿到这个数据干嘛？
				// 对于子组件来讲，根本不关心，你爱干嘛干嘛
				// 由于不关心业务，所以该组件重用的几率将会大大的增加
				// 谁来用我，我就就把数据给谁
				this.$emit('addTodo', value)

				target.value = ''


				// 数据已经准备好，你去使用吧

				// 不允许，直接警告报错
				// this.todos = []

				// 不允许，直接警告报错
				// this.foo = 'baz'

				// 允许，引用类型可以修改（不能像上面那样重新赋值）
				// 虽然可以，但是不要这样使用
				// const todos = this.todos
				// todos.push({
				// 	id: todos[todos.length - 1].id + 1,
				// 	title: value,
				// 	completed: false
				// })


				// 注意：引用类型数据虽然可以修改，但是不建议使用，因为这样就违背了 Vue 组件的通信原则
				// 通信原则是：单向数据流
				//		父组件数据的改变可以影响到孩子
				//		但是孩子不要去修改父亲的数据
				//		因为当你的组件嵌套过深的时候，在子组件中修改某个父组件的数据可能会让你的应用数据流变得非常复杂而难以理解
				// 所以即便引用类型有这个特性，也不要使用
				// 那怎么办？
				// 孩子能不能把数据给父亲呢？让父亲自己去修改自己的数据。



			}
		}
	}
})()
