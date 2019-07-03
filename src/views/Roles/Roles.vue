<template>
  <div>
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      class="el-breadcrumb"
      style="height:50px;font-size:16px;line-height:50px;"
    >
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-table :data="tableData" style="width: 100%" stripe>
      <!-- @current-change="toggleRowExpansion(row,true)" -->
      <el-table-column type="expand">
        <template v-slot="{row}">
          <!-- 第一级 -->
          <el-row class="step1" v-for="step1 in row.children" :key="step1.id">
            <el-col :span="4">
              <el-tag closable @close="delTag(row.id,step1.id)">{{step1.authName}}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <el-col :span="20">
              <!-- 第二级 -->
              <el-row class="step2" v-for="step2 in step1.children" :key="step2.id">
                <el-col :span="6">
                  <el-tag
                    closable
                    type="success"
                    @close="delTag(row.id,step2.id)"
                  >{{step2.authName}}</el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col :span="18">
                  <!-- 第三级 -->
                  <el-tag
                    class="step3"
                    closable
                    type="danger"
                    v-for="step3 in step2.children"
                    :key="step3.id"
                    @close="delTag(row.id,step3.id)"
                  >{{step3.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>

      <el-table-column type="index"></el-table-column>
      <el-table-column label="角色名称" prop="roleName" width="180"></el-table-column>
      <el-table-column label="描述" prop="roleDesc" width="180"></el-table-column>
      <el-table-column label="操作">
        <template v-slot="{row}">
          <el-button type="primary" plain size="mini">
            <i class="el-icon-edit"></i>
          </el-button>
          <el-button type="danger" plain size="mini" @click="delRole(row.id)">
            <i class="el-icon-delete"></i>
          </el-button>
          <el-button type="success" plain size="mini" @click=" allotroles(row)">
            <i class="el-icon-check"></i>
            分配权限
          </el-button>
          <el-dialog title="角色授权" :visible.sync="allotdialogShow">
            <el-tree
              :data="allotrolesTree"
              show-checkbox
              node-key="id"
              :default-expand-all="true"
              :props="defaultProps"
              ref="tree"
            ></el-tree>
            <div slot="footer" class="dialog-footer">
              <el-button @click="allotdialogShow = false">取 消</el-button>
              <el-button type="primary" @click="submitrolesTree">确 定</el-button>
            </div>
          </el-dialog>
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
      // 所有角色列表
      tableData: [],
      // 角色授权框
      allotdialogShow: false,
      // 角色授权树
      allotrolesTree: [],
      defaultProps: {
        children: "children",
        label: "authName"
      },
      currentId: -1
    };
  },
  created() {
    this.getTableData();
    this.getrolesTree();
  },
  methods: {
    async getTableData(callback) {
      let res = await axios({
        url: "roles",
        method: "get"
      });
      //   console.log(res)
      let {
        data: { data, meta }
      } = res;
      this.tableData = data;
      callback && callback();
    },
    async getrolesTree() {
      let res = await axios({
        url: "rights/tree"
      });
      this.allotrolesTree = res.data.data;
      console.log();
    },
    // 删除角色
    delRole(id) {
      this.$confirm("确认删除该角色吗?", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let res = axios({
            url: `roles/${id}`,
            method: "delete"
          });
          // console.log(res);
          if (res.data.meta.status == 200) {
            this.getTableData();
            this.$message({
              type: "success",
              message: res.data.meta.msg
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: "已取消删除"
          });
        });
    },
    // 打开角色授权框时
    allotroles(row) {
      this.allotdialogShow = true;
      //获取当前列表中角色的id
      this.currentId = row.id;
      console.log(this.currentId);
      // 获取当前角色选中的权限的id
      // 只要选中三级，二级和一级也会被选中
      let selectedKey = [];
      row.children.forEach(step1 => {
        step1.children.forEach(step2 => {
          step2.children.forEach(step3 => {
            selectedKey.push(step3.id);
          });
        });
      });
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys(selectedKey);
      });
    },
    // 提交修改后的角色授权树
    async submitrolesTree() {
      // 首先要获取当前角色的权限列表，
      // 获取全选和半选的id列表

      let checkedId = this.$refs.tree.getCheckedKeys();
      let checkedhalf = this.$refs.tree.getHalfCheckedKeys();
      let cid = [...checkedId, ...checkedhalf];

      //将修改后的数据传向数据库
      let res = await axios({
        url: `roles/${this.currentId}/rights`,
        method: "post",
        data: {
          rids: cid.join(",")
        }
      });
      // console.log(res);
      if (res.data.meta.status == 200) {
        this.allotdialogShow = false;

        this.getTableData();
        this.$message({
          type: "success",
          message: res.data.meta.msg,
          duration: 1000
        });
      }
    },
    // 删除权限
    async delTag(rolesId, rightsId) {
      let res = await axios({
        url: `/roles/${rolesId}/rights/${rightsId}`,
        method: "delete"
      });
      // console.log(res);
      if (res.data.meta.status == 200) {
        this.$message({
          type: "success",
          message: res.data.meta.msg,
          duration: 1000
        });
        this.getTableData();
      }
    }
  }
};
</script>






<style scoped>
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
.step1 {
  padding: 10px 0;
  border-bottom: 1px dashed #ccc;
}
.step1:last-child {
  border-bottom: none;
}
.step2,
.step3 {
  padding-bottom: 10px;
  margin-right: 10px;
}
</style>
