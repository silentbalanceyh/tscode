import VIE from '../vie.json'
import Ruler from './Logger.Ruler'

class Logger {

  static Ruler = Ruler

  static template(name, prop, meta = {}){
    Logger.prop(name, prop, meta,"[Template]", "#FF69B4")
  }
  static domant(name, prop, meta = {}){
    Logger.prop(name, prop, meta,"[Static]", "#DAA520")
  }
  static layout(name, prop, meta = {}){
    Logger.prop(name, prop, meta,"[Layout]", "#008080")
  }

  static slice(name, prop, meta = {}){
    Logger.prop(name, prop, meta,'[Slice]', "#A52A2A")
  }

  static loader(name, prop, meta = {}){
    Logger.prop(name, prop, meta,'[Loader]', "#4169E1")
  }

  static container(name, prop, meta = {}){
    Logger.prop(name, prop, meta,'[Container]', "#228B22")
  }

  static control(name, prop, meta = {}){
    Logger.prop(name, prop, meta,'[Control]', "#D2691E")
  }

  static form(name, prop, meta = {}){
    Logger.prop(name, prop, meta,'[Form]', "#00BFFF")
  }

  static business(name, prop, meta = {}){
    Logger.prop(name, prop, meta,'[Business Module]', "#696969")
  }

  static bar(name, prop, meta = {}){
    Logger.prop(name, prop, meta,'[ToolBar]', "#6A5ACD")
  }

  static reload(prop, reload){
    if(process.env.NODE_ENV === `development` && VIE.DEBUG['PROP']){
      let message = `%c [RTV] [PAGELIST] Page List reloading checking.`
      console.groupCollapsed(message,`color:#008080;font-weight:900;`)
      console.log(`%c [RTV] Props => `, 'color:#4169E1;font-weight:900', prop)
      console.log(`%c [RTV] Index => `,`font-weight:900`,reload.index)
      console.log(`%c [RTV] Size => `,`font-weight:900`,reload.size)
      console.log(`%c [RTV] Orders => `,`font-weight:900`,reload.orders)
      console.log(`%c [RTV] Criertias => `,`font-weight:900`,reload.criertias)
      console.log(`%c [RTV] Reload => `,`font-weight:900`,reload.reload)
      console.log(`%c [RTV] Data ( Undefined ) => `,`font-weight:900`,reload.data)
      console.groupEnd()
    }
  }
  static formInit({
    data,
    output,
    state
  }){
    if(process.env.NODE_ENV === `development` && VIE.DEBUG['PROP']){
      let message = `%c [RTV] [FORM] Form initial workflow properties.`
      console.groupCollapsed(message,`color:#CD5C5C;font-weight:900;`,state)
      console.log(`%c [RTV] Initial Values `,`font-weight:900`,data)
      console.log(`%c [RTV] Output Key`,`font-weight:900`,output)
      console.log(`%c [RTV] Form State => ${state}`,`font-weight:900`)
      console.groupEnd()
    }
  }

  static prop(name,prop,{
    focus = false,
    parent = 'No Parent',
    counter = 0
  }, prefix,color){
    if(process.env.NODE_ENV === `development` && VIE.DEBUG['PROP']){
      const number = Object.keys(prop).length
      let message;
      if(prop['$_cid'] || prop.id) {
        if (focus) {
          message = `%c [RTV Focus] ---------------------> Counter = ${counter}, ${prefix} Component : ${parent} ( cid = ${prop['$_cid'] || prop.id} ): $UCA$.${name} with ${number} properties.`
        } else {
          message = `%c [RTV] Counter = ${counter}, ${prefix} Component : <${parent}> ( cid = ${prop['$_cid'] || prop.id} ): $UCA$.${name} with ${number} properties.`
        }
      }else{
        message = `%c [RTV] Counter = ${counter}, ${prefix} Component : <${parent}> : $UCA$.${name} with ${number} properties.`
      }
      console.groupCollapsed(message,`color:${color};font-weight:900;`)
      console.groupCollapsed(`%c [RTV - Property] Monitoring Properties in group ${number} items.`,'color:#DAA520;font-weight:900')
      console.log(`%c [RTV] Properties ==> `,`font-weight:900;`,prop)
      console.groupEnd()
      // 打印当前的Ajax对象
      if(prop.$_ajax){
        const ajaxSize = Object.keys(prop.$_ajax).length
        console.groupCollapsed(`%c [RTV - Ajax] Ajax Process in group ${ajaxSize} items.`,'color:#008B8B;font-weight:900')
        const ajax = prop.$_ajax
        for(const key in ajax){
          const uri = ajax[key].uri
          if(uri){
            console.log(`%c [RTV] Ajax Uri ==> : ${uri}`,'font-weight:900')
          }
        }
        console.groupEnd()
      }
      // 打印当前的Function对象
      const funs = {}
      const data = {}
      const defined = {}
      for(const key in prop){
        const item = prop[key]
        if('function' == typeof(item)){
          funs[key] = item
        }else if(!key.startsWith("$_")){
          data[key] = item
        }else if(key.startsWith("$_")){
          defined[key] = item
        }
      }
      const funSize = Object.keys(funs).length
      if(0 < funSize) {
        console.groupCollapsed(`%c [RTV - Function] Function Process in group ${funSize} items.`,'color:#FF1493;font-weight:900')
        console.log(`%c [RTV] Function List ==> : `, 'font-weight:900', funs)
        console.groupEnd()
      }

      const dataSize = Object.keys(data).length
      if(0 < dataSize){
        console.groupCollapsed(`%c [RTV - Data] Data Extraction in group ${dataSize} items.`,'color:#8A2BE2;font-weight:900')
        console.log(`%c [RTV] Data List ==> : `, 'font-weight:900', data)
        console.groupEnd()
      }

      const definedSize = Object.keys(defined).length
      if(0 < definedSize){
        console.groupCollapsed(`%c [RTV - Data] Defined Data in group ${definedSize} items.`,'color:#32CD32;font-weight:900')
        console.log(`%c [RTV] Defined Data List ==> : `, 'font-weight:900', defined)
        console.groupEnd()
      }
      console.groupEnd()
    }
  }
}

export default Logger;
