<template>
    <div class="search">
   <el-input v-model="input" placeholder="用户名称"></el-input>
   <el-input v-model="input" placeholder="手机号"></el-input>
 <el-row>
 <el-button type="primary" round class="but1">查询</el-button>   
</el-row>
 </div>
    <el-table
   :data="tableData"
   style="width: 100%">
   <el-table-column
     prop="userName"
     label="用户名称"
     width="100">
   </el-table-column>
   <el-table-column
     prop="phone"
     label="手机号"
     width="180">
   </el-table-column>
   <el-table-column
     prop="account"
     label="密码">
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
     width="250">
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
         total:String
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
  .el-pagination{
       position: absolute;
       top: 570px;
       left: 460px;
     
  }

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
   .but1{
     margin: auto;
     margin-right: 70px;
   }
 }
</style>