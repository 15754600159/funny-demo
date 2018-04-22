/**
 * @desc 检测代码中是否还有未处理代码
 * @author guoshi o
 * @param {*} source 原代码
 */
const loaderUtils = require('loader-utils');

module.exports = function (source) {
    const options = loaderUtils.getOptions(this), // 获取到用户给当前 Loader 传入的 options
        strArray = source.split('\n'),
        label = options.label || 'test', // 要检测的代码标记(字符串)
        testRegExp = new RegExp(`^\\s*\/\/ ${label}\\s*`); // 要检测的代码标记(正则)
    let hasTestCode = false, // 是否检测到代码标记
        testLineCounter = 0, // 统计已记录了几行代码
        recordLineSum = options.line || 5, // 打印代码行数
        testCodeArray = []; // 代码记录数组

    strArray.map((line, index) => {
        if (testRegExp.test(line)) {
            hasTestCode = true;
            testCodeArray.push({
                line,
                index
            });
            return;
        };
        if (hasTestCode) {
            testLineCounter++;
            if (testLineCounter === recordLineSum + 1) {
                let warning = `\n\n ${this.resourcePath}文件有未处理代码\n`;
                warning += testCodeArray.map((line, index) => {
                    return `line ${line.index}: \t ${line.line}`;
                }).join('\n');
                warning += '\n\n'
                console.warn(warning);

                hasTestCode = false;
                testLineCounter = 0;
                testCodeArray.splice(0, testCodeArray.length);
                return;
            }
            testCodeArray.push({
                line,
                index
            });
        };
    });

    return source;
}