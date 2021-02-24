<template>
	<div>
		<!-- 导航区域 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{path:'/Welcome'}">首页</el-breadcrumb-item>
			<el-breadcrumb-item>权限管理</el-breadcrumb-item>
			<el-breadcrumb-item>权限列表</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 卡片视图 -->
		<el-card>
			<!-- border纵向边框线 -->
			<el-table :data="rightsList" border stripe>
				<el-table-column type="index" label="#"></el-table-column>
				<el-table-column prop="authName" label="权限名称"></el-table-column>
				<el-table-column prop="path" label="路径"></el-table-column>
				<el-table-column prop="level" label="权限等级">
					<template v-slot="scope">
						<el-tag type="primary" v-if="scope.row.level==='0'">一级</el-tag>
						<el-tag type="success" v-else-if="scope.row.level==='1'">二级</el-tag>
						<el-tag type="warning" v-else-if="scope.row.level==='2'">三级</el-tag>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
	</div>
</template>

<script>
	export default{
		created() {
			this.getRightsList();
		},
		data(){
			return{
				//权限列表
				rightsList:[]
			}
		},methods:{
			async getRightsList(){
				const {data:res}=await this.$http.get('rights/list');
				console.log(res)
				this.rightsList=res.data;
			}
		}
	}
</script>

<style>
</style>
