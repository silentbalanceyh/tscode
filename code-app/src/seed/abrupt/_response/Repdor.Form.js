import Dialog from '../../dialog'
import { SubmissionError } from 'redux-form'

class Form {
  /**
   * Form专用错误信息
   * @param abrupt
   * @param cid
   */
  static abysm({error}) {
    let errors = {}
    if (error.info) {
      Dialog.Semantic.warning(error.info)
      errors['info'] = error.info
    }else{
      errors['info'] = error.error
    }
    errors['_error'] = error.error
    /** 只有这种方式可阻止Redux-Form **/
    throw new SubmissionError(errors)
  }
}

export default Form
