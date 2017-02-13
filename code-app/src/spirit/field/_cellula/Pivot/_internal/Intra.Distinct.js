import React from 'react'
import Immutable from 'immutable'

import $$ from '../../../../../seed'
import css from './Intra.Distinct.scss'

const SUPPORTED = Immutable.fromJS(['distinct.selector'])

const URI = {
  COUNTRY: `/lct/countries`,
  STATE: `/lct/states/q/country/:countryId`,
  CITY: `/lct/cities/q/state/:stateId`,
  DISTINCT: `/lct/distincts/q/city/:cityId`
}

const selector = (list = []) => (config, distinctId) => (event) => {
  event.preventDefault()
  const selected = list.filter(item => item.uniqueId == distinctId)
  if (selected && 0 < selected.length) {
    const record = selected[0]
    const linker = config.linker
    /** 1.调用linker设值 **/
    const { form, dispatch } = config
    /** 2.隐藏popup **/
    jQuery(`#btn${config.cid}`).popup('hide')
    /** 3.设置当前组件的值 **/
    $$.Plugin.ReduxForm.linker({ form, dispatch}, linker, record)
  }
}

const distincts = (config, cityId) => (event) => {
  event.preventDefault();
  const parameters = $$.Tool.Parameter.pattern(URI.DISTINCT,{ cityId })
  parameters.removed.forEach(key => { delete parameters.params[key]})
  $$.Ajax.Api.Async.get(parameters.api, parameters.params, (data) => {
    /** 1.读取国家数据 **/
    const list = data.list ? data.list : []
    /** 2.渲染State **/
    render(config, 'Distinct', list, selector(list))
    /** 3.激活State **/
    active(config, 'Distinct')
  })
}

const cities = (config, stateId) => (event) => {
  event.preventDefault();
  const parameters = $$.Tool.Parameter.pattern(URI.CITY,{ stateId })
  parameters.removed.forEach(key => { delete parameters.params[key]})
  $$.Ajax.Api.Async.get(parameters.api, parameters.params, (data) => {
    /** 1.读取国家数据 **/
    const list = data.list ? data.list : []
    /** 2.渲染State **/
    render(config, 'City', list, distincts)
    /** 3.激活State **/
    active(config, 'City')
  })
}

const states = (config, countryId) => (event) => {
  event.preventDefault();
  const parameters = $$.Tool.Parameter.pattern(URI.STATE,{countryId})
  parameters.removed.forEach(key => { delete parameters.params[key]})
  $$.Ajax.Api.Async.get(parameters.api, parameters.params, (data) => {
    /** 1.读取国家数据 **/
    const list = data.list ? data.list : []
    /** 2.渲染State **/
    render(config, 'State', list, cities)
    /** 3.激活State **/
    active(config, 'State')
  })
}
/** 国家面板 **/
const countries = (config) => () => {
  /** 阻止原始操作 **/
  $$.Ajax.Api.Async.get(URI.COUNTRY, {}, (data) => {
    /** 1.读取国家数据 **/
    const list = data.list ? data.list : []
    /** 2.渲染Country **/
    render(config, 'Country', list, states)
    /** 3.激活Country **/
    active(config, 'Country')
    /** 4.清空其他三个 **/
    reset(config)
  })
}

const render = (config, key, list, fnClick) => {
  let content = ``
  list.forEach(item => {
    content += `<a class="item rtvlink" id="lnk${key}${item.uniqueId}" href="#">${item.name}</a>`
  })
  jQuery(`#pg${key}${config.cid}`).empty()
  jQuery(`#pg${key}${config.cid}`).html(content)
  /** 3.注入事件 **/
  list.forEach(item => {
    jQuery(`#lnk${key}${item.uniqueId}`).on("click", fnClick(config, item.uniqueId))
  })
}

const active = (config, key) => {
  jQuery(`.rtvtab`).removeClass("active")
  jQuery(`.rtvpage`).removeClass("active")
  jQuery(`#tb${key}${config.cid}`).addClass("active")
  jQuery(`#pg${key}${config.cid}`).addClass("active")
}

const reset = (config) => {
  jQuery(`#pgState${config.cid}`).empty()
  jQuery(`#pgCity${config.cid}`).empty()
  jQuery(`#pgDistinct${config.cid}`).empty()
}
const move = (config, key) => () => {
  const html = jQuery(`#pg${key}${config.cid}`).html()
  if("" != html) {
    active(config, key)
  }
}
class Distinct {

  static render(config = {}, input) {
    /** 1.保留input **/
    if (config.type && SUPPORTED.contains(config.type)) {
      $$.Logger.Input.field(config, 'jsxDistinctSelector')
      return (
        <div className={`ui input`} style={config.style}>
          <div className={`ui text menu ${css['menu']}`}>
            <a id={`btn${config.cid}`} className="browse item" onClick={countries(config)}>
              {config.meta.select}
              <i className="dropdown icon"></i>
              <input type="text" id={config.cid} className={css['hidden']} name={config.name} {...input} readOnly tabIndex={-1}/>
            </a>
          </div>
          <div id={`popup${config.cid}`} className={`ui fluid popup transition hidden ${css['container']}`}>
            <div className={`ui related grid`}>
              <div className={`computer only row`}>
                <div className={`column`}>
                  <div className="ui top attached tabular menu">
                    <div id={`tbCountry${config.cid}`} className={`active item rtvtab ${css['tab']}`}
                         onClick={move(config, 'Country')}>{config.meta.country}</div>
                    <div id={`tbState${config.cid}`} className={`item rtvtab ${css['tab']}`}
                         onClick={move(config, 'State')}>{config.meta.state}</div>
                    <div id={`tbCity${config.cid}`} className={`item rtvtab ${css['tab']}`}
                         onClick={move(config, 'City')}>{config.meta.city}</div>
                    <div id={`tbDistinct${config.cid}`} className={`item rtvtab ${css['tab']}`}
                         onClick={move(config, 'Distinct')}>{config.meta.distinct}</div>
                  </div>
                  <div id={`pgCountry${config.cid}`} className="ui bottom attached active tab segment rtvpage">
                  </div>
                  <div id={`pgState${config.cid}`} className="ui bottom attached tab segment rtvpage">
                  </div>
                  <div id={`pgCity${config.cid}`} className="ui bottom attached tab segment rtvpage">
                  </div>
                  <div id={`pgDistinct${config.cid}`} className="ui bottom attached tab segment rtvpage">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return false
    }
  }
}

export default Distinct
