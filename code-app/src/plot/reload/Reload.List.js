import $$ from '../../seed'

const _reload = (meta, config = {}, {
  dispatch
}) => {
  $$.Logger.Input.formInput(meta, '_reload', config)
  const { metadata } = config.config
  if(metadata.reload){
    if(metadata.clean) {
      dispatch({type: $$.Redux.Types.SUCCESS_GOONEY_CLEAN_DATA, clean: metadata.clean})
    }
    dispatch({type:$$.Redux.Types.SUCCESS_UI_PAGER_RELOAD, cid: metadata.reload, key:["uex","reload",metadata.reload] })
  }
}
export default {
  _reload
}
