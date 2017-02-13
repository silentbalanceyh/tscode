import Assert from '../assert'
import Ajax from '../ajax'
import Tool from '../tool'

class Api {
  /**
   * 用户修改密码Promise接口
   * @param input
   * @param path
   * @param method
   */
  static common({input, config}) {
    const {path, method} = config
    Assert.isObject({input});
    Assert.isArrayString({path, method});
    const uri = Tool.Parameter.pattern(path, input)
    /** 1.提交移除参数，防止签名失败，这里移除的参数为防止签名失败的核心参数  **/
    uri.removed.forEach(item => {
      delete input[item]
    })
    return Ajax.Async.locator(method, uri.api, input);
  }

  /**
   * 计算Token的值
   * @param user
   */
  static token(user, schema = 'BEARER'){
    if(0 <= schema.indexOf('BEARER')) {
      const seed = `${user.uniqueId}:${user.token}`
      return Tool.Encryptor.b64Enc(seed)
    }
  }
}

export default Api
