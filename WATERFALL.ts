import {waterfall} from 'async';
import {get} from 'http';
import  {  readFile } from 'fs';
import {join} from "path";

const readFromFile = (callback) => {
    readFile(process.argv[2], (err, data) => {
        if (err)
            console.log(err);
        callback(null, data.toString());
    });
};

const makeHttpReq = (url,callback) => {
    let data = '';
    get(url, (res) => {
        res.on('data', (chunk) => { 
            data += chunk.toString();
            
        });
        res.on('end', () => { 
            callback(null, data);
        });
        res.on('error', (err) => callback(err));
    });
}
waterfall([readFromFile,makeHttpReq ] ,(err:Error, result:string)=> {
    if (err) return console.error(result);
    console.log(result);
});