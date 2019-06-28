<template>
  <el-container>
    <el-header class="home-header">
      <el-row type="flex" align="middle" class="el-row">
        <el-col :span="6" class="el-col">
          <img src="../assets/toplogo.png" alt>
        </el-col>
        <el-col :span="24">
          <h1>电商后台管理系统</h1>
        </el-col>
        <el-col :span="6">
          <div>
            欢迎上海前端39期星耀会员
            <el-button type="text" @click="open" class="el-logout">退出</el-button>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px" class="home-aside">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">
                <i class="el-icon-menu"></i>用户列表
              </el-menu-item>
              <el-menu-item index="1-2">
                <i class="el-icon-menu"></i>选项2
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="home-main">Main</el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    open() {
      this.$confirm("您是否确定退出?", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "退出成功!"
          });
          this.$router.push("/login");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出"
          });
        });
    }
  }
};
</script>
 <style lang="less">
.el-container {
  height: 100%;
  background-color: #eaeef1;
}
.el-header.home-header {
  padding-left: 0;
  background-color: #b3c1cd;
  .el-row {
    img {
      width: 200px;
    }
    div {
      font-weight: bold;
      min-width: 235px;
    }
    h1 {
      margin: 0;
      text-align: center;
      font-size: 28px;
      color: white;
      font-weight: bolder;
    }
    .el-logout {
      color: orange;
      font-weight: bolder;
    }
  }
}
.home-aside {
  background-color: #545c64;
}
</style>





