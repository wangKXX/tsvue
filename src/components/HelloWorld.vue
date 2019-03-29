<template>
  <div class="hello">
  <input type="text" :value="showTxt">
  <button @click="handler" ref="btn">click me</button>
  <button @click="genraterHandler">genrater</button>
  </div>
</template>

<script>
import indexdb from 'common/tools/indexDBRx'
import RxTool from 'common/tools/rxJsTools'
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
    const _this = this
    this.indexdbObserve.subscribe({
      complete() {
        db.createAddId('teacher')
        _this.addData()
      },
      error(err) {
        throw err
      }
    })
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
