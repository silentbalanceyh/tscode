import $$ from '../../../seed'

const fnSelected = (dispatch, cid, path) => (event) => {
  const selected = event.target.value;
  dispatch({type: $$.Redux.Types.SUCCESS_UI_SELECTED_ROW, selected, path});
}

export default {
  fnSelected
}
