<template>
  <div class="zt-head">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
  <el-form-item >
    <el-input v-model="formQuery.paramOne" placeholder="姓名" class="input1"></el-input>
  </el-form-item>
  <el-form-item >
    <el-input v-model="formQuery.paramTwo" placeholder="手机号" class="input1"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="getUser()" class="but-1">查询</el-button>
  </el-form-item>
  <el-form-item>
    <el-dialog
  :title=dialogName
  v-model="dialogVisible"
  width="50%" height="80px">
  <el-form :model="userForm" :rules="rules" :inline="true" ref="userForm" label-width="80px" class="demo-ruleForm">
   <el-form-item label="用户名称" prop="userName">
    <el-input placeholder="请输入用户名称" v-model="userForm.userName"></el-input>
   </el-form-item>
   <el-form-item label="手机号" prop="phone">
    <el-input placeholder="请输入手机号" v-model="userForm.phone"></el-input>
   </el-form-item>
   <el-form-item label="密码" prop="account">
    <el-input placeholder="请输入密码" v-model="userForm.account"></el-input>
   </el-form-item>
   <el-form-item label="年龄" prop="age">
    <el-input placeholder="请输入年龄" v-model="userForm.age"></el-input>
   </el-form-item>
   <el-form-item label="性别" prop="sex">
    <el-select v-model="userForm.sex" placeholder="请选择性别">
      <el-option label="男" value="0"></el-option>
      <el-option label="女" value="1"></el-option>
    </el-select>
  </el-form-item>
</el-form>
  
<el-form-item>
  <el-button :plain="true" type="primary" @click="submitForm('userForm')">确认</el-button>
    <el-button @click="resetForm('userForm')">重置</el-button>
</el-form-item>
   

</el-dialog>
<el-button type="success" @click="addUser()" class="but-1">新增</el-button>
  </el-form-item>
</el-form>
  </div>
  <div class="zt-table">
    <el-table
   :data="tableData"
    border
   style="width: 100%">
   <el-table-column
     prop="userName"
     label="用户名称"
     width="180">
   </el-table-column>
   <el-table-column
     prop="phone"
     label="手机号"
     width="150">
   </el-table-column>
   <el-table-column
     prop="account"
     label="密码"
     width="150">
   </el-table-column>
   <el-table-column
     prop="profile"
     label="头像"
     width="100">
     <template v-slot:default="scope"> 
          <el-image :src="scope.row.profile" style="height: 40px ;width: 40px;border-radius: 50%;" />
        </template>    
   </el-table-column>
   <el-table-column
     prop="age"
     label="年龄"
     width="100">
   </el-table-column>
   <el-table-column
     prop="sex"
     label="性别"
     width="100">
   </el-table-column>
   <el-table-column
     prop="createTime"
     label="创建日期"
     width="250">
   </el-table-column>
   <el-table-column
     label="操作"
     width="330">
     <template #default="scope">
      <el-row>
       <el-button type="success" @click="updateUserById(scope.row)">编辑</el-button>
       <el-button type="danger" @click="removeUserById(scope.row)">删除</el-button>
      </el-row>
     </template>
    
   </el-table-column>
 </el-table>
  </div>
    <div class="zt-fy">
      <el-pagination
 background
    @current-change="handleCurrentChange"
    :current-page="this.page"
    layout="prev, pager, next"
    :total="total">
</el-pagination>
    </div>
 
</template>
<script>
import axios from 'axios'

export default{
   data(){
       return{
        dialogVisible: false,
         dialogName:'',
         tableData:[],
         message:String,
         code:Number,
         userForm:{
        userName:'',
        phone: '',
        account: '',
        age: '',
        sex: '',
         },
         total:String,
         page:1,
         formQuery: {
          paramOne: '',
          paramTwo: ''
        },
        rules: {
          userName: [
            { required: true, message: '请输入用户名称', trigger: 'blur' },
          ],
          phone: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { min: 11, max: 11, message: '手机号格式错误', trigger: 'blur' }
             ],
             account: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
          age: [
            { required: true, message: '请输入年龄', trigger: 'blur' }
          ],
          sex: [
            { required: true, message: '请选择性别', trigger: 'blur' }
          ],
       
         
       
        }
       }
      },
      mounted(){
       axios({
       method: "post",
       headers: {'Content-Type': 'application/json'},
       url:"http://localhost:8080/user/getUser",
       data:JSON.stringify({pageSize:10,pageNum:this.page}),
   })
      .then(res=>{
       this.tableData=res.data.data.list
       this.total=res.data.data.total
       console.log(res)
      }).catch(function (error){ 
       console.log(error);
     })
   },
   methods:{
    getUser(){
      axios({
       method: "post",
       headers: {'Content-Type': 'application/json'},
       url:"http://localhost:8080/user/getUser",
       data:JSON.stringify({pageSize:10,pageNum:this.page,paramOne:this.formQuery.paramOne,paramTwo:this.formQuery.paramTwo}),
   })
      .then(res=>{
       this.tableData=res.data.data.list
       this.total=res.data.data.total
       console.log(res)
      }).catch(function (error){ 
       console.log(error);
     })
    },
    saveUser(){
      axios({
       method: "post",
       headers: {'Content-Type': 'application/json'},
       url:"http://localhost:8080/user/saveUser",
       data:JSON.stringify(this.userForm),
   })
      .then(res=>{
       this.message=res.data.message
       this.code=res.data.code
       if( this.code==10200){
        this.getUser()
       }
       this.open()
      }).catch(function (error){ 
       console.log(error);
     })
    },
      handleCurrentChange(val){
        this.page=val
      this.getUser()
  },
  removeUserById(row){
    axios({
      method: "post",
      headers: { 'Content-Type': 'multipart/form-data'},
      url:"http://localhost:8080/user/removeUser",
      data:{ids:row.id}
    }).then(res=>{
      this.message=res.data.message
      this.code=res.data.code
      this.getUser()
      this.open()
    }).catch(function(error){
      console.log(error);
    })
  },
  addUser(){
    this.dialogVisible = true
    this.dialogName="新增用户"
  },
  updateUserById(row){
    this.dialogVisible = true
    this.dialogName="编辑用户"
    this.userForm={...row}
  },
  submitForm(formName) {
    this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dialogVisible=false
             this.saveUser();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      open() {
        if(this.code==10200){
          this.$message({
          message:this.message,
          type: 'success',
          })
        }else{
          this.$message.error(this.message);
        }
      },
    }
      }


</script>
<style>
.zt-head{
  display:flex;
 
   width: 100%;
   height: 10%;
}
.zt-table{
  display:flex;
   width: 100%;
   height: 80%;
}
.zt-fy{
  display:flex;
  justify-content: center;
  margin-top: 5px;
   width: 100%;
   height:10%;
}
  
 .input1{
   margin-top: -15px;
   margin-left: 20px;
 }
 .but-1{
  margin-top: -15px;
 }
 


</style>