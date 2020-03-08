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


//时间格式化
export function formatDate(date, fmt) {
  //获取年份
  // y+ ---> 匹配一个或者多个y     y* ---> 0个或者多个   y? -----> 0个或者1个
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};

