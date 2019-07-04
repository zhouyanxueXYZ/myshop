<template>
  <div class="categories">
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      class="el-breadcrumb"
      style="height:50px;font-size:16px;line-height:50px;"
    >
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>

    <el-button type="success" plain @click="addcategory">添加分类</el-button>
    <el-dialog title="添加分类" :visible.sync="dialgAddshow">
      <el-form label-width="100px" class="demo-ruleForm" :model="addCateForm" ref="addCateForm">
        <el-form-item label="分类名称">
          <el-input v-model="addCateForm.cate_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="父级名称">
          <el-cascader
            v-model="addCateForm.cate_selected"
            :options="optionsList"
            :props="defaultProps"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialgAddshow = false">取 消</el-button>
        <el-button type="primary" @click="submitAdd">确 定</el-button>
      </div>
    </el-dialog>
    <!-- :data="goodsList" -->
    <el-table style="width: 100%" stripe :data="categoryList">
      <el-table-tree-column
        file-icon="icon icon-files"
        folder-icon="icon icon-file"
        label="分类名称"
        prop="cat_name"
        width="220"
        tree-key="cat_id"
        child-key="children"
        parent-key="cat_pid"
        level-key="cat_level"
        :indent-size="40"
      ></el-table-tree-column>

      <el-table-column label="是否有效" width="180">
        <template v-slot="{row}">
          <span>{{row.cat_deleted?'否':'是'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="层级" width="180" prop="cat_level"></el-table-column>
      <el-table-column label="操作">
        <template v-slot="{row}">
          <el-button type="primary" plain size="mini">
            <i class="el-icon-edit"></i>
          </el-button>
          <el-button type="danger" plain size="mini" @click="delGoods(row.cat_id)">
            <i class="el-icon-delete"></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="totalPage"
      :current-page="pagenum"
      :page-size="pagesize"
      @current-change="changePage"
    ></el-pagination>
  </div>
</template>
<script>
// const ElTreeGrid = require("element-tree-grid");
// Vue.component(ElTreeGrid.name, ElTreeGrid);
import ElTreeGrid from "element-tree-grid";
import axios from "axios";
export default {
  data() {
    return {
      name1: "",
      dialgAddshow: false,
      categoryList: [],
      totalPage: 1,
      pagenum: 0,
      pagesize: 6,
      optionsList: [],
      defaultProps: { value: "cat_id", label: "cat_name", checkStrictly: true },
      addCateForm: {
        cate_name: "",
        cate_selected: []
      }
    };
  },
  components: {
    [ElTreeGrid.name]: ElTreeGrid
  },
  created() {
    this.getcategoryList();
  },
  methods: {
    async getcategoryList() {
      let res = await axios({
        url: "categories",
        method: "get",
        params: {
          type: 3,
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
      });
      // console.log(res);
      this.categoryList = res.data.data.result;
      this.totalPage = res.data.data.total;
    },
    async addcategory() {
      this.dialgAddshow = true;
      let res = await axios({
        url: "categories",
        method: "get",
        params: {
          type: 2
        }
      });
      // console.log(res);
      this.optionsList = res.data.data;
    },
    async submitAdd() {
      let pid = this.addCateForm.cate_selected.pop();
      let level = this.addCateForm.cate_selected.length + 1;
      let res = await axios({
        url: "categories",
        method: "post",
        data: {
          cat_name: this.addCateForm.cate_name,
          cat_pid: pid,
          cat_level: level
        }
      });
      console.log(res);
      if (res.data.meta.status == 201) {
        this.$message({
          type: "success",
          message: res.data.meta.msg,
          duration: 1000
        });
        this.getcategoryList();
        this.dialgAddshow = false;
        // this.$refs[addCateForm].resetForm();
      }
    },
    changePage(value) {
      // console.log(value);
      this.pagenum = value;
      this.getcategoryList();
    },
    async delGoods(id) {
      let res = await axios({
        url: `categories/${id}`,
        method: "delete"
      });
      console.log(res);
      if (res.data.meta.status == 200) {
        this.getcategoryList();
        this.$message({
          type: "success",
          message: res.data.meta.msg,
          duration: 1000
        });
      }
    }
  }
};
</script>

