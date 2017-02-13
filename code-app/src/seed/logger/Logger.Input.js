import VIE from '../vie.json'

class Input {
  /**
   *
   * @param uri
   * @param method
   * @param key
   * @param data
   */
  static cache(uri, method, key, data, flag = "Read"){
    if (process.env.NODE_ENV === `development` && VIE.DEBUG['INPUT']) {
      let message = `%c [RTV] [Cache Hit] ${flag} Local cache hitted: method ${method}.`
      console.groupCollapsed(message, "color:#00BFFF;font-weight:900", flag)
      console.log(`%c [RTV] URI -> `, 'color:#228B22;font-weight:900', uri)
      console.log(`%c [RTV] Key -> `, 'color:#FF69B4;font-weight:900', key)
      console.log(`%c [RTV] Data -> `, 'color:#D2691E;font-weight:900', data)
      console.groupEnd()
    }
  }
  /**
   * 打印参数信息
   * @param uri
   * @param method
   * @param parameters
   */
  static request(uri, method, parameters){
    if (process.env.NODE_ENV === `development` && VIE.DEBUG['INPUT']) {
      let message = `%c [RTV] [Ajax Call] Ajax Request with method ${method}.`
      console.groupCollapsed(message, "color:#CCCC33;font-weight:900")
      console.log(`%c [RTV] Parameters -> `, 'color:green;font-weight:900', parameters)
      console.log(`%c [RTV] URI -> `, 'color:#228B22;font-weight:900', uri)
      console.groupEnd()
    }
  }

  /**
   *
   * @param uri
   * @param method
   * @param parameters
   * @param seed
   * @param sig
   */
  static sign(uri, method, parameters, {
    seed, sig, secret
  }){
    if (process.env.NODE_ENV === `development` && VIE.DEBUG['INPUT']) {
      let message = `%c [RTV] [Sign] Sign with method ${method}. ( uri = ${uri})`
      console.groupCollapsed(message, "color:#CCCC33;font-weight:900")
      console.log(`%c [RTV] Parameters -> `, 'color:green;font-weight:900', parameters)
      console.log(`%c [RTV] Seed -> `, 'color:blue;font-weight:900', seed)
      console.log(`%c [RTV] Secret -> `, 'color:blue;font-weight:900', secret)
      console.log(`%c [RTV] Sig -> `, 'color:red;font-weight:900', sig)
      console.groupEnd()
    }
  }

  static field(config, method) {
    if (process.env.NODE_ENV === `development` && VIE.DEBUG['INPUT']) {
      let message = `%c [RTV] [Config Input] Input Field generated with method ${method}. ( cid = ${config.cid}, field: ${config.name} )`
      console.groupCollapsed(message, `color:#4169E1;font-weight:900;`)
      console.log(`%c [RTV] Client Id -> `, 'color:#32CD32;font-weight:900', config.cid)
      console.log(`%c [RTV] Client Name -> `, 'color:#FF4500;font-weight:900', config.name)
      console.log(`%c [RTV] Input Configuration ->`, 'font-weight:900', config)
      console.groupEnd()
    }
  }

  static callback(reference, method){
    if (process.env.NODE_ENV === `development` && VIE.DEBUG['INPUT']) {
      let message = `%c [RTV] [Promise Callback] Callback Reference generated with method ${method}.`
      console.groupCollapsed(message, `color:#2E8B57;font-weight:900;`, reference)
      console.groupEnd()
    }
  }

  static formInput(state, method, config) {
    if (process.env.NODE_ENV === `development` && VIE.DEBUG['INPUT']) {
      let message = `%c [RTV] [Submit Input] Input Field generated with method ${method}.`
      console.groupCollapsed(message, `color:#228B22;font-weight:900;`, state, config)
      console.groupEnd()
    }
  }

  static criteria(criterias, method){
    if (process.env.NODE_ENV === `development` && VIE.DEBUG['INPUT']) {
      let message = `%c [RTV] [Criteria Input] Generated criteria with method ${method}.`
      console.groupCollapsed(message, `color:#CD853F;font-weight:900;`, criterias)
      console.groupEnd()
    }
  }
}

export default Input
