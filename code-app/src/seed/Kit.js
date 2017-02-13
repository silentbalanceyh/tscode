import Ajax from './ajax'

import Adom from './adom'

import Config from './config'

import Entity from './entity'

import Redux from './redux'

import Tool from './tool'

import Data from './data'

import Render from './render'

import Op from './op'

import Cache from './cache'

import Context from './context'

import Secure from './secure'

import Window from './window'

import Component from './component'

import Plugin from './plugin'

import Assert from './assert'

import Facade from './facade'

import Visitor from './visitor'

import Vector from './vector'

import Ruler from './ruler'

import Logger from './logger'

import Abrupt from './abrupt'

import Dialog from './dialog'

import Criteria from './criteria'

import I18n from './i18n'

import Sock from './sock'

import Valve from './valve'

import { injectReducer } from '../engine/store/reducers'

import UI from '../spirit'

import Arkt from './vie.json'
// ------------------------------------
// $$核心工具集
// ------------------------------------
export default {
  Abrupt,
  Ajax,
  Adom,
  Config,
  Entity,
  Redux,
  Tool,
  Render,
  UI,
  Op,
  Context,
  Secure,
  Cache,
  Window,
  Component,
  Plugin,
  Data,
  Assert,
  Facade,
  Visitor,
  Vector,
  Ruler,
  Logger,
  Dialog,
  Criteria,
  I18n,
  Sock,
  Arkt,
  Valve,
  Reducer: injectReducer
}
