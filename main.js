import Vue from 'vue'
import App from './App'
import uView from 'uview-ui';
import store from '@/store';

Vue.use(uView);

// 混入, 可以使用this.$u.vuex(name, value)来改变state中的值, 并且将state中的属性全部用计算属性监视
let vuexStore = require('@/store/$u.mixin.js');
Vue.mixin(vuexStore);

Vue.config.productionTip = false

App.mpType = 'app'


const app = new Vue({
	store,
    ...App
})

// 等Vue创建对象完成，引入"app"对象(也即页面的"this"实例)之后再配置请求信息，这样在APP.VUE中也能正常发出请求
import httpInterceptor from '@/common/api/http.interceptor.js'
Vue.use(httpInterceptor, app)
// http接口API集中管理引入部分
import httpApi from '@/common/api/http.api.js'
Vue.use(httpApi, app)


// 挂载
app.$mount()
