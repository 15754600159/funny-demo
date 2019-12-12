/**
 * @desc 拼接src文件夹下的js文件
 * 优化方向：1.流 2.异步？
 */
const fs = require('fs'),
    path = require('path');

function fileDisplay(filePath) {
    const files = fs.readdirSync(filePath);
    for (let elem of files) {
        const filedir = path.join(filePath, elem),
            stats = fs.statSync(filedir),
            isFile = stats.isFile(),
            isDir = stats.isDirectory();
        if (isFile) {
            fileNameList.push(filedir);
        } else if (isDir) {
            fileDisplay(filedir);
        } else {
            console.warn('既不是文件，也不是文件夹');
        }
    }
}

const fileNameList = [];

// 获取目录下所有文件目录
fileDisplay('./src');

// 对目录进行排序
fileNameList.sort((elemA, elemB) => {
    const fileNameA = elemA.split('\\').pop(),
    fileNameB = elemB.split('\\').pop();
    return fileNameA.split('.').length - fileNameB.split('.').length;
});

// 根据排序后的目录拼接文件
for (let elem of fileNameList) {
    const data = fs.readFileSync(elem);
    fs.appendFileSync('./dist/app.js', data);
}




// fs.readFile('./src/file.txt', function(err, data) {
//     if (err) return console.error(err);
//     fs.writeFile('./dist/file.txt', data, function(err) {
//         if (err) return console.error(err);
//         console.log('write success');
//     })
// });

// 异步
// fs.readdir(filePath, (err, files) => {
//     if (err) return console.error(err);
//     console.log(files);
//     for (let elem of files) {
//         const filedir = path.join(filePath, elem);
//         fs.stat(filedir, (err, stats) => {
//             if (err) return console.error(err);
//             const isFile = stats.isFile(),
//                 isDir = stats.isDirectory();
//             if (isFile) {
//                 fileNameList.push(filedir);
//             } else if (isDir) {
//                 return fileDisplay(filedir);
//             } else {
//                 console.warn('既不是文件，也不是文件夹');
//             }
//         })
//     }
// })