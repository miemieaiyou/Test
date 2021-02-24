<template>
	<div>
		<el-container style="line-height: 800px;">
			<el-header style="line-height: 60px;background-color: #666666;text-align: left;">
				<div>
					<div style="height: 60px;width:60px;float: left;">
						<el-image :src="require('../assets/logo.png')"></el-image>
					</div>
					<div style="height: 60px;width:260px;float: left;font-size: 20px;color:#ececec;margin-left:15px;">
						商城后台管理系统
					</div>
				</div>
			</el-header>
			<el-container>
				<el-aside>
					<div>
						<div style="line-height: 10px;text-align: right;">
							<!-- <el-button icon="el-icon-s-unfold" v-if="iconname" @click=""></el-button> -->
							<el-button>展开</el-button>
							<el-button v-model="isCollapse" @click="openOrClose">收起</el-button>
						</div>
						<div>
							<el-menu :collapse="isCollapse" :unique-opened="true" background-color="#333744" text-color="#ececec" active-text-color="#ba903c" class="el-menu-vertical-demo">
								<el-submenu index="1">
									<template slot="title">
										<i class="el-icon-user"></i>
										<span>用户管理</span>
									</template>
									<el-menu-item-group>
										<el-menu-item index="1-1">
											<i class="el-icon-s-operation"></i>
											<span slot="title">用户列表</span>
										</el-menu-item>
									</el-menu-item-group>
								</el-submenu>
								<el-submenu index="2">
									<template slot="title">
										<i class="el-icon-setting"></i>
										<span>权限管理</span>
									</template>
									<el-menu-item-group>
										<el-menu-item index="2-1">
											<i class="el-icon-s-operation"></i>
											<span slot="title">角色列表</span>
										</el-menu-item>
										<el-menu-item index="2-2">
											<i class="el-icon-s-operation"></i>
											<span slot="title">权限列表</span>
										</el-menu-item>
									</el-menu-item-group>
								</el-submenu>
								<el-submenu index="3">
									<template slot="title">
										<i class="el-icon-goods"></i>
										<span>商品管理</span>
									</template>
									<el-menu-item-group>
										<el-menu-item index="3-1">
											<i class="el-icon-s-operation"></i>
											<span slot="title">商品列表</span>
										</el-menu-item>
										<el-menu-item index="3-2">
											<i class="el-icon-s-operation"></i>
											<span slot="title">分类参数</span>
										</el-menu-item>
										<el-menu-item index="3-3">
											<i class="el-icon-s-operation"></i>
											<span slot="title">商品分类</span>
										</el-menu-item>
									</el-menu-item-group>
								</el-submenu>
								<el-submenu index="4">
									<template slot="title">
										<i class="el-icon-s-order"></i>
										<span>订单管理</span>
									</template>
									<el-menu-item-group>
										<el-menu-item index="4-1">
											<i class="el-icon-s-operation"></i>
											<span slot="title">订单列表</span>
										</el-menu-item>
									</el-menu-item-group>
								</el-submenu>
								<el-submenu index="5">
									<template slot="title">
										<i class="el-icon-s-marketing"></i>
										<span>数据统计</span>
									</template>
									<el-menu-item-group>
										<el-menu-item index="5-1">
											<i class="el-icon-s-operation"></i>
											<span slot="title">数据报表</span>
										</el-menu-item>
									</el-menu-item-group>
								</el-submenu>
							</el-menu>
						</div>
					</div>
				</el-aside>			
				<el-container style="width: 500px;border: #e7e7e7 1px solid;text-align: center;">container</el-container>
			</el-container>
		</el-container>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				isCollapse:false,
			}
		},methods:{
			openOrClose(){
				this.isCollapse=!this.isCollapse;
			}
		}
	}
</script>

<style>
	.el-menu-vertical-demo:not(.el-menu--collapse) {
	    width: 200px;
	    /* min-height: 400px; */
	  }
</style>
