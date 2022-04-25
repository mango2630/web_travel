<!-- 订单查询 -->
<template>
  <div class="container">
    <!-- 订单查询 -->
    <div class="form">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="产品线">
          <el-input v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item label="订单时效">
          <el-input v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item label="订单类型">
          <el-input v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item label="交通类型">
          <el-input v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item label="城市ID">
          <el-input v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item label="订单ID">
          <el-input v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="Id" width="180" align="center"></el-table-column>
        <el-table-column prop="type" label="类型" width="180" align="center"></el-table-column>
        <el-table-column prop="address" label="初始地" align="center"></el-table-column>
        <el-table-column prop="address" label="目的地" align="center"></el-table-column>
        <el-table-column prop="address" label="轨迹" align="center"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },
      tableData: [
        {
          date: "1",
          type: "2",
          address: "北京"
        }
      ]
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>
<style lang="scss" scoped>
.form {
  width: 60%;
  margin: 80px auto;
  color: #fff;
}
.table {
  width: 65%;
  margin: 20px auto;
  color: #fff;
}
</style>