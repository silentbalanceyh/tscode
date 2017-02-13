import Ajax from '../ajax'
import Cache from '../cache'
import Assert from '../assert'
import Visitor from '../visitor'

class Catalog {
  /** 直接访问本地 **/
  static direct(type) {
    // category -> String
    Assert.isString({type});
    return ({
      item, cache:{
      language,
      app, module, page
    }
    }) => {
      // item -> Object
      // item.uniqueId
      // app,module,page,language -> String
      Assert.isObject({item});
      Assert.isDefinedKey({item}, ['uniqueId']);
      Assert.isArrayString({app, module, page, language});
      // 1.构建通用参数
      const controlId = item['uniqueId'];
      const path = `${app}/${module}/${page}`;
      const name = `vie.app.${app}`;
      // 2.函数
      const fun = Cache.Config.readCatalog(type);
      // fun -> Function
      Assert.isFunction({fun});
      const data = fun({name, path, language, controlId});
      if (data) {
        return Ajax.Async.storage(data);
      } else {
        return Ajax.Async.storage(item);
      }
    }
  }

  /** 统一配置 **/
  static config(config) {
    // config -> Object
    // config.cid
    // config.config
    Assert.isObject({config});
    Assert.isDefinedKey({config},['cid']);

    const container = {};
    // 本身的ID信息
    container['cid'] = config.cid;
    // 读取当前这个Container所需要的配置
    container['data'] = Visitor.visit(config);
    return container;
  }
}

export default Catalog
