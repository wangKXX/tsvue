Array.prototype._forEach = function(fn, context) {
  context = context || null
  if (typeof fn !== 'function') {
    throw new Error(fn + 'is not a function')
  }
  var index = 0
  while(index < this.length) {
    if (index in this) {
      fn.call(context, this[index], index, arr)
    }
    index++
  }
}

Array.prototype._map = function(fn, context) {
  context = context || null
  if (typeof fn !== 'function') {
    throw new Error(fn + 'is not a function')
  }
  var index = 0
  var retArray = []
  while(index < this.length) {
    if (index in this) {
      retArray.push(fn.call(context, this[index], index, this))
    }
    index++
  }
  return retArray
}

Array.prototype._find = function(fn, context) {
  context = context || null
  if (typeof fn !== 'function') {
    throw new Error(fn + 'is not a function')
  }
  var index = 0
  var target = null
  while(index < this.length) {
    if (index in this) {
      if (fn.call(context, this[index], index, this)) {
        target = this[index]
        break
      }
    }
    index++
  }
  return target
}

Array.prototype._filter = function(fn, context) {
  context = context || null
  if (typeof fn !== 'function') {
    throw new Error(fn + 'is not a function')
  }
  var index = 0
  var retArray = []
  while(index < this.length) {
    if (index in this) {
      if (fn.call(context, this[index], index, this)) {
        retArray.push(this[index])
      }
    }
    index++
  }
  return retArray
}