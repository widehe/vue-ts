import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

console.log(process.env.NODE_ENV)
console.log("哈哈哈，我来了，么么哒！")
console.error("老铁，你有点危险")

new Vue({
  render: h => h(App),
}).$mount('#app')
