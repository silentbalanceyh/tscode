import Basic from './Assert.Basic'

const isPromise = (input) => {
  if (Basic.development()) {
    Basic.defined(input);
    input = Basic.filter(input);
    const message = `[RTV] Current parameter must be a valid Promise: ${input.name} = ${input.value}`;
    console.assert(input.value.promiseDispatch, [message]);
  }
}

export default {
  isPromise
}
