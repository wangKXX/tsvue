function topLevel() {}
topLevel.prototype.name = 'level'
topLevel.prototype.handlerEvent = function() {
  console.log(this.name)
}
function extendsLevel() {}
extendsLevel.prototype = new topLevel()
extendsLevel.prototype.name = 'extends'

window.a = 'window-a'
let a = 'let-a'
let obj = {
  a: 'obj-a',
  say() {
    console.log(this.a)
  }
}
obj.say()
let say = obj.say
say()
window.a = 'win-a'
let FunctionObj = {
  a: 'obj-a',
  say: function() {
    return function() {
      console.log(this.a)
    }
  }
}
console.log(FunctionObj.say()())

export default {
  extendsLevel
}