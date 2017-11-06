'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                                               * Created by neo on 16/4/12.
                                                                                                                                                                                                                                                                               */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _antd = require('antd');

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _accounting = require('./accounting');

var _accounting2 = _interopRequireDefault(_accounting);

var _isFunction = require('lodash/isFunction');

var _isFunction2 = _interopRequireDefault(_isFunction);

var _isObject = require('lodash/isObject');

var _isObject2 = _interopRequireDefault(_isObject);

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var buildingWord = ["栋", "幢", "座", "号楼"];
var loadingFlag = [];
var NAME_KEY_SEP = ".";

var formatRegExp = /%[sdj%]/g;

function getValue(string) {
  return common.isEmpty(string) == false ? string : "";
}

function getNum(text) {
  return text.replace(/[^\w+$]/ig, "");
}

function addUnit(value, units) {
  var str = "";
  if (value && units) {
    for (var i = 0, len = units.length; i < len; i++) {
      if (value.indexOf(units[i]) >= 0) {
        str = value;
        break;
      }
    }

    if (str == "") {
      str = value + units[0];
    }
  }

  return str;
}

function _splitBuildUnit(value, units) {
  var str = { name: "", unit: units[0] },
      index = -1;
  if (value && units) {
    for (var i = 0, len = units.length; i < len; i++) {
      index = value.indexOf(units[i]);

      if (index >= 0) {
        str.name = value.substring(0, index);
        str.unit = units[i];
        break;
      }
    }

    if (str.name == "") {
      str.name = value;
    }
  }

  return str;
}

function doFormat(raw, key, func) {

  if (func && (0, _isFunction2.default)(func)) {
    return func(raw, key);
  } else {
    return raw;
  }
}

function reverseWords(a, b, reverse, isString) {
  var str = null;
  if (reverse) str = b + a;else str = a + b;

  return isString ? str : _react2.default.createElement(
    'span',
    null,
    str
  );
}

function getType(obj) {
  var class2type = {
    "[object Boolean]": "boolean",
    "[object Number]": "number",
    "[object String]": "string",
    "[object Function]": "function",
    "[object Array]": "array",
    "[object Date]": "date",
    "[object RegExp]": "regexp",
    "[object Object]": "object",
    "[object Error]": "error"
  };

  return obj == null ? String(obj) : class2type[Object.prototype.toString.call(obj)] || "object";
}

function enableButton() {
  if ($(".clear-button")) {
    $(".clear-button").removeAttr("disabled");
  }

  if ($(".promise-button")) {
    $(".promise-button").removeAttr("disabled");
  }
  //lading对象
  var singleLoading = loadingFlag && loadingFlag.pop();
  //关闭
  singleLoading && singleLoading();
}

function disableButton() {
  if ($(".clear-button")) {
    $(".clear-button").attr("disabled", true);
  }

  if ($(".promise-button")) {
    $(".promise-button").attr("disabled", true);
  }
}

function postSuccess(result, status, xhr) {
  enableButton();

  if (result.errorCode == -9999) {
    common.kickout();
  }
}

function postError(xhr, type, error) {
  enableButton();
}

function checkStatus(xhr, cookie) {

  if (!common.needSigin()) {
    return;
  }

  if (xhr.errorCode == -9999 || cookie == undefined || cookie == "") {
    localStorage.removeItem(common.userInfo);
    localStorage.removeItem(common.currentStaff);
    //todo remove cookie?
    window.location.href = common.baseInfo.login;
  }
};

