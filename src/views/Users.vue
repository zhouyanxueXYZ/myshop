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
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
              <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
                <el-input v-model=" ruleForm.username" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
                <el-input v-model=" ruleForm.password" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" :label-width="formLabelWidth">
                <el-input v-model=" ruleForm.email" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="手机" :label-width="formLabelWidth">
                <el-input v-model=" ruleForm.phone" autocomplete="off"></el-input>
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
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state "></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <el-button type="primary" plain size="mini" @click="dialogFormVisible = true">
          <i class="el-icon-edit"></i>
        </el-button>
        <!-- <el-dialog title="编辑用户" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="用户名" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
          </div>
        </el-dialog>-->
        <el-button type="danger" plain size="mini" @click="del">
          <i class="el-icon-delete"></i>
        </el-button>
        <el-button type="success" plain size="mini" @click="dialogFormVisible = true">
          <i class="el-icon-check"></i>
          分配角色
        </el-button>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="Math.ceil(totalPage*10/4)"
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
      // value: true,
      input1: "",
      totalPage: "",
      currentpage: 1,
      dialogFormVisible: false,
      ruleForm: {
        username: "",
        password: "",
        email: "",
        phone: ""
        // date1: ""
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
        ]
      }
    };
  },
  created() {
    axios({
      url: "http://localhost:8888/api/private/v1/users",
      method: "get",
      headers: { Authorization: localStorage.getItem("token") },
      params: {
        pagenum: 1,
        pagesize: 4
      }
    }).then(({ data: { data, meta } }) => {
      // console.log(data);
      this.tableData = data.users;
      this.totalPage = data.total;
    });
  },
  methods: {
    del() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
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
            url: "http://localhost:8888/api/private/v1/users",
            method: "post",
            headers: { Authorization: localStorage.getItem("token") },
            data: this.ruleForm
          }).then(({ data: { data, meta } }) => {
            // console.log(res);
            if (meta.status == 201) {
              alert("创建角色成功");
              dialogFormVisible = false;
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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
