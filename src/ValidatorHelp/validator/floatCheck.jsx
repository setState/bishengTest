import rules from '../rule/';

const floatCheck = function floatCheck(rule, value, callback, source, options) {
  const errors = [];

  if (!value) {

    return callback();

  } else {

    rules.floatCheck(rule, value, source, errors, options);
  }

  callback(errors);
}

module.exports = floatCheck;
