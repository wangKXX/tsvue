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
  reduce
 } from 'rxjs'
 import { flatMap, groupBy } from 'rxjs/operators'

class rxTools{
  constructor(options) {
    this.options = options || {}
  }

  of(data) {
    console.log(...data)
    let numbers = of(...data)
    let letters = of('a', 'b', 'c', 'd')
    // let Timer = interval(1000)
    let callback = bindCallback(this.retData)
    let resoult = concat(numbers, letters, callback())
    resoult.subscribe(data => {
      console.log(data)
    })
    let fromDemo = from([1, 2, 3])
    fromDemo.subscribe(val => {
      console.log(val)
    })

    of(
      {id: 1, name: 'javascript'},
      {id: 2, name: 'parcel'},
      {id: 2, name: 'webpack'},
      {id: 1, name: 'typescript'},
      {id: 3, name: 'tslint'}
    ).pipe(
      groupBy(p => p.id),
      // flatMap(group$ => group$.pipe(
      //   reduce((acc, cur) => [...acc, cur], [])
      // ))
    ).subscribe(p => {
      console.log(p)
    })
  }

  retData(a, b, c){
    console.log(a)
    console.log(b)
    console.log(c)
  }
}

export default rxTools