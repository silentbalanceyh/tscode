const selector = "#_POOL"

class Pool{

  static init(){
    jQuery(selector).val("{}")
  }

  static get(key){
    let value = jQuery(selector).val()
    if(value){
      value = JSON.parse(value)
      return value[key]
    }
  }

  static inject(params){
    let value = jQuery(selector).val()
    if(value){
      value = JSON.parse(value)
      for(const key in params){
        if(params[key] === undefined){
          params[key] = value[key]
        }
      }
    }
  }

  static put(key, value){
    let data = jQuery(selector).val()
    if(!data){
      data = {}
    }else{
      data = JSON.parse(data)
    }
    data[key] = value
    jQuery(selector).val(JSON.stringify(data))
    console.info(jQuery(selector).val())
  }
}

export default Pool
