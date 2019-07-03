<template>
  <div>
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      class="el-breadcrumb"
      style="height:50px;fontSize:16px;lineHeight:50px;"
    >
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>
      <el-table-column label="层级">
        <template v-slot="{row}">{{row.level |levelhandler }}</template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      tableData: []
    };
  },
  async created() {
    let res = await axios({
      url: "rights/list"
    });
    // console.log(res);
    let {
      data: { data, meta }
    } = res;
    if (meta.status == 200) {
      this.tableData = data;
    }
  },
  filters: {
    levelhandler(value) {
      switch (value) {
        case "0":
          return "一级";
        case "1":
          return "二级";
        case "2":
          return "三级";
      }
    }
  }
};
</script>