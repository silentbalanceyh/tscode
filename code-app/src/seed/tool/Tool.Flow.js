import React from 'react'
import Immutable from 'immutable'
import $$ from '../Kit'
import Assert from '../assert'
import diff from 'immutablediff'
// ------------------------------------
// Module初始化函数
// 1.param.force = true为强制更新，目前只有arena中的App以及Module调用了；
// 2.对于组件中的流程，如果param.force为false为默认值，检查config中的四个核心Promise配置
// 3.record, tabular, cat, assist中任意一个配置出现则执行更新流程，触发Promise的构造过程
// 4.设置强制更新的目的是为了防止组件共享时，如果不配任何对应Promise的情况下不触发更新流程
// ------------------------------------
const isPromise = (config = {}) => {
  const {record, tabular, cat, assist} = config;
  if (record || tabular || cat || assist) {
    return true;
  } else {
    return false;
  }
}
const init = (props, params = {}, component) => {
  let {initiate, dispatch, initialize} = props;
  let isInit = true;
  if (!params.force) {
    isInit = isPromise(props['$_ajax']);
  }
  if (initiate && dispatch && isInit) {
    Assert.isArrayFunction({initiate, dispatch});
    if(initialize){
      /** Form专用的初始化 **/
      initiate(props, params, initialize);
    }else{
      /** 其他组件初始化，注意第三参 **/
      initiate(props, params, component);
    }
  }
}
// ------------------------------------
// 是否执行初始化，注意强制更新函数
// ------------------------------------
const updatedApp = (props, prevProps, component) => {
  if (isAppUpdated(props.params, prevProps.params)) {
    init(props, {force: true}, component);
  }
}

const isAppUpdated = (props, prevProps) => {
  const params = Immutable.fromJS(props);
  const nextParams = Immutable.fromJS(prevProps);
  return !Immutable.is(params, nextParams)
}

const updatedMod = (props, nextProps, component) => {
  const params = Immutable.fromJS(props.params);
  const nextParams = Immutable.fromJS(nextProps.params);
  if (!Immutable.is(params, nextParams)) {
    init(props, {force: true}, component);
  }else{
    const { status } = props
    if(!status.isConfig){
      init(props, {force: true}, component);
    }
  }
}
// ------------------------------------
// 统一错误信息
// ------------------------------------
const error = (error) => {
  const Error = $$.UI['$UCA$.error.ErrorPage'];
  Assert.isFunction({Error});
  return (
    <Error error={error}/>
  )
}
// ------------------------------------
// 开启核心的Loading函数，执行Start命令
// ------------------------------------
const startMod = (props,prevProps) => {
  const params = Immutable.fromJS(props.params);
  const nextParams = Immutable.fromJS(prevProps.params);
  if (!Immutable.is(params, nextParams)) {
    $$.Plugin.JQuery.showMask()
    // 取消Start，只保留Mask功能
    $$.Tool.Loader.configMod(props)
  }
}
// ------------------------------------
// 统一的Loading
// ------------------------------------
const loading = (message) => {
  const Loader = $$.UI['$UCA$.loader.PageLoader'];
  Assert.isFunction({Loader});
  /** 显示默认信息 **/
  message = (message) ? message : 'Loading...';
  return (
    <Loader message={message}/>
  )
}

const diffData = (oldEtat, newEtat) => {
  const $old = Immutable.fromJS(oldEtat)
  const $new = Immutable.fromJS(newEtat)
  const $diff = diff($old,$new)
  const patches = $diff.toJS()
  return 0 < patches.length
}

const download = (props,finished) => {
  const { dispatch, params = {} } = props
  if(finished || (params.app && "login" == params.module)){
    if(dispatch){
      dispatch({type:$$.Redux.Types.SUCCESS_APP_DOWNLOAD,finished})
    }
  }
}

export default {
  init,
  diffData,
  error,
  loading,
  download,
  updatedApp,
  isAppUpdated,
  updatedMod,
  startMod
}
