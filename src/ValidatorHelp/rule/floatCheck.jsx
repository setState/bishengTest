import {isFloat} from '../util';
import messages from '../messages';

const floatCheck = function floatCheck(rule, value, source, errors, options) {
  if (isFloat(value) == false) {
    errors.push(rule.message || messages.floatCheck);
  }
}

module.exports = floatCheck;
