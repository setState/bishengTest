import messages from '../messages';
import Util from '../../Util';

const defaultAccept = ["image/jpeg", "image/png"],
  defaultMaxSize = 0.4;

function getAllowFileType(accept) {
  return accept.map(function (item) {
    return item.split('/')[1];
  }).join(",")
}


module.exports = function positiveInteger(rule, value, source, errors, options) {
  const maxSize = rule.maxSize || defaultMaxSize,
    accept = rule.accept || defaultAccept;

  if (!value) {
    errors.push(messages.avatar.required);
  } else if (typeof value == "object") {
    if (accept.indexOf(value.file.type) == -1)
      errors.push(Util.format(messages.avatar.type, getAllowFileType(accept)));
    else if (value.file.size > maxSize * 1024 * 1024)
      errors.push(Util.format(messages.avatar.size, maxSize));
  }

};
