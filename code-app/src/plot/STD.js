import Security from './security'
import Form from './form'
import Tab from './tab'
import State from './state'
import Reload from './reload'
import Dialog from './dialog'
import Extension from '../imit'

export default {
  "_STD_.OP.LOGIN.OAUTH":Security.Login._oauth,
  "_STD_.OP.USER.CIPHER":Security.User._cipher,

  "_STD_.OP.FORM.ADD":Form.Submit._add,
  "_STD_.OP.FORM.EDIT":Form.Submit._edit,
  "_STD_.OP.FORM.DEL":Form.Submit._delete,

  "_STD_.OP.TAB.ADD":Tab.Page._add,
  "_STD_.OP.TAB.EDIT":Tab.Page._edit,
  "_STD_.OP.TAB.VIEW":Tab.Page._edit,
  "_STD_.OP.TAB.DEL":Tab.Page._delete,
  "_STD_.OP.TAB.BACK":Tab.Page._back,

  "_STD_.OP.SEARCH":Form.Search._criteria,

  "_STD_.OP.LIST.SAVE":Form.Submit._list,
  "_STD_.OP.LIST.ETAT":Form.Submit._etat,
  "_STD_.OP.LIST.ADDITEM":State.Form._additem,

  "_STD_.OP.CLEAN.STATUS":State.Cleaner._clean,
  "_STD_.OP.LIST.RELOAD":Reload.List._reload,
  "_STD_.OP.DG.VIEW.REMOTE":Dialog.Remote._viewer,
  Extension
}
