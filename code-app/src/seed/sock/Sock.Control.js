import Querier from './Sock.Querier'

class Control{
  /**
   * 更新子表
   * @param db
   * @param identifier
   * @param cids
   */
  static syncLeaf(db, identifier, cids, $in = true){
    /** 1.读取子表 **/
    const loki = db.getCollection(identifier)
    if (loki) {
      let filters = {}
      if($in) {
        filters = {"controlId": {"$in": cids}}
      }else{
        filters = {"controlId": {"$containsNone": cids}}
      }
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
    /** 1.读取集合 **/
    const loki = db.getCollection('ui.control')
    if(loki){
      if(0 < loki.count()) {
        const cIds = []
        const nIds = []
        data.forEach(item => {
          /** 3.遍历新数据 **/
          const filters = Querier.filters(item, unique)
          const old = loki.findOne(filters)
          if (old) {
            if (old.uniqueId != item.uniqueId) {
              cIds.push(old.uniqueId)
            }
          }
          nIds.push(item.uniqueId)
          /** 2.数据同步 **/
          Querier.update(db, 'ui.control', item, unique)
        })
        /** 3.更新对应字表 **/
        Control.syncLeaf(db, 'ui.field', cIds)
        Control.syncLeaf(db, 'ui.column', cIds)
        Control.syncLeaf(db, 'ui.validate.rule', cIds)
        Control.syncLeaf(db, 'v.ui.form.op', cIds)
        /** 4.删除特殊数据 **/
        Control.syncLeaf(db, 'ui.field', nIds, false)
        Control.syncLeaf(db, 'ui.column', nIds, false)
        Control.syncLeaf(db, 'ui.item', nIds, false)
        Control.syncLeaf(db, 'ui.validate.rule', nIds, false)
        Control.syncLeaf(db, 'v.ui.form.op', nIds, false)
      }else{
        Querier.batchPush(db, 'ui.control', data)
      }
    }else{
      console.error(`ui.control Collection does not exist`)
    }
  }
}

export default Control
