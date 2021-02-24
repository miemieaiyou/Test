<template>
	<div class="login-container">
		<div class="login-box">
			<!-- 头像区域 -->
			<div class="avatar-box">
				<img src="../assets/logo.png" />
			</div>
			<!-- 登录表单区域 -->
			<div>
				<el-form :rules="loginformRules" label-width="70px" class="login-form" :model="loginform" ref="loginformref">
					<!-- 用户名 -->
					<el-form-item label="用户名" prop="username">
					  <el-input v-model="loginform.username" prefix-icon="iconfont icon-user"></el-input>
					</el-form-item>
					<!-- 密码 -->
					<el-form-item label="密码" prop="password">
					  <el-input v-model="loginform.password" prefix-icon="iconfont icon-3702mima" type="password"></el-input>
					</el-form-item>
					<el-form-item class="btns">
						<el-button type="primary" @click="login">登录</el-button>
						<el-button type="info" @click="resetLoginForm">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				loginform:{username:'admin',password:'123456'},
				loginformRules:{
					username:[
						{ required: true, message: '请输入用户名', trigger: 'blur' },
						{ min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
					],
					password:[
						{ required: true, message: '请输入密码', trigger: 'blur' },
						{ min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
					]
				}
			}
		},methods:{
			/* 表单重置 */
			resetLoginForm(){
				this.$refs.loginformref.resetFields();
			},
			login(){
				this.$refs.loginformref.validate(async (value)=>{
					if(!value) return;
					//请求路径login 加await在异步方法async中，让返回值从promise变成data
					//const result=await this.$http.post('login',this.loginform);
					//解析输出data
					const {data:res}=await this.$http.post('login',this.loginform);
					if(res.meta.status!==200)
						return this.$message.error("登录失败!")
					else
						this.$message.success("登录成功!")
					//保存token
					window.sessionStorage.setItem('token',res.data.token)
					this.$router.push('/Main')
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.login-container{
		background-color: #005783;
		height: 100vh;
	}
	.login-box{
		width: 450px;
		height: 300px;
		background-color: #ffffff;
		border-radius: 3px;  /* 圆角边框 */
		position: absolute;  /* 绝对定位 */
		left: 50%;
		top:50%;
		transform:translate(-50%,-50%)  /* 设置位移 */
	}
	.avatar-box{
		height: 130px;
		width: 130px;
		border: 1px #eee solid;
		border-radius: 50%;
		padding: 10px; /* 使图片与边框有一定的距离 */
		box-shadow:0 0 10px #B3C0D1; /* 给边框添加阴影 */
		position: absolute;
		left:50%;
		transform: translate(-50%,-50%);
		background-color: #ffffff;
		img{
			width: 100%;
			height: 100%;
			border-radius: 50%;
			background-color: #eee;
		}
	}
	.btns{
		display: flex;
		justify-content: flex-end; /* 弹性盒子，位于尾部*/
	}
	.login-form{
		position: absolute;
		bottom: 0;
		width: 100%;
		padding: 0 20px;
		box-sizing: border-box;
	}
</style>
