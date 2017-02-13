import Querier from './Sock.Querier'

class Direct{
  /**
   *
   * @param db
   * @param unique
   * @param data
   */
  static sync(db, identifier, unique, data = []) {
    /** 1.读取集合 **/
    const loki = db.getCollection(identifier)
    if(loki){
      if(0 < loki.count()) {
        const ids = []
        data.forEach(item => {
          /** 2.数据同步 **/
          Querier.update(db, identifier, item, unique)
          ids.push(item.uniqueId)
        })
        /** 3.删除不存在的数据 **/
        Querier.clear(db, identifier, ids)
      }else{
        Querier.batchPush(db, identifier, data)
      }
    }else{
      console.error(`${identifier} Collection does not exist`)
    }
  }
}

export default Direct
