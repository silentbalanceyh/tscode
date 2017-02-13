import Querier from './Sock.Querier'

class Layout {
  /**
   * 更新ui.control
   * @param db
   * @param pids
   */
  static syncControl(db, pids) {
    /** 1.读取Control表 **/
    const loki = db.getCollection('ui.control')
    if (loki) {
      /** 2.处理Id信息 **/
      const filters = {"pageId":{"$in":pids}}
      loki.removeWhere(filters)
    }
  }

  /**
   * 更新ui.slice表
   * @param db
   */
  static syncSlice(db, cids) {
    /** 1.读取Slice表 **/
    const loki = db.getCollection('ui.slice')
    if (loki) {
      /** 2.处理Id信息 **/
      const filters = {"layoutId":{"$in":cids}}
      loki.removeWhere(filters)
    }
  }

  /**
   *
   * @param db
   * @param unique
   * @param data
   */
  static sync(db, unique, data = []) {
    /** 1.提取所有的LayoutId / PageId **/
    const cIds = []
    const pIds = []
    /** 2.读取当前系统中的LayoutId **/
    const loki = db.getCollection('v.ui.layout')
    if (loki) {
      if(0 < loki.count()) {
        data.forEach(item => {
          /** 3.遍历新数据 **/
          const filters = Querier.filters(item, unique)
          const old = loki.findOne(filters)
          if (old) {
            /** 4.添加原始ID和新ID的映射 **/
            if (old.layoutId != item.layoutId) {
              cIds.push(old.layoutId)
            }
            if (old.pageId != item.pageId) {
              pIds.push(old.pageId)
            }
          }
          /** 5.数据本身的同步 **/
          Querier.update(db, 'v.ui.layout', item, unique)
        })
        Layout.syncSlice(db, cIds)
        Layout.syncControl(db, pIds)
      }else{
        Querier.batchPush(db, 'v.ui.layout', data)
      }
    } else {
      console.error(`v.ui.layout Collection does not exist.`)
    }
  }
}

export default Layout
