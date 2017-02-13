import Immutable from 'immutable'

class Query{
  /**
   * 统一处理Query中的参数状态
   * @param state
   * @param params
   */
  static query(state,params){
    let $state = Immutable.fromJS(state);
    $state = $state.get('query');
    /** 1.将params中存在的参数填充到$state **/
    const query = {};
    $state.forEach((value,key) => {
      if(!params[key]){
        query[key] = value.toJS();
      }else{
        query[key] = params[key];
      }
    })
    /** 2.执行params **/
    for(const key in params){
      if(!query[key]) query[key] = params[key];
    }
    return query;
  }
}

export default Query
