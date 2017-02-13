class Query {
  /** 初始化Pager **/
  static initPager = () => ({index: 1, size: 10})
  /** 初始化Filters **/
  static initFilters = () => ([])
  /** 初始化查询条件 **/
  static initCriterias = () => ({})
  /** 初始化排序节点 **/
  static initOrders = () => ([])
}

class Uex {
  /** 初始化Tab页专用配置 **/
  static initTab = () => ({active: 0, headers: []})
  /** 初始化PageList专用配置 **/
  static initRow = () => ({row: -1})
  /** 初始化Reload专用配置 **/
  static initReload = () => ({})
}

export default {
  Query,
  Uex
}
