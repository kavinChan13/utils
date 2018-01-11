/**
 * Json 操作对象
 */


/**
 * Data 对象
 * @param data
 *
 */
const Data = function (data) {
    data = require('.config/data/' + data);
    if (!data || !data[0] || !data[0][0]) {
        return;
    }
    //获取字段
    let pk = data[0][0]; //主键字段名
    let result = {}, item;
    let arrData = [];
    for (let i = 1, len = data.length; i < len; i++) {
        item = mapData(data[0], data[i]);
        if (item[pk] !== 0) {
            result[item[pk]] = item;
        }
        arrData.push(item);
    }
    this.data = result;
    this.arrayData = arrData;
};

/**
 * map the array data to object
 *
 * @param  fields {Object}
 * @param item {Array}
 * @return {Object} result
 * @api private
 */
let mapData = function (fields, item) {
    let obj = {};
    for (let k = 0, len = fields.length; k < len; k++) {
        obj[fields[k]] = item[k];
    }
    return obj;
};

/**
 * find items by attribute
 *
 * @param {String} attr name
 * @param {String|Number} value value of the attribute
 * @return {Array} result
 * @api public
 */
Data.prototype.findBy = function (attr, value) {
    let result = [];
    for (let i in this.data) {
        let item = this.data[i];
        if (item[attr] === value) {
            result.push(item);
        }
    }
    return result;
};

/**
 * 获取属性值大于或等于指定值的列表
 * @param attr {String} 字段名
 * @param value
 * @returns {Array}
 */
Data.prototype.findBigger = function (attr, value) {
    let result = [];
    value = Number(value);
    for (let i in this.data) {
        let item = this.data[i];
        if (Number(item[attr]) > value) {
            result.push(item);
        }
    }
    return result;
};

/**
 * 获取属性值小于或等于指定值的列表
 * @param attr {String} 字段名
 * @param value
 * @returns {Array}
 */
Data.prototype.findLess = function (attr, value) {
    let result = [];
    value = Number(value);
    for (let i in this.data) {
        let item = this.data[i];
        if (Number(item[attr]) <= value) {
            result.push(item);
        }
    }
    return result;
};


/**
 * 两个字段获取属性值
 * @param attr1  字段名1
 * @param value1 字段值1
 * @param attr2  字段名2
 * @param value2 字段值2
 * @returns {Array}
 */
Data.prototype.findByTwoParams = function (attr1, value1, attr2, value2) {
    let result = [];
    for (let i in this.data) {
        let item = this.data[i];
        if (item[attr1] === value1 && item[attr2] === value2) {
            result.push(item);
        }
    }
    return result;
};

/**
 *  根据三个字段值查询
 * @param attr1    字段名1
 * @param value1   字段值1
 * @param attr2    字段名2
 * @param value2   字段值2
 * @param attr3    字段名3
 * @param value3   字段值3
 * @returns {Array}
 */
Data.prototype.findByThreeParams = function (attr1, value1, attr2, value2, attr3, value3) {
    let result = [];
    for (let i in this.data) {
        let item = this.data[i];
        if (item[attr1] === value1 && item[attr2] === value2 && item[attr3] === value3) {
            result.push(item);
        }
    }
    return result;
};
/**
 * 获取属性值小于或等于指定值的列表
 * @param attr {String} 字段名
 * @param value
 * @returns {Array}
 */
Data.prototype.findSmaller = function (attr, value) {
    let result = [];
    value = Number(value);
    for (let i in this.data) {
        let item = this.data[i];
        if (Number(item[attr]) <= value) {
            result.push(item);
        }
    }
    return result;
};

/**
 * 获取属性值小于或等于指定值的列表
 * @param attr1
 * @param value1
 * @param attr2
 * @param value2
 * @returns {Array}
 */
Data.prototype.findByIdWithTwoSmaller = function (attr1, value1, attr2, value2) {
    let result = [];
    for (let i in this.data) {
        let item = this.data[i];
        if (item[attr1] >= value1 && (item[attr2] >= value2 || item[attr2] === -1)) {
            result.push(item);
        }
    }
    return result;
};

/**
 * find item by id
 * @param id
 * @return
 * @api public
 */
Data.prototype.findById = function (id) {
    return this.data[id];
};

/**
 * find all item
 * 获取所有的数据 已Object 的方式返回
 * @return {array}
 * @api public
 */
Data.prototype.all = function () {
    return this.data;
};

/**
 * 获取所有的数据  已数组的形式返回
 * @returns {Array|*}
 */
Data.prototype.arrayAll = function () {
    return this.arrayData;
};


module.exports = {
    dataTools: new Data('dataTools'),
};

