'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _modal = require('antd/lib/modal');

var _modal2 = _interopRequireDefault(_modal);

require('./style.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var iconClassName = 'component-message-dialog-title-icon';
var titleClassName = 'component-message-dialog-title';
var contentClassName = 'component-message-dialog-content';

var defaultDelay = {
  success: 3,
  error: 8,
  info: 3,
  warning: 8
};

var autoCloseTimer = null;

// 标志窗体是否关闭，避免点击了“我知道了” 还执行自动关闭
var isClosed = true;

function nextCall(fn) {
  //确定还没有关闭
  if (!isClosed) {
    isClosed = true;
    setTimeout(function () {
      return fn && fn();
    }, 100);
  }
}
function okNextCall(fn) {
  // 清理掉autoCloseTimer
  isClosed = true;
  clearTimeout(autoCloseTimer);
  setTimeout(function () {
    return fn && fn();
  }, 100);
}

exports.default = {
  info: function info(option, callback) {
    if (typeof option == 'string') {

      console.warn('Mesage.info方法的参数类型已经改变，请更换！');
      return;
    }

    var modal = _modal2.default.info({
      onOk: okNextCall.bind(null, callback),
      title: option.title,
      content: option.content,
      iconClassName: iconClassName,
      titleClassName: titleClassName,
      contentClassName: contentClassName
    });

    autoCloseTimer = setTimeout(function () {
      modal.destroy();
      nextCall(callback);
    }, (option.delay || defaultDelay.info) * 1000);

    isClosed = false;
  },
  success: function success(option, callback) {

    if (typeof option == 'string') {

      console.warn('Mesage.success方法的参数类型已经改变，请更换！');
      return;
    }

    var modal = _modal2.default.success({
      onOk: okNextCall.bind(null, callback),
      title: option.title,
      content: option.content,
      iconClassName: iconClassName,
      titleClassName: titleClassName,
      contentClassName: contentClassName
    });

    autoCloseTimer = setTimeout(function () {
      modal.destroy();
      nextCall(callback);
    }, (option.delay || defaultDelay.success) * 1000);

    isClosed = false;
  },
  error: function error(option, callback) {
    if (typeof option == 'string') {

      console.warn('Mesage.error方法的参数类型已经改变，请更换！');
      return;
    }

    var modal = _modal2.default.error({
      onOk: okNextCall.bind(null, callback),
      title: option.title,
      content: option.content,
      iconClassName: iconClassName,
      titleClassName: titleClassName,
      contentClassName: contentClassName
    });

    autoCloseTimer = setTimeout(function () {
      modal.destroy();
      nextCall(callback);
    }, (option.delay || defaultDelay.error) * 1000);

    isClosed = false;
  },
  warning: function warning(option, callback) {
    if (typeof option == 'string') {

      console.warn('Mesage.warning方法的参数类型已经改变，请更换！');
      return;
    }

    var modal = _modal2.default.warning({
      onOk: okNextCall.bind(null, callback),
      title: option.title,
      content: option.content,
      iconClassName: iconClassName,
      titleClassName: titleClassName,
      contentClassName: contentClassName
    });

    autoCloseTimer = setTimeout(function () {
      modal.destroy();
      nextCall(callback);
    }, (option.delay || defaultDelay.warning) * 1000);

    isClosed = false;
  },
  confirm: function confirm(option) {
    return _modal2.default.confirm(option);
  }
};