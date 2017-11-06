import {isMoney} from '../util';
import messages from '../messages';

const moneyCheck = function moneyCheck(rule, value, source, errors, options) {
  if (isMoney(value) == false) {
    errors.push(rule.message || messages.moneyCheck);
  }
}

module.exports = moneyCheck;
