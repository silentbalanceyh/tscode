import React from 'react'

import css from './Tree.scss'

import 'rc-tree-select/assets/index.css'
import TreeSelect from 'rc-tree-select'

class Tree {
  /**
   * 用于渲染树型标签
   * @param config
   * @param input
   */
  static jsxTreeSelector(config, input) {
    const {
      hint, name, cid,
      style = {}, treenodes = {},
      treeCheckable = false, showSearch = false,
      notFoundContent = 'Not Found'
    } = config;
    let {className = ''} = config
    className = `${className} ${css['input']}`.trim()

    return (
      <TreeSelect
        name={name}
        id={cid}
        style={style}
        className={className}
        transitionName="rc-tree-select-dropdown-slide-up"
        choiceTransitionName="rc-tree-select-selection__choice-zoom"
        dropdownStyle={{maxHeight: 200, overflow: 'auto'}}
        placeholder={hint}
        treeLine treeIcon
        showSearch={showSearch}
        maxTagTextLength={4}
        treeCheckable={treeCheckable}
        notFoundContent={notFoundContent}
        treeNodeFilterProp="label"
        filterTreeNode={false}
        treeData={treenodes}
        treeDataSimpleMode={{
          id: 'key',
          rootPId: undefined
        }}
        {...input}
      />
    )
  }
}

export default Tree
