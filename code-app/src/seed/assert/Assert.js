import $Object from './Assert.Object'
import $String from './Assert.String'
import $UCA from './Assert.UCA'
import $Promise from './Assert.Promise'
import $Number from './Assert.Number'
import $Array from './Assert.Array'
import $Function from './Assert.Function'
import $Basic from './Assert.Basic'

export default {
  // ------------------------------------
  // Basic专用
  // ------------------------------------
  isDefined:$Basic.defined,
  // ------------------------------------
  // Function专用
  // ------------------------------------
  isFunction:$Function.isFunction,
  isArrayFunction:$Function.isArrayFunction,

  // ------------------------------------
  // Array专用
  // ------------------------------------
  isArray:$Array.isArray,
  ensureLength:$Array.ensureLength,
  isEmptyArray:$Array.isEmptyArray,

  // ------------------------------------
  // Component专用
  // ------------------------------------
  isValidUCA:$UCA.isValidUCA,

  // ------------------------------------
  // Object专用
  // ------------------------------------
  isObject:$Object.isObject,
  isArrayObject:$Object.isArrayObject,
  ensureKeyLength:$Object.ensureKeyLength,
  isDefinedKey:$Object.isDefinedKey,

  // ------------------------------------
  // Number专用
  // ------------------------------------
  isNumber:$Number.isNumber,
  isArrayNumber:$Number.isArrayNumber,

  // ------------------------------------
  // String专用
  // ------------------------------------
  isString:$String.isString,
  isArrayString:$String.isArrayString,

  // ------------------------------------
  // Promise专用
  // ------------------------------------
  isPromise:$Promise.isPromise,
}
