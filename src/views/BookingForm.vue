<!-- 预约单 -->
<template>
  <div class="container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="formInline.user" placeholder="司机ID/手机号/姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="formInline.region" placeholder="司管公司(全部)">
          <el-option label="公司一" value="shanghai"></el-option>
          <el-option label="公司二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="formInline.region" placeholder="所属城市(全部)">
          <el-option label="上海" value="shanghai"></el-option>
          <el-option label="北京" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="formInline.region" placeholder="业务类型(全部)">
          <el-option label="上海" value="shanghai"></el-option>
          <el-option label="北京" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">重置</el-button>
      </el-form-item><br>
       <!-- <el-form-item> -->
      <el-date-picker
      v-model="value1"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
    <!-- </el-form-item> -->
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.container {
  position: absolute;
  top: 80px;
  left: 0;
  z-index: 999;
  // margin-top: 80px;
}
</style>