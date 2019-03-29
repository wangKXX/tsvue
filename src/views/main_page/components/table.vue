<template>
  <div class="table">
    <template v-for="(item, index) in tableData">
      <div class="t-item" :key="index">{{ item.name }}</div>
      <div class="t-item" :key="index">{{ item.age }}</div>
      <div class="t-item" :key="index">
        <el-button type="primary" icon="el-icon-edit"></el-button>
        <el-button type="primary" icon="el-icon-delete"></el-button>
      </div>
    </template>
  </div>
</template>
<script>
import { Button } from 'element-ui'
export default {
  props: {
    tableData: []
  },
  components: {
    ElButton: Button
  }
}
</script>
<style lang="scss" scoped>
.table{
  display: grid;
  grid-template-columns: auto auto auto;
}
</style>
