/**
 * @description 公用工具类
 */
let timer = {}
/**
 * @description 获取token
 */
export const getToken = () => localStorage.getItem("token");

/**
 * @description 设置token
 */
export const setToken = (token = "") => localStorage.setItem("token", token);

/**
 * @description 手机号正则匹配
 */
export const testPhone = (phone) => /^1[3|4|5|7|8][0-9]{9}$/.test(phone);

/**
 * @description 平滑滚动
 */
export const linearScroll = (element, top) => {
  let scrollTop = element.scrollTop;
  const step = function () {
    let distance = top - scrollTop;

    scrollTop = scrollTop + distance / 20;
    if (Math.abs(distance) < 1) {
      element.scrollTo(0, top);
    } else {
      element.scrollTo(0, scrollTop);
      setTimeout(step, 1);
    }
  };
  step();
};
/**
 * @description 自动滚动
 */
export const Scroll = (element, id) => {
  //滚动的速度
  const speed = 40;
  //滚动距离
  const length = 1;
  if (!element) return
  else {
    timer[id] = setInterval(() => {
      let current = element.scrollTop;
      let target = 0;
      if (Math.abs(current + element.clientHeight - element.scrollHeight) < 2) {
        target = 0;
        element.scrollTop = 0;
      } else {
        target = current + length;
      }
      element.scrollTo(0, target);
    }, speed);
  }

};
export const Stop = (id) => {
  // console.log(timeValue,'time');
  clearInterval(timer[id]);
  timer[id] = null;
};
import Cookies from "js-cookie";
/**
 * @description 获取本地cookie
 */

export const getCookie = (name) => Cookies.get(name);

export function getOneMonthDateList() {
  let daysInMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let weeks = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
  let waterList = [];
  let powerList = [];
  let currentDate = new Date()
  currentDate.setMonth(currentDate.getMonth() + 1)
  let strYear = currentDate.getFullYear()
  let strDay = currentDate.getDate()
  let strMonth = currentDate.getMonth() + 1
  if (((strYear % 4) === 0) & ((strYear % 100) !== 0) || ((strYear % 400) === 0)) {
    daysInMonth[2] = 29
  }
  if (strMonth - 1 === 0) {
    strYear -= 1
    strMonth = 12
  } else {
    strMonth -= 1
  }
  strDay = Math.min(strDay, daysInMonth[strMonth])
  if (strMonth < 10) {
    strMonth = '0' + strMonth
  }
  if (strDay < 10) {
    strDay = '0' + strDay
  }
  let dateStr = strYear + '-' + strMonth + '-' + strDay
  const dateList = []
  let startDate = new Date(dateStr)
  while (true) {
    startDate.setDate(startDate.getDate() + 1)
    if (startDate.getTime() < currentDate.getTime()) {
      let res = `${startDate.getFullYear()}-${startDate.getMonth() < 10 ? '0' + startDate.getMonth() : startDate.getMonth()}-${startDate.getDate() < 10 ? '0' + startDate.getDate() : startDate.getDate()}`
      if (weeks[startDate.getDay()] == '星期日') {
        waterList.push(randomNum(0.6, 1.74))
        powerList.push(randomNum(752, 1020))
      } else {
        waterList.push(randomNum(8, 17))
        powerList.push(randomNum(3000, 4300))
      }
      dateList.push(res)
    } else {
      break
    }
  }
  return { dateList, waterList, powerList }
}
export function getOneYear() {
  const date = new Date()
  let monthList = [];
  const powerList = []
  const waterList = []
  let hour = date.getHours()
  for (let i = 0; i < 24; i++) {
    const obj = hour - i;
    if (obj < 0) {
      obj += 24
    }
    powerList.push(randomNum(1000, 3972))
    waterList.push(randomNum(2, 17))
    monthList.push(obj)
  }
  monthList = monthList.reverse()
  return { monthList, powerList, waterList }
}
function randomNum(minNum, maxNum) {
  switch (arguments.length) {
    case 1:
      return parseFloat(Math.random() * minNum + 1, 10).toFixed(2);
      break;
    case 2:
      return parseFloat(Math.random() * (maxNum - minNum + 1) + minNum, 10).toFixed(2);
      break;
    default:
      return 0;
      break;
  }
}