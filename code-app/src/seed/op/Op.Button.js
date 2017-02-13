import Handler from './Op.Handler'
import Assert from '../assert'
import Immutable from 'immutable'

const isSubmitting = (type) => {
  const types = Immutable.Set.of("SUBMIT","EMPTY")
  return types.contains(type)
}

const isDirect = (type) => {
  const types = Immutable.Set.of("DIRECT","TAB","DIALOG","MENUITEM")
  return types.contains(type)
}

const isBack = (type) => {
  const types = Immutable.Set.of("BACK")
  return types.contains(type)
}

class Op{
  /**
   *
   * @param config
   * @param pristine
   * @param submitting
   * @returns {boolean}
   */
  static rdxStatus(config,{
    pristine,
    submitting
  }){
    Assert.isDefinedKey({config},['type'])
    const { type } = config;
    let status = true;
    if(isSubmitting(type)){
      status = submitting;
    }else if("RESET" == type){
      status = pristine || submitting;
    }else{
      status = submitting;
    }
    return status;
  }

  /**
   *
   * @param config
   */
  static rdxUI(config = {}){
    let className = ''
    if(config.adj){
      className = `ui ${config.adj} button`.trim();
    }else{
      className = `ui button`;
    }
    return className
  }

  /**
   *
   * @param config
   * @param handleSubmit
   * @param reset
   */
  static rdxHandler(config,{
    handleSubmit,
    reset,
    meta
  }){
    Assert.isDefinedKey({config},['type'])
    const { type } = config;
    let handle;
    if("RESET" == type){
      handle = reset;
    }else if(isSubmitting(type)){
      handle = handleSubmit(Handler.generate(config))
    }else if(isDirect(type)){
      handle = Handler.direct(config, meta)
    }else if(isBack(type)){
      config.code = 'OP.TAB.BACK'
      handle = Handler.direct(config, meta)
    }
    return handle
  }
}

export default Op
