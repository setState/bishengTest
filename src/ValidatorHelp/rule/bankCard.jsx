import {isBankCard} from '../util';
import messages from '../messages';

module.exports = function bankCard(rule, value, source, errors, options) {
  if (isBankCard(value) == false) {
    errors.push(rule.message || messages.bankCard);
  } else if (value.length < 12 || value.length > 19)
    errors.push(messages.bankCardLength);
};
