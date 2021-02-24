<template>
	<div>
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{path:'/Welcome'}">首页</el-breadcrumb-item>
			<el-breadcrumb-item>权限管理</el-breadcrumb-item>
			<el-breadcrumb-item>角色列表</el-breadcrumb-item>
		</el-breadcrumb>
		<el-card>
			<el-button type="primary">添加角色</el-button>
			<el-table :data="rolesList" border stripe>
				<el-table-column type="expand">
					<template v-slot="scope">
						<el-row :class="['bdbottom',i1===0?'bdtop':'','vcenter']" v-for="(item1,i1) in scope.row.children" :key="item1.id">
							<!-- 一级 -->
							<el-col :span="5">
								<el-tag closable>{{item1.authName}}</el-tag>
								<i class="el-icon-caret-right"></i>
							</el-col>
							<!-- 二级 -->
							<el-col :span="19">
								<el-row :class="[i2===0?'':'bdtop','vcenter']" v-for="(item2,i2) in item1.children" :key="item2.id">
									<el-col :span="6">
										<el-tag type="success" closable>{{item2.authName}}</el-tag>
										<i class="el-icon-caret-right"></i>
									</el-col>
									<el-col :span="18">									
										<el-tag v-for="(item3,i3) in item2.children" :key="item3.id" type="warning" closable @close="removeById(scope.row,item3.id)">{{item3.authName}}</el-tag>										
									</el-col>
								</el-row>
							</el-col>
						</el-row>
					</template>
				</el-table-column>
				<el-table-column type="index" label="#"></el-table-column>
				<el-table-column prop="roleName" label="角色名称"></el-table-column>
				<el-table-column prop="roleDesc" label="角色描述"></el-table-column>
				<el-table-column label="操作" width="300px">
					<template v-slot="scope">
						<el-button type="primary" size="mini" icon="el-icon-edit">编辑</el-button>
						<el-button type="danger" size="mini" icon="el-icon-delete">删除</el-button>
						<el-button type="warning" size="mini" icon="el-icon-setting" @click="showSetRightDialog(scope.row)">分配权限</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		<!-- 分配权限对话框 -->
		<el-dialog title="分配权限" :visible.sync="setRightDialogVisible" width="70%" @close="setRightDialogClosed">
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="setRightDialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="setRightDialogVisible = false">确 定</el-button>
		  </span>
		  <el-tree :data="rightsList" :props="treeProps" show-checkbox default-expand-all :default-checked-keys="defKeys" node-key="id">
			  
		  </el-tree>
		</el-dialog>
	</div>
</template>

<script>
	export default{
		created() {
			this.getrolesList();
		},
		data(){
			return{
				rolesList:[],
				setRightDialogVisible:false,
				rightsList:[],
				treeProps:{label:'authName',children:'children'},
				defKeys:[]
			}
		},methods:{
			async getrolesList(){
				const {data:res}=await this.$http.get('roles');
				this.rolesList=res.data;
				if(res.meta.status!==200)
					return this.$message.error('获取角色列表失败')
				console.log(res)
			},
			async removeById(role,rightId){
				const c=await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
				    cancelButtonText: '取消',
				    type: 'warning'
				}).catch(err=>err)
				if(c!=='confirm'){
					return this.$message.info('取消了删除')
				}
				const {data:res}=await this.$http.delete(`roles/${role.id}/rights/${rightId}`)
				if(res.meta.status!==200) return this.$message.info('取消权限失败')
				this.$message.success('取消权限成功')
				role.children=res.data
			},
			//展示分配权限对话框
			async showSetRightDialog(role){
				this.setRightDialogVisible = true
				const {data:res}=await this.$http.get(`rights/tree`)
				console.log('所有权限',res)
				if(res.meta.status!==200) return this.$message.info('获取权限列表失败')
				//把获取到的权限数据保存到data中
				this.rightsList=res.data				
				//递归获取三级节点的Id
				this.getLeafKeys(role,this.defKeys)			
			},
			/* 通过递归的形式，获取角色下的所有三级权限的id，并保存到 defkeys数组中*/
			getLeafKeys(node,arr){
				//如果当前node节点不包含children属性，则是三级节点
				if(!node.children){
					return arr.push(node.id)
				}
				node.children.forEach(item=>this.getLeafKeys(item,arr))
				
			},
			setRightDialogClosed(){
				this.defKeys=[]
			}
		}		
	}
</script>

<style lang="less" scoped>
	.el-tag{
		margin: 7px;
	}
	.bdbottom{
		border-bottom: 1px solid #EEEEEE;
	}
	.bdtop{
		border-top: 1px solid #EEEEEE;
	}
	.vcenter{
		display: flex;
		align-items: center;
	}
</style>
