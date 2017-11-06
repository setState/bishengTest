import {isPositiveNumber} from '../util';
import messages from '../messages';

const positiveNumber = function positiveNumber(rule, value, source, errors, options) {
  if (isPositiveNumber(value) == false) {
    errors.push(rule.message || messages.positiveNumber);
  }
}

module.exports = positiveNumber;
