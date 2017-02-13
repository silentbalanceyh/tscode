import Immutable from 'immutable'

class Tab{
  /**
   * 处理Tab状态信息
   * @param state
   * @param params
   */
  static tab(state,params = {}){
    // 1.返回key
    let _state = Immutable.fromJS(state);
    // 2.如果出现params的cid则处理对应的数据
    if(params.cid){
      // 2.1.处理config
      let config = _state.get('config').get(params.cid);
      // 2.2.读取config
      if(config){
        const key = ['data','spec','tab'];
        config = config.getIn(key);
        if(config) {
          // 2.3.已经读取到config的信息
          config = config.toJS();
          const items = config.headers;
          // 2.4.处理items
          if(items) _state = _state.setIn(['uex','tab','headers'],items);
        }
      }
    }
    // 3.处理状态信息
    return _state.toJS()
  }
}

export default Tab
