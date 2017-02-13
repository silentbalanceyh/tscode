import Ajax from '../ajax'
import Assert from '../assert'

class User {
  /**
   * 用户修改密码Promise接口
   * @param input
   * @param path
   * @param method
   */
  static cipher({input,config:{path,method}}){
    Assert.isObject({input});
    Assert.isArrayString({path, method});
    return Ajax.Async.locator(method,path,input);
  }
}

export default User
