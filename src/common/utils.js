//防抖函数
export function debounce(func,delay) {
  //为什么timer没有被销毁，因为return作为一个闭包，对外层函数进行引用，所以不销毁
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)

    timer = setTimeout(() => {
      func.apply(this,args)
    },delay)
  }
}
