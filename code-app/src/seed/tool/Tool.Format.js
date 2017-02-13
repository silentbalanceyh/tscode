// ------------------------------------
// 字符串格式化
// ------------------------------------
function toObject(expression = "",separetor = ','){
  const items = expression.split(separetor)
  const object = {}
  if(0 < items.length){
    items.forEach(item => {
      const kv = item.split('=')
      console.assert(2 == kv.length)
      const key = kv[0]
      const value = kv[1]
      object[key] = value
    })
  }
  return object
}
function expression(pattern, item){
  for(const field in item){
    if(0 <= pattern.indexOf(field)){
      let re = new RegExp(`\\{${field}\\}`,'gm')
      pattern = pattern.replace(re, item[field])
    }
  }
  return pattern
}
function string(pattern, ...args) {
  if (arguments.length == 0)
    return null;
  for (let i = 0; i < args.length; i++) {
    let re = new RegExp(`\\{${i}\\}`, 'gm');
    pattern = pattern.replace(re, args[i]);
  }
  return pattern;
}
function stringParams(pattern, params) {
  if (arguments.length != 2)
    return null;
  for( const key in params){
    let re = new RegExp(`\\{${key}\\}`,'gm');
    pattern = pattern.replace(re, params[key]);
  }
  return pattern
}
function join(array = [], separator = ','){
  let ret = ''
  for(let idx = 0; idx < array.length; idx++ ){
    if(idx < array.length - 1) {
      ret = `${ret}${array[idx]}${separator}`
    }else{
      ret = `${ret}${array[idx]}`
    }
  }
  return ret
}
/** 金钱格式化 **/
function currency(value, digit){
  let tpMoney = '0.00';
  if(undefined != value){
    tpMoney = value;
  }
  tpMoney = new Number(tpMoney);
  if(isNaN(tpMoney)){
    return '0.00';
  }
  tpMoney = tpMoney.toFixed(digit) + '';
  const re = /^(-?\d+)(\d{3})(\.?\d*)/;
  while(re.test(tpMoney)){
    tpMoney = tpMoney.replace(re, "$1,$2$3")
  }
  return tpMoney;
}

export default {
  string,
  stringParams,
  toObject,
  join,
  currency,
  expression
}
