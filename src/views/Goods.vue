<template>
  <div class="goods">
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      class="el-breadcrumb"
      style="height:50px;font-size:16px;line-height:50px;"
    >
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="success" plain @click="$router.push('/goods-add')">添加商品</el-button>
    <el-table :data="goodsList" style="width: 100%" stripe>
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="goods_name" label="商品名称" width="180"></el-table-column>
      <el-table-column prop="goods_price" label="商品价格" width="180"></el-table-column>
      <el-table-column prop="goods_weight" label="商品重量"></el-table-column>
      <el-table-column prop="upd_time" label="创建时间"></el-table-column>
      <el-table-column label="操作">
        <template v-slot="{row}">
          <el-button type="primary" plain size="mini">
            <i class="el-icon-edit"></i>
          </el-button>
          <el-button type="danger" plain size="mini">
            <i class="el-icon-delete"></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      layout="prev, pager, next"
      :total="totalpage"
      :page-size="pagesize"
      :current-page="pagenum"
      @current-change="changePage"
    ></el-pagination>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      goodsList: [],
      totalpage: 1,
      pagenum: 1,
      pagesize: 6
    };
  },
  created() {
    this.getgoodsList();
  },
  methods: {
    async getgoodsList() {
      let res = await axios({
        url: "goods",
        method: "get",
        params: {
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
      });
      console.log(res);
      if (res.data.meta.status == 200) {
        this.goodsList = res.data.data.goods;
        this.totalpage = res.data.data.total;
        this.pagenum = +res.data.data.pagenum;
      }
    },
    changePage(value) {
      this.pagenum = value;
      this.getgoodsList();
    }
  }
};
</script>