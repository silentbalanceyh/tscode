import Immutable from 'immutable'

class Status {
  /**
   * 状态初始化
   * @param isModule
   */
  static init(isModule){
    if(isModule){
      // Module用初始化状态
      return {
        isData:false,
        isConfig:false
      }
    }else{
      // App用初始化状态
      return {
        isConfig:false,
        isAuthorized:false,
        isDownload:false,
        isLogged:false,
        isData:false
      }
    }
  }

  /**
   * 状态写入
   * @param status
   * @param key
   */
  static write(state,{
    keys = []
  }){
    let $state = Immutable.fromJS(state)
    keys.forEach(key => {
      if (key) {
        const pathes = ['status', key]
        $state = $state.setIn(pathes, false)
      }
    })
    return $state.toJS()
  }
}

export default Status
