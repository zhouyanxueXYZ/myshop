<template>
  <div>
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      class="el-breadcrumb"
      style="height:50px;fontSize:16px;lineHeight:50px;"
    >
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-row :gutter="20">
      <el-col :span="7">
        <div class="demo-input-size">
          <el-input placeholder="请输入搜索内容" v-model="input1">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      </el-col>
      <el-col :span="4">
        <template>
          <el-button type="success" plain @click="dialogFormVisible = true">添加用户</el-button>
          <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
              <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
                <el-input v-model=" ruleForm.username" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
                <el-input
                  type="password"
                  v-model=" ruleForm.password"
                  autocomplete="off"
                  show-password
                ></el-input>
              </el-form-item>
              <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
                <el-input v-model=" ruleForm.email" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="手机" :label-width="formLabelWidth" prop="mobile">
                <el-input v-model=" ruleForm.mobile" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
            </div>
          </el-dialog>
        </template>
      </el-col>
    </el-row>

    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="180"></el-table-column>
      <el-table-column label="用户状态">
        <template v-slot="{row}">
          <el-switch v-model="row.mg_state" @change="cState(row.id)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="{row}">
          <el-button type="primary" plain size="mini" @click="dialogFormVisible = true">
            <i class="el-icon-edit"></i>
          </el-button>
          <el-button type="danger" plain size="mini" @click="delUser(row.id)">
            <i class="el-icon-delete"></i>
          </el-button>
          <el-button type="success" plain size="mini" @click="dialogFormVisible = true">
            <i class="el-icon-check"></i>
            分配角色
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="totalPage"
      :page-size="pageSize"
      :current-page="currentpage"
    ></el-pagination>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      tableData: [],
      pageSize: 3,
      input1: "",
      totalPage: 3,
      currentpage: 1,
      dialogFormVisible: false,
      ruleForm: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      formLabelWidth: "120px",
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "change" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 8, message: "长度在 6 到 8 个字符", trigger: "change" }
        ],
        email: [
          {
            pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
            message: "请输入正确的邮箱格式",
            trigger: "blur"
          }
        ],
        mobile: [
          {
            pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
            message: "手机号码格式不正确",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      axios({
        url: "users",
        method: "get",
        params: {
          query: "",
          pagenum: 1,
          pagesize: 4
        }
      }).then(({ data: { data, meta } }) => {
        // console.log(data);
        this.tableData = data.users;
        this.totalPage = data.total;
      });
    },

    delUser(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios({
            url: `users/${id}`,
            method: "delete"
          }).then(({ data: { data, meta } }) => {
            console.log(meta.status);
            if (meta.status == 200) {
              this.getUsers();
              this.dialogFormVisible = false;
              this.$message({
                type: "success",
                message: meta.msg,
                duration: 1000
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios({
            url: "users",
            method: "post",
            data: this.ruleForm
          }).then(({ data: { data, meta } }) => {
            // console.log(res);
            if (meta.status == 201) {
              // alert("创建角色成功");
              this.getUsers();
              this.$message({
                type: "success",
                message: meta.msg,
                duration: 1000
              });
              this.dialogFormVisible = false;
            } else {
              this.$message({
                type: "error",
                message: meta.msg,
                duration: 1000
              });
            }
          });
        }
      });
    },
    async cState(id) {
      let res = await axios({
        url: `users/${id}/${t}`,
        method: "put"
      });
      console.log(res);
      // this.getUsers();
    }
  }
};
</script>

<style>
.el-breadcrumb {
  line-height: 50px;
  font-size: 16px;
  background-color: #d4dae0;
  padding-left: 10px;
}
.el-input-group {
  width: 32%;
}
</style>
