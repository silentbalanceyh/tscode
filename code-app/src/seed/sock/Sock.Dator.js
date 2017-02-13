import Config from '../vie.json'
import Address from './Sock.Address'
import Logger from '../logger'
import Sync from './Sock.Sync'

import Q from 'q'
// ------------------------------------
// LokiDB专用代码段
// ------------------------------------
const verbose = (process.env.NODE_ENV === `development`)

const LokiRef = {}
// ------------------------------------
// 初始化数据库访问器
// ------------------------------------
class Dator {
  constructor() {
    this.LokiDB = new loki(Config['DATABASE'], {
      env: 'BROWSER',
      verbose,
      adapter: new LokiIndexedAdapter(Config['DATABASE'])
      //autoload: true,
      //autoloadCallback: fnLoadHandler,
      //autosave: true,
      //autosaveInterval: 10000
    })
  }

  /**
   *
   * @param identifier
   */
  collection(identifier) {
    /** 1.读取collection **/
    let child = LokiRef[identifier]
    if (!child) {
      child = this.LokiDB.getCollection(identifier)
      /** 2.如果child不存在则添加 **/
      if (null == child) {
        child = this.LokiDB.addCollection(identifier)
        this.LokiDB.saveDatabase()
      }
    }
    return child;
  }

  /** 调试专用 **/
  debug() {
    if (process.env.NODE_ENV === `development`) {
      const identifiers = Object.keys(Address.UNIQUE)
      identifiers.forEach(identifier => {
        this.LokiDB.loadDatabase({}, () => {
          const child = this.collection(identifier)
          const data = child.find()
          console.groupCollapsed(identifier, data.length)
          data.forEach(item => {
            console.info(item.cid || item.code || item.field, item)
          })
          console.groupEnd()
        })
      })
    }
  }

  /**
   * 生成Promise
   * @param identifier
   * @param filters
   */
  queryObject(identifier, filters = {}) {
    return Q.Promise((resolve) => {
      /** 1.加载数据库 **/
      this.LokiDB.loadDatabase({}, () => {
        /** 2.读取需要操作的Collection **/
        const child = this.collection(identifier)
        /** 3.条件处理 **/
        const data = child.findOne(filters)
        /** 4.最终结果 **/
        resolve(data)
      })
    })
  }

  /**
   * 生成Promise
   * @param identifier
   * @param filters
   */
  queryList(identifier, filters = {}) {
    return Q.Promise((resolve) => {
      /** 1.加载数据库 **/
      this.LokiDB.loadDatabase({}, () => {
        /** 2.读取需要操作的Collection **/
        const child = this.collection(identifier)
        /** 3.条件处理 **/
        const list = child.find(filters)
        const count = child.count(filters)
        /** 4.最终结果 **/
        resolve({list, count})
      })
    })
  }

  /**
   * 生成Promise
   * @param identifier
   * @param shard
   * @param snaps
   */
  querySnaps(identifier, shared, snaps = {}) {
    return Q.Promise((resolve) => {
      /** 1.加载数据库 **/
      this.LokiDB.loadDatabase({}, () => {
        /** 2.读取需要操作的Collection **/
        const child = this.collection(identifier)
        const data = child.findOne({uniqueId: shared})
        /** 3.构造$SNAP$节点 **/
        const snapDatas = {}
        for (const snap in snaps) {
          /** 4.子节点读取 **/
          const snapArr = this.LokiDB.getCollection(snap)
          /** 5.构造查询条件 **/
          const filters = {}
          filters[snaps[snap]] = shared
          /** 6.查询所有记录 **/
          const snapData = snapArr.find(filters)
          if (0 < snapData.length) {
            snapDatas[snap] = snapData
          }
        }
        /** 7.构造最终快照数据 **/
        data[`$SNAPS$`] = snapDatas
        resolve(data)
      })
    })
  }

  /**
   *
   * @param identifier
   * @param data
   */
  syncEach(db, identifier, data = []) {
    const unique = Address.UNIQUE[identifier]
    if (`v.ui.layout` == identifier) {
      Sync.layout(db, unique, data)
    } else if (`ui.control` == identifier) {
      Sync.control(db, unique, data)
    } else {
      Sync.direct(db, identifier, unique, data)
    }
  }

  /**
   * 下载数据
   */
  download(identifiers = [], response, callback) {
    /** 1.读取collection **/
    this.LokiDB.loadDatabase({}, () => {
      /** 2.读取对应的Collection **/
      identifiers.forEach(identifier => {
        /** 3.读取本地数据库 **/
        const child = this.collection(identifier)
        child.clear()
        const data = response[identifier]
        Logger.Socket.sync(identifier, data, {}, true)
        child.insert(data)
      })
      /** 4.保存 **/
      this.LokiDB.saveDatabase(() => {
        console.info("Local Database have been synced automatically!")
        callback()
      })
    });
  }

  /**
   *
   * @param identifier
   * @param data
   */
  sync(identifier, data = []) {
    /** 1.读取collection **/
    this.LokiDB.loadDatabase({}, () => {
      /** 1.读取需要操作的Collection **/
      const child = this.collection(identifier)
      try {
        /** 2.条件处理 **/
        Logger.Socket.count(identifier, child.count(), true)
        /** 3.当前数据同步 **/
        this.syncEach(this.LokiDB, identifier, data)
        this.LokiDB.saveDatabase(() => {
          Logger.Socket.count(identifier, child.count())
        })
      } catch (error) {
        console.error(error)
      }
    })
  }

}

export default Dator
