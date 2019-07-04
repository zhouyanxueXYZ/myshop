<template>
  <div class="goods-add">
    <el-steps :active="activeIndex">
      <el-step title="第一步" icon="el-icon-edit" description="基本信息"></el-step>
      <el-step title="第二步" icon="el-icon-picture " description="商品图片"></el-step>
      <el-step title="第三步" icon="el-icon-upload" description="商品内容"></el-step>
    </el-steps>
    <el-tabs tab-position="left" v-model="currentStep" @tab-click="changeStep">
      <el-tab-pane label="基本信息" name="step1" index="1">
        <el-form label-width="80px">
          <el-form-item label="商品名称">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="商品分裂">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="是否促销">
            <el-radio v-model="radio" label="0">是</el-radio>
            <el-radio v-model="radio" label="1">否</el-radio>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="next('step1')">下一步</el-button>
      </el-tab-pane>
      <el-tab-pane label="商品图片" name="step2" index="2">
        <el-upload
          style="margin-bottom:20px;"
          action="http://localhost:8888/api/private/v1/upload"
          list-type="picture-card"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <el-button type="primary" @click="next('step2')">下一步</el-button>
      </el-tab-pane>
      <el-tab-pane label="商品内容" name="step3" index="3">
        <el-button type="primary" @click="next('step2')">确定</el-button>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: 1,
      currentStep: "step1",
      radio: 0
    };
  },
  methods: {
    changeStep(tab) {
      //   console.log(tab.name, tab.index + 1);
      this.activeIndex = +tab.index + 1;
      this.currentStep = tab.name;
    },
    next(value) {
      this.currentStep = value;
    }
  }
};
</script>
