/**
 * 日期操作的工具类
 */

const exp = module.exports;
const moment = require('moment');

/**
 * 日期 格式化
 * @param date 日期
 * @param format 格式  年(yyyy)-月(MM)-日(dd) 时(HH):分(mm):秒(ss) 毫秒（S）
 * 常规格式  yyyy-MM-dd HH:mm:ss S
 */
exp.formatDate = function (date, format) {
    let o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "H+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return format;
};


/**
 * 时间增加  秒
 * @param date 日期
 * @param timeLen 增加的时间（单位：秒）
 * @returns {Date}
 */
exp.addSeconds = function (date, timeLen) {
    let tempDate = moment(date);
    return tempDate.add(timeLen, 's').toDate();
};

/**
 * 时间增加  毫秒
 * date + timeLen
 * @param date  日期
 * @param timeLen 增加的时间（单位：毫秒）
 * @return {Date} 返回增加后的时间 (单位 ：Date)
 */
exp.addMilliseconds = function (date, timeLen) {
    let tempDate = moment(date);
    return tempDate.add(timeLen, 'ms').toDate();
};

/**
 * 时间增加 天
 * date + timeLen
 * @param date  日期
 * @param day 增加的时间（单位：天数）
 * @return {Date} 返回增加后的时间 (单位 ：Date)
 */
exp.addDays = function (date, day) {
    let tempDate = moment(date);
    return tempDate.add(day, 'days').toDate();
};

/**
 * 时间减少 秒
 * date - timeLen
 * @param date  日期
 * @param timeLen 减少的时间（单位：秒）
 * @return  {Date} 返回减少后的时间 (单位 ：Date)
 */
exp.reduceSeconds = function (date, timeLen) {
    let tempDate = moment(date);
    return tempDate.subtract(timeLen, 'seconds').toDate();
};

/**
 * 时间减少 毫秒
 * date - timeLen
 * @param date  日期
 * @param timeLen 减少的时间（单位：毫秒）
 * @return  {Date} 返回减少后的时间 (单位 ：Date)
 */
exp.reduceMilliseconds = function (date, timeLen) {
    let tempDate = moment(date);
    return tempDate.subtract(timeLen, 'ms').toDate();
};

/**
 * 时间减少 天
 * date - day
 * @param date  日期
 * @param day 减少的时间（单位：天）
 * @return {Date} 返回减少后的时间 (单位 ：Date)
 */
exp.reduceDays = function (date, day) {
    let tempDate = moment(date);
    return tempDate.subtract(day, 'd').toDate();
};

/**
 * 获取两个时间的差（单位：天）
 * @param date1
 * @param date2
 * @returns {number} 相差的天数
 */
exp.diffDay = function (date1, date2) {
    let d1 = moment(moment(date1).format("YYYY-MM-DD"));
    let d2 = moment(moment(date2).format("YYYY-MM-DD"));
    return d1.diff(d2, "days");
};

/**
 * 获取两个时间的差（单位：毫秒）
 * @param date1
 * @param date2
 * @return {number} 相差的毫秒数
 */
exp.diffMillisecond = function (date1, date2) {
    let d1 = moment(date1);
    let d2 = moment(date2);
    return d1.diff(d2);
};

/**
 * 获取 两个时间的差（单位：秒）
 * @param date1
 * @param date2
 * @return {number} 相差的秒数
 */
exp.diffSeconds = function (date1, date2) {
    let d1 = moment(date1);
    let d2 = moment(date2);
    return d1.diff(d2, 'seconds');
};

/**
 * 获取 两个时间的差（单位：小时）
 * @param date1
 * @param date2
 * @return {number} 相差的 小时
 */
exp.diffHours = function (date1, date2) {
    let d1 = moment(date1);
    let d2 = moment(date2);
    return d1.diff(d2, 'hour');
};

/**
 * 判断 日期 date1 是否在 date2 之前
 * @param date1
 * @param date2
 */
exp.isBefore = function (date1, date2) {
    let d1 = moment(date1);
    let d2 = moment(date2);
    return d1.isBefore(d2);
};

/**
 * 判断 日期 date1 是否和 date2 相等
 * @param date1
 * @param date2
 */
exp.isSame = function (date1, date2) {
    let d1 = moment(date1);
    let d2 = moment(date2);
    return d1.isSame(d2);
};


/**
 * 判断 当前时间 是否  在 date1 和 date2 之间
 * @param date1
 * @param date2
 */
exp.isBetween = function (date1, date2) {
    return exp.isBetweenForThree(new Date(), date1, date2);
};

/**
 * 判断  date1 是否在 date2 和 date3 之间
 * @param date1
 * @param date2
 * @param date3
 */
exp.isBetweenForThree = function (date1, date2, date3) {
    let d2 = moment(date2);
    let d3 = moment(date3);
    return moment(date1).isBetween(d2, d3);
};

/**
 * 返回当前日期的天数
 * 例子：2017-07-23 00:00:00 返回值 23
 * @param date1
 * @return {number}  1- 31
 */
exp.days = function (date1) {
    return moment(date1).date();
};

/**
 * 返回当前日期是周几
 * @param date1
 * @return {number} 0 - 6  周日 - 周六
 */
exp.weekDays = function (date1) {
    return moment(date1).day();
};

/**
 * 返回当前日期的月份
 * @param date1
 * @return {number} 0-11
 */
exp.month = function (date1) {
    return moment(date1).month();
};

/**
 * 返回下一个周几
 * @param day  周日0-周六6
 * @returns {string|*}
 */
exp.nextWeekDay = function (day) {
    let num = 0;
    let dayNow = moment().weekday();
    if (dayNow < day) {
        num = day;
    } else {
        num = 7 + day;
    }
    return moment().weekday(num).format("YYYYMMDD");
};








