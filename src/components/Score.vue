<template>
<div class="zt-head">
<el-form :inline="true" :model="formQuery" class="demo-form-inline">
  <el-form-item >
    <el-input v-model="formQuery.paramOne" placeholder="姓名" class="input1"></el-input>
  </el-form-item>
  <el-form-item >
    <el-select v-model="team.value" placeholder="请选择班级" class="input1">
    <el-option 
      v-for="item in team" @change="change"	
      :key="item.codeshare"
      :label="item.className"
      :value="item.codeshare">
    </el-option>
  </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="getScore()" class="but-1">查询</el-button>
  </el-form-item>
  <el-form-item>
    <el-button type="success" @click="onSubmit" class="but-1">导出</el-button>
  </el-form-item>
</el-form>
</div>
<div class="zt-table">
    <el-table
    :data="tableData"
    border
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
          tableData:[],
          total:String,
          team:[
            {className:'',
            classNumber:''
             }
          ],
          page:1,
          input: '',
          
          formQuery: {
          paramOne: '',

         
        }
        }
       },
       mounted(){
        axios({
        method: "post",
        headers: {'Content-Type': 'application/json'},
        url:"http://localhost:8080/score/getScore",
        data:JSON.stringify({pageSize:10,pageNum:this.page,paramOne:this.formQuery.paramOne,classNumber:this.team.classNumber}),
         })
       .then(res=>{
        this.tableData=res.data.data.list
        this.total=res.data.data.total
        console.log(res)
       }).catch(function (error){ 
        console.log(error);
      });
      axios({
        method: "get",
        url:"http://localhost:8080/grade/getGradeName",
    })
       .then(res=>{
       this.team=res.data.data
        console.log(res)
       }).catch(function (error){ 
        console.log(error);
      })
    },
    methods:{
     getScore(){
          axios({
        method: "post",
        headers: {'Content-Type': 'application/json'},
        url:"http://localhost:8080/score/getScore",
        data:JSON.stringify({pageSize:10,pageNum:this.page,paramOne:this.formQuery.paramOne,classNumber:this.team.value}),
         })
       .then(res=>{
        this.tableData=res.data.data.list
        this.total=res.data.data.total
        console.log(res)
       }).catch(function (error){ 
        console.log(error);
      });
        },
       
      handleCurrentChange(val){
        this.page=val
        axios({
        method: "post",
        headers: {'Content-Type': 'application/json'},
        url:"http://localhost:8080/score/getScore",
        data:JSON.stringify({pageSize:10,pageNum:this.page,paramOne:this.formQuery.paramOne,classNumber:this.team.value}),
         })
       .then(res=>{
        this.tableData=res.data.data.list
        this.total=res.data.data.total
        console.log(res)
       }).catch(function (error){ 
        console.log(error);
      })
  },
  change(val){
    this.team=val
    console.log(val)
  }
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
    #but2{
      position: absolute;
      top: 20px;
      left:1000px;
    }
  }
</style>