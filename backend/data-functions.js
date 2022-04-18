const fs = require("fs");


function readData(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf-8', (err, data) => {
            if (err) {
                console.log(err);
                reject(err)
            }
            else {
                const result = JSON.parse(data);
                resolve(result);
            }
        })
    })
}

function writeData(data, path) {
    return new Promise((resolve, reject) => {
        fs.writeFile(path, JSON.stringify(data, null, 2), (err) => {
            if (err) reject(err)
            else {
                console.log("Daten wurden geschrieben");
                resolve(data)
            }
        })
    })
}

module.exports = { readData, writeData }