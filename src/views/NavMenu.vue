<template>
	<div>
		<div>
			<el-menu mode="horizontal" background-color="#5e5e5e" text-color="#ececec" active-text-color="#ba903c" @select="select">
				<el-menu-item index="1">处理中心</el-menu-item>
				<el-submenu index="2">
					<template slot="title">我的工作台</template>
					<el-menu-item index="2-1">选项一</el-menu-item>
					<el-menu-item index="2-2">选项二</el-menu-item>
					<el-menu-item index="2-3">选项三</el-menu-item>
					<el-submenu index="2-4">
						<template slot="title">选项四</template>
						<el-menu-item index="2-4-1">选项一</el-menu-item>
						<el-menu-item index="2-4-2">选项二</el-menu-item>
					</el-submenu>
				</el-submenu>
				<el-menu-item index="3"  disabled>消息中心</el-menu-item>
				<el-menu-item index="4"><a href="http://192.168.1.122:8080/#/container" target="_blank">订单管理</a></el-menu-item>
			</el-menu>
		</div>
		<div style="text-align: left;">
			<el-button type="danger" icon="el-icon-edit" circle=""></el-button>
			<el-link type="primary" :underline="false"><a href="https://element.eleme.cn/#/zh-CN/component/link" target="_blank">饿了吗</a></el-link>
			<el-radio-group v-model="radio" @change="change">
				<el-radio label="1">单选框1</el-radio>
				<el-radio label="2">单选框2</el-radio>
				<el-radio label="3">单选框3</el-radio>
			</el-radio-group>		
		</div>
		<div style="text-align: left;">
			<el-radio-group v-model="radiobutton" @change="change" size="mini">
				<el-radio-button label="上海"></el-radio-button>
				<el-radio-button label="北京"></el-radio-button>
				<el-radio-button label="深圳"></el-radio-button>
			</el-radio-group>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				radio:'2',
				radiobutton:'北京'
			}
		},methods:{
			select(key,value){
				console.log(key,value)
			},
			change(value){
				console.log(value)
			}
		}
	}
</script>

<style>
</style>
