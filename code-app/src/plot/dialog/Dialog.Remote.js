import $$ from '../../seed'

const $_fnShowDialog = (meta, config) => {
  /** **/
  const metadata = config.config
  /** 构造ingest **/
  const ingest = {}
  if (metadata.input) {
    ingest.input = metadata.input
  }
  ingest.uri = config.path
  ingest.method = config.method ? config.method : "GET"
  /** 提取组件 **/
  const component = $$.Tool.UCA.uca(metadata.type)
  /** 直接传dialogId **/
  $$.Dialog.Retort.dialog(component, {type: metadata.type, ingest, selector: meta}, metadata['dialogId'])
}

const _viewer = (meta, config = {}, {
}) => {
  $$.Logger.Input.formInput(meta, '_viewer', config)
  /** 1.读取Dialog配置 **/
  const { dialog = {} } = config.config
  if(dialog){
    const {selected} = meta
    if ($$.Render.Hatch.row(dialog, selected)) {
      $_fnShowDialog(meta, config)
    }
  } else {
    $_fnShowDialog(meta, config)
  }
}

export default {
  _viewer
}
