<template>
        <div id="postter">
            <div id="boy">
        <H3 id="h3">登录系统</H3>
   <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="手机号" prop="phone">
    <el-input v-model="loginForm.phone" placeholder="请输入手机号"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="account">
    <el-input v-model="loginForm.account"  placeholder="请输入密码"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button :plain="true" id="butt2" type="primary"  @click="submitForm('loginForm')">登录</el-button>
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
        userData:[],
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
            axios({
        method: "post",
        headers: {'Content-Type': 'application/json'},
        url:"http://localhost:8080/user/getLogin",
        data:JSON.stringify({phone:this.loginForm.phone,account:this.loginForm.account}),
         })
       .then(res=>{
        this.user=res.data.data
        this.userData=res.data 
        if(res.data.code==10200){
          localStorage.setItem("userInfo", JSON.stringify(res.data.data)),
          console.log("放入缓存数据"+res.data.data),
          this.$router.push("/home")
         this.open();
        }else{
          this.open();
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
      open() {
        console.log(this.userData)
        if(this.userData.code==10200){
          this.$message({
          message:this.userData.message,
          type: 'success',
          })
        }else{
          this.$message.error(this.userData.message);
        }
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style>
.html,body,#app{
  height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;
}
  #postter{
    height: 100vh;
    background-color: #eee;
    background-image:url('../assets/2.jpg');
    background-size:100% 100%;
    position: relative;
  }
  #boy{
    display:flex;
    flex-direction: column;
    justify-content: center;
    font-size: 30px;
    width:450px;
    height:550px;
    border-radius:10px;
    position: relative;
    top: 100px;
    left: 1000px;
    background-color: #99a9bf;
  }
  #h3{
    text-align: center;
    margin-left: 30px;
    margin-top: -80px;
  }
  .el-result{
    display:none;
    width: 400px;
    height: 20px;
    position: relative;
    top: -10px;
    left: 10px;
    .el-result__title{
      margin: -10px;
      
    }
  }
  
  .el-form-item{
    margin-top: 30px;
    .el-input{
       width:250px;
       height:45px;
       margin: auto,
       
      
    }
    #butt2{
      position: relative;
        top: 30px;
        left: 10px;
        width:100px;
       height:45px;
    }
  }
  #butt3{
    position: relative;
        top: 110px;
        left: -15px;
    width:250px;
    height:45px;
    
  }
 </style>