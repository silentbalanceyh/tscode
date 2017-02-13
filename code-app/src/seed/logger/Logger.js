import Prop from './Logger.Prop'
import Ruler from './Logger.Ruler'
import Input from './Logger.Input'
import Socket from './Logger.Socket'
import Timer from './Logger.Timer'

const debug = (message) => {
  if(process.env.NODE_ENV === `development`){
    console.warn(message);
  }
}

export default {
  Prop,
  Ruler,
  Input,
  Socket,
  Timer,
  debug
}
