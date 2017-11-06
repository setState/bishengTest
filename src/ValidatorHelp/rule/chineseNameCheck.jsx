import {isChineseName} from '../util';
import messages from '../messages';

const chineseNameCheck = function chineseNameCheck(rule, value, source, errors, options) {
  if (isChineseName(value) == false) {
    if (value.length > 8) {
      errors.push(messages.chineseNameLengthCheck);
    }
    errors.push(messages.chineseNameCheck);
  }
}

module.exports = chineseNameCheck;
