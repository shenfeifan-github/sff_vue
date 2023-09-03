<template>
  <div class="search">
    <el-input v-model="input" placeholder="请输入姓名"></el-input>
   <el-select v-model="value" placeholder="请选择班级">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  <el-row>
  <el-button type="primary" round class="but4">查询</el-button>
  <el-button type="success" round class="but2">导出</el-button>  
  
</el-row>
  </div>


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
      prop="className"
      label="班级">
    </el-table-column>
    <el-table-column
      prop="philology"
      label="语文">
    </el-table-column>
    <el-table-column
      prop="mathematics"
      label="数学">
    </el-table-column>
    <el-table-column
      prop="english"
      label="英语">
    </el-table-column>
    <el-table-column
      prop="physics"
      label="物理">
    </el-table-column>
    <el-table-column
      prop="biology"
      label="生物">
    </el-table-column>
    <el-table-column
      prop="biology"
      label="生物">
    </el-table-column>
    <el-table-column
      prop="integerscience"
      label="理综">
    </el-table-column>
    <el-table-column
      prop="general"
      label="总分">
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
          page:1,
          input: ''
        }
       },
       mounted(){
        axios({
        method: "post",
        headers: {'Content-Type': 'application/json'},
        url:"http://localhost:8080/score/getScore",
        data:JSON.stringify({}),
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
        url:"http://localhost:8080/score/getScore",
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
      width: 200px;
      height: 40px;
      margin: auto;
      margin-left: 20px;
    }
    .el-select {
      width: 100px;
      height: 40px;
      margin: auto;
      margin-right: 150px;
     
    }
    .but4{
      margin: auto;
      margin-right: 70px;
    }
    .but2{
      position: absolute;
      top: 20px;
      left: 580px;
    }
  }
</style>