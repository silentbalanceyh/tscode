import Scooter from './Sock.Scooter'
import Dator from './Sock.Dator'

class VentBus{
  /**
   *
   */
  static init(){
    /** 1.初始化WebSocket **/
    Scooter.wsk()
    /** 2.初始化Database LokiJS **/
    const LokiDb = new Dator()
    //const collections = VentBus.collections();
    //LokiDb.initialize(collections)
    /** 3.判断是否第一次初始化 **/
    LokiDb.debug()
  }
}

export default VentBus
