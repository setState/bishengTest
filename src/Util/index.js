/**
 * Created by neo on 16/4/12.
 */

import React from 'react';
import {hashHistory} from 'react-router';
import moment from 'moment';
import {message} from 'antd';
import assign from 'object-assign';

import config from '../config';
import accounting from './accounting';
import isFunction from 'lodash/isFunction';
import isObject from 'lodash/isObject';
import isArray from 'lodash/isArray';

const buildingWord = ["栋", "幢", "座", "号楼"];
let loadingFlag = [];
const NAME_KEY_SEP = ".";

const formatRegExp = /%[sdj%]/g;

function getValue(string) {
  return common.isEmpty(string) == false ? string : "";
}

function getNum(text) {
  return text.replace(/[^\w+$]/ig, "");
}

function addUnit(value, units) {
  let str = "";
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

function splitBuildUnit(value, units) {
  let str = {name: "", unit: units[0]}, index = -1;
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

  if (func && isFunction(func)) {
    return func(raw, key)
  } else {
    return raw
  }
}

function reverseWords(a, b, reverse, isString) {
  let str = null;
  if (reverse)
    str = b + a;
  else
    str = a + b;

  return isString ? str : <span>{str}</span>;
}

function getType(obj) {
  const class2type = {
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

  return obj == null ? String(obj) :
    class2type[Object.prototype.toString.call(obj)] || "object"
}


function enableButton() {
  if ($(".clear-button")) {
    $(".clear-button").removeAttr("disabled");
  }

  if ($(".promise-button")) {
    $(".promise-button").removeAttr("disabled");
  }
  //lading对象
  let singleLoading = loadingFlag && loadingFlag.pop();
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

const Util = {

  buildingWord: buildingWord,

  getDefaultCity() {
    let cityJson = config.defaultCity;

    if (localStorage.managerDefaultCity) {
      cityJson = JSON.parse(localStorage.managerDefaultCity);
    }

    return cityJson;
  },

  setDefaultCity(city) {
    let cityJson = config.defaultCity;

    if (localStorage.managerDefaultCity && city == false) {
      cityJson = JSON.parse(localStorage.managerDefaultCity);
    }
    else if (city) {
      cityJson = city;
      localStorage.managerDefaultCity = JSON.stringify(cityJson);
    }

    return cityJson;
  },

  getBuilding(value){
    return addUnit(value, buildingWord);
  },

  getUnitNo(value){
    return addUnit(value, ["单元"]);
  },

  splitBuildUnit(value){
    return splitBuildUnit(value, buildingWord);
  },

  splitUnitNo(value){
    return splitBuildUnit(value, ["单元"]);
  },

  formatAddress(address, building, floor, unit, room, split, reverse = false, isString = false){
    if (split && split == true)
      return <div>
        <div style={{
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis"
        }}>{getValue(address)}</div>
        <div style={{
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis"
        }}>{this.getBuilding(building) + (floor ? floor + "层" : "") + this.getUnitNo(unit) + getValue(room)}</div>
      </div>;
    else
      return reverseWords(getValue(address), this.getBuilding(building) + (floor ? floor + "层" : "") + this.getUnitNo(unit) + getValue(room), reverse, isString);
  },
  formatSimpleAddress(address, building, unit, room){
    let roomInfoArr = [],
      addressVal = getValue(address),
      buildingVal = getValue(building),
      unitVal = getValue(unit),
      roomVal = getValue(room);

    if (buildingVal !== "")
      roomInfoArr[roomInfoArr.length] = buildingVal;

    if (unitVal !== "")
      roomInfoArr[roomInfoArr.length] = unitVal;

    if (roomVal !== "")
      roomInfoArr[roomInfoArr.length] = roomVal;

    return <span>{addressVal}{roomInfoArr.join("-")}</span>;
  },
  formatRoomNo(building, unit, room){
    let arr = [];

    if (building) {
      arr[arr.length] = getNum(building);

      if (arr[arr.length] == false)
        arr[arr.length] = getValue(building);
    }

    if (unit)
      arr[arr.length] = getNum(unit);

    if (room)
      arr[arr.length] = room;
    else
      arr[arr.length] = "房间名为空";

    return <span>{arr.join("-")}</span>;
  },

  splitDate(date){
    let dateArr = [];

    if (Number(date)) {
      //字符串
      date = moment(date, "YYYYMMDDHH:mm:ss").format("YYYY-MM-DD HH:mm:ss");

    }

    if (date) {
      dateArr = date.split(" ");

      return (
        <div>
          {dateArr[0]}<br/>{dateArr[1]}
        </div>
      )
    }
    else
      return date;
  },

  serializeWithFile(data, fileName, fileObj){
    let params = new FormData();

    if (fileObj)
      fileObj.map(function (item) {
        params.append(fileName, item);
      });
    else
      params.append(fileName, "");

    for (let key in data) {
      if (typeof data[key] == 'object') {
        params.append(key, JSON.stringify(data[key]));
      }
      else
        params.append(key, data[key]);
    }

    return params;
  },

  push(path, query){
    let url = path;
    if (query)
      url = {
        pathname: path,
        query: query
      };

    hashHistory.push(url);
  },

  convertDateFormat(date, fmtA, fmtB, empty) {
    let result = "";
    if (date) {
      if (fmtA && fmtB) {
        result = moment(date, fmtA).format(fmtB);
        return result == "Invalid date" ? empty || "" : result;
      } else {
        result = moment(date, "YYYYMMDDHHmmss").format("YYYY-MM-DD HH:mm:ss");
        return result == "Invalid date" ? empty || "" : result;
      }
    } else {
      return empty || "";
    }
  },

  getNameKeyObj(str) {
    let result = false;

    const index = str.indexOf(NAME_KEY_SEP);
    if (str.indexOf(NAME_KEY_SEP) !== -1) {
      const key = str.slice(0, index);
      const field = str.slice(index + NAME_KEY_SEP.length);
      result = {
        key,
        field
      };
    }

    return result;
  },

  parseFormObj(items, params = {dateFormat: "YYYY-MM-DD HH:mm:ss"}){
    let result = [],
      keyObj = {};

    if (items) {
      for (let key in items) {
        if (items.hasOwnProperty(key)) {
          keyObj = this.getNameKeyObj(key);

          if (result[keyObj.key] == undefined)
            result[keyObj.key] = {};

          if (getType(items[key]) == "date")
            result[keyObj.key][keyObj.field] = moment(items[key]).format(params.dateFormat);
          else
            result[keyObj.key][keyObj.field] = items[key];
        }
      }
    }

    return result;
  },

  disabledDate(date, start, end, many, current){
    var result = false;
    if (date == "start") {
      if (end) {
        result = current && (new Date(current.getTime())).Format("yyyyMMdd") > (new Date(end)).Format("yyyyMMdd");
      }
    } else {
      if (start) {
        result = current && (new Date(current.getTime())).Format("yyyyMMdd") < (new Date(start)).Format("yyyyMMdd");
      }
    }
    return result
  },
  disabledMomentDate(date, start, end, many, current){
    var result = false;
    if (date == "start") {
      if (end) {
        result = current && (new Date(current.valueOf())).Format("yyyyMMdd") > (new Date(end.valueOf())).Format("yyyyMMdd");
      }
    } else {
      if (start) {
        result = current && (new Date(current.valueOf())).Format("yyyyMMdd") < (new Date(start.valueOf())).Format("yyyyMMdd");
      }
    }
    return result
  },

  parseFormObjNew(items, formatter, splitChar){

    // 目前只支持2层，可按需追加

    splitChar = splitChar || NAME_KEY_SEP

    let result = [];

    if (!items || !isObject(items) || isArray(items) || isFunction(items)) { //接收非空对象
      return result;
    }

    let parts, transObject = {};

    Object.keys(items).forEach(key => {


      parts = key.split(splitChar);

      if (parts.length == 1) {

        // 1层
        result.push(doFormat(items[key], key, formatter))

      } else if (parts.length >= 2) {

        // 2层
        if (!transObject[parts[0]]) {

          transObject[parts[0]] = {};
        }

        transObject[parts[0]][parts[1]] = doFormat(items[key], key, formatter);

      }

    });


    if (parts.length >= 2) {

      result = Object.keys(transObject).map(key => transObject[key]) || [];
    }

    return result;
  },

  hideIdCard(idCard){
    let result = idCard;

    if (idCard && idCard.length >= 18)
      result = idCard.substring(0, 1) + " *************" + idCard.substring(14, 18);

    return result;
  },

  normalStamp(ts){
    return Math.floor(ts / 1000);
  },
  //table helper
  formatMonty(value){
    if (value) {
      if (value > 0)
        return <span style={{color: "green"}}>{value}</span>;
      else
        return <span style={{color: "red"}}>{value}</span>
    }
    else
      return null;
  },
  sortNumberFunc(a, b, order, sortField) {
    if (sortField) {
      let _a = a[sortField],
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
  formatCurrency(num, symbol = "", precision = 2) {
    let result = 0;

    if (num) {
      result = accounting.formatMoney(num * 1, symbol, precision);
    }

    return result;
  },
  formatNumber(num, precision = 0){
    let result = 0;

    if (num)
      result = accounting.formatNumber(num * 1, precision);

    return result;
  },
  currencyFormat: (value, row) => {
    if (value)
      return Util.formatCurrency(value);
    else
      return "";
  },
  joinString(v1, v2, character = ""){
    let arr = [];

    if (v1)
      arr[arr.length] = v1;

    if (v2)
      arr[arr.length] = v2;

    return arr.join(character);
  },
  sortCityName(a, b) {
    return a.cityName.localeCompare(b.cityName)
  },
  sortStaffManage(a, b) {
    return a.centerName.localeCompare(b.centerName)
  },
  sortByName(a, b) {
    return a.name.localeCompare(b.name)
  },
  accAdd(arg1, arg2){
    //js 加法计算
    //调用：accAdd(arg1,arg2)
    //返回值：arg1加arg2的精确结果

    var r1, r2, m;
    try {
      r1 = arg1.toString().split(".")[1].length
    } catch (e) {
      r1 = 0
    }
    try {
      r2 = arg2.toString().split(".")[1].length
    } catch (e) {
      r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2));
    return ((arg1 * m + arg2 * m) / m).toFixed(2);
  },
  /**
   * 减法计算
   * @return {string}
   */
  Subtr(arg1, arg2){
    var r1, r2, m, n;
    try {
      r1 = arg1.toString().split(".")[1].length
    } catch (e) {
      r1 = 0
    }
    try {
      r2 = arg2.toString().split(".")[1].length
    } catch (e) {
      r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2));
    //last modify by deeka
    //动态控制精度长度
    n = (r1 >= r2) ? r1 : r2;
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
  accMul(arg1, arg2){
    //js 乘法函数
    //调用：accMul(arg1,arg2)
    //返回值：arg1乘以arg2的精确结果
    var m = 0, s1 = arg1 ? arg1.toString() : "", s2 = arg2 ? arg2.toString() : "";
    try {
      m += s1.split(".")[1].length
    } catch (e) {
    }
    try {
      m += s2.split(".")[1].length
    } catch (e) {
    }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
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
  ajaxPromise(url, param, method, dataType, formData, loading = false, contentType){
    //loading === true 非侵入式
    //loading === "xxx" 旧loading

    const ticket = common.getCookie('intebox_sso_tkt');

    let params = {
      type: (method == undefined) ? 'POST' : method,
      url: url,
      data: {},
      dataType: (dataType == undefined) ? 'json' : dataType,
      contentType: (contentType == undefined) ? 'application/x-www-form-urlencoded' : contentType,
      headers: {
        intebox_sso_tkt: ticket,
        intebox_sso_app: common.baseInfo.UA
      },
    };

    if (formData) {
      params.processData = false;
      params.contentType = false;
    }

    params.success = postSuccess;
    params.error = postError;
    params.data = param;

    if (loading) {
      if (loading && (typeof loading == 'string')) {
        params.loadingElementId = loading;
        disableButton();
      } else if (loading && (typeof loading == 'boolean'))
        loadingFlag.push(message.loading('正在请求中...', 0));
    }

    return $.ajax(params);
  },
  ajax(url, param, method, dataType, async, success, failure) {
    let successHandler = (success != undefined) ? success : function (data) {

      };
    let failureHandler = (failure != undefined) ? failure : function (xhr) {
        if (xhr.status == -9999) {
          common.kickout();
        }
      };
    const ticket = common.getCookie('intebox_sso_tkt') || '';

    disableButton();

    let options = {
      type: (method == undefined) ? 'POST' : method,
      url: url,
      data: param,
      dataType: (dataType == undefined) ? 'json' : dataType,
      headers: {
        intebox_sso_tkt: ticket,
        intebox_sso_app: common.baseInfo.UA
      },
      //success: postSuccess,
      error: postError
    };

    let loadingElementId = undefined;

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
        message: '和服务器失去连接!',
      })
    });
  },
  format(...args) {
    let i = 1;
    const f = args[0];
    const len = args.length;
    if (typeof f === 'function') {
      return f.apply(null, args.slice(1));
    }
    if (typeof f === 'string') {
      let str = String(f).replace(formatRegExp, (x) => {
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
      for (let arg = args[i]; i < len; arg = args[++i]) {
        str += ` ${arg}`;
      }
      return str;
    }
    return f;
  },
  omit(obj, fields){
    const copy = assign({}, obj);
    for (let i = 0; i < fields.length; i++) {
      const key = fields[i];
      delete copy[key];
    }
    return copy;
  },
  //判断运营商类型
  whichOrganization(type){
    const staffInfo = common.getStaff();

    let result = false;

    if (staffInfo && staffInfo.orgTypes) {
      const orgTypes = staffInfo.orgTypes.map(item => item.orgType);

      if (orgTypes.indexOf(type + "") >= 0)
        result = true;
    }

    return result;
  }
};

export default Util;
