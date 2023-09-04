<template>
        <div id="postter">
            <div id="boy">
        <H3>登录系统</H3>
   <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="手机号" prop="phone">
    <el-input v-model="loginForm.phone" placeholder="请输入手机号"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="account">
    <el-input v-model="loginForm.account"  placeholder="请输入密码"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button id="butt1" type="primary" @click="submitForm('loginForm')">登录</el-button>
    <el-button id="butt2" @click="resetForm('loginForm')">重置</el-button>
    <el-button id="butt3" type="success">立即注册</el-button>
  </el-form-item>
</el-form>
</div>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name:"Login",
    data() {
      return {
        user:[],
        loginForm: {
            phone: '',
            account: '',
        },
        rules: {
            phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { min: 11, max: 11, message: '手机号码格式错误！', trigger: 'blur' }
          ],
          account: [
            { required: true, message: '请输入密码',trigger: 'blur' }
         ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.loginForm)
            console.log(this.user)
            axios({
        method: "post",
        headers: {'Content-Type': 'application/json'},
        url:"http://localhost:8080/user/getLogin",
       
        data:JSON.stringify({phone:this.loginForm.phone,account:this.loginForm.account}),
         })
       .then(res=>{
        this.user=res.data.data
        console.log(res)
        if(res.data.code==10200){
          this.$router.push("/home")
        }else{
          alert(res.data.message)
        }
       
       }).catch(function (error){ 
        console.log(error);
      })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style>
  #postter{
    background-color: #eee;
    height: 730px;
    background-image:url('../assets/2.jpg');
    background-size:100% 100%;
  }
  #boy{
    text-align: center;
    font-size: 30px;
    width:400px;
    height:500px;
    border-radius:10px;
    position: absolute;
    top:80px;
    right:80px;
    background-color: #99a9bf;
  }
  .el-form-item{
    margin-top: 30px;
    .el-input{
       width:200px;
       height:45px;
    }
    .el-button{
        width:90px;
       height:45px;
    }
  }
  #butt3{
    position: absolute;
    width:200px;
    top:150px;
     right:105px;
  }
 </style>