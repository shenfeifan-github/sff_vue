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
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="number"
      label="学号">
    </el-table-column>
    <el-table-column
      prop="classNumber"
      label="班号">
    </el-table-column>
    
    <el-table-column
      prop="createTime"
      label="创建日期"
      width="250">
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
import { getPositionDataWithUnit } from 'element-plus'

export default{
    data(){
        return{
          tableData:[],
          total:String,
          page:1,
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
        url:"http://localhost:8080/student/getStudent",
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
        url:"http://localhost:8080/student/getStudent",
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
  .el-table-column{
    text-align: center;
    }
    .el-form {
      margin-left: 20px;
    }
</style>