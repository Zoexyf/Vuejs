;(function () {
	const template = `
<section class="main">
	<!-- This section should be hidden by default and shown when there are todos -->
	<input id="toggle-all" class="toggle-all" type="checkbox">
	<label for="toggle-all">Mark all as complete</label>
	<ul class="todo-list">
		<!-- These are here just to show the structure of the list items -->
		<!-- List items should get the class editing when editing and completed when marked as completed -->
		<li v-for="item in filterTodos">
			<div class="view">
				<input
					class="toggle"
					type="checkbox"
					v-model="item.completed">
				<label>{{ item.title }}</label>
				<button class="destroy"></button>
			</div>
			<input class="edit" value="Create a TodoMVC template">
		</li>
	</ul>
</section>
`

	window.todoList = {
		template,
		// 子组件就会把父组件在标签中声明的 foo 给拿过来
		props: ['todos', 'filterText'],
		data () {
			return {
			}
		},
		computed: {
			// 父组件只需要把数据给子组件
			// 至于子组件如何使用这个数据，父组件不要管太多事儿
			filterTodos () {
				switch(this.filterText) {
				  case 'active':
				  	return this.todos.filter(t => !t.completed)
				    break
				  case 'completed':
				  	return this.todos.filter(t => t.completed)
				    break
				  default:
				  	return this.todos
				    break
				}
			}
		},
	}
})()
