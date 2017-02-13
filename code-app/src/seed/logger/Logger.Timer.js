import VIE from '../vie.json'

class Timer{

  constructor(name,method){
    this.name = name
    this.method = method
  }

  group(){
    if(process.env.NODE_ENV === `development` && VIE.DEBUG['TIMER']) {
      let message = `%c [RTV] [Timer] Name = ${this.name}, Method ${this.method}`
      console.groupCollapsed(message, "color:black;font-weight:900")
    }
  }

  start(){
    if(process.env.NODE_ENV === `development` && VIE.DEBUG['TIMER']) {
      this.start = new Date()
    }
  }

  end(){
    if(process.env.NODE_ENV === `development` && VIE.DEBUG['TIMER']) {
      this.end = new Date()
    }
  }

  output(object){
    if(process.env.NODE_ENV === `development` && VIE.DEBUG['TIMER']){
      const duration = this.end.getTime() - this.start.getTime()
      let message = `%c [RTV] [Timer] Name = ${this.name}, Method ${this.method} => ${duration}ms`
      if(object) {
        console.log(message, "color:black", object)
      }else{
        console.log(message, "color:black")
      }
    }
  }

  groupEnd(){
    if(process.env.NODE_ENV === `development` && VIE.DEBUG['TIMER']){
      console.groupEnd()
    }
  }
}

export default Timer
