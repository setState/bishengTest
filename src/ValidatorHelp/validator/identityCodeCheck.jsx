import rules from '../rule/';

const identityCodeCheck = function identityCodeCheck(rule, value, callback, source, options) {
  const errors = [];

  if (!value) {

    return callback();

  } else {

    rules.identityCodeCheck(rule, value, source, errors, options);
  }

  callback(errors);
}

module.exports = identityCodeCheck;
