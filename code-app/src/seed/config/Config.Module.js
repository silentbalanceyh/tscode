import Q from 'q';
import Ajax from '../ajax'
import Cache from '../cache'
import Assert from '../assert'
import SockJS from './Config.SockJS'
// ------------------------------------
// 模块配置加载类
// ------------------------------------
class Module {
  // ------------------------------------
  // 当前页面所有Control信息读取
  // ------------------------------------
  static control({
    pageId, language,
    app, module, page
  }) {
    // pageId, app,module,page,language -> String
    Assert.isArrayString({pageId, app, module, page, language});
    // const data = Cache.Config.readControl({name, path, language});
    const data = Cache.Sock.outControl({app, module, page, language})
    if (data) {
      return SockJS.controls(pageId, language)
    } else {
      Cache.Sock.inControl({app, module, page, language})
      const apiUri = `/env/control/${pageId}`;
      return Ajax.Async.get(apiUri,{language});
    }
  }

  // ------------------------------------
  // 配置每一个对应的Controls
  // ------------------------------------
  static config(list, config) {
    const promises = [];
    const cache = config.cache;
    list.forEach((item) => {
      for (const key in config) {
        const itemKey = item[key];
        if (itemKey) {
          const promise = config[key][itemKey];
          if (promise) {
            promises.push(promise({item, cache}));
          }
        }
      }
    });
    return Q.all(promises);
  }
}

export default Module