var Util = {

  buildingWord: buildingWord,

  getDefaultCity: function getDefaultCity() {
    var cityJson = _config2.default.defaultCity;

    if (localStorage.managerDefaultCity) {
      cityJson = JSON.parse(localStorage.managerDefaultCity);
    }

    return cityJson;
  },
  setDefaultCity: function setDefaultCity(city) {
    var cityJson = _config2.default.defaultCity;

    if (localStorage.managerDefaultCity && city == false) {
      cityJson = JSON.parse(localStorage.managerDefaultCity);
    } else if (city) {
      cityJson = city;
      localStorage.managerDefaultCity = JSON.stringify(cityJson);
    }

    return cityJson;
  },
  getBuilding: function getBuilding(value) {
    return addUnit(value, buildingWord);
  },
  getUnitNo: function getUnitNo(value) {
    return addUnit(value, ["单元"]);
  },
  splitBuildUnit: function splitBuildUnit(value) {
    return _splitBuildUnit(value, buildingWord);
  },
  splitUnitNo: function splitUnitNo(value) {
    return _splitBuildUnit(value, ["单元"]);
  },
  formatAddress: function formatAddress(address, building, floor, unit, room, split) {
    var reverse = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
    var isString = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;

    if (split && split == true) return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'div',
        { style: {
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis"
          } },
        getValue(address)
      ),
      _react2.default.createElement(
        'div',
        { style: {
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis"
          } },
        this.getBuilding(building) + (floor ? floor + "层" : "") + this.getUnitNo(unit) + getValue(room)
      )
    );else return reverseWords(getValue(address), this.getBuilding(building) + (floor ? floor + "层" : "") + this.getUnitNo(unit) + getValue(room), reverse, isString);
  },
  formatSimpleAddress: function formatSimpleAddress(address, building, unit, room) {
    var roomInfoArr = [],
        addressVal = getValue(address),
        buildingVal = getValue(building),
        unitVal = getValue(unit),
        roomVal = getValue(room);

    if (buildingVal !== "") roomInfoArr[roomInfoArr.length] = buildingVal;

    if (unitVal !== "") roomInfoArr[roomInfoArr.length] = unitVal;

    if (roomVal !== "") roomInfoArr[roomInfoArr.length] = roomVal;

    return _react2.default.createElement(
      'span',
      null,
      addressVal,
      roomInfoArr.join("-")
    );
  },
  formatRoomNo: function formatRoomNo(building, unit, room) {
    var arr = [];

    if (building) {
      arr[arr.length] = getNum(building);

      if (arr[arr.length] == false) arr[arr.length] = getValue(building);
    }

    if (unit) arr[arr.length] = getNum(unit);

    if (room) arr[arr.length] = room;else arr[arr.length] = "房间名为空";

    return _react2.default.createElement(
      'span',
      null,
      arr.join("-")
    );
  },
  splitDate: function splitDate(date) {
    var dateArr = [];

    if (Number(date)) {
      //字符串
      date = (0, _moment2.default)(date, "YYYYMMDDHH:mm:ss").format("YYYY-MM-DD HH:mm:ss");
    }

    if (date) {
      dateArr = date.split(" ");

      return _react2.default.createElement(
        'div',
        null,
        dateArr[0],
        _react2.default.createElement('br', null),
        dateArr[1]
      );
    } else return date;
  },
  serializeWithFile: function serializeWithFile(data, fileName, fileObj) {
    var params = new FormData();

    if (fileObj) fileObj.map(function (item) {
      params.append(fileName, item);
    });else params.append(fileName, "");

    for (var key in data) {
      if (_typeof(data[key]) == 'object') {
        params.append(key, JSON.stringify(data[key]));
      } else params.append(key, data[key]);
    }

    return params;
  },
  push: function push(path, query) {
    var url = path;
    if (query) url = {
      pathname: path,
      query: query
    };

    _reactRouter.hashHistory.push(url);
  },
  convertDateFormat: function convertDateFormat(date, fmtA, fmtB, empty) {
    var result = "";
    if (date) {
      if (fmtA && fmtB) {
        result = (0, _moment2.default)(date, fmtA).format(fmtB);
        return result == "Invalid date" ? empty || "" : result;
      } else {
        result = (0, _moment2.default)(date, "YYYYMMDDHHmmss").format("YYYY-MM-DD HH:mm:ss");
        return result == "Invalid date" ? empty || "" : result;
      }
    } else {
      return empty || "";
    }
  },
  getNameKeyObj: function getNameKeyObj(str) {
    var result = false;

    var index = str.indexOf(NAME_KEY_SEP);
    if (str.indexOf(NAME_KEY_SEP) !== -1) {
      var key = str.slice(0, index);
      var field = str.slice(index + NAME_KEY_SEP.length);
      result = {
        key: key,
        field: field
      };
    }

    return result;
  },
  parseFormObj: function parseFormObj(items) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { dateFormat: "YYYY-MM-DD HH:mm:ss" };

    var result = [],
        keyObj = {};

    if (items) {
      for (var key in items) {
        if (items.hasOwnProperty(key)) {
          keyObj = this.getNameKeyObj(key);

          if (result[keyObj.key] == undefined) result[keyObj.key] = {};

          if (getType(items[key]) == "date") result[keyObj.key][keyObj.field] = (0, _moment2.default)(items[key]).format(params.dateFormat);else result[keyObj.key][keyObj.field] = items[key];
        }
      }
    }

    return result;
  },
  disabledDate: function disabledDate(date, start, end, many, current) {
    var result = false;
    if (date == "start") {
      if (end) {
        result = current && new Date(current.getTime()).Format("yyyyMMdd") > new Date(end).Format("yyyyMMdd");
      }
    } else {
      if (start) {
        result = current && new Date(current.getTime()).Format("yyyyMMdd") < new Date(start).Format("yyyyMMdd");
      }
    }
    return result;
  },
  disabledMomentDate: function disabledMomentDate(date, start, end, many, current) {
    var result = false;
    if (date == "start") {
      if (end) {
        result = current && new Date(current.valueOf()).Format("yyyyMMdd") > new Date(end.valueOf()).Format("yyyyMMdd");
      }
    } else {
      if (start) {
        result = current && new Date(current.valueOf()).Format("yyyyMMdd") < new Date(start.valueOf()).Format("yyyyMMdd");
      }
    }
    return result;
  },
  parseFormObjNew: function parseFormObjNew(items, formatter, splitChar) {

    // 目前只支持2层，可按需追加

    splitChar = splitChar || NAME_KEY_SEP;

    var result = [];

    if (!items || !(0, _isObject2.default)(items) || (0, _isArray2.default)(items) || (0, _isFunction2.default)(items)) {
      //接收非空对象
      return result;
    }

    var parts = void 0,
        transObject = {};

    Object.keys(items).forEach(function (key) {

      parts = key.split(splitChar);

      if (parts.length == 1) {

        // 1层
        result.push(doFormat(items[key], key, formatter));
      } else if (parts.length >= 2) {

        // 2层
        if (!transObject[parts[0]]) {

          transObject[parts[0]] = {};
        }

        transObject[parts[0]][parts[1]] = doFormat(items[key], key, formatter);
      }
    });

    if (parts.length >= 2) {

      result = Object.keys(transObject).map(function (key) {
        return transObject[key];
      }) || [];
    }

    return result;
  },
  hideIdCard: function hideIdCard(idCard) {
    var result = idCard;

    if (idCard && idCard.length >= 18) result = idCard.substring(0, 1) + " *************" + idCard.substring(14, 18);

    return result;
  },
  normalStamp: function normalStamp(ts) {
    return Math.floor(ts / 1000);
  },

  //table helper
  formatMonty: function formatMonty(value) {
    if (value) {
      if (value > 0) return _react2.default.createElement(
        'span',
        { style: { color: "green" } },
        value
      );else return _react2.default.createElement(
        'span',
        { style: { color: "red" } },
        value
      );
    } else return null;
  },
  sortNumberFunc: function sortNumberFunc(a, b, order, sortField) {
    if (sortField) {
      var _a = a[sortField],
          _b = b[sortField];

      if (order) {
        if (order == "asc") {
          return _a - _b;
        } else {
          return _b - _a;
        }
      }
    }
  },

  // formatCurrency(num, prefix = "¥") {
  //     let str = 0;
  //     if (num) {
  //         str = num;
  //
  //         if (getType(num) == "number")
  //             str = num.toString();
  //
  //         str = str.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
  //     }
  //
  //     return prefix + str;
  // },
  formatCurrency: function formatCurrency(num) {
    var symbol = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
    var precision = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2;

    var result = 0;

    if (num) {
      result = _accounting2.default.formatMoney(num * 1, symbol, precision);
    }

    return result;
  },
  formatNumber: function formatNumber(num) {
    var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    var result = 0;

    if (num) result = _accounting2.default.formatNumber(num * 1, precision);

    return result;
  },

  currencyFormat: function currencyFormat(value, row) {
    if (value) return Util.formatCurrency(value);else return "";
  },
  joinString: function joinString(v1, v2) {
    var character = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";

    var arr = [];

    if (v1) arr[arr.length] = v1;

    if (v2) arr[arr.length] = v2;

    return arr.join(character);
  },
  sortCityName: function sortCityName(a, b) {
    return a.cityName.localeCompare(b.cityName);
  },
  sortStaffManage: function sortStaffManage(a, b) {
    return a.centerName.localeCompare(b.centerName);
  },
  sortByName: function sortByName(a, b) {
    return a.name.localeCompare(b.name);
  },
  accAdd: function accAdd(arg1, arg2) {
    //js 加法计算
    //调用：accAdd(arg1,arg2)
    //返回值：arg1加arg2的精确结果

    var r1, r2, m;
    try {
      r1 = arg1.toString().split(".")[1].length;
    } catch (e) {
      r1 = 0;
    }
    try {
      r2 = arg2.toString().split(".")[1].length;
    } catch (e) {
      r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    return ((arg1 * m + arg2 * m) / m).toFixed(2);
  },

  /**
   * 减法计算
   * @return {string}
   */
  Subtr: function Subtr(arg1, arg2) {
    var r1, r2, m, n;
    try {
      r1 = arg1.toString().split(".")[1].length;
    } catch (e) {
      r1 = 0;
    }
    try {
      r2 = arg2.toString().split(".")[1].length;
    } catch (e) {
      r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    //last modify by deeka
    //动态控制精度长度
    n = r1 >= r2 ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(2);
  },

  // accDiv(arg1, arg2){
  //     //js 除法函数
  //     //调用：accDiv(arg1,arg2)
  //     //返回值：arg1除以arg2的精确结果
  //
  //     var t1 = 0, t2 = 0, r1, r2;
  //     try {
  //         t1 = arg1.toString().split(".")[1].length
  //     } catch (e) {
  //     }
  //     try {
  //         t2 = arg2.toString().split(".")[1].length
  //     } catch (e) {
  //     }
  //     with (Math) {
  //         r1 = Number(arg1.toString().replace(".", ""));
  //         r2 = Number(arg2.toString().replace(".", ""));
  //         return (r1 / r2) * pow(10, t2 - t1);
  //     }
  // },
  accMul: function accMul(arg1, arg2) {
    //js 乘法函数
    //调用：accMul(arg1,arg2)
    //返回值：arg1乘以arg2的精确结果
    var m = 0,
        s1 = arg1 ? arg1.toString() : "",
        s2 = arg2 ? arg2.toString() : "";
    try {
      m += s1.split(".")[1].length;
    } catch (e) {}
    try {
      m += s2.split(".")[1].length;
    } catch (e) {}
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
  },

  /**
   * @description ajax用于提交请求
   * @param {string} url - 请求
   * @param {object} param - 请求参数
   * @param {string} method - 请求类型 GET or POST
   * @param {string} dataType - 预期返回的数据类型
   * @param {boolean} formData - 是否启用FormData,上传图片时需要,默认只能false
   * @param {string|boolean} loading - 加载效果,boolean的时候启用message,否则使用div#id的加载效果
   * @param {string} contentType - contentType,默认x-www-form-urlencoded
   **/
  ajaxPromise: function ajaxPromise(url, param, method, dataType, formData) {
    var loading = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
    var contentType = arguments[6];

    //loading === true 非侵入式
    //loading === "xxx" 旧loading

    var ticket = common.getCookie('intebox_sso_tkt');

    var params = {
      type: method == undefined ? 'POST' : method,
      url: url,
      data: {},
      dataType: dataType == undefined ? 'json' : dataType,
      contentType: contentType == undefined ? 'application/x-www-form-urlencoded' : contentType,
      headers: {
        intebox_sso_tkt: ticket,
        intebox_sso_app: common.baseInfo.UA
      }
    };

    if (formData) {
      params.processData = false;
      params.contentType = false;
    }

    params.success = postSuccess;
    params.error = postError;
    params.data = param;

    if (loading) {
      if (loading && typeof loading == 'string') {
        params.loadingElementId = loading;
        disableButton();
      } else if (loading && typeof loading == 'boolean') loadingFlag.push(_antd.message.loading('正在请求中...', 0));
    }

    return $.ajax(params);
  },
  ajax: function ajax(url, param, method, dataType, async, success, failure) {
    var successHandler = success != undefined ? success : function (data) {};
    var failureHandler = failure != undefined ? failure : function (xhr) {
      if (xhr.status == -9999) {
        common.kickout();
      }
    };
    var ticket = common.getCookie('intebox_sso_tkt') || '';

    disableButton();

    var options = {
      type: method == undefined ? 'POST' : method,
      url: url,
      data: param,
      dataType: dataType == undefined ? 'json' : dataType,
      headers: {
        intebox_sso_tkt: ticket,
        intebox_sso_app: common.baseInfo.UA
      },
      //success: postSuccess,
      error: postError
    };

    var loadingElementId = undefined;

    if (param && param.loadingElementId) {
      loadingElementId = param.loadingElementId;
      delete param.loadingElementId;
    }

    if (loadingElementId) {
      options.loadingElementId = loadingElementId;
    }

    return $.ajax(options).done(function (result) {
      checkStatus(result, ticket);

      enableButton();
    }).done(successHandler).fail(function (arg) {
      failureHandler({
        xhr: arg,
        errorCode: arg.status,
        message: '和服务器失去连接!'
      });
    });
  },
  format: function format() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var i = 1;
    var f = args[0];
    var len = args.length;
    if (typeof f === 'function') {
      return f.apply(null, args.slice(1));
    }
    if (typeof f === 'string') {
      var str = String(f).replace(formatRegExp, function (x) {
        if (x === '%%') {
          return '%';
        }
        if (i >= len) {
          return x;
        }
        switch (x) {
          case '%s':
            return String(args[i++]);
          case '%d':
            return Number(args[i++]);
          case '%j':
            try {
              return JSON.stringify(args[i++]);
            } catch (_) {
              return '[Circular]';
            }
            break;
          default:
            return x;
        }
      });
      for (var arg = args[i]; i < len; arg = args[++i]) {
        str += ' ' + arg;
      }
      return str;
    }
    return f;
  },
  omit: function omit(obj, fields) {
    var copy = (0, _objectAssign2.default)({}, obj);
    for (var i = 0; i < fields.length; i++) {
      var key = fields[i];
      delete copy[key];
    }
    return copy;
  },

  //判断运营商类型
  whichOrganization: function whichOrganization(type) {
    var staffInfo = common.getStaff();

    var result = false;

    if (staffInfo && staffInfo.orgTypes) {
      var orgTypes = staffInfo.orgTypes.map(function (item) {
        return item.orgType;
      });

      if (orgTypes.indexOf(type + "") >= 0) result = true;
    }

    return result;
  }
};

exports.default = Util;