<script setup lang="ts">
 import Sidebar from "./sidebar.vue"
 import Subject from "./subject.vue"
 import Head from "./Head.vue"
</script>
<template>
    <div class="common-layout">
      <el-container >
        <Sidebar/>
        <el-container  direction="vertical">
           <Head></Head>
           <Subject/>
        </el-container>
      </el-container>
    </div>
</template>

<style>
  .zt1{
    flex-direction: column;
  }
 
</style>