import Assert from '../assert'
import Immutable from 'immutable'

class Anchor{
  /**
   * 链接生成特殊函数，拦截Link中的函数触发
   */
  static click(callback, config) {
    return (event) => {
      event.preventDefault();
      if (callback) {
        callback(config);
      }
    }
  }
  /**
   * 直接生成链接URI地址
   * @param item
   */
  static link(item, path){
    const { uri } = item
    const attrs = {}
    if(uri){
      Assert.isString({uri})
      if(path) {
        attrs['to'] = `/${path}${uri}`
      }else{
        attrs['to'] = `/${uri}`
      }
    }
    return attrs
  }

  /**
   * 点击操作
   * @param item
   */
  static action(item, path, funs){
    const { uri, script } = item
    const attrs = {}
    if(!uri && script){
      attrs['to'] = "#"
      let $item = Immutable.fromJS(item)
      if(item['redirect']){
        $item = $item.set('redirect',`/${path}${item['redirect']}`)
      }
      Assert.isString({script})
      const callback = funs[script]
      attrs['onClick'] = Anchor.click(callback,$item.toJS())
    }
    return attrs
  }
}

export default Anchor
