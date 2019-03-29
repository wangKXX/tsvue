<template>
  <div class="main-page">
    <canvas id="canvas" width="500" height="500"/>
    <button @click="getObjects()">getobjects</button>
  </div>
</template>
<script>
import { fabric } from 'fabric'
export default {
  data() {
    return {
      data: [],
      canvas: null
    }
  },
  mounted() {
    this.canvas = new fabric.Canvas('canvas')
    const rect = new fabric.Rect({
      id: 1,
      width: 100,
      height: 100,
      top: 100,
      left: 100,
      fill: 'rgba(255,0,0,0.5)'
    })
    this.canvas.add(rect)
    var ellipse = new fabric.Ellipse({
      id: 1,
      rx: 40,
      ry: 60,
      fill: 'yellow',
      stroke: 'red',
      strokeWidth: 3,
      angle: 10,
      left: 100,
      top: 100
    })
    this.canvas.add(ellipse)

  },
  methods: {
    getObjects() {
      let obj = this.canvas.getObjects()
      console.log(obj)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
