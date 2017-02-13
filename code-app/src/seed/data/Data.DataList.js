import Assert from '../assert'

class DataList{
  /**
   * 提取DataList的初始化值
   * @param props
   */
  static extractItem(config){
    /** 1.提取配置,检查config中的items **/
    Assert.isDefinedKey({config},['$_items']);
    const items = config.$_items;
    Assert.isArray({items});
    console.assert(1 == items.length);
    /** 3.将Items的配置读取出来 **/
    return items[0];
  }
}

export default DataList
