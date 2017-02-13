import WarningHtml from './_semantic/WarningHtml'
import SuccessHtml from './_semantic/SuccessHtml'
import ConfirmHtml from './_semantic/ConfirmHtml'

import Dialog from './Dialog.Tool'

class Semantic{
  /**
   * 警告窗口
   * @param message
   */
  static warning(message, yes){
    Dialog.applyConfig(WarningHtml,message,{yes})
    Dialog.showDialog()
  }

  /**
   * 成功窗口
   * @param message
   * @param yes
   */
  static success(message, yes){
    Dialog.applyConfig(SuccessHtml,message,{yes})
    Dialog.showDialog()
  }

  /**
   * 确认窗口
   * @param message
   * @param yes
   */
  static confirm(message, yes, no){
    Dialog.applyConfig(ConfirmHtml,message,{yes,no})
    Dialog.showDialog()
  }
}

export default Semantic
