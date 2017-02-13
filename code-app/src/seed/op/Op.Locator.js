import Assert from '../assert'

class Locator{

  static redirect(dest){
    Assert.isString({dest})
    // 调试登录页
    window.location = dest;
  }
}

export default Locator
