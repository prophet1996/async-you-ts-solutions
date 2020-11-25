import {series} from 'async';
import {get, RequestOptions} from 'http';
import { URL } from 'url';


const makeHttpReq = (url: string | RequestOptions | URL,done: (arg0: Error, arg1: string) => void) => {
    let data = '';
    get(url, (res) => {
        res.on('data', (chunk) => { 
            data += chunk.toString();
            
        });
        res.on('end', () => { 
            done(null, data);   
        });
        res.on('error', (err) => done(err,''));
    });
}
series(
    {
        requestOne: (done: any) => makeHttpReq(process.argv[2], done),
        requestTwo: (done: any) => makeHttpReq(process.argv[3], done),
    } 
    , (err: Error, results: string[]) => {
    if (err) return console.error(err);
    console.log(results);
});