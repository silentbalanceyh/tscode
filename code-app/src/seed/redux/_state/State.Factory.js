import Immutable from 'immutable'

class Factory{
  /**
   * 合并数据
   * @param state
   * @param keys
   * @param data
   */
  static mergeObject($state, keys = [], data ={}){
    // 1.读取当前$state中的keys原始信息
    let $data = $state.getIn(keys);
    // 2.判断读取的$data
    if(!$data) $data = Immutable.fromJS({});
    // 3.返回合并的Object对象
    return $data.mergeDeep(data);
  }
  /**
   * 批量合并状态
   * @param state
   * @param keys
   * @param data
   */
  static mergeMulti(state,keys = [[]], data =[{}]){
    console.assert(keys.length === data.length);
    // 创建新的Immutable对象
    let $state = Immutable.fromJS(state);
    console.assert($state !== state);
    // 遍历属性一个一个执行
    const size = keys.length;
    for(let idx = 0; idx < size; idx++ ){
      const typeData = Immutable.fromJS(data[idx]);
      if(Immutable.Map.isMap(typeData)) {
        // 针对对象的处理
        $state = $state.setIn(keys[idx], Factory.mergeObject($state, keys[idx], data[idx]));
      }else if(Immutable.List.isList(typeData)){
        // 针对数组的处理
        $state = $state.setIn(keys[idx], Immutable.fromJS([]).concat(data[idx]));
      }
    }
    return $state.toJS();
  }
}

export default Factory
