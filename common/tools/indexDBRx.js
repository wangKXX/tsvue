import { Observable} from 'rxjs/Observable'

class indexDbRx{
  dataSpace = window.indexedDB
  myDB = null
  db = null

  constructor(options) {
    this.options = options || {}
  }
  create(dataSpaceName, version) {
    this.dataSpaceName = dataSpaceName
    this.version = version || 1
    this.dataSpaceObservable = 
    Observable.create(observe => {
      this.myDB = this.dataSpace.open(dataSpaceName, version)
      this.myDB.onerror = e => {
        observe.error({err_code: 500, hit_msg: e.currentTarget.error.message})
      }
      this.myDB.onsuccess = e => {
        console.log('success')
        this.db = e.target.result
        observe.complete()
      }
      this.myDB.onupgradeneeded = e => {
        console.log('change')
        this.db = e.target.result
        console.log(`version changed ${version}`)
        observe.complete()
      }
    })
    return this.dataSpaceObservable
  }

  createAddId(name) {
    let db = this.db
    if(!db.objectStoreNames || !db.objectStoreNames.contains(name)) {
      db.createObjectStore(name, {autoIncrement: true})
    }
  }

  addData(name, obj) {
    let transaction = this.db.transaction(name, 'readwrite')
    let store = transaction.objectStore(name)
    if (obj instanceof Array) {
      console.log('add')
      obj.map(item => {
        store.add(item)
      })
    } else if (obj instanceof Object) {
      store.add(obj)
      console.log('add')
    } else {
      console.log(`typeof ${obj} is wrong`)
    }
  }
}

export default indexDbRx