import Ajax from '../ajax'
import Cache from '../cache'
import Assert from '../assert'
import Config from '../config'

class Common {

  static snaps(item,
    {
      type,
      uri = "",
      snaps = {},
    },
    {
      language,
      app,
      module,
      page
    }) {
    // item -> Object
    // item.uniqueId
    // app,module,page,language -> String
    Assert.isObject({item});
    Assert.isDefinedKey({item}, ['uniqueId']);
    Assert.isArrayString({app, module, page, language});

    const sharedId = item['uniqueId'];
    const data = Cache.Sock.outCatalog(type)({app, module, page, language, cid: item.cid})
    if (data) {
      return Config.SockJS.snaps(sharedId,snaps)
    } else {
      Cache.Sock.inCatalog(type)({app, module, page, language, cid: item.cid})
      const body = {
        shared: sharedId,
        snaps
      }
      return Ajax.Async.post(uri, body);
    }
  }
}

export default Common
