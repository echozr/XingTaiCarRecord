import Vue from 'vue'
import App from './App'
import store from './store'
import $http from './server/request.js';

Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$http = $http;
/* 注册全局组件 */
import DividLine from '@/components/common/dividLine'
Vue.component("DividLine", DividLine)


App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
