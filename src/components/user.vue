<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <my-bread level1="用户管理" level2="用户列表"></my-bread>
    <!-- 输入框+按钮 -->
    <el-row>
      <el-col>
        <el-input placeholder="请输入内容" v-model="query" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="searchUser()"></el-button>
        </el-input>
        <el-button type="success" plain @click="showUserAdd()">添加按钮</el-button>
      </el-col>
    </el-row>
    <!-- 数据表格 -->
    <el-table class="table" :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="#" width="100"></el-table-column>
      <el-table-column prop="username" label="姓名" width="100"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="100"></el-table-column>
      <!-- 日期格式化 -->
      <!-- 1.template当单元格的数据不是简单的字符时--使用template来包裹要处理的数据
      2.template有一个属性slot-scope=值，此时的值会自动锁定外层的数据源，就是tableData
      3.list.row就是数组中的每一个对象
      4.slot-scope作用：就是上下级传递数据-->
      <!-- ???????????????????????????? -->
      <el-table-column prop="create_time" label="创建日期" width="120">
        <template slot-scope="list">{{list.row.create_time|formdata}}</template>
      </el-table-column>
      <el-table-column prop="mg_state" label="用户状态" width="180">
        <template slot-scope="list">
          <el-switch
            v-model="list.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="changeUserStatus(list.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="操作" width="180">
        <template slot-scope="list">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            plain
            size="small"
            @click="showUserEdit(list.row)"
          ></el-button>
          <el-button
            type="success"
            icon="el-icon-check"
            circle
            plain
            size="small"
            @click="showRole(list.row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            plain
            size="small"
            @click="deleteUser(list.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <!-- size-change当每页的数量改变时会触发的事件
          current-change当前页数改变时会触发的事件
          current-pag当前页码
          page-sizes每页的数据条数
          page-size每页的条数
          layout所有的插件的名字
          total总条数
    -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="2"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <!-- 添加对话框表格 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleadd">
      <el-form :model="Userform">
        <el-form-item label="用户" :label-width="formLabelWidth">
          <el-input v-model="Userform.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="Userform.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="Userform.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="Userform.phone" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleadd = false">取 消</el-button>
        <el-button type="primary" @click="addUser()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑对话框 -->
    <el-dialog title="编辑页面" :visible.sync="dialogFormVisibleedit">
      <el-form :model="Userform">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="Userform.username" :disabled="true" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="Userform.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="Userform.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleedit = false">取 消</el-button>
        <el-button type="primary" @click="editUser()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 分配权限对话框 -->
    <el-dialog title="分配角色" :visible.sync="dialogFormVisibleRole">
      <el-form :model="Userform">
        <el-form-item label="用户名" :label-width="formLabelWidth">{{Userform.username}}</el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth">
          <!-- 注意：currentRole默认值是选中value值相等的作为默认值
          -->
          {{currentRole}}
          <el-select v-model="currentRole">
            <el-option label="请选择" :value="-1"></el-option>
            <el-option v-for="(v,i) in role" :key="i" :label="v.roleName" :value="v.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleRole = false">取 消</el-button>
        <el-button type="primary" @click="editRole()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template> 

<script>
export default {
  data() {
    return {
      tableData: [],
      query: "",
      pagenum: 1,
      pagesize: 2,
      total: -1,
      // 表单
      dialogFormVisibleadd: false,
      dialogFormVisibleedit: false,
      dialogFormVisibleRole: false,
      formLabelWidth: "120px",
      Userform: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      currentRole: -1,
      role: []
    };
  },
  methods: {
    // 修改用户角色列表
    async editRole() {
      // console.log(this.Userform.id);
      // console.log(this.currentRole)
      const res = await this.$http.put(`users/${this.Userform.id}/role`, {
        rid: this.currentRole
      });
      //  console.log(res)
      const {
        data: {
          data,
          meta: { msg, status }
        }
      } = res;
      if (status == 200) {
        this.dialogFormVisibleRole = false;
        this.$message.success(msg);
        this.getUserData();
      }
    },
    // 展示角色分配对话框
    async showRole(user) {
      this.dialogFormVisibleRole = true;
      // console.log(user);
      // 此时是显示用户的信息
      this.Userform = user;
      // console.log(user.id)
      // 查询用户id查询用户的信息--其中包含角色id
      const searchRole = await this.$http.get(`users/${user.id}`);
      // console.log(searchRole)
      this.currentRole = searchRole.data.data.rid;
      // 查询用户角色
      const roles = await this.$http.get("roles");
      // console.log(roles);
      const {
        data: {
          data,
          meta: { msg, status }
        }
      } = roles;
      if (status == 200) {
        this.$message.success(msg);
        this.role = data;
      }
    },
    // 修改用户状态
    async changeUserStatus(user) {
      // console.log(user)
      const userstatus = await this.$http.put(
        `users/${user.id}/state/${user.mg_state}`
      );
      //  console.log(userstatus)
      const {
        data: {
          data,
          meta: { msg, status }
        }
      } = userstatus;
      if (status == 200) {
        this.$message.success(msg);
        this.getUserData();
      }
    },
    // 编辑页面的确定按钮
    async editUser(id) {
      const updataedit = await this.$http.put(
        `users/${this.Userform.id}`,
        this.Userform
      );
      console.log(updataedit);
      const {
        data: {
          data,
          meta: { msg, status }
        }
      } = updataedit;
      if (status == 200) {
        this.dialogFormVisibleedit = false;
        this.$message.success(msg);
        this.pagenum = 1;
      }
    },
    // 展示编辑页面
    async showUserEdit(user) {
      // 清空表单数据
      this.Userform = {};
      this.dialogFormVisibleedit = true;
      // console.log(user);
      this.Userform = user;
      // 发送axios请求
      // const search = await this.$http.get(`users/${id}`)
      // console.log(search)  //查询到点击的数据
      // const {data:{data,meta:{msg,status}}} =search
      // if (status == 200) {
      //   this.form=data;
      // }
    },
    // 删除用户
    deleteUser(id) {
      //  console.log(ID);
      this.$confirm("您确定要删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          //点击确定进入then，点击取消进入catch

          const deleteUserData = await this.$http.delete(`users/${id}`);
          // console.log(deleteUserData);
          const {
            data: {
              meta: { msg, status }
            }
          } = deleteUserData;
          if (status == 200) {
            this.$message.success(msg);
            this.pagenum = 1;
            this.getUserData();
          }
        })
        .catch(() => {
          this.$message.warning("您已取消删除");
        });
    },

    // 展示添加表单
    showUserAdd() {
      // 清空表单数据
      this.Userform = {};
      this.dialogFormVisibleadd = true;
    },
    // 添加用户
    async addUser() {
      // 1.发送请求
      const addData = await this.$http.post("users", this.Userform);
      console.log(addData);
      // 2.关闭对话框
      const {
        data: {
          data,
          meta: { msg, status }
        }
      } = addData;
      if (status == 201) {
        // 提示添加成功
        this.$message.success(msg);
        this.dialogFormVisibleadd = false;

        this.getUserData();
      }
      // console.log(this.Userform.userName)
    },
    // 搜索功能的方法
    async searchUser() {
      this.pagenum = 1;
      this.getUserData();
    },
    // 获取会员的信息
    async getUserData() {
      const AUTH_TOKEN = localStorage.getItem("token");
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      //  const userData = await this.$http.get(`users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`);
      const userData = await this.$http.get(
        "users?query=" +
          this.query +
          "&pagenum=" +
          this.pagenum +
          "&pagesize=" +
          this.pagesize
      );
      console.log(userData);
      // 结构赋值
      const {
        data: {
          data: { total, users },
          meta: { msg, status }
        }
      } = userData;
      if (status === 200) {
        this.tableData = users;
        this.total = total;
      }
    },
    // 分页
    // 每页显示的数据不一样的时候，改变显示的条数
    handleSizeChange(val) {
      this.pagesize = val;
      // console.log(`每页 ${val} 条`);
      this.getUserData();
    },
    // 当前页码发生改变的时候触发的事件
    handleCurrentChange(val) {
      // 改变当前页为点击的页码
      this.pagenum = val;
      // console.log(`当前页: ${val}`);
      // 重新渲染数据
      this.getUserData();
    }
  },
  created() {
    this.getUserData();
  }
};
</script>

<style>
.box-card {
  height: 100%;
}
.input-with-select {
  width: 300px;
  margin-top: 15px;
}
.table {
  height: 280px;
}
</style>
