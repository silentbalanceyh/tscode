import VIE from '../vie.json'

const Ruler = {
  success:"green",
  failure:"red",
  start:(cid,type,rulers) => {
    if(process.env.NODE_ENV === `development` && VIE.DEBUG['RULE']) {
      let message = `%c ----------> [Ruler] Start ruler checking for Component ( cid = ${cid} ), LifeCycle = ${type}`
      if("render" == type){
        Ruler.success = "green"
        Ruler.failure = "red"
        console.groupCollapsed(message, `color:#696969;font-weight:900;`,rulers)
      }else{
        Ruler.success = "red"
        Ruler.failure = "green"
        console.groupCollapsed(message, `color:#4682B4;font-weight:900;`,rulers)
      }
    }
  },
  process:(name,rule,result) => {
    if(process.env.NODE_ENV === `development` && VIE.DEBUG['RULE']){
      let message = `%c ----------> [Ruler] Ruler checking for Component ( prop=$_${name}, rule=${rule} ) has been finished. Result = ${result}`
      if(result){
        console.log(message,`color:${Ruler.success};font-weight:900;`)
      }else{
        console.log(message,`color:${Ruler.failure};font-weight:900;`)
      }
    }
  },
  end: (cid, result) => {
    if(process.env.NODE_ENV === `development` && VIE.DEBUG['RULE']) {
      let message = `%c ----------> [Ruler] Ruler checking for Component ( cid = ${cid} ) has been finished. Result = ${result}`
      if(result){
        console.log(message,`color:${Ruler.success};font-weight:900;`)
      }else{
        console.log(message,`color:${Ruler.failure};font-weight:900;`)
      }
      console.groupEnd()
    }
  }
}

export default Ruler
