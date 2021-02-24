<template>
	<div>
		<!-- 面包屑导航区域 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{path:'/Welcome'}">首页</el-breadcrumb-item>
			<el-breadcrumb-item>用户管理</el-breadcrumb-item>
			<el-breadcrumb-item>用户列表</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 卡片视图区 -->
		<el-card >
			<el-row :gutter="20">
				<el-col :span="8">
					<!-- 搜索与添加区域 -->
					<el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="searchUser">
					    <el-button slot="append" icon="el-icon-search" @click="searchUser"></el-button>
					</el-input>
				</el-col>
				<el-col :span="4">
					<el-button type="primary" @click="dialogVisible =true">添加用户</el-button>
				</el-col>
			</el-row>
			<!-- 用户列表区域 -->
			<el-table :data="userlist" border stripe>
				<el-table-column type="index" label="#"></el-table-column>
			    <el-table-column prop="username" label="姓名"></el-table-column>
			    <el-table-column prop="email" label="邮箱"></el-table-column>
				<el-table-column prop="mobile" label="电话"></el-table-column>
				<el-table-column prop="role_name" label="角色"></el-table-column>
				<el-table-column label="状态">
					<template v-slot="scope">
						<el-switch v-model="scope.row.mg_state" @change="userStageChange(scope.row)"></el-switch>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="180px">
					<template v-slot="scope">
						<el-button type="primary" icon="el-icon-edit" size="mini" @click="ShowEditDialog(scope.row.id)"></el-button>
						<el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteUser(scope.row.id)"></el-button>
						<el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
							<el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
						</el-tooltip>						
					</template>
				</el-table-column>
			</el-table>
			<!-- 分页区域 -->
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pagenum"
			    :page-sizes="[1, 2, 3, 5]" :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
			</el-pagination>
		</el-card>
		<!-- 添加用户的对话框 -->
		<el-dialog title="添加用户" :visible.sync="dialogVisible" width="50%" @close="addCloseDialog">
			<!-- 内容主题区域 -->
			<el-form ref="addFormRef" :model="addForm" :rules="addFormRules" label-width="80px" size="mini">
				<el-form-item label="用户名" prop="username">
					<el-input v-model="addForm.username"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="addForm.password" type="password"></el-input>
				</el-form-item>
				<el-form-item label="邮箱" prop="email">
					<el-input v-model="addForm.email"></el-input>
				</el-form-item>
				<el-form-item label="手机号" prop="mobile">
					<el-input v-model="addForm.mobile"></el-input>
				</el-form-item>
			</el-form>
			<!-- 底部区域 -->
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="addUser">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 更新用户对话框 -->
		<el-dialog title="修改用户信息" :visible.sync="showEditDialog" width="50%">
			<!-- 内容主题区域 -->
			<el-form ref="updateFormRef" :model="updateForm" :rules="updateFormRules" label-width="80px" size="mini">
				<el-form-item label="用户名" prop="username">
					<el-input v-model="updateForm.username" disabled></el-input>
				</el-form-item>
				<el-form-item label="邮箱" prop="email">
					<el-input v-model="updateForm.email"></el-input>
				</el-form-item>
				<el-form-item label="手机号" prop="mobile">
					<el-input v-model="updateForm.mobile"></el-input>
				</el-form-item>
			</el-form>
			<!-- 底部区域 -->
			<span slot="footer" class="dialog-footer">
				<el-button @click="showEditDialog = false">取 消</el-button>
				<el-button type="primary" @click="updateUser">确 定</el-button>
			</span>
		</el-dialog>

	</div>
</template>

