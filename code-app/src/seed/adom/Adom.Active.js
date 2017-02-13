import Assert from '../assert'

import css from './style/Active.scss'

class Active {

  static active(item,checked,appendCss){
    // item -> Object
    Assert.isObject({item});
    // Code
    let className = '';
    if(checked && checked == item.uniqueId){
      className = `item ${css['active']} ${appendCss} active`;
    }else{
      className = `item ${appendCss}`;
    }
    return className
  }
}

export default Active
