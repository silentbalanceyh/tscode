import $$ from '../../../seed'

const initiate = (props = {}) => {
  return $$.Data.Init.initData(props);
}

export default {
  initiate
}
