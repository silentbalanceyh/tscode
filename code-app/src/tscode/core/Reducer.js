import $$ from '../../seed'
import Action from './Action'
import Types from './Types'
import Future from '../api/Future'

const HANDLER = {}
for(const key in Types){
  const type = Types[key]
  // Inject Handler
  HANDLER[type] = Action[key]
}

export default $$.Redux.Handler.initReducer(HANDLER,{
  markers:[Future.$_fnLocate()]
})
