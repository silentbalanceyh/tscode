class Builder {

  /** 参数用于构造key **/
  static buildCacheKey(key, params) {
    // 1.判断key
    if (0 <= key.indexOf(',')) {
      const keyArr = key.split(',');
      let retKey = "";
      for (let idx = 0; idx < keyArr.length; idx++) {
        const keyItem = keyArr[idx];
        if (0 <= keyItem.indexOf(':')) {
          const value = params[keyItem.substring(1)];
          retKey += `/${value}`;
        } else {
          if (idx > 0) {
            retKey += `/${keyItem}`;
          } else {
            retKey += keyItem;
          }
        }
      }
      return retKey;
    } else {
      return key;
    }
  }

  /**
   * 构造Query String中的参数
   * @param active
   * @returns {string}
   */
  static buildParams(active) {
    let queryStr = "";
    let idx = 0;
    for (const key in active) {
      if(active[key]) {
        const kv = (key + "=" + encodeURIComponent(active[key]));
        if (0 == idx) {
          queryStr += "?" + kv;
        } else {
          queryStr += "&" + kv;
        }
        idx++;
      }
    }
    return queryStr;
  }
}

export default Builder;
