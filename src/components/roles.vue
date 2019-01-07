
<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <my-bread level1="权限管理" level2="角色列表"></my-bread>
    <!-- 添加按钮 -->
    <el-button plain class="btn">添加角色</el-button>
    <!-- 角色列表 -->
    <el-table :data="roleListData" height="400">
      <el-table-column type="expand">
        <template slot-scope="list">
          <el-row v-if="list.row.children.length == 0">
            <el-col>此用户没有权限</el-col>
          </el-row>
          <el-row v-for="(v1,i) in list.row.children" :key="i">
            <el-col :span="4">
              <el-tag
                class="one"
                closable
                type
                @close="deleteRights(list.row,v1.id)"
              >{{v1.authName}}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <el-col :span="20">
              <el-row v-for="(v2,i) in v1.children" :key="i">
                <el-col :span="4">
                  <el-tag
                    class="two"
                    @close="deleteRights(list.row,v2.id)"
                    closable
                    type="success"
                  >{{v1.authName}}</el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col :span="16">
                  <el-tag
                    type="warning"
                    class="three"
                    closable
                    @close="deleteRights(list.row,v3.id)"
                    v-for="(v3,i) in v2.children"
                    :key="i"
                  >{{v3.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column label="#" prop="id" width="100"></el-table-column>
      <el-table-column label="角色名称" prop="roleName"></el-table-column>
      <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
      <el-table-column label="操作" prop="name">
        <template slot-scope="list">
          <el-button type="primary" icon="el-icon-edit" circle plain size="small"></el-button>
          <el-button
            type="success"
            icon="el-icon-check"
            circle
            plain
            size="small"
            @click="roleFen(list.row)"
          ></el-button>
          <el-button type="danger" icon="el-icon-delete" circle plain size="small"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- // 分配对话框弹框      -->
    <el-dialog title="分配权限" :visible.sync="dialogVisibleRole" width="30%">
      <el-tree
        :data="roleRightData"
        ref='tree'
        show-checkbox
        node-key="id"
        default-expand-all
        :props="defaultProps"
        :default-checked-keys="checkedrights"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisibleRole = false">取 消</el-button>
    <el-button type="primary" @click="roleRightTure()">确 定</el-button>
  </span>
    </el-dialog>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      roleListData: [],
      dialogVisibleRole: false,
      roleRightData: [],
      checkedrights:[],
      currentRoleId:'-1',
      defaultProps: {
          children: 'children',
          label: 'authName'
        },
    };
  },
 
  methods: {
    //   角色分配的实现
   async roleRightTure() {
    //    console.log(this.currentRoleId)
    // 第二个参数为修改完后的权限id----分为全选和半选--查看文档找到了俩个方法--getHalfCheckedNodes（半选）getCheckedNodes（全选）
    // 谁调用方法----js中调用结点的方法---首先要获取结点元素，之后调用结点元素
    // 注意：在vue中获取dom元素----vue获取dom是为了操作标签的方法
    // 1.给要操作的标签设置ref属性值
    // 2.在js中通过this.$refs.ref属性值.方法
    const arr1 = this.$refs.tree.getHalfCheckedNodes()
    const arr2 = this.$refs.tree.getCheckedNodes()
    // console.log(arr1)

    // console.log(arr2)
    const arr = [...arr1,...arr2]
    // console.log(arr)
       const rightTure =  await this.$http.post(`roles/${this.currentRoleId}/rights`,{
           rids:arr.join(',')
       })
       console.log(rightTure)
    const {data:{data,meta:{msg,status}}} = rightTure
    // if (status == 200) {
        this.getRolesData()
       this.dialogVisibleRole = false
       this.$message.success(msg);
    //    this.checkedrights = ----------------------------------------------------????????????
    // }
    },
    //   角色分配显示
    async roleFen(right) {
        // console.log(right)
        this.currentRoleId  = right.id
        var temarr = []
        right.children.forEach(item1 => {
            temarr.push(item1.id);
            item1.children.forEach((item2) => {
                temarr.push(item2.id);
                item2.children.forEach((item3) => {
                temarr.push(item3.id);
            })
            })
        });
        // console.log(temarr);
        this.checkedrights = temarr;
      this.dialogVisibleRole = true;
     const roleList =  await this.$http.get('rights/tree');
    //  console.log(roleList)
    const {data:{data,meta:{msg,status}}} = roleList
    // console.log(data);
    this.roleRightData = data
    },
    //   删除角色权限
    async deleteRights(role, right) {
      // console.log(right)
      // console.log(role)
      const deleteRightData = await this.$http.delete(
        `roles/${role.id}/rights/${right}`
      );
      console.log(deleteRightData);
      const {
        data: {
          data,
          meta: { msg, status }
        }
      } = deleteRightData;
      if (status == 200) {
        //   更新当前角色的权限---注意当删除功能成功是会返回剩余权限
        role.children = data;
        //   更新所有表格权限
        //   this.getRolesData();
      }
      this.$message.success(msg);
    },
    // 获取角色列表
    async getRolesData() {
      const roleList = await this.$http.get("roles");
      //   console.log(roleList);
      const {
        data: {
          data,
          meta: { msg, status }
        }
      } = roleList;
      if (status == 200) {
        this.roleListData = data;
      }
    }
  },
  created() {
    this.getRolesData();
  }
};
</script>

<style>
.box-card {
  height: 500px;
}
.btn {
  margin-top: 10px;
}
.one,
.two,
.three {
  margin-top: 10px;
}
</style>
