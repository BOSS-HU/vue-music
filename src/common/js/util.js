function randomFn(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
export function shuffle(arr) {
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let ranIndex = randomFn(0, i)
    let temp = _arr[i]
    _arr[i] = _arr[ranIndex]
    _arr[ranIndex] = temp
  }
  return _arr
}
