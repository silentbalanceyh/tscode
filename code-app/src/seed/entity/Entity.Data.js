import Immutable from 'immutable'
import Assert from '../assert'
import Logger from '../logger'
/**
 * Created by Lang on 2016/9/25.
 */
class Data {
  static flat(object) {
    Assert.isObject({object});
    const ret = {};
    for (const key in object) {
      if ('object' == typeof(object[key])) {
        for (const ikey in object[key]) {
          ret[ikey] = object[key][ikey];
        }
      } else {
        ret[key] = object[key];
      }
    }
    return ret;
  }
  /** 将key中的数据升级执行Flat操作 **/
  static flatByKey(object,key){
    Assert.isObject({object});
    let $object = Immutable.fromJS(object);
    let $data = $object.get(key);
    const data = Data.merge($object,$data);
    delete data[key];
    return data;
  }
  /** 合并两个对象，生成新对象 **/
  static merge(source,target){
    let $source = Immutable.fromJS(source);
    return $source.merge(target).toJS();
  }
  /** 合并两个对象 **/
  static mergeReference(source,target){
    Assert.isArrayObject({source,target});
    return Object.assign(source,target);
  }

  /** 数组操作 **/
  static lookup(obj, pathes = [],empty) {
    // 1.创建Immutable对象
    Assert.isObject({obj});
    Assert.isEmptyArray({pathes});
    const $obj = Immutable.fromJS(obj);
    console.assert($obj !== obj);
    let $data = $obj.getIn(pathes);
    let ret
    if($data && $data.toJS){
      ret = $data.toJS();
    }else{
      /** 禁止出现undefined **/
      if(empty && undefined == $data){
        ret = empty
      }else{
        ret = $data
      }
    }
    return ret
  }
}

export default Data;
