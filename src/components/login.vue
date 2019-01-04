<template>
  <div class="box">
    <el-form class="form" :label-position="labelPosition" label-width="80px" :model="loginData">
      <h2>用户登录</h2>
      <el-form-item label="姓名">
        <el-input v-model="loginData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="loginData.password"></el-input>
      </el-form-item>
     <el-button class="btn" type="primary" @click.prevent="loginIf()">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
     data() {
      return {
        labelPosition: 'top',
        loginData: {
          username: '',
          password: '',
        }
      };
    },
    methods:{
        // 登录按钮的方法
        // loginIf() {
        //     // console.log('aaa')
        //     this.$http.post('login',this.loginData)
        //               .then((res)=> {
        //                 console.log(res);
        //                 const {data:{data,meta:{msg,status}}}=res;
        //                 if(status==200) {
        //                     this.$router.push({
        //                       name: 'home'
        //                     })
        //                 }else {
        //                   alert(msg);
        //                 }
        //               })
        // }
        // 登录按钮简化写法---采用es7中的await+async来简化函数层层嵌套的问题-使用await+async只是让异步操作看起来同步
       async loginIf() {
            // console.log('aaa')
          const loginIn = await this.$http.post('login',this.loginData)
            // console.log(loginIn)  ///此处获取的就是发送请求获取的结果
             const {data:{data,meta:{msg,status}}}=loginIn;
            //  保存data中的token值（将来可能会在别的页面使用）---
            localStorage.setItem('token',data.token);
            // 将来获取getItem来获取
             if (status == 200) {
               this.$router.push({
                  name: 'home'
               })
             }
        }
    }
};
</script>

<style>
.box {
    height: 100%;
    background-color: #314052;
    /* 使用弹性布局让其居中  */
    display: flex;
    justify-content: center;
    align-items:center;
}
.box .form {
    height: 350px;
    width:350px;
    background-color: #ffffff;
    border-radius:10px; 
    padding:20px;
}
.box .form .btn {
    width: 100%;
}

</style>
