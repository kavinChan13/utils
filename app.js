/**
 * xls 转 Json
 * @type {*|xls_json|XLS_json}
 */

const xls_json = require('xls-to-json');
const fs = require('fs');

const dataDir = __dirname + "/../../data/dbxls";
const serverPublicDir = "./config/data";
let num = 0;

/**
 * 字段过滤
 * @param table 表名称
 * @param field 表字段
 * @returns {boolean}
 */
const fieldFilter = function (table, field) {

    return true;
};

/**
 * 行级数据过滤
 * @param table  表名称
 * @param fields 表字段
 * @param values 表字段值
 * @param front 是否为前端导出
 * @returns {boolean}
 */
const rowFilter = function (table, fields, values, front) {

    return true;
};


let files = fs.readdirSync(dataDir);
for (let key in files) {
    let file = files[key];

    let searchIndex = file.lastIndexOf(".xls");
    if (searchIndex > 0 && file.length - 4 === searchIndex) {
        let fileName = file.substring(0, searchIndex);
        let serverOutputName = serverPublicDir + "/" + fileName + ".json";
        let inputName = dataDir + '/' + file;

        xls_json({
            input: inputName,
            sheet: fileName,
            dataName: fileName,
            output: null,//前端导出地址
            soutput: serverOutputName,//后端导出地址
            fieldFilter: fieldFilter,
            rowFilter: rowFilter
        }, function (err, result) {
            if (err) {
                console.error(err);
                num++;
            } else {
                console.log(result);
                num++;
            }
        });
    }
}

