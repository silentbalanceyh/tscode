import Codec from './I18n.Codec'
import Calendar from './I18n.Calendar'
import Config from '../vie.json'
import moment from 'moment'
/**
 * 读取当前系统Language
 */
const language = () => {
  return Config.LANGUAGE
}
/**
 * 读取Language Code
 * @param lang
 * @returns {*}
 */
const localizer = () => {
  return Codec[language()]
}
/**
 *
 */
const calendar = () => {
  return Calendar[language()]
}
/**
 *
 * @param showTime
 */
const now = (showTime,format = true) => {
  moment.locale(localizer())
  let result = moment()
  if(format) {
    if (showTime) {
      return result.format('YYYY-MM-DD HH:mm:ss')
    } else {
      return result.format('YYYY-MM-DD')
    }
  }else{
    return result
  }
}

export default {
  now,
  language,
  localizer,
  calendar,
  locale: language
}
