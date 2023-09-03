<template>
     <div class="search">
    <el-input v-model="input" placeholder="班级名称/班号"></el-input>
    <el-input v-model="input" placeholder="班长/班主任/学习委员"></el-input>
  <el-row>
  <el-button type="primary" round class="but1">查询</el-button>   
</el-row>
  </div>
     <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      prop="codeshare"
      label="班号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="className"
      label="班级名称">
    </el-table-column>
    <el-table-column
      prop="charge"
      label="班主任">
    </el-table-column>
    
    <el-table-column
      prop="monitor"
      label="班长"
      width="180">
    </el-table-column>
    <el-table-column
      prop="commissary"
      label="学习委员"
      width="180">
    </el-table-column>
    <el-table-column
      prop="createTime"
      label="创建日期"
      width="180">
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
        url:"http://localhost:8080/grade/getGrade",
        data:JSON.stringify({}),
    })
       .then(res=>{
        this.tableData=res.data.data.list
        this.total=res.data.data.total
        console.log(res)
       }).catch(function (error){ 
        console.log(error);
      })
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