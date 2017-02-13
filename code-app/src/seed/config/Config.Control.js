import Assert from '../assert'
import Tool from '../tool'

const sort = (controls) => {
  Assert.isArray({controls});
  const ret = [];
  const items = {};
  controls.forEach((item) => {
    Assert.isDefinedKey({item},['order']);
    items[item.order] = item;
  })
  for (let idx = 1; idx <= controls.length; idx++) {
    ret.push(items[idx]);
  }
  return ret;
}

const getChildren = (controls, id) => {
  Assert.isArray({controls});
  let children = [];
  controls.forEach((item) => {
    if (id) {
      if (item['parentId'] && id == item['parentId']) {
        children.push(item);
      }
    } else {
      if (!item['parentId']) {
        children.push(item);
      }
    }
  });
  children = sort(children);
  return children;
}

const flatItem = (controls, config) => {
  Assert.isArray({controls});
  const items = [];
  controls.forEach((item) => {
    const control = {};
    Assert.isDefinedKey({item},['name','type','uniqueId','cid']);
    control['name'] = item.name;
    control['type'] = item.type;
    control[Tool.ID.SERVER] = item.uniqueId;
    control[Tool.ID.CLIENT] = item.cid;
    const children = getChildren(config, item.uniqueId);
    if (0 != children.length) {
      control['items'] = flatItem(children, config);
    }
    items.push(control);
  });
  return items;
}
class Control {
  // ------------------------------------
  // 计算容器链，当前Page的所有容器信息
  // ------------------------------------
  static ui(config) {
    // config -> Array
    Assert.isArray({config});
    const children = getChildren(config);
    // 将Array展开成key = item的模式
    return flatItem(children, config);
  }

  static config(config) {
    // config -> Array
    Assert.isArray({config});
    const controls = {};
    config.forEach((item) => {
      const key = item[Tool.ID.CLIENT];
      // key -> String
      Assert.isString({key});
      controls[key] = item['name'];
    });
    return controls;
  }
}

export default Control
