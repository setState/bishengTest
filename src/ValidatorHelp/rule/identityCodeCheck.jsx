import {isIdentityCode} from '../util';
import messages from '../messages';

const identityCodeCheck = function identityCodeCheck(rule, value, source, errors, options) {
  if (isIdentityCode(value) == false) {
    errors.push(rule.message || messages.identityCodeCheck);
  }
}

module.exports = identityCodeCheck;
