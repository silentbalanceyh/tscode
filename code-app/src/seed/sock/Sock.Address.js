/**
 * 函数必须内置
 * @param pattern
 * @param args
 * @returns {*}
 */
const string = (pattern, ...args) =>{
  if (arguments.length == 0)
    return null;
  for (let i = 0; i < args.length; i++) {
    let re = new RegExp(`\\{${i}\\}`, 'gm');
    pattern = pattern.replace(re, args[i]);
  }
  return pattern;
}

const DATA_ADDR = "MSG://MESSAGE/WSK/DATA/{0}"
const MODIFY = "MSG://MESSAGE/WSK/MODIFY/{0}"

export default {
  WSK: [
    {
      "socket": "/ui/",
      "address": {
        "v.ui.layout": string(DATA_ADDR, "LAYOUT"),
        "ui.slice": string(DATA_ADDR, "SLICE"),
        "ui.control": string(DATA_ADDR, "CONTROL"),
        "ui.column": string(DATA_ADDR, "COLUMN"),
        "ui.field": string(DATA_ADDR, "FIELD"),
        "v.ui.form.op": string(DATA_ADDR, "OP"),
        "ui.validate.rule": string(DATA_ADDR, "VALIDATE.RULE")
      }
    },
    {
      "socket": "/env/",
      "address": {
        "sys.list.fixed": string(DATA_ADDR, "TABULAR")
      }
    }
  ],
  MODIFY,
  UNIQUE:{
    "v.ui.layout":["app","module","page"],
    "ui.slice":["layoutId","name","cid"],
    "ui.control":["pageId","cid"],
    "ui.field":["controlId","cid"],
    "ui.validate.rule":["controlId","field","rule"],
    "v.ui.form.op":["controlId","cid","code"],
    "ui.column":["controlId","cid","field"],
    "sys.list.fixed": ["type","code","sigma"]
  }
}
