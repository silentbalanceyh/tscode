import React from 'react'
import Field from './Render.Field'

class Progress {
  /**
   *
   * @param meta
   */
  static jsxOrder(item = {}, idx = -1) {
    return (
      <div className={`${item.className} step`} key={`step${idx}`}>
        {Field.jsxIcon(item.icon)}
        <div className="content">
          <div className="title">{item.step}</div>
          {(item.comment) ?
            <div className="description">{item.comment}</div> : false}
        </div>
      </div>
    )
  }
}

export default Progress

