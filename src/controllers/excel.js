import readXlsxFile, { readSheetNames } from 'read-excel-file/node/index.commonjs.js'
import fs from 'fs';
import { promisify } from 'util';
const unlinkAsync = promisify(fs.unlink)

const updateActivityLogs = (logObj) => {
    let filePath = "./resources/static/assets/logs/activityLogs.json"
    const activityLogs = [];
    activityLogs.push(logObj);
    try {
        fs.readFile(filePath,function(err,content){
            if(err) throw err;
            let parseJson = [];
            if(content) {
                parseJson = JSON.parse(content || '[]');
            }
            parseJson.unshift(logObj);
            fs.writeFile(filePath,JSON.stringify(parseJson.slice(0,10), null, 4),function(err){
                if(err) throw err;
            })
          })
    } catch(e) {
        console.warn('error::', e)
    }
    
}

export const upload = async (req, res) => {
    try {
        const activityLog = {
            ...req.file,
            createdTime: new Date()
        }
        if (req.file == undefined) {
            return res.status(400).send("Please upload an excel file!");
        }
        let path =
            "./resources/static/assets/uploads/" + req.file.filename;
        await readSheetNames(path).then((sheetNames) => {
            let totalExcelData = {};
            sheetNames.forEach((sheetName, index) => {
                readXlsxFile(path, { sheet: sheetName }).then(async (rows) => {
                    let keys = [];
                    if (rows && rows.length) {
                        // keys = Object.values(rows[0]).map(key => key.replace(/ /g,''))
                        keys = Object.values(rows[0])
                    }
                    rows.shift();
                    let records = [];
                    rows.forEach((row) => {
                        const record = {};
                        keys.forEach((key, index) => {
                            record[key] = row[index]
                        })
                        records.push(record);
                    });
                    totalExcelData[sheetName] = records;
                    if(index === sheetNames.length-1) {
                        await unlinkAsync(path);
                        res.status(200).send({
                            message: "Uploaded the file successfully: " + req.file.originalname,
                            data: totalExcelData
                        });
                    }
                });
            });
            updateActivityLogs(activityLog);
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Could not upload the file: " + req.file.originalname,
        });
    }
};

// Function to return activity logs which are saved in the activityLogs.json file 
export const getLogs = async(req, res) => {
    try {
        let filePath = "./resources/static/assets/logs/activityLogs.json"
        fs.readFile(filePath,function(err,content){
            if(err) throw err;
            let parseJson = [];
            if(content) {
                parseJson = JSON.parse(content || '[]');
            }
            res.status(200).send({
                message: "Successfully fetched the logs",
                data: parseJson
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Something went wrong!",
        });
    }
}

