import $$ from '../../seed'
import Immutable from 'immutable'
import Config from '../config.json'
import Types from '../core/Types'

const $_fnInit = (props) => {
  let { selected } = props
  if(!selected) selected = props.$_fnSelected()
  const promise = $$.Ajax.Api.get(Config['api'],selected)
  const {dispatch} = props
  return promise.then(data => {
    if (0 < data.length) {
      dispatch({type: Types.SUCCESS_DATA, data})
    }
  })
}

const $_fnIsUpdate = (props, nextProps) => {
  const oldSel = Immutable.fromJS(props.selected)
  const newSel = Immutable.fromJS(nextProps.selected)
  return !Immutable.is(oldSel,newSel)
}

export default {
  $_fnInit,
  $_fnIsUpdate
}
