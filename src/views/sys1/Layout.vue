<template>
	<el-col :span="24" class="main">
		<aside :class="collapsed?'menu-collapsed':'menu-expanded'">
			<!--导航菜单-->
			<!--存在问题导致收起的时候，自动添加了一个宽度-->
			<div style="width:100%;height:100%;" v-show="!collapsed">
				<el-menu  class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect"
					unique-opened>
					<template v-for="(item,index) in menus" v-if="!item.hidden">
						<el-submenu :index="index+''" :key="index" v-if="item.children.length>1">
							<template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
							<el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" @click="handleRoute(child.path)" v-if="!child.hidden">{{child.name}}</el-menu-item>
						</el-submenu>
						<el-menu-item v-if="item.children.length==1" :index="item.children[0].path" :key="index" @click="handleRoute(item.children[0].path)"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
					</template>
				</el-menu>
			</div>
			<!--导航菜单-折叠后-->
			<ul class="el-menu el-menu-vertical-demo collapsed" v-show="collapsed" ref="menuCollapsed">
				<li v-for="(item,index) in menus" v-if="!item.hidden" class="el-submenu item" :key="index">
					<template v-if="item.children.length > 0">
						<div class="el-submenu__title" style="padding-left: 20px;" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"><i :class="item.iconCls"></i></div>
						<ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"> 
							<li v-for="child in item.children" :key="child.path" class="el-menu-item" style="padding-left: 40px;" :class="$route.path==child.path?'is-active':''" @click="$router.push(child.path)">{{child.name}}</li>
						</ul>
					</template>
				</li>
			</ul>
		</aside>
		<section class="content-container">
			<div class="grid-content bg-purple-light">
				<!-- <el-col :span="24" class="breadcrumb-container">
					<el-breadcrumb separator="/" class="breadcrumb-inner">
						<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
							{{ item.name }}
						</el-breadcrumb-item>
					</el-breadcrumb>
				</el-col> -->
				<el-col :span="24" class="content-wrapper">
					<transition name="fade" mode="out-in">
						<router-view></router-view>
					</transition>
				</el-col>
			</div>
		</section>
	</el-col>
</template>

<script>
	import store from '../../vuex/store'

	export default {
		data() {
			return {
				sysName:'VUEADMIN',
				sysUserName: '',
				sysUserAvatar: '',
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				}
			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			},
			handleopen() {
				//console.log('handleopen');
			},
			handleclose() {
				//console.log('handleclose');
			},
			handleselect: function (a, b) {
			},
			handleRoute (path) {
				// debugger
				this.$router.push(path)
			},
			//退出登录
			logout: function () {
				var _this = this;
				this.$confirm('确认退出吗?', '提示', {
					//type: 'warning'
				}).then(() => {
					sessionStorage.removeItem('user');
					_this.$router.push('/login');
				}).catch(() => {

				});
			},
			//折叠导航栏
			collapse:function(){
				this.collapsed=!this.collapsed;
			},
			showMenu(i,status){
				this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-'+i)[0].style.display=status?'block':'none';
			}
		},
		computed: {
			menus () {
				return [
					{
						catelog:'nav1',
						name: '功能块1',
						iconCls: 'fa fa-id-card-o',
						children:[
							{ path: 'main', name: '主页'},
							{ path: 'custom', name: '自定'},
							{ path: 'table',  name: 'Table'},
							{ path: 'form',  name: 'Form' },
							{ path: 'user', name: '列表' }
						]
					},
					{
						catelog:'nav2',
						name: '功能块2',
						iconCls: 'fa fa-id-card-o',
						children:[
							{ path: 'page4',  name: '页面4'},
							{ path: 'page5',  name: '页面5' }
						]
					},
					{
						catelog:'nav3',
						name: '功能块3',
						iconCls: 'fa fa-address-card',
						children:[
							{ path: 'page6',  name: '功能块3'}
						]
					},
					{
						catelog:'chart',
						name: '图表',
						iconCls: 'fa fa-bar-chart',
						children:[
							{ path: 'echarts',  name: '图表'}
						]
					}
				]
			},
			collapsed () {
				return store.state.collapsed
			}
		},
		mounted() {
			// debugger
			// 页面加载的时候获取user并填充信息
			var user = sessionStorage.getItem('user');
			if (user) {
				user = JSON.parse(user);
				this.sysUserName = user.name || '';
				this.sysUserAvatar = user.avatar || '';
			}
		}
	}
</script>

<style scoped lang="scss">
	@import '~scss_vars';
	
	.main {
		display: flex;
		position: absolute;
		top: 0px;
		bottom: 0px;
		overflow: hidden;
		aside {
			flex:0 0 230px;
			width: 230px;
			// 导致按钮产生抖动
			// transition: all 0.1s ease;
			.el-menu{
				height: 100%;
			}
			.collapsed{
				width:60px;
				.item{
					position: relative;
				}
				.submenu{
					position:absolute;
					top:0px;
					left:60px;
					z-index:99999;
					height:auto;
					display:none;
				}
			}
		}
		.menu-collapsed{
			flex:0 0 60px;
			width: 60px;
		}
		.menu-expanded{
			flex:0 0 230px;
			width: 230px;
		}
		.content-container {
			flex:1;
			overflow-y:auto;
			.breadcrumb-container {
				.title {
					width: 200px;
					float: left;
					color: #475669;
				}
				.breadcrumb-inner {
					float: left;
					line-height: 35px;
					height: 35px;
					padding-left: 10px;
				}
			}
			.content-wrapper {
				background-color: #fff;
				box-sizing: border-box;
				padding: 10px;
			}
		}
	}
</style>