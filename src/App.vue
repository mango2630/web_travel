<template>
  <div class="app">
    <Header />
    <router-view />
  </div>
</template>



<script>
import Header from "@/components/Header.vue";

export default {
  components: {
    Header
  }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
html,
body,
.app {
  width: 100%;
  height: 100%;
  background: #2b3043;
}
ul li {
  list-style: none;
}

/* 订单查询element样式 */
/* form */
.form .el-form-item__label {
    color: #fff;
}

/* 表格 */
.table .el-table{
  color: #fff;
}
.table .el-table thead {
    color: #fff;
}
.table .el-table th {
    background-color: #56596A;
}
.table .el-table tr {
    background-color: #56596A;
}
.table .el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: #ccc;
}
/* .table .el-table--border th, .el-table--border td {
    border-right: 1px solid #7A7E89;
} */
</style>
