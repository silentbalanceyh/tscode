import React from 'react'
import ReactDOM from 'react-dom'

import Assert from '../assert'

const initDialog = () => {
  jQuery("#winDialog").empty()
  jQuery("#winSelector").empty()
  jQuery("#winScreen").empty()
}

const applyConfig = (html, message, {
  yes, no
}) => {
  Assert.isString({message})
  /** 同时清空winDialog和winSelector，保证btnYes和btnNo不冲突 **/
  initDialog()
  jQuery("#winDialog").html(html)
  jQuery("#content").text(message)
  if (yes) {
    Assert.isFunction({yes});
    jQuery('#btnYes').on("click",yes);
  }
  if (no) {
    Assert.isFunction({no});
    jQuery('#btnNo').on("click",no);
  }
}

const applyComponent = (Component, config = {}, id = 'winSelector') => {
  /** 同时清空winDialog和winSelector，保证btnYes和btnNo不冲突 **/
  initDialog()
  let node = document.getElementById(id)
  ReactDOM.render(<Component {...config}/>, node)
}

const showDynamic = (id = 'winSelector') => {
  jQuery(`#${id}`)
    .modal('setting', 'transition', 'fade down')
    .modal('setting', 'closable', false)
    .modal('show')
}

const showScreen = () => {
  showDynamic('winScreen')
}
const showSelector = () => {
  showDynamic('winSelector')
}

const showDialog = () => {
  jQuery("#winDialog")
    .modal('setting', 'duration', 144)
    .modal('setting', 'transition', 'fade up')
    .modal('setting', 'closable', false)
    .modal('show')
}

export default {
  applyConfig,
  applyComponent,
  showDialog,
  showSelector,
  showScreen,
  showDynamic
}
