import Immutable from 'immutable'
import Assert from '../assert'

class Array{
  /** 二维数组的合并 **/
  static merge(arrays = []){
    const retArr = [];
    arrays.forEach((itemArr) => {
      Assert.isArray({itemArr});
      itemArr.forEach((item) => {
        retArr.push(Immutable.fromJS(item).toJS());
      })
    })
    return retArr;
  }
  /** 合并tabular **/
  static tabular(tabular, keys = []){
    let arrays = [];
    if(0 == keys.length) {
      for (const key in tabular) {
        arrays.push(tabular[key]);
      }
    }else{
      keys.forEach(key => {
        if(tabular[key]){
          arrays.push(tabular[key])
        }
      })
    }
    return Array.merge(arrays);
  }
}

export default Array
