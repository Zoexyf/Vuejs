// new 出 Vue 实例，启动组件系统
// 相当于电脑的开机键

new Vue({
	el: '#app',
	// 实例选项的 template 会把 #app 节点给替换掉
	// template: '<div>hello world</div>'

	// 在自己的 template 中使用自己的组件
	// template: '<app></app>',

	// 有时候为了简洁，我们的组件也可以使用成单标签
	// 推荐把组件名字的首字母都大写
	template: '<App />',

	components: {
		App
		// App: {
		// 	template: '<div>app component</div>'
		// },
		// Foo: {
		// 	template: '<div>foo component</div>'
		// },
	}
})
