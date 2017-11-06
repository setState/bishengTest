import {isPositiveInteger} from '../util';
import messages from '../messages';

const positiveInteger = function positiveInteger(rule, value, source, errors, options) {
  if (isPositiveInteger(value) == false) {
    errors.push(rule.message || messages.positiveInteger);
  }
}

module.exports = positiveInteger;
