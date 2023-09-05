<template>
   <el-form :inline="true" :model="formInline" class="demo-form-inline">
  <el-form-item >
    <el-input v-model="formQuery.paramOne" placeholder="姓名"></el-input>
  </el-form-item>
  <el-form-item >
    <el-input v-model="formQuery.paramTwo" placeholder="学号/班号"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">查询</el-button>
  </el-form-item>
  <el-form-item>
    <el-button type="success" @click="onSubmit">新增</el-button>
  </el-form-item>
</el-form>
    <el-table
   :data="tableData"
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
     width="200">
   </el-table-column>
   <el-table-column
     label="操作"
     width="200">
     <el-row>
       <el-button type="success">编辑</el-button>
       <el-button type="danger">删除</el-button>
      </el-row>
   </el-table-column>
 </el-table>
 <el-pagination
 background
    @current-change="handleCurrentChange"
    :current-page="this.page"
    layout="prev, pager, next"
    :total="total">
</el-pagination>
</template>
<script>
import axios from 'axios'

export default{
   data(){
       return{
         tableData:[],
         total:String,
         formQuery: {
          paramOne: '',
          paramTwo: ''
        }
       }
      },
      mounted(){
       axios({
       method: "post",
       headers: {'Content-Type': 'application/json'},
       url:"http://localhost:8080/user/getUser",
       data:JSON.stringify({pageSize:10,PageNum:this.page}),
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
      handleCurrentChange(val){
        this.page=val
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
      }
}

</script>
<style>
  .search{
   display:flex;
   width: 600px;
   height: 70px;
   
   .el-input{
     width: 180px;
     height: 40px;
     margin: auto;
     margin-left: 20px;
   }
 

 }
 .el-pagination{
  position: absolute;
  top: 90%;
   margin-left:40%;
}

</style>