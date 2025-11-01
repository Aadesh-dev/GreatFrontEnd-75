/**
 * @callback func
 * @param {number} wait
 * @return {Function}
 */
export default function throttle(func, wait) {
  let flag = true;
  return function(...args) {
    if(flag) {
        func.apply(this, args);
        flag = false;
        setTimeout(() => {
            flag = true;
        }, wait);
    }
  }
}

//TODO - Throttle with cancel and leading/trailing options