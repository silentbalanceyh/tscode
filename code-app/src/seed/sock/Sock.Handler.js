import Logger from '../logger'
import Dator from './Sock.Dator'

class Handler {
  /**
   * 注册专用Handler
   * @param err
   * @param res
   */
  static register(identifier, address) {
    /** **/
    Logger.Socket.register(identifier, address)
    return (err, res) => {
      if (!err && res && "rec" == res.type) {
        const data = res.body
        Handler.receive(identifier, data)
      }
    }
  }

  /**
   * 接收消息的Handler
   * @param event
   */
  static receive(identifier, data) {
    /** 初始化数据库 **/
    const LokiDb = new Dator()
    /** 同步数据 **/
    LokiDb.sync(identifier, data)
  }
}

export default Handler
