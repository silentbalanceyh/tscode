import Address from './Sock.Address'
import Ajax from '../ajax'
import EventBus from 'vertx3-eventbus-client'
import Handler from './Sock.Handler'

class Scooter {
  /**
   *
   */
  static wsk() {
    /** 1.配置 **/
    const configArr = Address.WSK
    /** 2.针对单记录配置 **/
    configArr.forEach(event => {
      /** 3.处理单个event连接 **/
      Scooter.connect(event)
    })
  }

  /**
   * 连接EventBus
   * @param event
   * @param identifier
   */
  static connect(event) {
    /** 1.初始化event信息 **/
    const eb = new EventBus(Ajax.Api.socket(event.socket))
    /** 2.Open的时候注册用的Handler **/
    const addrs = event.address
    eb.onopen = () => {
      /** 3.一一注册handler **/
      for (const identifier in addrs) {
        const messageAddr = addrs[identifier]
        eb.registerHandler(messageAddr, Handler.register(identifier,messageAddr))
      }
    }
  }
}

export default Scooter