<script>
	export default{
		created() {
			this.getUserList();
		},
		data(){
			//验证邮箱的正则表达式
			var checkEmail=(rule,value,cb)=>{
				const regEmail=/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
				if(regEmail.test(value)){
					//合法的邮箱
					return cb();
				}
				cb(new Error('请输入合法的邮箱'));
			}
			//验证手机号的正则表达式
			var checkTel=(rule,value,cb)=>{
				const regTel=/^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/;
				if(regTel.test(value)){
					return cb();
				}
				cb(new Error('请输入合法的手机号'))
			}
			return{
				queryInfo:{
					query:'', //查询参数
					pagenum:1, //当前页码
					pagesize:5 //每页显示条数
				},
				userlist:[],
				total:0,
				//控制添加对话框的显示与隐藏
				dialogVisible:false,
				showEditDialog:false,
				/* 添加用户的表单数据 */
				addForm:{username:'',password:'',email:'',mobile:''},
				updateForm:{},
				//添加表单的验证规则对象
				addFormRules:{
					username:[
						{ required: true, message: '请输入用户名', trigger: 'blur' },
						{ min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
					],
					password:[
						{ required: true, message: '请输入密码', trigger: 'blur' },
						{ min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
					],
					email:[
						{ required: true, message: '请输入邮箱', trigger: 'blur' },
						{ validator:checkEmail, trigger: 'blur' }
					],
					mobile:[
						{ required: true, message: '请输入手机号', trigger: 'blur' },
						{ validator:checkTel, trigger: 'blur' }
					],
					
				},
				updateFormRules:{
					email:[
						{ required: true, message: '请输入邮箱', trigger: 'blur' },
						{ validator:checkEmail, trigger: 'blur' },
					],
					mobile:[
						{ required: true, message: '请输入手机号', trigger: 'blur' },
						{ validator:checkTel, trigger: 'blur' }
					],
				}
			}
		},methods:{
			async getUserList(){
				const {data:res}=await this.$http.get('users',{params:this.queryInfo});
				if(res.meta.status!==200)
					return this.$message.error('获取用户列表失败')
				this.userlist=res.data.users;
				this.total=res.data.total;
			},
			//监听pagesize改变的事件
			handleSizeChange(newSize){
				this.queryInfo.pagesize=newSize;
				this.getUserList();
			},
			//监听页码值改变的事件
			handleCurrentChange(newPage){
				this.queryInfo.pagenum=newPage;
				this.getUserList();
			},
			//用户状态更改
			async userStageChange(information){
				const{data:res}= await this.$http.put(`users/${information.id}/state/${information.mg_state}`);
				console.log(res);
				if(res.meta.status!=200){
					this.$message.error('更新用户状态失败')
					information.mg_state=!information.mg_state
				}	
				this.$message.success('更新用户状态成功')
			},
			searchUser(){
				this.getUserList();
			},
			//关闭之后清空数据
			addCloseDialog(){
				this.$refs.addFormRef.resetFields();
			},
			//添加新用户
			addUser(){
				this.$refs.addFormRef.validate(async (valid)=>{
					//校验失败返回
					if(!valid) return;
					const {data:res}= await this.$http.post('users',this.addForm);
					if(res.meta.status!==201)
						return this.$message.error("用户添加失败!")
					this.$message.success("用户添加成功!")
					this.dialogVisible=false;
					this.getUserList();
				})
			},
			//打开修改用户信息窗口
			async ShowEditDialog(id){
				this.showEditDialog=true;
				const {data:res}=await this.$http.get('users/'+id)
				if(res.meta.status!==200) 
					return this.$message.error('查询用户信息失败')
				//查询到的用户信息赋值给updateForm
				this.updateForm=res.data
				console.log(res)
			},
			updateUser(){
				this.$refs.updateFormRef.validate(async value=>{
					if(!value) return;
					const {data:res}=await this.$http.put(`users/${this.updateForm.id}`,this.updateForm);
					if(res.meta.status!==200)
						return this.$message.error('用户修改失败')
					this.$message.success('用户修改成功')
					this.showEditDialog=false;
					this.searchUser();
				})
			},
			async deleteUser(id){
				//用户删除确认弹窗 若确认c=confirm 若取消c=cancel
				const c=await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
				          confirmButtonText: '确定',
				          cancelButtonText: '取消',
				          type: 'warning',
				          center: true
				        }).catch(err=>{
							return err
						})
				if(c!=='confirm')
					return this.$message.info('已取消删除')
				const {data:res}=await this.$http.delete('users/'+id)
				if(res.meta.status!==200)
					return this.$message.error('用户删除失败')
				this.$message.success('用户删除成功')
				this.getUserList()
			}
		}
	}
</script>

<style>
</style>
