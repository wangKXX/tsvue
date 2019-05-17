<template>
  <div class="test-page">
    <button @click="handlerClick">click</button>
  </div>
</template>
<script>
import classMoudle from './util'
export default {
  data() {
    return {}
  },
  methods: {
    handlerClick() {
      const extendsChildren = new classMoudle.extendsLevel()
      extendsChildren.handlerEvent()
    }
  },
  beforeRouteEnter(to, from, next) {
    console.log(to + from + 'test inner enter')
    next()
  },
  beforeRouteLeave (to, from, next) {
    // ...
    console.log(to + from + 'test inner leave')
    next()
  },
  beforeRouteUpdate(to, from, next) {
    console.log(to + from + 'test inner Update')
    next()
  }
}
</script>
