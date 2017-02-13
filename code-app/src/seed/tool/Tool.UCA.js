import $$ from '../Kit'

class UCA{
  /**
   * 直接读取uca
   * @param type
   */
  static uca(type){
    // 1.读取组件名
    const name = `$UCA$.${type}`;
    const Component = $$.UI[name];
    if(!Component){
      console.debug(`Undefined Component: ${name}`);
    }else{
      Component.displayName = type
    }
    return Component
  }
}

export default UCA
