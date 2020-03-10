export function debounce(func, delay) { //防抖动/节流函数, 主要用于频繁调用的时候使用
  let timer = null;
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
