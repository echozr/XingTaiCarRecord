import Vue from 'vue';
import Vuex from 'vuex';

/*引入模块 */
import baseInfo from '@/store/modules/baseInfo.js'
import user from "@/store/modules/user.js"
Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		user,
		baseInfo
	}
})
