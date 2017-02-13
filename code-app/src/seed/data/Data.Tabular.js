import Assert from '../assert'
import Ajax from '../ajax'
import Cache from '../cache'
import Config from '../config'

class Tabular {
  /**
   * 是否Tabular的Uri
   * @param uri
   */
  static isTabular(uri) {
    return uri.startsWith('/lst/tabular')
  }

  /**
   *
   * @param list
   * @param uri
   */
  static api({input, method = "GET", uri}, params = {}) {
    /** 1.断言 **/
    Assert.isString({uri});
    Assert.isObject({input});
    /** 2.构造Promise **/
    if(input) {
      params['type'] = input;
    }
    /** 3.反向赋值 **/
    const data = Cache.Sock.outTabular()
    if (data) {
      return Config.SockJS.tabular(input, params.sigma)
    } else {
      Cache.Sock.inTabular()
      return Ajax.Async.locator(method, uri, params);
    }
  }

  /**
   * 固定列表
   * @param props
   * @returns {*}
   */
  static promise(props = {}) {
    /** 1.构造Promise **/
    const {$_ajax, dispatch} = props;
    Assert.isFunction({dispatch});
    Assert.isObject({$_ajax});
    const params = {}
    if (props['$_sigma']) {
      params['sigma'] = props['$_sigma']
    }
    /** 2.构造Promise **/
    const promises = Tabular.api($_ajax.tabular, params);
    Assert.isPromise({promises});
    return promises;
  }
}

export default Tabular
