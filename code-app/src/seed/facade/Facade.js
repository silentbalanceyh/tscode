import Form from './Facade.Form'
import Catalog from './Facade.Catalog'
import DataList from './Facade.DataList'
import PageList from './Facade.PageList'
import ToolBar from './Facade.ToolBar'
import Assert from '../assert'

const build = (array) => {
  // array -> Array
  Assert.isArray({array});
  const config = {};
  array.forEach((item) => {
    // 构建不同Control的控件
    // item.category
    Assert.isDefinedKey({item}, ['type']);
    switch (item.type) {
      case "FORM":
        config[item['cid']] = Form.config(item);
        break;
      case "DATALIST":
        config[item['cid']] = DataList.config(item);
        break;
      case "PAGELIST":
        config[item['cid']] = PageList.config(item);
        break;
      case "TOOLBAR":
        config[item['cid']] = ToolBar.config(item);
        break;
      default:
        config[item['cid']] = Catalog.config(item);
        break;
    }
  });
  return config;
}

const orention = () => {
  const commonApi = Catalog;
  Assert.isFunction({form:Form.api});
  Assert.isFunction({datalist:DataList.api});
  Assert.isFunction({pagelist:PageList.api});
  Assert.isFunction({toolbar:ToolBar.api})
  return {
    "FORM": Form.api,
    "TOOLBAR": ToolBar.api,
    "DATALIST": DataList.api,
    "PAGELIST": PageList.api,
    "CONTAINER": commonApi.direct("CONTAINER"),
    "STATIC": commonApi.direct("STATIC"),
    "LOADER": commonApi.direct("LOADER")
  }
}

const isContainer = (item) => {
  Assert.isDefinedKey({item},['type']);
  return "CONTAINER" == item.type;
}

export default {
  orention,
  build,
  isContainer
}
