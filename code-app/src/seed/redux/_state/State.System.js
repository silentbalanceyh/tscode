import Immutable from 'immutable'
class System{
  /**
   * 将Tabular按照type执行分组呈现在State树上
   * **/
  static tabular(key, itemData = {}){
    if('tabular' == key && itemData.list){
      /** 1.分组 **/
      const list = Immutable.fromJS(itemData.list);
      const groups = list.groupBy(item => item.get('type')).toJS()
      const tabular = {}
      /** 2.执行每一组的排序功能 **/
      for( const key in groups){
        const items = Immutable.fromJS(groups[key])
        tabular[key] = items.sortBy(item => item.get('order')).toJS()
      }
      return tabular;
    }else{
      return itemData;
    }
  }
}

export default System
