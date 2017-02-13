import Ajax from '../ajax'
import Cache from '../cache'
import Assert from '../assert'
import SockJS from './Config.SockJS'
// ------------------------------------
// 应用程序配置加载类
// ------------------------------------
class App {
  /**
   * 应用程序配置加载
   * @param name
   */
  static config({app}) {
    // app -> String
    Assert.isString({app});
    const appName = `vie.app.${app}`;
    const data = Cache.Config.readApp(appName);
    /** 返回的Promise **/
    if (data) {
      return Ajax.Async.storage(data);
    } else {
      /** App赋值 **/
      const apiUri = `/env/app/${appName}`;
      return Ajax.Async.get(apiUri);
    }
  }

  /**
   * 模板加载
   * @param page
   * @param data
   */
  static layout({prev:{app, module, page}}) {
    // app,module,page -> String
    Assert.isArrayString({app, module, page});
    /** 1.判断从哪里读取数据 **/
    const path = `${app}/${module}/${page}`;
    /** 2.直接读取Sock的Key **/
    const data = Cache.Sock.outLayout({app,module,page});
    if(data){
      /** 3.走本地LokiJS **/
      return SockJS.layout(app, module, page)
    }else{
      /** 4.走远程Layout **/
      Cache.Sock.inLayout({app,module,page});
      const apiUri = `/env/layout/${path}`;
      return Ajax.Async.get(apiUri);
    }
  }

  /**
   * Slice加载
   * @param layout
   */
  static slice({current, prev:{name}}) {
    // name, layoutId
    Assert.isArrayString({name});
    const data = Cache.Sock.outSlice({name, layout:current.name})
    if (data) {
      return SockJS.slice(current.layoutId)
    } else {
      Cache.Sock.inSlice({name,layout:current.name})
      const apiUri = `/env/slice/${current.layoutId}`;
      return Ajax.Async.get(apiUri);
    }
  }
}

export default App
