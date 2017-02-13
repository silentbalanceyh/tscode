import Assert from '../assert'

class Record{

  static visit(config){
    Assert.isObject({config});
    /** 1.读取config的record节点 **/
    return config.record;
  }
}

export default Record;
