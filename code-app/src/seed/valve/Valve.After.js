import moment from 'moment'
// ------------------------------------
// After Rule Checking
// ------------------------------------
const After = (config,value) => {
  const errors = {};
  const { name, message, target } = config
  if(value[name]) {
    /** 1.寻找对比的时间 **/
    let targetDate = moment(new Date())
    if (target && value[target]) {
      targetDate = value[target]
    }
    /** 2.读取当前时间 **/
    let currentDate = value[name]
    if(moment.isMoment(currentDate)) {
      if (currentDate.isBefore(targetDate) || currentDate.isSame(targetDate)) {
        errors[name] = message
      }
    }
  }
  return errors
}

export default After
