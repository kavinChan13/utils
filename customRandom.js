/**
 * JS中实现种子随机数
 * 纯线性同余随机数生成器
 */

/**
 * 自定义随机数
 * @param seed
 * @constructor
 */
const CustomRandom = function (seed) {
    this.seed = seed;
};

module.exports = CustomRandom;

/**
 * 最大值和最下值之间随机
 * @param min
 * @param max
 * @returns {number}
 */
CustomRandom.prototype.randomBetween = function (min, max) {
    max = max || 1;
    min = min || 0;
    this.seed = (this.seed * 9301 + 49297) % 233280;
    let rnd = this.seed / 233280;
    return min + rnd * (max - min);
};
/**
 * 随机0~1之间的数
 * @returns {number}
 */
CustomRandom.prototype.random = function () {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
};

/**
 * 概率
 * @param r 0~1之间
 * @returns {boolean}
 */
CustomRandom.prototype.rate = function (r) {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    let rnd = this.seed / 233280;
    return rnd < r;
};

/**
 * 设置随机种子
 * @param seed
 */
CustomRandom.prototype.setSeed = function (seed) {
    this.seed = seed;
};



