import {map} from 'async';
import {get, RequestOptions} from 'http';
import { URL } from 'url';


const makeHttpReq = (url: string | RequestOptions | URL,done: (err:Error,result:string|null) => void) => {
    let data = '';
    get(url, (res): void => {
        res.on('data', (chunk) => { 
            data += chunk.toString();
        });
        res.on('end', (): void => { 
            return done(null,data);   
        });
        res.on('error', (err) => done(err,null));
    });
}
map(
    [
        process.argv[2],
        process.argv[3],
     ] ,
    (url,done)=>makeHttpReq(url, done)
    , (err: Error, results: string[]) => {
    if (err) return console.error(err);
    console.log(results);
});