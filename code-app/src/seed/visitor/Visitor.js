import Connect from './Visitor.Connect'
import Op from './Visitor.Op'
import Record from './Visitor.Record'
import Mapping from './Visitor.Mapping'
import Info from './Visitor.Info'
import Assist from './Visitor.Assist'
import Spec from './Visitor.Spec'
import Style from './Visitor.Style'
import Tabular from './Visitor.Tabular'
import Cat from './Visitor.Cat'
import Ruler from './Visitor.Ruler'

/** Entity的搜索 **/
import Entity from '../entity'
import Tool from '../tool'
import Assert from '../assert'
/**
 * 专用的解析属性的visit方法
 * @param config
 * @param params
 */
const visit = (config, params = {}) => {
  const item = {};
  /** 1.解析Connect元素 **/
  item.connect = Connect.visit(config);
  /** 2.解析Info元素 **/
  item.info = Info.visit(config);
  /** 3.解析Mapping元素 **/
  item.mapping = Mapping.visit(config);
  /** 4.解析Op元素 **/
  item.op = Op.visit(config);
  /** 5.Promise: 解析Record元素 **/
  item.record = Record.visit(config, params);
  /** 6.Promise: 解析Assist元素 **/
  item.assist = Assist.visit(config, params);
  /** 7.解析Spec元素 **/
  item.spec = Spec.visit(config);
  /** 8.解析Style元素 **/
  item.style = Style.visit(config);
  /** 9.Promise: Fixed List 解析Tabular元素 **/
  item.tabular = Tabular.visit(config, params)
  /** 10.Promise: Category表读取 解析Cat元素 **/
  item.cat = Cat.visit(config, params);
  /** 11.Ruler：处理Ruler元素 **/
  item.ruler = Ruler.visit(config);
  /** 12.删除undefined值 **/
  for (const key in item) {
    if (!item[key]) {
      delete item[key];
    }
  }
  /** 13.注入id值 **/
  if (config.name) item.type = config.name
  if (config.uniqueId) item.pk = config.uniqueId;
  if (config.cid) item.cid = config.cid;
  return item;
}
/**
 * 搜索当前Mapping中的数据
 * @param props
 * @param key
 * @returns {*|{}}
 */
const lookup = (props, key = '') => {
  /** 1.读取Mapping信息 **/
  const {config:{mapping}} = props;
  if (mapping[key]) {
    /** 2.读取路径信息 **/
    const pathes = mapping[key];
    return Entity.Data.lookup(props, pathes);
  }
}
 /**
 * 搜索
 * @param children
 * @param key
 */
const ensure = (props, keys = []) => {
  const {config} = props;
  Assert.isDefinedKey({config}, keys);
}
/**
 * 处理connect连接，一些容器组件必须
 * @param props
 * @param children
 */
const connect = (connect, children) => {
  /** 2.遍历connect **/
  const components = {};
  for(let rawKey in connect){
    /** 3.处理key **/
    const key = connect[rawKey];
    /** 4.查找组件 **/
    const component = children.filter(item => rawKey == item.key);
    /** 5.找到组件 **/
    if(1 == component.length) {
      components[key] = component[0];
    }
  }
  return components;
}

export default {
  visit,
  lookup,
  ensure,
  connect
}
