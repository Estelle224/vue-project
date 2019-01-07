<template>
     <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{level1}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{level2}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {
//    注意：写在data中的数据值只能来源于本身
//         如果在使用的时候进行传值就要使用props进行传值
props:['level1','level2']
}
</script>

<style>

</style>
