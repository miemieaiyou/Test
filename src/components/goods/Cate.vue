<template>
	<div>
		<!-- 导航区域 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{path:'/Welcome'}">首页</el-breadcrumb-item>
			<el-breadcrumb-item>商品管理</el-breadcrumb-item>
			<el-breadcrumb-item>商品分类</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 卡片视图 -->
		<el-card>
			<el-button type="primary">添加分类</el-button>
			<tree-table :data="CatesList" :columns="columns" :selection-type="false" :expand-type="false" 
			show-index index-text="#" border class="tree-table">
				<!-- 是否有效列 -->
				<template slot="isok" scope="scope">
					<i class="el-icon-success" v-if="scope.row.cat_deleted===false" style="color: lightgreen;"></i>
					<i class="el-icon-error" v-else style="color: red;"></i>
					<!-- <pre>{{scope.row}}</pre> -->
				</template>
				<!-- 排序列 -->
				<template slot="level" scope="scope">
					<el-tag type="primary" v-if="scope.row.cat_level===0">一级</el-tag>
					<el-tag type="success" v-else-if="scope.row.cat_level===1">二级</el-tag>
					<el-tag type="warning" v-else-if="scope.row.cat_level===2">三级</el-tag>
				</template>
				<!-- 操作列 -->
				<template slot="opt" scope="scope">
					<el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
					<el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
				</template>
			</tree-table>
			<!-- 分页区域 -->
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pagenum"
			      :page-sizes="[5, 10, 15, 20]" :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
			</el-pagination>
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
				CatesList:[],
				//请求参数
				queryInfo:{
					type:3,
					pagenum:1,
					pagesize:5
				},
				total:0,
				columns: [
					{
					  label: '分类名称',
					  prop: 'cat_name',
					},
					{
						label:'是否有效',
						//表示将当前列定义为模板列
						type:'template',
						//表示当前这一列使用的模板名称
						template:'isok'
					},
					{
						label:'排序',
						//表示将当前列定义为模板列
						type:'template',
						//表示当前这一列使用的模板名称
						template:'level'
					},
					{
						label:'操作',
						//表示将当前列定义为模板列
						type:'template',
						//表示当前这一列使用的模板名称
						template:'opt'
					}
				]
			}
		},methods:{
			async getCatesList(){
				const {data:res}=await this.$http.get(`categories`,{params:this.queryInfo})
				console.log(res)
				if(res.meta.status!==200)
					return this.$message.error('获取商品列表失败')
				this.CatesList=res.data.result
				this.total=res.data.total
			},
			handleSizeChange(newPageSize){
				this.queryInfo.pagesize=newPageSize
				this.getCatesList()
			},
			handleCurrentChange(newPageNum){
				this.queryInfo.pagenum=newPageNum
				this.getCatesList()
			}
		}
	}
</script>

<style lang="less" scoped>
	.tree-table{
		margin-top: 10px;
	}
</style>
