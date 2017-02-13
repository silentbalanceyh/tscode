import Basic from './Assert.Basic'

const isNumber = (input) => {
  if (Basic.development()) {
    input = Basic.filter(input);
    const message = `[RTV] Current parameter must be an JavaScript Number: ${input.name} = ${input.value}`;
    console.assert('number' == typeof(input.value), [message]);
  }
}

const isArrayNumber = (input) => {
  for (const key in input) {
    const item = {key: input[key]};
    isNumber(item);
  }
}

export default {
  isNumber,
  isArrayNumber
}
