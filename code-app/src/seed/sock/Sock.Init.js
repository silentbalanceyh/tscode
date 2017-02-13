import Dator from './Sock.Dator'
import Ajax from '../ajax'
import Cache from '../cache'
import Tool from '../tool'
import Random from 'random-js'

const IDENTIFIERS = [
  "v.ui.layout",
  "ui.slice",
  "ui.control",
  "ui.column",
  "ui.field",
  "v.ui.form.op",
  "ui.validate.rule",
  "sys.list.fixed"
]

const DOWNLOAD_URI = "/vtx/downloader"
/**
 * 是否执行下载
 * @param props
 */
const getParams = (props) => {
  const {params = {}}= props
  /** 1.Module专用，只有登录页面才检查 **/
  const requestParam = {}
  if (params.app && "login" == params.module) {
    requestParam["app"] = `vie.app.${params.app}`
    const cached = Cache.Sock.outLayout(params)
    if(!cached){
      const engine = Random.engines.mt19937().autoSeed()
      const key = Random.string()(engine,32)
      requestParam["key"] = key;
    }else {
      requestParam["key"] = Cache.Config.readUpdater({app: params.app})
    }
    requestParam["initor"] = IDENTIFIERS
    return requestParam
  }
}
/** **/
class Init {
  /** 初始化专用 **/
  static start(component) {
    const { props } = component
    /** 1.判断数据库中的内容 **/
    const params = getParams(props)
    /** 2.TODO：只在登录页面启用 **/
    if (params) {
      Ajax.Api.Async.post(DOWNLOAD_URI, params, (response) => {
        if ("boolean" != typeof(response) && "string" != typeof(response)) {
          /** 3.开启下载配置流程 **/
          const db = new Dator()
          db.download(IDENTIFIERS, response.data, () => {
            /** 4.下载完成处理key **/
            const {params = {}}= props
            Cache.Config.writeUpdater({app: params.app, key: response.key})
            // component.setState(state)
            Tool.Flow.download(props,true)
          })
        }else{
          // component.state.isDownload = true
          Tool.Flow.download(props,true)
        }
      })
    }else{
      //component.state.isDownload = true
      Tool.Flow.download(props,false)
    }
  }
}

export default Init
