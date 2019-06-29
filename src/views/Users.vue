<template>
  <div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="type" label="状态"></el-table-column>
      <el-table-column prop="address" label="状态"></el-table-column>
      <el-table-column prop="address" label="操作"></el-table-column>
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
  created() {
    axios({
      url: "http://localhost:8888/api/private/v1/users",
      method: "get",
      headers: { Authorization: localStorage.getItem("token") },
      params: {
        pagenum: 1,
        pagesize: 5
      }
    }).then(({ data: { data, meta } }) => {
      console.log(data);
      this.tableData = data.users;
    });
  }
};
</script>
