import Assert from '../assert'

const buildKeys = (items = [], dimKey) => {
  // 1.处理某一个维度
  const keySet = new Set();
  items.forEach((item) => {
    const key = item[dimKey];
    if (key) {
      keySet.add(key);
    }
  });
  return keySet;
}

class Cube {
  /** 构建第一维度显示信息 **/
  static buildDim(dimension,items = [],key){
    Assert.isDefinedKey({dimension}, [key]);
    const selected = dimension[key].field;
    Assert.isString({key:selected});
    const firstKeys = buildKeys(items, selected);
    const dim = [];
    firstKeys.forEach((item) => {
      const value = {};
      value['raw'] = item;
      value['text'] = `${item}${dimension[key].unit}`;
      dim.push(value);
    });
    const revert = dimension[key].revert;
    if(revert){
      return dim.reverse();
    }else {
      return dim;
    }
  }
  /** **/
  static build(dimension, items = [], {
    first,
    second
  }) {
    Assert.isDefinedKey({dimension}, ['first', 'second']);
    /** 1.提取两个维度的字段 **/
    console.info(items);
    console.info(dimension)
    console.info(first)
    console.info(second)
  }
}

export default Cube
