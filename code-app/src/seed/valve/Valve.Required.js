import Flow from './Valve.Flow'
// ------------------------------------
// Required Rule Checking
// ------------------------------------
const Required = (config, value) => {
  const errors = {}
  const {name, message} = config;
  /** 1.读取数据值 **/
  const checked = value[name]
  const fun = (value) => (!value)
  /** 2.Flow支持Array和Value的双流程 **/
  Flow.verify(name, checked, message, fun, errors)
  return errors;
}

export default Required
