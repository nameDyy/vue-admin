<template>
	<div id="app">
		<transition name="fade"
		            mode="out-in">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script>

// App.vue就是vue的根组件，同时也是为了完成登录页到主页的跳转的路由展示
// 经验总结：
// 1. 如果存在页面跳转就存在路由，因为登录--->系统主页存在了跳转就一定存在路由
// 2. 系统的启动顺序是从main.js，然后在main.js中实例化vue根实例并挂载
// 3. main.js中的vue根实例上增加router、store
// 4. 一些全局的插件、样式，路由守卫都在这里

// todo：vue中transition的使用

export default {
	name: 'app',
	components: {
	}
}

</script>

<style lang="scss">
// 设置全局样式
body {
	margin: 0px;
	padding: 0px;
	font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
	font-size: 14px;
	-webkit-font-smoothing: antialiased;
}

// 设置铺满整个屏幕
#app {
	position: absolute;
	top: 0px;
	bottom: 0px;
	width: 100%;
}

// 重置eleui样式
.el-submenu [class^=fa] {
	vertical-align: baseline;
	margin-right: 10px;
}

// 重置eleui样式
.el-menu-item [class^=fa] {
	vertical-align: baseline;
	margin-right: 10px;
}

// 自定义全局样式
@mixin toolbar {
	background: #f2f2f2;
	padding: 10px;
	.el-form-item {
		margin-bottom: 0;
	}
}

.footerToolBar {
	@include toolbar;
	margin-top: 10px;
}

.headerToolBar {
	@include toolbar;
	margin-bottom: 10px;
}

// 设置vue过渡
.fade-enter-active,
.fade-leave-active {
	transition: all .2s ease;
}

.fade-enter,
.fade-leave-active {
	opacity: 0;
}
</style>