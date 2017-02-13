const filter = (input) => {
  console.assert(1 == Object.keys(input).length);
  let name;
  let value;
  for (const key in input) {
    name = key;
    value = input[key];
  }
  console.assert(name);
  return {name, value};
}

const development = () => {
  return process.env.NODE_ENV === `development`;
}

const defined = (input) => {
  if (development()) {
    input = filter(input);
    const message = `[RTV] Current parameter is not defined: ${input.name} = ${input.value}`;
    console.assert(input.value, [message]);
  }
}

export default {
  filter,
  development,
  defined
}
