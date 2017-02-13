import Basic from './Assert.Basic'

const isArray = (input) => {
  if (Basic.development()) {
    Basic.defined(input);
    input = Basic.filter(input);
    const message = `[RTV] Current parameter must be an JavaScript Array: ${input.name} = ${input.value}`;
    console.assert(Array.prototype.isPrototypeOf(input.value), [message]);
  }
}

const ensureLength = (input, length) => {
  if (Basic.development()) {
    isArray(input);
    input = Basic.filter(input);
    const message = `[RTV] Current parameter must be an JavaScript Array and length must be ${length}: ${input.name} = ${input.value.length}`;
    console.assert(length == input.value.length, [message]);
  }
}

const isEmptyArray = (input) => {
  if (Basic.development()) {
    isArray(input);
    input = Basic.filter(input);
    const message = `[RTV] Current parameter must be an JavaScript Array and length must be > 0: ${input.name} = ${input.value}`;
    console.assert(0 < input.value.length, [message]);
  }
}

export default {
  isArray,
  ensureLength,
  isEmptyArray
}
