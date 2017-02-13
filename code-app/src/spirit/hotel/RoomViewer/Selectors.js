import $$ from '../../../seed'
import moment from 'moment'

const $_fnInit = () => {
  return {
    data:[], loaded:false,
    dimension:{
      first:{
        path:["assist","tents"],
        field:"tent",
        target:"name"
      },
      second:{
        path:["assist","floors"],
        field:"floor",
        target:"name",
        filter:"tentId"
      }
    }
  }
}

const $_fnExtractStatus = (tabular) => {
  return $$.Entity.Array.tabular(tabular,["room.op.status", "room.status", "room.clean.status"])
}

const $_fnMove = (name) => () => {
  jQuery(`.cubetab`).removeClass('active')
  jQuery(`#cubetab${name}`).addClass('active')
  jQuery(`#cubepage${name}`).addClass('active')
}

const $_fnChangeDate = (component) => (event) => {
  /** 开始加载 **/
  component.state.loaded = false
  component.setState(component.state)
  const { ingest } = component.props
  if(ingest.input.day){
    ingest.input.day = event
    $$.Dialog.Ingest.init(component)
  }
}

const $_fnNow = (props) => {
  const { ingest } = props
  if(ingest.input.day){
    if(moment.isMoment(ingest.input.day)){
      return ingest.input.day
    }else{
      return moment()
    }
  }
}

export default {
  $_fnInit,
  $_fnMove,
  $_fnExtractStatus,
  $_fnChangeDate,
  $_fnNow
}
