import Redux from '../redux'
import Ajax from '../ajax'
import Immutable from 'immutable'
import Eblis from './Data.Eblis'
import Tool from '../tool'

class Init {
  /**
   *
   * @param promises
   */
  static isRecordOnly(promises = {}) {
    return promises.record && 1 == Object.keys(promises).length
  }

  /**
   * 构造全局params
   * @param props
   * @returns {any|*}
   */
  static reduxParams(props){
    /** 1.处理query **/
    const $props = Immutable.fromJS(props);
    let $params = $props.get('params');
    if(!$params) {
      $params = Immutable.fromJS({});
    }
    $params = $params.set('cid',props['$_cid']);
    /** 2.针对Record单独处理query参数 **/
    if(props.$_ajax && props.$_ajax.record){
      const params = Tool.Parameter.query(props,props.$_ajax.record,$params.toJS());
      $params = $params.set('query',params);
    }
    return $params.toJS();
  }
  /**
   * 读取对应的Promise中信息
   * @param props
   * @param type
   * @param promise
   * @returns {function(*)}
   */
  static initData(props = {}, type = Redux.Types.SUCCESS_GOONEY_DATA, promise) {
    /** 1.构造需要执行返回参数表 **/
    const params = Init.reduxParams(props)
    /** 2.处理input级别的promise **/
    const promises = Eblis.promises(props, promise)
    const { dispatch } = props
    if (Init.isRecordOnly(promises)) {
      promise = promises.record;
      /** 3.1.输出专用Key **/
      let key = Eblis.output(props);
      /** 3.2.启动Proimse **/
      if(dispatch){
        return promise.then(data => dispatch({type, data, key: key.record, params}));
      }else {
        return (dispatch) => promise.then(data => dispatch({type, data, key: key.record, params}));
      }
    } else {
      /** 是否执行FANTOM_DATA **/
      const keys = Object.keys(promises)
      if(0 < keys.length) {
        /** 3.复杂的Promise流程 **/
        const keys = Eblis.output(props)
        const reference = {
          type: Redux.Types.SUCCESS_FANTOM_DATA,
          keys,
          params
        };
        /** 4.直接并行返回 **/
        if (dispatch) {
          return Ajax.Promise.parallel(promises, dispatch, reference)
        } else {
          return (dispatch) => Ajax.Promise.parallel(promises, dispatch, reference);
        }
      }
    }
  }
}

export default Init
