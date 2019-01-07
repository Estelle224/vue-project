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
        <el-menu default-active="2" :unique-opened="true" router>
           <!--  -->
          <el-submenu :index="''+v.order" v-for="v in aside1" :key="v.id">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{v.authName}}</span>
            </template>
            <el-menu-item :index="v1.path" v-for="v1 in v.children" :key="v1.id">
              <i class="el-icon-menu"></i>
              <span>{{v1.authName}}</span>
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
    // if (!localStorage.getItem("token")) {
    //   this.$router.push({
    //     name: "login"
    //   });
    //   this.$message.warning("请登录后查看");
    // }
  },
   created() {
      this.aside()
    },
  data() {
    return {
      aside1:[]
    }
  },
  methods: {
    // 调用方法a
    // 侧边栏动态生成
    async aside() {
      const asidedata = await this.$http.get('menus');
      console.log(asidedata.data.data)
      this.aside1 = asidedata.data.data
    },
    // 登录页面
    loginout() {
      // 1.清除localStorage
      localStorage.clear();
      // 2.页面跳转到登录页面
      this.$router.push({
        name: "login"
      });
      // 3.提示退出消息
      this.$message.success("退出成功");
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
  background: #e8edf3;
}
</style>



