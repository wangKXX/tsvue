class indexdb {
  table = window.indexedDB
  myDB = null
  db = null
  tableName = null
  version = null

  constructor(options) {
    this.options = options || {}
  }

  init(tableName, version) {
    version = version || 1
    this.tableName = tableName
    this.version = version
    this.myDB = this.table.open(tableName, version)
    return new Promise((resolve, reject) => {
      this.myDB.onerror = (e) => {
        resolve({err_code: 500, hit_msg: e.currentTarget.error.message})
        console.warn(`open fail：${e.currentTarget.error.message}`)
      }
      this.myDB.onsuccess = (e) => {
        resolve({err_code: 200, hit_msg: 'sucess'})
        this.db = e.target.result
      }
      this.myDB.onupgradeneeded = (e) => {
        this.db = e.target.result
        resolve({err_code: 200, hit_msg: 'sucess'})
        console.log(`version changed ${version}`)
      }
    })
  }

  /**
   *  创建自增id
   */
  createAddId(name) {
    let db = this.db
    if (!db.objectStoreNames || !db.objectStoreNames.contains(name)) {
      db.cteateObjectStore(name, {autoIncrement: true})
    } else {
      console.log(`store ${name} was in db`)
    }
  }

  /**
   * 创建store
   */
  create(name, key) {
    let db = this.db
    if (!db.objectStoreNames || !db.objectStoreNames.contains(name)) {
      db.createObjectStore(name, {keyPath: key})
      console.log(`create store ${name} sucess`)
    }
  }

  /**
   *  添加数据
   */
  addData(name, obj) {
    let transaction = this.db.transaction(name, 'readwrite')
    let store = transaction.objectStore(name)
    console.log(obj, 'debugg')
    if (obj instanceof Array) {
      obj.map(item => {
        store.add(item)
      })
    } else if (obj instanceof Object) {
      store.add(obj)
    } else {
      console.log(`typeof ${obj} is wrong`)
    }
  }

  /**
   *  删除数据
   */
  remove(name, key) {
    let transaction = this.db.transaction(name, 'readwrite')
    let store = transaction.objectStore(name)
    if (key) {
      store.delete(key)
    } else {
      console.error(`${key} is undefind`)
    }
  }

  /**
   *  更改数据
   */
  update(name, key, val) {
    let transaction = this.db.transaction(name, 'readwrite')
    let store = transaction.objectStore(name)
    let request = store.get(key)
    return new Promise((resolve, reject) => {
      request.onsuccess = e => {
        let obj = e.target.result
        if (obj instanceof Object && val instanceof Object) {
          let newObj = Object.assgin(obj, val)
          store.push(newObj)
          resolve({err_code: 200, hit_msg: 'add sucess'})
        } else {
          reject({err_code: 500, hit_msg: 'val is not Object'})
          console.warn(`val is not Object`)
        }
      }
    })
  }

  /**
   *  查找数据
   */
  find(name, key) {
    let transaction = this.db.transaction(name, 'readwrite')
    let store = transaction.objectStore(name)
    let request = store.get(key)
    return new Promise((resolve, reject) => {
      request.onsuccess = e => {
        let obj = e.target.result
        resolve(obj)
      }
      request.onerror = e => {
        reject(e)
      }
    })
   }

  /**
   *  关闭数据库
   */
  close() {
    this.db.close()
  }

  /**
   *  删除数据库
   */
  delete() {
    this.table.deleteDatabase(this.tableName)
  }
}
export default indexdb