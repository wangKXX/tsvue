<template>
  <div class="main-page">
    <canvas id="canvas" width="500" height="500"/>
    <button @click="getObjects()">getobjects</button>
    <button @click="removeItem(1)">撤销</button>
    <button @click="setSelectItem(1)">select</button>
    <button @click="getActiveObject()">getselect</button>
    <button @click="getItem(1)">反撤销</button>
    <div class="wrapper">
      <div class="inner">
        <router-link to="/test">测试</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { fabric } from 'fabric'
export default {
  data() {
    return {
      data: [],
      canvas: null,
      canvasObjects: []
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
    // this.canvas.add(rect)
    var ellipse = new fabric.Ellipse({
      id: 1,
      rx: 40,
      ry: 60,
      fill: 'yellow',
      stroke: 'red',
      strokeWidth: 3,
      angle: 10,
      left: 100,
      top: 100,
    })
    let group = new fabric.Group([rect, ellipse])
    this.canvas.add(group)

    // this.getObjects()
  },
  methods: {
    getObjects() {
      let obj = this.canvas.getObjects()
      this.canvasObjects = obj
    },
    getObject(id) {
      let canvasItem = this.canvasObjects.find(item => {
        return item.id = id
      })
      return canvasItem
    },
    setSelectItem(id) {
      const selectItem = this.getObject(id)
      this.canvas.setActiveObject(selectItem)
    },
    removeItem(id) {
      const item = this.getObject(id)
      item.set({opacity: 0})
      this.canvas.renderAll()
    },
    getItem(id) {
      const item = this.getObject(id)
      item.set({opacity: 1})
      this.canvas.renderAll()
    },
    getActiveObject() {
      console.log(this.canvas)
    }
  }
}
</script>
<style lang="scss" scoped>
.wrapper{
  width: 500px;
  height: 500px;
  background-color: red;
  .inner{
    width: 50%;
    padding-bottom: 75%;
    background-color: #000;
  }
}
</style>
