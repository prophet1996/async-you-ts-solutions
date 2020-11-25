import {times, series} from 'async';
import {request} from 'http';


const hostname = process.argv[2];
const port = process.argv[3];
const makeHttpReq = (
    id: string,
    path: string,
    method: string,
    next: (arg0: Error, data: string | null) => void) => {
    let data = '';
    const req = request({
        hostname,
        port,
        path,
        method,
    }, (res) => {
            
            if (method === 'POST')
                return next(null, null);
            res.on('data', (chunk) => { 
                data += chunk.toString();
            });
            res.on('end', (): void => { 
                return next(null,data);   
            });
            res.on('error', (err) => {
                next(err, null)
            });
    });
    if(id)
    req.write(JSON.stringify({
        user_id:id
    }));
    req.end();
};

const n = 5;

series(
    {
        post: (callback) => {
            times(
                n,
                (id, next) => makeHttpReq(id+1, '/users/create', 'POST', next),
                (err: Error, results: string[]) => {
                    if (err) return callback(err);
                    callback(null,results)
                })
            },
        get: (callback) => makeHttpReq(null, '/users', 'GET', callback),
    },
    (err,result) => {
        console.log(result.get);
    }
);