<template>
	<el-container class="el-container1">
	  <el-header>
		  <div>
			  <img src="../assets/logo.png" alt="" style="width: 50px;height: 50px;"/>
			  <span>电商后台管理系统</span>
		  </div>
		  <el-button type="info" @click="logout">退出</el-button>
	  </el-header>
	  <el-container>
	    <el-aside :width="isCollapse? '64px':'200px'">
			<div class="toggle-button" @click="toggle">|||</div>
			<el-menu router :default-active="activePath" background-color="#333744" text-color="#fff" active-text-color="#ffd04b" :unique-opened="true" :collapse="isCollapse" :collapse-transition="false">
				<!-- 一级菜单 -->
			    <el-submenu :index="item.id+''" v-for="item in menulist" :key="item.id">
					<template slot="title">
			          <i :class="iconsObj[item.id]"></i>
			          <span>{{item.authName}}</span>
			        </template>
					<!-- 二级菜单 -->
			        <el-menu-item :index="'/'+subitem.path" v-for="subitem in item.children" :key="subitem.id" @click="saveActivePath('/'+subitem.path)">
						<template slot="title">
						  <i class="el-icon-menu"></i>
						  <span>{{subitem.authName}}</span>
						</template>
					</el-menu-item>
			    </el-submenu>
			</el-menu>
		</el-aside>
	    <el-main>
			<!-- 路由占位符 -->
			<router-view></router-view>
		</el-main>
	  </el-container>
	</el-container>
</template>

<script>
	export default{
		created() {
			this.getMenuList();
			//点击菜单项会create() 路径动态赋值给activePath
			this.activePath=window.sessionStorage.getItem('activePath')
		},
		data(){
			return{
				menulist:[],
				iconsObj:{
					'125':'iconfont icon-user',
					'103':'iconfont icon-tijikongjian',
					'101':'iconfont icon-shangpin',
					'102':'iconfont icon-danju',
					'145':'iconfont icon-baobiao',
				},
				//是否折叠
				isCollapse:false,
				//激活路径
				activePath:''
			}
		},methods:{
			logout(){
				window.sessionStorage.clear()
				this.$router.push('/')
			},
			//获取所有菜单
			async getMenuList(){
				const {data:res} =await this.$http.get('menus')
				if(res.meta.status!==200)
					return this.$message.error(res.meta.msg)
				this.menulist=res.data
			},
			//菜单的折叠或打开
			toggle(){
				this.isCollapse=!this.isCollapse
			},
			//保存被激活的菜单路径
			saveActivePath(activePath){
				window.sessionStorage.setItem('activePath',activePath)
				this.activePath=activePath
			}
		}
	}
</script>

<style lang="less" scoped>
	.el-menu{
		border-right: none;
	}
	.el-header{
		background-color: #373d41;
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #F7F7F7;
		> div{
			display: flex;
			align-items: center;
			span{
				margin-left: 10px;
			}
		}
	}
	.el-aside{
		background-color: #333744;
	}
	.el-main{
		background-color: #eaedf1;
	}
	.el-container1{
		width: 100%;
		height: 100vh;
	}
	.iconfont{
		margin-right: 10px;
	}
	.toggle-button{
		background-color: #4A5064;
		font-size: 10px;
		line-height: 24px;
		text-align: center;
		color: #FFFDEF;
		letter-spacing: 0.2em; /* 三条竖杠间距*/
		cursor: pointer; //鼠标变成小手
	}
</style>
