<template>
  <div class="hello">
    <!-- <audio src="http://www.w3school.com.cn/i/song.ogg" controls></audio>
    <audio src="http://www.w3school.com.cn/i/song.ogg" controls></audio> -->
    <!-- <video src="http://vjs.zencdn.net/v/oceans.mp4" controls playsinline width="100%" muted></video>
    <video src="http://vjs.zencdn.net/v/oceans.mp4" controls playsinline width="100%" muted></video> -->
    <!-- <button @click="addData">增加数据</button>
    <button @click="removeData">删除数据</button>
    <div>rxjs</div>
    <button @click="of">of</button>
    <button @click="pipe">pipe, concat</button>
    <button @click="delay">delay, concat</button> -->
  <!-- <div class="video-container">
		<video autoplay playsinline src="http://cloudclass-dev.oss-cn-beijing.aliyuncs.com/test-wsh/testvideoplay/2.mp4" controls></video>
		<button class='play'>Play/pause</button>
		<button class='fullscreen'>Fullscreen</button>
	</div>

	<div class="video-container">
		<video autoplay muted playsinline src="http://cloudclass-dev.oss-cn-beijing.aliyuncs.com/test-wsh/testvideoplay/3.mp4" controls></video>
		<button class='play'>Play/pause</button>
		<button class='fullscreen'>Fullscreen</button>
	</div> -->
	<!-- <div class="audio-container">
		<audio autoplay controls src="http://cloudclass-dev.oss-cn-beijing.aliyuncs.com/test-wsh/testvideoplay/iphone-inline-video-master/demo/test.mp3" type="audio/mpeg"></audio>
	</div>
  <div class="audio-container">
		<audio autoplay controls src="http://cloudclass-dev.oss-cn-beijing.aliyuncs.com/test-wsh/testvideoplay/iphone-inline-video-master/demo/test.mp3" type="audio/mpeg"></audio>
	</div> -->
  <input type="text" :value="showTxt">
  <button @click="handler" ref="btn">click me</button>
  <button @click="genraterHandler">genrater</button>
  </div>
</template>

<script>
import indexdb from 'common/tools/indexDBRx'
import RxTool from 'common/tools/rxJsTools'
import '../assets/iphone-inline-video.js'
require('../assets/style.css')
import { 
  Observable,
  Subject,
  ReplaySubject,
  from,
  of,
  range,
  interval,
  concat,
  bindCallback,
  reduce,
  delay
} from 'rxjs'
import { flatMap, groupBy } from 'rxjs/operators'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      indexdbObserve: null,
      db: null,
      Tools: null,
      showTxt: '',
      fn: this.genrater(10)
    }
  },
  mounted() {
    let db = new indexdb()
    this.db = db
    this.indexdbObserve = db.create('test1', 1)
    this.indexdbObserve.subscribe({
      complete() {
        db.createAddId('teacher')
      },
      error(err) {
        throw err
      }
    })
    this.Tools = new RxTool()
    // Tools.of([0, 1, 2, 3])
  },
  methods: {
    genraterHandler() {
      let rs = this.fn.next()
      console.log(rs)
    },
    genrater: function* (x) {
      yield (function(){
        return x * 10
      })()
      yield function(){
        return 'two'
      }
      return 'done'
    },
    todo(x, y) {
      return x + y
    },
    lastTodo(y) {
      return y * 10
    },
    handler() {
      let _self = this
      let fn = {
        apply(target, thisBinding, args) {
          console.log(target, thisBinding, args)
          return Reflect.apply(_self.lastTodo, thisBinding, [Reflect.apply(target, thisBinding, args)])
        }
      }
      let proxy = new Proxy(this.todo, fn)
      console.log(proxy(2, 3))
    },
    addData() {
      this.db.addData('teacher', {name: 'wk', age: 24})
    },
    removeData() {
    },
    of() {
      let source = of(1, 2, 3, 4)
      source.subscribe(val => {
        console.log(val)
      })
    },
    pipe() {
      let sourceOne = of(1, 2, 3, 4)
      let sourceTwo = of('a', 'b', 'c')
      let ex = sourceOne.pipe(
        concat(source)
      )
      ex.subscribe(val => {
        console.log(val)
      })
    },
    delay() {
      let sourceOne = of(1, 2, 3, 4)
      let sourceTwo = of('a', 'b', 'c')
      let sourceTh = sourceTwo.pipe(delay(1000))
      let ex = sourceTh.pipe(concat(sourceTwo))
      ex.subscribe(val => {
        console.log(val)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
