import $$ from '../../seed'

class Verify{
  /**
   * 验证List信息
   * @param config
   * @param value
   */
  static validateList(config, value){
    /** 1.读取长度信息 **/
    const minlimit = config.length
    /** 2.长度验证，该值长度应该大于等于限制的最小长度 **/
    if(value && minlimit <= value.length){
      return true
    }else{
      console.info(config)
      $$.Dialog.Semantic.warning(config.message,() => {
        $$.Plugin.JQuery.hiddenMask()
      })
    }
  }
}

export default Verify
