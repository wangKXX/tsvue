class Observer {
  constructor(options) {
    this.data = options.data
    this.initData(this.data)
  }
  initData(data, key) {

    if (typeof data[key] === 'object') {
      this.dataForEach(data[key])
      return
    }
    Object.defineProperty(data, key, {
      configurable: false,
      enumerable: true,
      get() {
        return data[key]
      },
      set(val) {
        console.log(`${val} changed`)
        data[key] = val
      }
    })
  }
  dataForEach(data) {
    Object.keys(data).forEach(key => {
      this.initData(data, key)
    })
  }
}

class depper {
  constructor(options) {
    this.callBack = options.callback
    this.deppers = []
  }
  update(val) {
    if (typeof this.callBack === 'function') {
      this.callBack(val)
    }
  }
  addDeper(watcher) {
    this.deppers.push(watcher)
  }
  notfiy(val) {
    this.deppers.forEach(dep => {
      dep.update(val)
    })
  }
  get() {
    
  }
}

class Watcher {
  constructor(options) {

  }
}







export default {
  Observer,
  Watcher
}

