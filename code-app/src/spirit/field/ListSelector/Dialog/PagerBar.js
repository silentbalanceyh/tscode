import React from 'react'

class PagerBar extends React.Component {

  render() {
    const {state, click} = this.props
    const {pagination = {}, pager = {}} = state
    /** 索引和页码 **/
    const index = state.pager.index
    const pages = state.counter.pages
    return (
      <div className="ui right floated pagination menu">
        {(1 < index) ? <a className="item" onClick={click(1)}>{pagination.first}</a> : false}
        {(1 < index) ? <a className="item" onClick={click(index - 1)}>{pagination.prev}</a> : false}
        <label className="item">{pager.index}</label>
        {(index < pages) ? <a className="item" onClick={click(index + 1)}>{pagination.next}</a> : false}
        {(index < pages) ? <a className="item" onClick={click(pages)}>{pagination.last}</a> : false}
      </div>
    )
  }
}

export default PagerBar
