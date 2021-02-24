import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './plugins/element.js'
import TreeTable from 'vue-table-with-tree-grid'
//导入全局样式表
import './assets/css/global.css'
/* 导入字体图标 */
import './assets/fonts/iconfont.css'
/* 配置请求的根路径 */
import axios from 'axios' 
axios.defaults.baseURL='http://127.0.0.1:8888/api/private/v1/'
axios.interceptors.request.use(config=>{
	console.log(config)
	config.headers.Authorization=window.sessionStorage.getItem('token')
	return config
})
Vue.prototype.$http=axios
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.component('tree-table', TreeTable)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
