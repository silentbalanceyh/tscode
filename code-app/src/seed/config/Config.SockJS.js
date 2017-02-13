import Sock from '../sock'

class SockJS {
  /**
   *
   * @param app
   * @param module
   * @param page
   */
  static layout(app, module, page) {
    const filters = {"$and": [{app}, {module}, {page}]}
    const LokiDB = new Sock.Dator()
    return LokiDB.queryObject('v.ui.layout', filters)
  }

  /**
   *
   * @param layoutId
   */
  static slice(layoutId) {
    const filters = {"$and": [{layoutId}]}
    const LokiDB = new Sock.Dator()
    return LokiDB.queryList('ui.slice', filters)
  }

  /**
   * 默认带了language
   * @param pageId
   */
  static controls(pageId, language) {
    const filters = {"$and": [{pageId}, {language}]}
    const LokiDB = new Sock.Dator()
    return LokiDB.queryList('ui.control', filters)
  }

  /**
   *
   * @param shared
   * @param snaps
   * @returns {*}
   */
  static snaps(shared, snaps = {}) {
    const LokiDB = new Sock.Dator()
    return LokiDB.querySnaps("ui.control", shared, snaps)
  }

  /**
   * 读取tabular
   * @param types
   */
  static tabular(types = [],sigma) {
    let filters = {'type': {"$in": types}}
    /** 使用带Sigma的读取 **/
    if(sigma){
      const sfilters = {'sigma':sigma}
      filters = {"$and":[filters,sfilters]}
    }
    const LokiDB = new Sock.Dator()
    return LokiDB.queryList("sys.list.fixed", filters)
  }
}

export default SockJS
