const regex = {
  isPositiveInteger: /[^0-9]+/g,
  isMobileNumber: /^(1[0-9])\d{9}$/,
  isChineseName: /^[\u4e00-\u9fa5 ]{2,8}$/,
  isIdCardNumber: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
  //isFloat:/^(([1-9]\d{0,9})|0)(\.\d{1,2})?$/,
  isFloat: /^(([1-9]\d{0,9})|0)(\.\d*)?$/,
  isNature: /^(([1-9]\d{0,9})|0)(\.\d+)?$/,
  isMoney: /^((-|\+)?)(([1-9]\d{0,9})|0)(\.\d{1,2})?$/,
  isBankCard: /^[1-9]\d*$/,   //匹配首位非0正整数
  verifyCode: /^\d{6}/
};

export default regex;
