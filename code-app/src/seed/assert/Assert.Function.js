import Basic from './Assert.Basic'

const isFunction = (input) => {
  if (Basic.development()) {
    Basic.defined(input);
    input = Basic.filter(input);
    const message = `[RTV] Current parameter must be an JavaScript function: ${input.name} = ${input.value}`;
    console.assert(Function.prototype.isPrototypeOf(input.value), [message]);
  }
}

const isArrayFunction = (input) => {
  for (const key in input) {
    const item = {key: input[key]};
    isFunction(item);
  }
}

export default {
  isFunction,
  isArrayFunction
}
