import React from 'react'

import css from './Component.scss'
import $$ from '../../../seed'
import dispatches from './Redux'
import mapping from '../../_internal/Redux'

import PureContainer from '../../_assembly/PureContainer'
// ------------------------------------
// Class Definition
// ------------------------------------
class Component extends PureContainer {
  // ------------------------------------
  // 默认构造函数
  // ------------------------------------
  constructor(props) {
    super(props, 'holder.CubeHolder')
  }

  // ------------------------------------
  // Component Valid Ensure & Init
  // ------------------------------------
  componentWillMount() {
    $$.Tool.Flow.init(this.props)
  }

  // ------------------------------------
  // Major Render Method
  // ------------------------------------
  render() {
    /** Header部分 **/
    const {$_title, $_icon, $_data} = this.props
    const {$_cid, $_pk, children} = this.props;
    /** Divide部分 **/
    const {$_left, $_right} = this.props
    /** Cube部分 **/
    const {$_dimension, $_first, $_second, $_active} = this.props
    let firstDim = []
    const render = $$.Adom.Render.mountList($_first) && $$.Adom.Render.mountList($_second);
    if (render) {
      /** 3.第一个维度的反序处理 **/
      if ($_dimension.first.revert) {
        firstDim = $_first.list.reverse()
      } else {
        firstDim = $_first.list
      }
    }
    return super.romance(
      <main id={$_cid} key={$_pk} className={`ui basic segment ${css['content']}`}>
        <h4 className={`ui dividing header ${css['header']}`}>
          {$$.Render.Field.jsxIcon($_icon)}
          {$_title}
        </h4>
        <div className={`ui two column grid ${css['top']}`}>
          <div className={`${$_left.adj} column ${css['left']}`.trim()} style={$_left.style}>
            <div className={`ui top attached tabular menu`}>
              {
                firstDim.map((item, idx) => {
                  const name = `cube-tab${item.uniqueId}`;
                  let className = idx == $_active ? "active item" : "item";
                  className = `${className} ${css['title']}`
                  return (
                    <div className={`cubetab ${className} ${css['tab']}`} key={name} id={`cubetab${item.uniqueId}`}
                         onClick={dispatches.$_fnMove(item.uniqueId)}>{item[$_dimension.first.target]}</div>
                  )
                })
              }
            </div>
            {
              firstDim.map((fitem, fidx) => {
                let className = fidx == $_active ? "ui bottom attached active tab segment rtvheight cubetab" : "ui bottom attached tab segment rtvheight cubetab";
                className = `${className} ${css['tabpage']}`
                let secondDim = $_second.list ? $_second.list.filter(item => item[$_dimension.second.filter] == fitem.uniqueId) : []
                if ($_dimension.second.revert) {
                  secondDim = secondDim.reverse()
                }
                return (
                  <div className={className} key={`cubepage${fitem.uniqueId}`} id={`cubepage${fitem.uniqueId}`} style={{
                    minHeight: `${this.winHeight}px`
                  }}>
                    {
                      React.cloneElement(children[0], {
                        dim: secondDim, fitem, fidx, dimension: $_dimension,
                        data: $_data
                      })
                    }
                  </div>
                )
              })
            }
          </div>
          <div className={`${$_right.adj} column ${css['right']}`.trim()} style={$_right.style}>
            <div className={`ui list ${css['list']}`}>
              {
                children.map((item, idx) => ((0 < idx) ? <div className="item" key={`item${idx}`}>{item}</div> : false))
              }
            </div>
          </div>
        </div>
      </main>
    )
  }
}
// ------------------------------------
// React Specification
// ------------------------------------
if (process.env.NODE_ENV === `development`) {
  Component.propTypes = {
    $_title: React.PropTypes.string.isRequired,
    $_icon: React.PropTypes.string
  }
}
export default mapping.dispatch(Component, dispatches);
