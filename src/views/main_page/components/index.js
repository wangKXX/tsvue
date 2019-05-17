const arr = [1,2,3,4,5,6]

for (let i = 0; i < arr.length - 1; i++) {
  for (let j = i + 1; j < arr.length; j++) {
    if (arr[j] > arr[i]) {
      let temp = arr[i]
      arr[i] = arr[j]
      arr[j] = temp
    }
  }
}

arr.sort((a, b) => {
  return a - b
})


function quickSort(arr) {
  if (arr.length <= 1) {
    return arr
  }
  let leftArr = []
  let rightArr = []
  let q = arr[0]
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > q) {
      rightArr.push(arr[i])
    } else {
      leftArr.push(arr[i])
    }
  }
  return [].concat(quickSort(leftArr), [q], quickSort(rightArr))
}

function test() {
  console.log(1)
  setTimeout(() => {
    console.log(2)
    setTimeout(() => {
      console.log(3)
    }, 0)
  }, 60)
}