import Ajax from '../ajax'
import Op from '../op'
import Assert from '../assert'
import Cache from '../cache'

class Login {
  /**
   * OAuth登录接口
   */
  static auth({input, config:{path, method}}) {
    Assert.isObject({input});
    Assert.isArrayString({path, method});
    return Ajax.Async.locator(method, path, input);
  }

  /**
   * 交换授权码
   */
  static authorize({current:{uniqueId, clientSecret, scope}}) {
    Assert.isArrayString({uniqueId, clientSecret, scope});
    const params = {
      response_type: "code",
      client_id: uniqueId,
      client_secret: clientSecret,
      scope
    }
    return Ajax.Async.post('/oth/authorize', params);
  }

  /**
   * 交换Token接口
   */
  static token({current:{code}, prev:{uniqueId}}) {
    Assert.isArrayString({code, uniqueId});
    const params = {
      grant_type: "authorization_code",
      client_id: uniqueId,
      code
    }
    return Ajax.Async.post('/oth/token', params);
  }

  /**
   *
   * @param dest
   */
  static signOut(dest) {
    Assert.isString({dest});
    return () => {
      Cache.Session.clear()
      Op.Locator.redirect(dest);
    }
  }
}

export default Login
