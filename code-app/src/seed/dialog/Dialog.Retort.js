import React from 'react'

import Dialog from './Dialog.Tool'

class Retort {
  /**
   *
   * @param message
   */
  static list(Component, config) {
    Dialog.applyComponent(Component, config)
    Dialog.showSelector()
  }

  /**
   *
   * @param Component
   * @param config
   * @param dialogId
   */
  static dialog(Component, config, dialogId = 'winScreen') {
    Dialog.applyComponent(Component, config, dialogId)
    Dialog.showDynamic(dialogId)
  }
}

export default Retort
