<template>
    <div class="container">
        <el-row>
            <el-col :span="24" class="header">
                <el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
                    {{collapsed?'':sysName}}
                </el-col>
                <el-col :span="10">
                    <div class="tools">
                        <div class="iconContainer" @click.prevent="collapse" style="float:left;margin-right:10px;">
                            <i class="fa fa-align-justify"></i>
                        </div>
						<va-iconbutton v-for="(sys,index) in Systems" :key="index" :text="sys.name" :icon="sys.icon" :bg-color="'#20a0ff'" :active-color="'#1d90e6'" class="iconbutton" @click.native="handleRouter(sys.path)"></va-iconbutton>
                    </div>
                </el-col>
                <el-col :span="4" class="userinfo">
                    <el-dropdown trigger="hover">
                        <span class="el-dropdown-link userinfo-inner"><img :src="this.sysUserAvatar" /> {{sysUserName}}</span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>我的消息</el-dropdown-item>
                            <el-dropdown-item>设置</el-dropdown-item>
                            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
            </el-col>
        </el-row>
        <el-row class="content">
			<transition name="fade" mode="out-in">
				<keep-alive>
					<router-view></router-view>
				</keep-alive>
			</transition>
        </el-row>
    </div>
</template>

<script>
// 该组件是为了各个分系统之间切换路由使用
import store from '../vuex/store'
import vaIconbutton from '../components/va-iconbutton'

export default {
    data() {
        return {
            sysName:'DEMO演示系统',
            sysUserName: '',
            sysUserAvatar: ''
		}
	},
	computed: {
		collapsed () {
			return store.state.collapsed
		},
		Systems () {
			return [
				{name:'分系统1',icon:'el-icon-message',path:'/sys1/table'},
				{name:'分系统2',icon:'el-icon-message',path:'/sys2'},
				{name:'分系统3',icon:'el-icon-message',path:'/sys3'},
				{name:'分系统4',icon:'el-icon-message',path:'/sys4'},
			]
		}
	},
	components: { vaIconbutton },
    methods: {
		handleRouter(path) {
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
        //折叠导航栏，提交vuex中的mutation，并且传入参数
        collapse:function(){
			store.commit('toogleCollapsed', !this.collapsed)
        }
    },
    mounted() {
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

<style lang="scss" scoped>
    @import '~scss_vars';
	
    .container {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
		.header {
			height: 60px;
			line-height: 60px;
			background: $color-primary;
			color:#fff;
			.userinfo {
				text-align: right;
				padding-right: 35px;
				float: right;
				.userinfo-inner {
					cursor: pointer;
					color:#fff;
					img {
						width: 40px;
						height: 40px;
						border-radius: 20px;
						margin: 10px 0px 10px 10px;
						float: right;
					}
				}
			}
			.logo {
				height:60px;
				font-size: 22px;
				padding-left:20px;
				padding-right:20px;
				border: 1px solid rgba(238,241,146,0.3);
				transition: width 0.2s linear;
				img {
					width: 40px;
					float: left;
					margin: 10px 10px 10px 18px;
				}
				.txt {
					color:#fff;
				}
			}
			.logo-width{
				width:230px;
			}
			.logo-collapse-width{
				width:60px
			}
			.tools{
				padding: 0px 10px;
				line-height: 60px;

                .iconContainer {
					float: left;
					
					&:hover {
						cursor: pointer;
					}
				}
				
				.iconbutton {
					height:60px;
					width:120px;
					margin-left:1px;
					float:left;
					color:#fff;

					&:hover {
						cursor: pointer;
					}
				}
			}
		}
	}

	// 通过绝对定位的方式将上部和下部的区域合起来平铺整个区域
	.content {
		position: absolute;
		top: 60px;
		bottom: 0px;
		width: 100%;
	}

	.clearfix::before {
		display: block;
		content: "";
		clear: both;
		height: 0;
	}

	.clearfix {
		zoom: 1;
	}
</style>
