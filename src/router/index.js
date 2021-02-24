import Vue from 'vue'
import VueRouter from 'vue-router'
/* import Home from '../views/Home.vue' */
import Ecomsystem from '../views/Ecomsystem.vue'
//import sad from ''
Vue.use(VueRouter)

const routes = [
  /* {
    path: '/',
    name: 'Home',
    component: Home
  }, */
  {
    path: '/',
    name: 'Ecomsystem',
    component: Ecomsystem
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/container',
    name: 'Container',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Container.vue')
  },
  {
    path: '/navMenu',
    name: 'NavMenu',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/NavMenu.vue')
  },
  {
    path: '/ecomsystem',
    name: 'Ecomsystem',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Ecomsystem.vue')
  },
  {
    path: '/main',
    name: 'Main',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Main.vue'),
	redirect:'/welcome',
	children:[{
		path: '/welcome',
		name: 'Welcome',
		component: () => import('../components/Welcome.vue'),
	},{
		path: '/users',
		name: 'Users',
		component: () => import('../components/user/Users.vue'),
	},{
		path: '/rights',
		name: 'Rights',
		component: () => import('../components/power/Rights.vue'),
	},{
		path: '/roles',
		name: 'Roles',
		component: () => import('../components/power/Roles.vue'),
	},{
		path: '/categories',
		name: 'Cate',
		component: () => import('../components/goods/Cate.vue'),
	},{
		path: '/params',
		name: 'Params',
		component: () => import('../components/goods/Params.vue'),
	}]
  }
]

const router = new VueRouter({
  routes
})
//挂载路由导航守卫
router.beforeEach((to,from,next)=>{
	//to 将要访问的路径
	//from 代表从那个路径跳转而来
	//next 是一个函数，表示放行
	//next() 放行 next('/') 强制跳转
	if(to.path==='/') return next();
	const tokenstr=window.sessionStorage.getItem('token')
	if(!tokenstr) return next('/')
	next()
})

export default router
