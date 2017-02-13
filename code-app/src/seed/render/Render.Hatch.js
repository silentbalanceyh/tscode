import React from 'react'
import Dialog from '../dialog'

class Hatch {
  /**
   * 是否选中专用Dialog
   */
  static row(dialog,row){
    let ret = true
    if(dialog.ALERT){
      if(!row || -1 == row){
        Dialog.Semantic.warning(dialog.ALERT)
        ret = false
      }
    }
    return ret
  }
}

export default Hatch
