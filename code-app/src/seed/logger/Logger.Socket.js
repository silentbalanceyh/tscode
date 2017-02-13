class Socket{
  /**
   *
   * @param addr
   * @param identifier
   * @param address
   */
  static register(identifier,address){
    if(process.env.NODE_ENV === `development`){
      let message = `%c [RTV] [Socket] Register handler workflow information. identifier = ${identifier}`
      console.groupCollapsed(message,`color:#808080;font-weight:900;`)
      console.log(`%c [RTV] Identifier Value`,`color:#9932CC;font-weight:900`,identifier)
      console.log(`%c [RTV] Message Address`,`font-weight:900`,address)
      console.groupEnd()
    }
  }

  /**
   *
   * @param identifier
   * @param child
   */
  static count(identifier,count, before = false){
    if(process.env.NODE_ENV === `development`){
      const text = before?'Before':'After'
      let message = `%c [RTV] [Socket] Count data in current database information. ${text} identifier = ${identifier}, count = ${count}`
      if(before){
        console.group(message, `color:#FF8C00;font-weight:900;`)
      }else{
        console.log(message, `color:#FF8C00;font-weight:900;`)
        console.groupEnd()
      }
    }
  }
  /**
   *
   * @param identifier
   * @param filters
   * @param data
   */
  static removeMore(identifier,filters,data){
    if(process.env.NODE_ENV === `development`){
      let message = `%c [RTV] [Socket] Remove more data in current database information. identifier = ${identifier}`
      console.groupCollapsed(message,`color:#DC143C;font-weight:900;`)
      console.log(`%c [RTV] Filters Condition`,`color:#00BFFF;font-weight:900`,filters)
      console.log(`%c [RTV] Removed Data Records`,`font-weight:900`,data)
      console.groupEnd()
    }
  }
  /**
   *
   * @param identifier
   * @param address
   */
  static sync(identifier,data, filters, inserted){
    if(process.env.NODE_ENV === `development`){
      let cid = data.cid || 'None'
      let message = `%c [RTV] [Socket] Sync Data workflow ${inserted?"Insert":"Update"} information. ${identifier}, cid = ${cid}`
      let color = inserted?`	#4169E1`:`#228B22`
      console.groupCollapsed(message,`color:${color};font-weight:900;`)
      console.log(`%c [RTV] Filters Condition`,`color:#00BFFF;font-weight:900`,filters)
      console.log(`%c [RTV] Identifier Value`,`color:#DC143C;font-weight:900`,identifier)
      console.log(`%c [RTV] Synced Data Record`,`font-weight:900`,data)
      console.groupEnd()
    }
  }
}

export default Socket
