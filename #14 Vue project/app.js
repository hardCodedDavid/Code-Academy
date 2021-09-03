
const app = Vue.createApp({
	data() {
		return{
			title: "Hello World",
			value: 14,
			showMess: true
		}
	},
	methods: {
			toggleSection() {
				this.showMess = !this.showMess
			}
		}
})
app.mount('#app')