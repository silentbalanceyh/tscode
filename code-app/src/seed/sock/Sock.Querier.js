import Immutable from 'immutable'
import Logger from '../logger'

class Querier{

  /**
   * 构建查询条件
   * @param record
   * @param unique
   * @returns {{$and: Array}}
   */
  static filters(record, unique = []) {
    const values = []
    unique.forEach(key => {
      const value = {}
      value[key] = record[key]
      values.push(value)
    })
    return {
      "$and": values
    }
  }

  /**
   * 拷贝数据生成新记录
   * @param old
   * @param record
   */
  static copy(old, record){
    let $old = Immutable.fromJS(old)
    for(const key in record){
      $old = $old.set(key, record[key])
    }
    return $old.toJS()
  }

  /**
   * 批量Push
   * @param db
   * @param identifier
   * @param data
   */
  static batchPush(db, identifier, data = []){
    Logger.Socket.sync(identifier, data, {}, true)
    const loki = db.getCollection(identifier)
    loki.insert(data)
  }
  /**
   *
   * @param db
   * @param record
   * @param unique
   */
  static update(db, identifier, record, unique = []){
    /** 0.处理Loki本地数据库读取 **/
    const loki = db.getCollection(identifier)
    /** 1.构造filters **/
    const filters = Querier.filters(record, unique)
    /** 2.读取原始数据 **/
    const old = loki.find(filters)
    /** 3.先移除非法数据 **/
    if(1 < old.length){
      /** 3.1.移除filters查询的所有记录 **/
      loki.removeWhere(filters)
    }
    /** 4.执行核心同步流程 **/
    if(0 == old.length) {
      /** 4.1.执行插入 **/
      loki.insertOne(record)
      Logger.Socket.sync(identifier, record, filters, true)
    }else{
      /** 4.2.拷贝数据生成新数据 **/
      const merged = Querier.copy(old[0], record)
      /** 4.3.执行更新操作 **/
      loki.update(merged)
      Logger.Socket.sync(identifier, record, filters, false)
    }
  }

  /**
   *
   * @param db
   * @param identifier
   * @param ids
   */
  static clear(db, identifier, ids){
    /** 0.处理Loki本地数据库读取 **/
    const loki = db.getCollection(identifier)
    /** 1.删除特殊数据 **/
    const $ids = Immutable.fromJS(ids);
    loki.removeWhere((item) => {
      return !$ids.contains(item.uniqueId)
    });
  }
}

export default Querier
