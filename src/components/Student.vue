<template>
   <div class="zt-head">
  <el-form :inline="true" :model="formQuery" class="demo-form-inline">
  <el-form-item >
    <el-input v-model="formQuery.paramOne" placeholder="姓名" class="input1"></el-input>
  </el-form-item>
  <el-form-item >
    <el-input v-model="formQuery.paramTwo" placeholder="学号/班号" class="input1"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="getStudent()" class="but-1">查询</el-button>
  </el-form-item>
  <el-form-item>
    <el-button type="success" class="but-1">新增</el-button>
  
  </el-form-item>
</el-form>
   </div>
   <div class="zt-table">
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
    data() {
        return {
            tableData: [],
            total: String,
            page: 1,
            formQuery: {
                paramOne: '',
                paramTwo: '',
          
            }
        };
    },
    mounted() {
        axios({
            method: "post",
            headers: { 'Content-Type': 'application/json' },
            url: "http://localhost:8080/student/getStudent",
            data: JSON.stringify({ pageSize: 10, PageNum: this.page }),
        })
            .then(res => {
            this.tableData = res.data.data.list;
            this.total = res.data.data.total;
            console.log(res);
        }).catch(function (error) {
            console.log(error);
        });
    },
    methods: {
        getStudent() {
            axios({
                method: "post",
                headers: { 'Content-Type': 'application/json' },
                url: "http://localhost:8080/student/getStudent",
                data: JSON.stringify({ paramOne: this.formQuery.paramOne, paramTwo: this.formQuery.paramTwo }),
            })
                .then(res => {
                this.tableData = res.data.data.list;
                this.total = res.data.data.total;
                console.log(res);
            }).catch(function (error) {
                console.log(error);
            });
        },
        handleCurrentChange(val) {
            this.page = val;
            axios({
                method: "post",
                headers: { 'Content-Type': 'application/json' },
                url: "http://localhost:8080/student/getStudent",
                data: JSON.stringify({ pageSize: 10, pageNum: this.page, paramOne: this.formQuery.paramOne, paramTwo: this.formQuery.paramTwo }),
            })
                .then(res => {
                this.tableData = res.data.data.list;
                this.total = res.data.data.total;
                console.log(res);
            }).catch(function (error) {
                console.log(error);
            });
        },
    },
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