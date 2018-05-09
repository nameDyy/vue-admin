
// 将所有的页面都引入到路由
import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Main from './views/Main.vue'

// 总体多系统级页面
import Index from './views/Index.vue'

// sys1系统页面
import Layout_Sys1 from './views/sys1/Layout.vue'
import Table_Sys1 from './views/sys1/nav1/Table.vue'
import Form_Sys1 from './views/sys1/nav1/Form.vue'
import user_Sys1 from './views/sys1/nav1/user.vue'
import Custom_Sys1 from './views/sys1/nav1/Custom.vue'
import Page4_Sys1 from './views/sys1/nav2/Page4.vue'
import Page5_Sys1 from './views/sys1/nav2/Page5.vue'
import Page6_Sys1 from './views/sys1/nav3/Page6.vue'
import echarts_Sys1 from './views/sys1/charts/echarts.vue'

// sys2系统页面
import Layout_Sys2 from './views/sys2/Layout.vue'
import Table_Sys2 from './views/sys2/Table.vue'

// sys3系统页面
import Layout_Sys3 from './views/sys3/Layout.vue'


// vue-router的基本思路就是
// 1. 将vue组件和路由映射起来
// 2. 高度vue-router在哪里渲染
// 3. 通常还要告诉vue-router一个导航列表（非必须）
// 4. 代码上的过程： 
//    导入组件、使用一个包含对象的数组，将路径、组件映射
//    将这个对象传递给VueRouter初始化一个VueRouter实例 new VueRouter({routes:routes})
//    将这个VueRouter实例传递给Vue构造函数 new Vue({router:router})
//    在模板中增加导航和路由视图渲染位置 router-view  router-link

// 路由的其他知识点
// 动态路由
// 嵌套路由
// 编程式导航
// 命名路由
// 命名视图-嵌套命名视图

// todo:可以改造为分系统路由，优先级低

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },

    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    },
    {
        path: '/',
        component: Index,
        name: '首页',
        hidden: true,
        children: [
            {
                path: 'sys1',
                component: Layout_Sys1,
                name: '系统1导航',
                hidden: true,
                level: 'sys',
                children: [
                    { path: 'main', component: Main, name: '主页', catelog: 'nav1' },
                    { path: 'custom', component: Custom_Sys1, name: '自定', catelog: 'nav1' },
                    { path: 'table', component: Table_Sys1, name: 'Table', catelog: 'nav1' },
                    { path: 'form', component: Form_Sys1, name: 'Form', catelog: 'nav1' },
                    { path: 'user', component: user_Sys1, name: '列表', catelog: 'nav1' },
                    { path: 'page4', component: Page4_Sys1, name: '页面4', catelog: 'nav2' },
                    { path: 'page5', component: Page5_Sys1, name: '页面5', catelog: 'nav2' },
                    { path: 'page6', component: Page6_Sys1, name: '导航三', catelog: 'nav3' },
                    { path: 'echarts', component: echarts_Sys1, name: 'echarts', catelog: 'chart' }
                ]
            },
            {
                path: 'sys2',
                component: Layout_Sys2,
                name: '系统2导航',
                hidden: true,
                level: 'sys',
                children: [
                    { path: 'main', component: Main, name: '主页', hidden: true },
                    { path: 'table', component: Table_Sys2, name: 'Table' },
                ]
            },
            {
                path: 'sys3',
                component: Layout_Sys3,
                name: '系统3导航',
                hidden: true,
                level: 'sys',
                children: [
                ]
            }
        ]
    }
];

export default routes;