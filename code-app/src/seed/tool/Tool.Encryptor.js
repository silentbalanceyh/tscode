import CryptoJS from 'crypto-js'

function getInt64Bytes(x){
  var bytes = [];
  for(var i = 7;i>=0;i--){
    bytes[i] = x & 0xff;
    x = x>>8;
  }
  return bytes;
}
function bytesToHexStr(bytes) {
  for (var hex = [], i = 0; i < bytes.length; i++) {
    hex.push((bytes[i] >>> 4).toString(16));
    hex.push((bytes[i] & 0xF).toString(16));
  }
  return hex.join("");
}

class Encryptor {
  /** MD5加密 **/
  static md5(value) {
    if (value) {
      return CryptoJS.MD5(String(value)).toString().toUpperCase();
    } else {
      return "";
    }
  }

  /** Base64 Encoding **/
  static b64Enc(value) {
    return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(value));
  }

  /** Base64 Decoding **/
  static b64Dec(value) {
    return CryptoJS.enc.Base64.parse(value).toString(CryptoJS.enc.Utf8);
  }

  /** **/
  static hmSha512(value,secret){
    const raw = CryptoJS.HmacSHA512(value,secret);
    const wordArr = raw.words;
    let retVal = "";
    for(let idx = 0; idx < wordArr.length; idx++ ){
      const bytes = getInt64Bytes(wordArr[idx]);
      const hexStr = bytesToHexStr(bytes);
      /** 取低8位 **/
      const segment = hexStr.toUpperCase().substring(8,16);
      retVal += segment;
    }
    return retVal;
  }
}

export default Encryptor
