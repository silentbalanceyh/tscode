import Basic from './Assert.Basic'

const isString = (input) => {
  if (Basic.development()) {
    Basic.defined(input);
    input = Basic.filter(input);
    const message = `[RTV] Current parameter must be an JavaScript String: ${input.name} = ${input.value}`;
    console.assert('string' == typeof(input.value), [message]);
  }
}

const isArrayString = (input) => {
  for (const key in input) {
    const item = {key: input[key]};
    isString(item);
  }
}
export default {
  isString,
  isArrayString
}
