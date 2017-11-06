import rules from '../rule/';

const moneyCheck = function moneyCheck(rule, value, callback, source, options) {
  const errors = [];

  if (!value) {

    return callback();

  } else {

    rules.moneyCheck(rule, value, source, errors, options);
  }

  callback(errors);
}

module.exports = moneyCheck;
