export function antiShake(fun,wait){
  let timer = null;
  return function (...ars) {
    if(timer) clearTimeout(timer)
    timer = setTimeout(()=> {
      fun.apply(this,ars)
    },wait)
  }
}