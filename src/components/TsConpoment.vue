<template>
<div class="wrap">
  <div class="prop">{{ propsMesg }}</div>
  <div class="title">{{ title }}</div>
  <div class="hello">{{ helloMesg }}</div>
  <div class="testComputed">{{ testComputed }}</div>
</div>
</template>
<script>
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    propsMesg: {
      default: '你猜'
    }
  }
})
export default class MyConpoment extends Vue{
  title = 'title'
  helloMesg = `hello ${this.propsMesg}`
  // hooks
  mounted() {
    this.greet()
  }
  // computed
  get testComputed() {
    return `${this.title} 你愁啥`
  }
  // method
  greet() {
    // alert(this.title)
  }
}
</script>
<style lang="scss" scoped>

</style>

