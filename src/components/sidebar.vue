<script setup lang="ts">
  
</script>

<template>
   <el-aside>
       <el-menu router>
            <a class="logo">
                <img src="../assets/logo1.png" class="img">
                <h1>学生系统</h1>
            </a>
        
           <el-menu-item index="/student">
              <el-icon><IEpSetting/></el-icon> <span>学生列表</span>
           </el-menu-item>
           <el-menu-item index="/score">
              <el-icon><IEpSetting/></el-icon> <span>成绩列表</span>
           </el-menu-item>
           <el-menu-item index="/team">
              <el-icon><IEpSetting/></el-icon> <span>班级信息</span>
           </el-menu-item>
           <el-menu-item index="/user">
              <el-icon><IEpSetting/></el-icon> <span>用户信息</span>
           </el-menu-item>
        </el-menu>
    </el-aside>    
</template>

<style lang="scss" scoped>

// 去横拉条
.el-aside::-webkit-scrollbar {
display: none;
}
.el-aside{
     background-color: darkcyan;;
    height: 100vh;
    width:auto;
}
.el-menu{
    background-color: darkcyan;
    width: 200px;
    height: 100%;
}
.logo{
display: flex;
justify-content: center;
align-items: center;
background-color: #eee
}
.img{
    width: 25px;
    height: 25px
    
}

</style>
  