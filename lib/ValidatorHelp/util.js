'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPositiveInteger = isPositiveInteger;
exports.isPositiveNumber = isPositiveNumber;
exports.isMobileNumber = isMobileNumber;
exports.isChineseName = isChineseName;
exports.isIdCardNumber = isIdCardNumber;
exports.isFloat = isFloat;
exports.isMoney = isMoney;
exports.isIdentityCode = isIdentityCode;
exports.isBankCard = isBankCard;

var _regex = require('./regex');

var _regex2 = _interopRequireDefault(_regex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isNumber(o) {
  return !isNaN(o - 0) && o !== null && o !== '' && o !== false;
} /**
   * Created by neo on 16/5/13.
   */

function isPositiveInteger(value) {
  var n = ~~Number(value);
  return String(n) == value && n > 0;
}

function isPositiveNumber(value) {
  var n = Number(value);
  return String(n) == value && n > 0;
}

function isMobileNumber(value) {

  var n = _regex2.default.isMobileNumber.test(value);
  return n;
}

function isChineseName(value) {

  var n = _regex2.default.isChineseName.test(value);
  return n;
}

function isIdCardNumber(value) {

  var n = _regex2.default.isIdCardNumber.test(value);
  return n;
}

function isFloat(value) {
  var n = _regex2.default.isFloat.test(value);
  return n;
}

function isMoney(value) {
  var n = _regex2.default.isMoney.test(value);
  return n;
}

function isIdentityCode(idCard) {
  /*
   * 身份证15位编码规则：dddddd yymmdd xx p
   * dddddd：6位地区编码
   * yymmdd: 出生年(两位年)月日，如：910215
   * xx: 顺序编码，系统产生，无法确定
   * p: 性别，奇数为男，偶数为女
   *
   * 身份证18位编码规则：dddddd yyyymmdd xxx y
   * dddddd：6位地区编码
   * yyyymmdd: 出生年(四位年)月日，如：19910215
   * xxx：顺序编码，系统产生，无法确定，奇数为男，偶数为女
   * y: 校验码，该位数值可通过前17位计算获得
   *
   * 前17位号码加权因子为 Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ]
   * 验证位 Y = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ]
   * 如果验证码恰好是10，为了保证身份证是十八位，那么第十八位将用X来代替
   * 校验位计算公式：Y_P = mod( ∑(Ai×Wi),11 )
   * i为身份证号码1...17 位; Y_P为校验码Y所在校验码数组位置
   */
  //15位和18位身份证号码的正则表达式
  var regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
  //如果通过该验证，说明身份证格式正确，但准确性还需计算
  if (regIdCard.test(idCard)) {
    if (idCard.length == 18) {
      var idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); //将前17位加权因子保存在数组里
      var idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
      var idCardWiSum = 0; //用来保存前17位各自乖以加权因子后的总和
      for (var i = 0; i < 17; i++) {
        idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];
      }
      var idCardMod = idCardWiSum % 11; //计算出校验码所在数组的位置
      var idCardLast = idCard.substring(17); //得到最后一位身份证号码
      //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
      if (idCardMod == 2) {
        if (idCardLast == "X" || idCardLast == "x") {
          return true;
        } else {
          return false;
        }
      } else {
        //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
        if (idCardLast == idCardY[idCardMod]) {
          return true;
        } else {
          return false;
        }
      }
    }
  } else {
    return false;
  }
}

function isBankCard(value) {

  var n = _regex2.default.isBankCard.test(value);
  return n;
}