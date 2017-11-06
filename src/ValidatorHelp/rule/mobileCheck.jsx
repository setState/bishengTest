import {isMobileNumber} from '../util';
import messages from '../messages';

const mobileCheck = function mobileCheck(rule, value, source, errors, options) {
  if (isMobileNumber(value) == false) {
    errors.push(rule.message || messages.mobileCheck);
  }
}

module.exports = mobileCheck;
