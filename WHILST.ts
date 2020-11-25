import {whilst} from 'async';
import {get} from 'http';
import { callbackify } from 'util';


const url = process.argv[2];

const makeHttpReq = (next: (arg0: Error, test: boolean | null) => void) => {
    const req = get(url, (res) => {
        let data:string = '';
        res.on('data', (chunk) => { 
            data += chunk;
            });
           
        res.on('end', (err) => {
                next(null, data !== 'meerkat');

            });
    });
    req.end();
};

let count = 1;

whilst(
    (callback) => {
        makeHttpReq(callback);
    },
    (callback) => { 
        count++;
        callback(null)
    },
    (err, result) => {
        console.log(count);
    }
    
);