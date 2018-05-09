// main.js是程序的入口，内部引入App.vue，将根组件挂载到html的#app上

// 引入vue基础组件
import Vue from 'vue'
import VueRouter from 'vue-router'
// import Vuex from 'vuex'

// 引入第三方组件资源
import babelpolyfill from 'babel-polyfill'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import 'font-awesome/css/font-awesome.min.css'

// todo:这里可以引入normalize.css

// 引入mock资源
import Mock from './mock'

// 引入项目的路由、vuex-store、启动app
import routes from './routes'
import store from './vuex/store'
import App from './App'
Mock.bootstrap()

// 安装vue插件，VueRouter、Vuex、ElementUI
// 如果插件是一个对象，则执行插件内的install方法
// 如果插件是一个函数，则把函数当做install方式
Vue.use(ElementUI)
Vue.use(VueRouter)

// vuex的安装可以分散到其他的类中
// Vue.use(Vuex)

// 初始化router
const router = new VueRouter({
  routes
})

// 注册一个全局导航守卫
// sessionStorage和localstorage的不同：sessionStorage当页面关闭的时候存储的数据消失，而localStorage不会，重新加载或恢复还会保持
// sessionStorage与session、cookie的不同，sessionStorage当在打开新页面或者新窗口的时候会创建新的
// 此处的全局导航守卫用于检测是否登录、如果没有登录就跳转到登录页，如果是登录页请求就删除保存的session数据
// 有没有登录，也可以通过后端来检测，那这种功能应该通过哪种方式来做呢？
router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    sessionStorage.removeItem('user')
  }
  let user = JSON.parse(sessionStorage.getItem('user'))
  if (!user && to.path != '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})

// 两种挂载方式：
// 1. 通过el确定挂载元素，通过template确定挂载组件，通过components确定有哪些组件；
// 2. 通过render函数，直接挂载组件，通过$mount挂载到某个节点上；
// 将实例化的router或者store都加载，不管是router还是store都需要实例化
new Vue({
  // el: '#app',
  // template: '<App/>',
  router,
  store,
  // components: { App }
  render: h => h(App)
}).$mount('#app')
