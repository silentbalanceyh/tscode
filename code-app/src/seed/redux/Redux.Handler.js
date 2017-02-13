class Handler {
  static initReducer(HANDLERS,init = {}) {
    return (state = init, action) => {
      const handler = HANDLERS[action.type];
      return handler ? handler(state, action) : state
    }
  }
}

export default Handler
