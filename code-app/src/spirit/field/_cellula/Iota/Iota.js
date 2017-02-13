import Immutable from 'immutable'
import css from './Iota.scss'

class Iota {
  /**
   *
   * @type {{number: ((p1:*)=>(p1:*))}}
   */
  static Normalize = {
    number:(config) => ((value) => {
      /** 1.提取maxlength **/
      const { maxlength } = config
      /** 2.正数输入限制 **/
      if(1 == value.length){
        value = value.replace(/[^1-9]/g,'')
      }else {
        value = value.replace(/\D/g, '');
      }
      /** 3.存在长度时才有长度输入限制 **/
      if(0 < maxlength){
        if(maxlength < value.length){
          value = value.substring(0,maxlength)
        }
        return value
      }else {
        return value
      }
    }),
    curreny:(config) => ((value) => {
      /** 1.提取maxlength **/
      const { maxlength } = config
      if(0 < maxlength){
        /** 2.正数输入限制 **/
        value = value.replace(/[^\d.]/g,"")   //清除“数字”和“.”以外的字符
        value = value.replace(/\.{2,}/g,".")  //只保留第一个. 清除多余的
        value = value.replace(".","$#$").replace(/\./g,"").replace("$#$",".")
        value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3') //只能输入两个小数
        /** 3.长度输入限制 **/
        if(value.indexOf(".")< 0 && value !=""){
          value = parseFloat(value)
        }
        if(maxlength < value.length){
          value = value.substring(0,maxlength)
        }
        return value
      }else {
        return value
      }
    })
  }
  /** **/
  static calcEndDay(start,end){
    console.info(start,end)
  }
  /**
   *
   * @param config
   * @returns {*}
   */
  static calcWide(config) {
    const {column, range = {}} = config
    const style = (column) ? {width: `${99 / column}%`} : {}
    if (range.columns) style.width = `${(99 / column) * range.columns}%`
    return style
  }

  /**
   * 计算Error浮游信息位置
   * @param config
   */
  static calcError(config){
    /** 抽取原始数据 **/
    const { inline = false, fieldset, array = false } = config
    let errorStyle = config.errorStyle
    if(!errorStyle){
      /** 1.未配置的时候则执行计算 **/
      if(inline || fieldset){
        /** 2.如果inline或者fieldset的时候执行计算 **/
        errorStyle = { top: "-3.6em", left: "6.2em" }
      }else{
        /** 3.默认模式，inline=false**/
        if(array){
          errorStyle = {top: "-3.2em", left: "0em"}
        }else {
          errorStyle = {top: "-1.35em", left: "5em"}
        }
      }
    }
    return errorStyle
  }
  /**
   *
   * @param type
   */
  static isMulti(type) {
    const types = Immutable.Set.of("multitext")
    return types.contains(type)
  }

  /**
   * 提取数据
   * @param config
   */
  static format(config = {}) {
    const {valueType} = config
    let executor;
    if ("number" == valueType) {
      executor = (value) => (Number(value))
    } else {
      executor = value => value
    }
    return executor
  }

  /**
   * ReadOnly专用效果
   * @param config
   */
  static readOnly(config = {}) {
    /** 0.提取Immutable **/
    let $config = Immutable.fromJS(config)
    /** 1.提取Read Only **/
    const {readonly = false} = config
    /** 2.处理Read Only Css **/
    let className = ''
    if (readonly) {
      className = `${className} ${css['readonly']}`.trim()
    }
    /** 3.注入特换 **/
    $config = $config.set('className', className)
    return $config.toJS()
  }

  /**
   * 根据配置生成options
   * @param config
   * @param key
   */
  static options(config = {}, key) {
    /** 0.提取Immutable **/
    let $config = Immutable.fromJS(config)
    /** 1.提取显示列表 **/
    const {value, display} = config
    /** 2.生成options **/
    let options = []
    const $key = $config.get(key)
    if ($key) {
      $key.forEach((item) => {
        const option = {}
        option.value = item.get(value)
        option.display = item.get(display)
        options.push(option)
      })
    }
    return options
  }

  /**
   *
   */
  static labelWidth(){
    return {minWidth: `5rem`}
  }
}

export default Iota
