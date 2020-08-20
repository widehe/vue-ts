import Vue from 'vue'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css';
import router from "./router";

Vue.config.productionTip = false

console.log(process.env.NODE_ENV)
console.log("哈哈哈，我来了，么么哒！")
console.error("老铁，你有点危险")

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
