import $$ from '../../../seed'

const $_fnMove = (name) => () => {
  jQuery(`.cubetab`).removeClass('active')
  jQuery(`#cubetab${name}`).addClass('active')
  jQuery(`#cubepage${name}`).addClass('active')
}

const initiate = (props = {}) => {
  return $$.Data.Init.initData(props);
}

export default {
  $_fnMove,
  initiate
}
