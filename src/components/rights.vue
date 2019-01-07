<template>
  <el-card class="box-card">
    <!-- 面包屑使用面包屑组件 -->
    <my-bread level1="权限管理" level2="权限列表"></my-bread>
    <!-- 表格 -->
    <el-table class='table' :data="tableData">
      <el-table-column prop="id" label="#" width="180"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>
      <el-table-column prop="level" label="层级" width="180">
          <template slot-scope="list">
              <span v-if="list.row.level == '0'">一级</span>
              <span v-if="list.row.level == '1'">二级</span>
              <span v-if="list.row.level == '2'">三级</span>
          </template>
      </el-table-column>
    </el-table>
  </el-card> 
</template>

<script>
export default {
  data() {
    return {
      tableData: []
    };
  },
  methods: {
    //   渲染权限的数据表格
    async getRights() {
      const rightListdata = await this.$http.get("rights/list");
    //   console.log(rightListdata);
    // 解构赋值
    const {data:{data,meta:{msg,status}}} = rightListdata
    if (status == 200) {
        this.tableData = data;
        
    }else {
        this.$message.warning(msg);
    }
    }
  },
  created() {
    this.getRights();
  }
};
</script>

<style>
.box-card {
  height: 100%;
}
.table {
    margin-top: 20px;
    height: 400px;
    overflow: auto;
}
</style>
