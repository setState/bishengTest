import {isIdCardNumber} from '../util';
import messages from '../messages';

const idCardNumberCheck = function idCardNumberCheck(rule, value, source, errors, options) {
  if (isIdCardNumber(value) == false) {
    errors.push(rule.message || messages.idCardNumberCheck);
  }
}

module.exports = idCardNumberCheck;
