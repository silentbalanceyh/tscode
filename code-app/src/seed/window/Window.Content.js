import Assert from '../assert'
const FHEIGHT = 125;

class Content{
  /**
   * Window重置
   * @param obj
   */
  static resize(height){
    let value = FHEIGHT;
    if(height){
      Assert.isArrayNumber({height});
      value = height;
    }
    return (obj) => {
      /** 默认内容高度，根据页面高度计算 **/
      obj.winHeight = (document.body.clientHeight - value);
    }
  }

  static listener(obj, height){
    Assert.isObject({obj})
    let value = FHEIGHT;
    if(height){
      Assert.isArrayNumber({height});
      value = height;
    }
    return () => {
      if(obj.mounted){
        Content.resize(value)(obj);
        obj.setState({windowWidth: window.innerWidth});
      }
    }
  }
}

export default Content
