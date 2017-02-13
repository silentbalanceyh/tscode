import Redux from '../redux'

class Loader {
  /**
   * 配置Module
   * @param props
   */
  static configMod(props) {
    const {dispatch} = props
    return dispatch({type: Redux.Types.SUCCESS_MOD_START, keys: ['isConfig','isData']})
  }

  /**
   * 配置App
   */
  static dataMod(props) {
    const {dispatch} = props
    return dispatch({type: Redux.Types.SUCCESS_MOD_START, keys: ['isData']})
  }

  /**
   *
   * @param props
   */
  static loadingData(props){
    const {dispatch, $_ajax} = props
    if($_ajax && $_ajax.record){
      const { output } = $_ajax.record
      return dispatch({type: Redux.Types.SUCCESS_DATA_RELOAD, output})
    }
  }
  /**
   * 判断是否开启loading功能
   * @param eblis
   */
  static isLoading(eblis = {}){
    const { $_ajax } = eblis
    if($_ajax && $_ajax.record){
      return true
    }else{
      return false
    }
  }

  /**
   *
   * @param props
   */
  static loader(props = {}){
    if(props.isLoading){
      return false
    }else{
      return false
    }
  }
}

export default Loader
