<template>
	<div>
		<!-- 导航区域 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{path:'/Welcome'}">首页</el-breadcrumb-item>
			<el-breadcrumb-item>商品管理</el-breadcrumb-item>
			<el-breadcrumb-item>参数列表</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 卡片视图区域 -->
		<el-card>
			<el-alert title="注意:只允许为第三级分类设置相关参数" type="warning" :closable="false" show-icon></el-alert>
			<!-- 选择商品分类区域 -->
			<el-row class="cat_opt">
				<el-col><span>选择商品分类：</span></el-col>
				 <el-cascader v-model="value" :options="options" :props="{ expandTrigger: 'hover' }"
				    @change=""></el-cascader>
			</el-row>
		</el-card>
	</div>
</template>

<script>
	export default{
		created() {
			this.getCatesList()
		},
		data(){
			return{
				value: [],
				cateslist:[],
				options: [{
					value: this.cateslist.cat_id,
				    label: '指南',
				    children: [{
						value: 'shejiyuanze',
				        label: '设计原则',
				        children: [{
				              value: 'yizhi',
				              label: '一致'
				        }]
				    }]
				}]
			}
		},methods:{
			async getCatesList(){
				const {data:res}=await this.$http.get(`categories`)
				if(res.meta.status!==200)
					return this.$message.info('获取失败')
				console.log(res)
				this.cateslist=res.data
			}
		}
	}
</script>

<style lang="less" scoped>
	.cat_opt{
		margin-top: 15px;
	}
</style>
