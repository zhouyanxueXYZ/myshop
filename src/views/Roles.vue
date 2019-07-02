<template>
  <div>
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      class="el-breadcrumb"
      style="height:50px;fontSize:16px;lineHeight:50px;"
    >
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="expand">
        <template v-slot="row">
          <el-form label-position="left" inline class="demo-table-expand">
            <!-- <el-form-item label="主管">
              <span>{{ props.row.roleName }}</span>
            </el-form-item>
            <el-form-item label="技术负责人">
              <span>{{ props.row.roleDesc }}</span>
            </el-form-item>
            <el-form-item label="商品 ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>-->
          </el-form>
        </template>
      </el-table-column>

      <el-table-column type="index"></el-table-column>
      <el-table-column label="角色名称" prop="roleName" width="180"></el-table-column>
      <el-table-column label="描述" prop="roleDesc" width="180"></el-table-column>
      <el-table-column label="操作">
        <template v-slot="{row}">
          <el-button type="primary" plain size="mini" @click="editOpen(row.id)">
            <i class="el-icon-edit"></i>
          </el-button>
          <el-button type="danger" plain size="mini" @click="delRole(row.id)">
            <i class="el-icon-delete"></i>
          </el-button>
          <el-button type="success" plain size="mini" @click="dialogFormVisible = true">
            <i class="el-icon-check"></i>
            分配权限
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      tableData: [],
      editShow: false
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    async getTableData() {
      let res = await axios({
        url: "roles",
        method: "get"
      });
      //   console.log(res);
      let {
        data: { data, meta }
      } = res;
      this.tableData = data;
    },
    editOpen(id) {
      this.editShow = true;
    }
  }
};
</script>
<style>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
