// ------------------------------------
// Template专用Slice转换
// ------------------------------------
import Config from '../config'
import Cache from '../cache'
import Facade from '../facade'
import Entity from '../entity'
import Immutable from 'immutable'
// ------------------------------------
// 转换App中需要使用的所有Slice
// ------------------------------------
const succModule = (component) => ({config, controls = {}, type, cache}) => {
  // 1.处理ui相关信息
  const ui = Config.Control.ui(controls.list);
  // 2.处理Controls中的数据信息
  const controlsData = Config.Control.config(controls.list);
  // 3.重构Config信息
  config = Facade.build(config);
  if(component){
    component.state = Immutable.fromJS({ config }).toJS()
  }
  return {
    type, config, ui, cache,
    controls: controlsData,
    status: {isConfig: true}
  }
}

const succApp = (component, cache = {}) => ({config = {}, layout = {}, slice = {}, type, user}) => {
  // Session中存储App应用程序的配置
  Cache.Config.writeApp({config});
  // 1.处理Slice
  slice = Entity.Slice.process(slice);
  // 2.执行Mount操作
  layout = Entity.Slice.mountTo(layout, slice);
  // 3.重组slice结构
  const sliceArr = [];
  Entity.Slice.refactor(slice, sliceArr);
  // 4.最终返回
  if(component){
    // 防止覆盖isDownload内置参数
    component.state.layout = Immutable.fromJS(layout).toJS()
  }
  return {
    config, type, user,
    slice: sliceArr,
    status: {isConfig: true}
  }
}

export default {
  succApp,
  succModule
}
