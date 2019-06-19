;(function () {

	const template = `
<footer class="info">
	<todo-header @addTodo="handleAddTodo"></todo-header>
	<p>双击666</p>
	<!-- Remove the below line ↓ -->
	<p>Template by <a href="http://sindresorhus.com">Sindre Sorhus</a></p>
	<!-- Change this out with your name and url ↓ -->
	<p>Created by <a href="http://todomvc.com">you</a></p>
	<p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
</footer>
`

	window.appFooter = {
		template,
		data () {
			return {

			}
		},
		components: {
			todoHeader
		},
		methods: {
			handleAddTodo (value) {
				console.log(value)
			}
		}
	}
})()
