import {reduce} from 'async';
import {request} from 'http';


const url = process.argv[2];

const makeHttpReq = (item:string,memo:string,next: (arg0: Error, data: string | null) => void) => {
    
    const req = request(url,{path:`/?number=${item}`}, (res) => {
            res.on('data', (chunk) => { 
                memo += Number(chunk);
            });
            res.on('end', (): void => { 
                return next(null,memo);   
            });
            res.on('error', (err) => {
                next(err, null)
            });
    });
    req.end();
};

const n = 5;

reduce(['one', 'two', 'three'], 0,
    (memo, item, callback) => { 
return makeHttpReq(item,memo,callback)
    },
    (err, result) => {
        console.log(result);
    }
    
);