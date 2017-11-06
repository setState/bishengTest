import Modal from 'antd/lib/modal';

import './style.css';

const iconClassName = 'component-message-dialog-title-icon';
const titleClassName = 'component-message-dialog-title';
const contentClassName = 'component-message-dialog-content';

const defaultDelay = {
  success: 3,
  error: 8,
  info: 3,
  warning: 8,
}

let autoCloseTimer = null;

// 标志窗体是否关闭，避免点击了“我知道了” 还执行自动关闭
let isClosed = true;

function nextCall(fn) {
  //确定还没有关闭
  if (!isClosed) {
    isClosed = true;
    setTimeout(() => fn && fn(), 100);
  }
}
function okNextCall(fn) {
  // 清理掉autoCloseTimer
  isClosed = true;
  clearTimeout(autoCloseTimer);
  setTimeout(() => fn && fn(), 100);
}

export default {
  info(option, callback) {
    if (typeof option == 'string') {

      console.warn('Mesage.info方法的参数类型已经改变，请更换！');
      return;
    }

    const modal = Modal.info({
      onOk: okNextCall.bind(null, callback),
      title: option.title,
      content: option.content,
      iconClassName,
      titleClassName,
      contentClassName,
    })

    autoCloseTimer = setTimeout(() => {
      modal.destroy();
      nextCall(callback);
    }, (option.delay || defaultDelay.info) * 1000);

    isClosed = false;
  },
  success(option, callback){

    if (typeof option == 'string') {

      console.warn('Mesage.success方法的参数类型已经改变，请更换！');
      return;
    }

    const modal = Modal.success({
      onOk: okNextCall.bind(null, callback),
      title: option.title,
      content: option.content,
      iconClassName,
      titleClassName,
      contentClassName,
    })

    autoCloseTimer = setTimeout(() => {
      modal.destroy();
      nextCall(callback);
    }, (option.delay || defaultDelay.success) * 1000);

    isClosed = false;
  },
  error(option, callback) {
    if (typeof option == 'string') {

      console.warn('Mesage.error方法的参数类型已经改变，请更换！');
      return;
    }

    const modal = Modal.error({
      onOk: okNextCall.bind(null, callback),
      title: option.title,
      content: option.content,
      iconClassName,
      titleClassName,
      contentClassName,
    })


    autoCloseTimer = setTimeout(() => {
      modal.destroy();
      nextCall(callback);
    }, (option.delay || defaultDelay.error) * 1000);

    isClosed = false;
  },
  warning(option, callback){
    if (typeof option == 'string') {

      console.warn('Mesage.warning方法的参数类型已经改变，请更换！');
      return;
    }

    const modal = Modal.warning({
      onOk: okNextCall.bind(null, callback),
      title: option.title,
      content: option.content,
      iconClassName,
      titleClassName,
      contentClassName,
    })

    autoCloseTimer = setTimeout(() => {
      modal.destroy();
      nextCall(callback);
    }, (option.delay || defaultDelay.warning) * 1000);

    isClosed = false;
  },
  confirm(option) {
    return Modal.confirm(option)

  }
}
