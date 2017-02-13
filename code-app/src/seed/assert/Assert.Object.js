import Basic from './Assert.Basic'

const isObject = (input) => {
  if (Basic.development()) {
    Basic.defined(input);
    input = Basic.filter(input);
    const message = `[RTV] Please be sure ${input.name} must be an valid object. ${input.name} = ${input.value}`;
    console.assert(input, [message]);
  }
}

const isArrayObject = (input) => {
  for (const key in input) {
    const item = {key: input[key]};
    isObject(item);
  }
}

const ensureKeyLength = (input, length) => {
  if (Basic.development()) {
    isObject({input});
    input = Basic.filter(input);
    const keyLng = Object.keys(input.value).length;
    const message = `[RTV] Current parameter must be an JavaScript Object and keys length must be ${length}: keys length = ${keyLng}`;
    console.assert(length == keyLng, [message]);
  }
}

const isDefinedKey = (input, keys = []) => {
  if (Basic.development()) {
    isObject(input);
    input = Basic.filter(input);
    keys.forEach(item => {
      const key = {};
      key[item] = input.value[item];
      Basic.defined(key);
    })
  }
}

export default {
  isObject,
  isArrayObject,
  ensureKeyLength,
  isDefinedKey
}
