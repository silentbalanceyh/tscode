class Render {
  /** **/
  static aspectDebug(render,current){
    if(!render){
      // TODO: 开发环境专用
      // console.debug(current);
    }
    return render
  }
  /** 检查List是否合法数据 **/
  static mountList(current){
    let render = (current && current.list && 0 <= current.count)
    if(0 == render) render = true
    return Render.aspectDebug(render,current);
  }
  /** 单纯的Array检查 **/
  static mountJArray(current){
    return Render.aspectDebug(current && current.length,current);
  }
  /** 多个Array的检查 **/
  static mountJArrays(current = []){
    const render = current.filter((current) => (!Render.mountJArray(current)));
    return Render.aspectDebug(0 == render.length,current);
  }
  /** 检查读取的数据是否带了合法的数据信息 **/
  static mountJObject(current){
    return Render.aspectDebug(current && 0 < Object.keys(current).length,current);
  }

  static mountJOKey(current, key = ''){
    return Render.aspectDebug(current && current[key],current);
  }
  /** 检查读取的数据是否带了合法的Keys **/
  static mountJOKeys(current,keys = []){
    const render = keys.filter((key) => !Render.mountJOKey(current, key));
    return Render.aspectDebug(0 == render.length,current);
  }
}

export default Render
