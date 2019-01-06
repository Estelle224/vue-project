<template>
  <el-container class="container">
      <!-- 头部 -->
    <el-header class="header">
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <img src="@/assets/logo.png" alt>
          </div>
        </el-col>
        <el-col :span="18" class="middle">
          <h2>电商后台管理系统</h2>
        </el-col>
        <el-col :span="2">
          <a href class="loginout" @click.prevent="loginout()">退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
    <!-- 侧边栏导航 -->
      <el-aside class="aside" width="200px">
        <el-menu
          default-active="2"
          :unique-opened ="true"
          router
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>

            <el-menu-item index="user">
              <i class="el-icon-menu"></i>
              <span>用户列表</span>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="2-1">
              <i class="el-icon-menu"></i>
              <span>角色列表</span>
            </el-menu-item>
             <el-menu-item index="2-2">
              <i class="el-icon-menu"></i>
              <span>权限列表</span>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="3-1">
              <i class="el-icon-menu"></i>
              <span>商品列表</span>
            </el-menu-item>
            <el-menu-item index="3-1">
              <i class="el-icon-menu"></i>
              <span>分类参数</span>
            </el-menu-item>
            <el-menu-item index="3-1">
              <i class="el-icon-menu"></i>
              <span>商品分类</span>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="4-1">
              <i class="el-icon-menu"></i>
              <span>订单列表</span>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据管理</span>
            </template>
            <el-menu-item index="5-1">
              <i class="el-icon-menu"></i>
              <span>数据报表</span>
            </el-menu-item>
          </el-submenu>

        </el-menu>
      </el-aside>
    <!-- 主要内容部分 -->
      <el-main class="main">

        <router-view></router-view>

      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
    beforeCreate() {
        if(!localStorage.getItem('token')) {
            this.$router.push({
                 name: 'login'
            })
            this.$message.warning('请登录后查看')
        }
    },
  methods: {
    loginout() {
        // 1.清除localStorage
        localStorage.clear()
        // 2.页面跳转到登录页面
        this.$router.push({
            name: 'login'
        })
        // 3.提示退出消息
        this.$message.success('退出成功');
    }
  }
};
</script>

<style>
.container {
  height: 100%;
}
.header {
  background: #b1becf;
}
.middle h2 {
  text-align: center;
  /* h2有默认样式 */
  line-height: 60px;
}
.loginout {
  line-height: 60px;
}
.main {
  background: #E8EDF3;
}

</style>
