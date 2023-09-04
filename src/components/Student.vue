<template>
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
</style>