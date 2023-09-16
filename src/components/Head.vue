<template>
    <el-header>
        <div id="title">
            <h1 >欢迎来到同响同学管理系统!</h1>
        </div>
        <div id="user">
        <el-row class="demo-avatar demo-basic">
         <el-col :span="12">
          <div>
             <div class="block"><el-avatar :size="50" :src="userInfo.profile"></el-avatar></div>
          </div>
         </el-col>  
        </el-row>
        
        <el-dropdown split-button type="primary">更多
      <template v-slot:dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
                <el-button type="primary" icon="el-icon-check">
                用户信息</el-button>
            </el-dropdown-item>
            <el-dropdown-item>
            <el-button type="warning" icon="el-icon-check"
              >修改头像</el-button>
            </el-dropdown-item>
          <el-dropdown-item>
            <el-button type="danger" icon="el-icon-check">
              退出登录</el-button
            ></el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
</div>
    </el-header>
</template>
<script>
  export default {
    data () {
      return {
        userInfo:[]
      }
    },
    methods: {
      open() {
        this.$alert('message', '用户信息', {
          confirmButtonText: '确定',
          callback: action => {
          }
        });
      }
    },
    created() {
   this.userInfo = JSON.parse(localStorage.getItem('userInfo'));//将全局缓存的token数据赋值给token
   console.log('获取到的缓存数据',this.userInfo)
},
  }
</script>
<style>
  .el-header{
   display: flex;
      background-color: #c7e4f8;
      height: 10vh;
    
  }
 #title{
    margin: auto;
    margin-left: 450px;
  }
  .el-avatar{
   
   margin-top: 5px;
   
   
  }
  #user{
    display: flex;
    width: 180px;
    margin-right: 10px;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .el-dropdown{
    margin: auto;
    margin-right: 10px;
  }
</style>