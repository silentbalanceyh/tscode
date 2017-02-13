import React from 'react'

import $$ from '../../../../seed'
import selectors from '../../../_shared/Selector'
import css from './Component.scss'

import PagerList from './PagerList'
/**
 * List专用
 */
class Component extends React.Component {

  constructor(props) {
    super(props);
    this.state = selectors.$_fnInit(props)
  }

  componentDidMount() {
    $$.Dialog.Ingest.init(this)
  }

  componentDidUpdate() {
    if (!this.state.loaded) {
      $$.Dialog.Ingest.init(this)
    }
  }

  render() {
    /** 列配置信息 **/
    const {columns = [], search = {}, pagination = {}, ingest, dispatch, form } = this.props
    const {data = [], loaded} = this.state
    const state = this.state
    state.pagination = pagination
    state.search = search
    /** 搜索专用配置 **/
    const $_search = selectors.$_fnSearch(search, this)
    const click = selectors.$_fnPageClick(this)
    return (
      <div>
        <div className={`ui top attached menu ${css['top']} ${css['item']}`}>
          <div className="actions">
            <div className={`ui action input ${css['search']}`}>
              <input id={$_search.id} type="text" placeholder={`${$_search.hint}`}/>
              <button className="ui blue button" onClick={$_search.click}>搜索</button>
            </div>
          </div>
        </div>
        <div className={`ui attached segment ${css['item']} ${css['pagelist']}`}>
          <PagerList loaded={loaded} data={data} columns={columns} state={state} click={click}/>
        </div>
        <div className={`ui bottom attached menu ${css['bottom']} ${css['item']}`}>
          <div className={`actions ${css['actions']}`}>
            <div id='btnYes' className="ui ok blue button" onClick={selectors.$_fnSelect(data,columns,ingest['linker'],{
              dispatch, form
            })}>
              <i className="checkmark icon"></i>
              选择
            </div>
            <div id='btnNo' className="ui cancel red button">
              <i className="cancel icon"></i>
              取消
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Component
