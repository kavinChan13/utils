/**
 * 生成随机数的工具类
 */

const exp = module.exports;

/**
 * 随机 两个数字之间的 整数 包括头尾返回 【min，max】
 * @param min
 * @param max
 * @returns {*}
 */
exp.nextInt = function (min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
};

/**
 * 随机 0 - max 的整数  返回 【1，max】
 * @param max
 * @returns {number}
 */
exp.nextIntOne = function (max) {
    return Math.floor(Math.random() * max + 1);
};

/**
 * 根据传入的权重，返回随机值
 * 小数的概率  最多支持 4位小数
 * @param rateMap 可以是Array 也可以是map
 *    例如 [0.1,0.2,0.3,0.4]
 *        {a:100,b:200,c:300,d:500 }
 */
exp.getRandomForDecimalMap = function (rateMap) {
    let sum = 0;
    for (let key in rateMap) {
        sum += parseInt(rateMap[key]);
    }
    let j = Math.random() * sum;
    let ranV = j.toFixed(4); //取4位小数
    let tmp = 0;
    for (let i in rateMap) {
        tmp += parseInt(rateMap[i]);
        if (ranV < tmp) {
            return i;
        }
    }

    return null;
};

/**
 * 简单的概率
 * @param currentRate 当前概率 1是100%
 * @return Boolean 是否中 true：中
 */
exp.simpleRandomValueForRate = function (currentRate) {
    let baseRate = 2000000000;
    let value = currentRate * baseRate;
    let min = value / 2;
    let middle = baseRate / 2;
    let ranValue = Math.floor(Math.random() * Math.floor(baseRate) + 1);
    if (ranValue < min || (ranValue > middle && ranValue < (middle + min))) {
        return true;
    }
    return false;
};

/**
 * 随机红包
 * @param num  红包人数
 * @param coin 红包总值
 * @returns {Array} 从大到小排序的 红包数组
 */
exp.randomRedPacket = function (num, coin) {
    let number = num;
    let money = coin;
    let moneyList = [];
    while (number > 1) {
        let min = Math.floor(0.1 * money / 10) * 10;
        let max = Math.floor(money / number * 2);
        let cost = Math.floor(Math.random() * max / 10) * 10;
        cost = cost < min ? min : cost;
        number--;
        money -= cost;
        moneyList.push(cost);
    }

    moneyList.push(money);
    moneyList.sort(function (a, b) {
        return b - a;
    });

    return moneyList
};
