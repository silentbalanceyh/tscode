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
    super(props, 'holder.ListHolder')
  }

  // ------------------------------------
  // Component Valid Ensure
  // ------------------------------------
  componentWillMount() {
    $$.Tool.Flow.init(this.props, {force: true})
  }
  // ------------------------------------
  // Major Render Method
  // ------------------------------------
  render() {
    /** Content **/
    const {$_cid, $_pk, children, dispatch} = this.props;
    /** Header Content **/
    const {$_title, $_icon} = this.props
    console.info(this.props)
    /** Tab专用 **/
    const {$_active, $_headers} = this.props
    /** Divide/Help部分 **/
    const {$_left, $_right} = this.props
    const {$_theme, $_steps = []} = this.props
    /** 是否支持搜索 **/
    const {$_search} = this.props
    $$.Assert.isNumber({$_active});
    $$.Assert.isArray({children});
    return super.romance(
      <main id={$_cid} key={$_pk} className={`ui basic segment ${css['content']}`}>
        <div className={css['top']}>
          <div className={`ui top attached tabular menu`}>
            {
              $_headers.map((item, idx) => {
                // 构造关闭
                let {closure} = item;
                let closeBtn = '';
                if (closure) {
                  closeBtn = <i className={`large remove icon ${css['closure']}`}
                                onClick={dispatches.$_fnTabClosing(idx, dispatch, $_cid)}></i>
                }
                // 构造激活
                const itemClass = closure ? css['closureItem'] : css['item'];
                let className = idx == $_active ? `active item ${itemClass}` : `item ${itemClass} ${css['disabled']}`;
                return (
                  <div className={className} key={item.key}>
                    {item.title}
                    {(closure) ? closeBtn : ''}
                  </div>
                )
              })
            }
          </div>
          {
            $_headers.map((item, idx) => {
              let className = idx == $_active ? 'ui bottom attached active tab segment rtvheight' : 'ui bottom attached tab segment rtvheight';
              className = `${className} ${css['page']}`
              return (0 == idx) ? (
                  <div className={className}
                       key={`page${idx}`}
                       style={{
                         minHeight: `${this.winHeight}px`
                       }}>
                    <div className={`ui list ${css['list']}`}>
                      {/** 是否支持搜索功能 **/($_search) ? <div className="item">{children[0]}</div> : false}
                      <div className="item">
                        {/** 支持搜索取第二个 **/($_search) ? children[1] : children[0]}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={className} key={`page${idx}`}>
                    <div className={`ui two column grid ${css['top']}`}>
                      <div className={`${$_left.adj} column ${css['left']}`.trim()} style={$_left.style}>
                        {/** 支持搜索取第三个 **/($_search) ? children[2] : children[1]}
                      </div>
                      <div className={`${$_right.adj} column ${css['right']}`.trim()} style={$_right.style}>
                        <div className={`ui raised segments ${css['container']}`}>
                          <h6 className={`ui segment`}>
                            {$$.Render.Field.jsxIcon('help', 'circular blue')}
                            <div className={`ui tag ${$_theme.color} label`}>{$_title}</div>
                          </h6>
                          <div className={`ui segment`}>
                            <div className="ui ordered list">
                              {
                                $_steps.map((item, idx) => {
                                  return (
                                    <div className={`item`} key={idx}>
                                      <div className="header">{item.name}</div>
                                      <div className={`${css['step']}`}>{item.message}</div>
                                    </div>
                                  )
                                })
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
            })
          }
        </div>
      </main>
    )
  }
}
// ------------------------------------
// React Specification
// ------------------------------------
export default mapping.dispatch(Component, dispatches);
