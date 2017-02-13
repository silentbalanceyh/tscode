class Tree{
  /**
   * 是否展开
   * @param menus
   */
  static calcExpand(menus = [],sidebar){
    let ids = []
    const parent = menus.filter(menu => sidebar == menu.uniqueId)
    if(0 < parent.length) {
      ids.push(parent[0]['parentId'])
      ids = ids.concat(Tree.calcExpand(menus, parent[0]['parentId']))
    }
    return ids
  }
  /**
   * 计算Tree的最小Level
   * @param menus
   */
  static calcLevel(menus = []){
    console.assert(0 < menus.length)
    /** 1.构造menus **/
    let level = 0
    /** 2.提取第一个元素的level **/
    level = menus[0].level
    menus.forEach(menu => {
      if(Number(level) > Number(menu.level)){
        level = menu.level
      }
    })
    return level
  }

  /**
   * 构造整个Tree结构
   * @param parent
   * @param menus
   */
  static calcItems(parent, menus = []){
    /** 1.读取当前菜单Level **/
    const level = Number(parent.level) + 1
    const pid = parent.uniqueId
    /** 2.读取子菜单 **/
    const items = menus.filter(menu => ((level == menu.level) && (menu['parentId'] == pid)))
    /** 3.设置当前菜单的子菜单 **/
    if(items && 0 < items.length){
      /** 3.1.设置菜单中的items **/
      parent['items'] = items
      /** 4.提取子菜单中的子菜单，执行递归操作 **/
      items.forEach(item => {
        /** 4.1.递归调用 **/
        Tree.calcItems(item, menus)
      })
    }
  }
}

export default Tree
