class Selector{
  /** 初始化控件ListSelector的配置 **/
  static initQuery = (config) => {
    /** 1.提取控件cid **/
    const { ingest = {} } = config
    /** 2.设置selector子节点 **/
    const { orders = [], pager = {}} = ingest
    /** 3.Order必须包含值 **/
    console.assert(1 <= orders.length && 0 < Object.keys(orders[0]).length)
    /** 4.提取Pager节点 **/
    const query = {}
    query['orders'] = orders
    query['criterias'] = {}
    query['pager'] = { index: 1 }
    query['pager']['size'] = (pager.size)?pager.size:10
    /** 5.返回最终查询 **/
    return query
  }
}

export default Selector
