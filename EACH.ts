import {each} from 'async';
import {get, RequestOptions} from 'http';
import { URL } from 'url';


const makeHttpReq = (url: string | RequestOptions | URL,done: (arg0: Error) => void) => {
    let data = '';
    get(url, (res) => {
        res.on('data', (chunk) => { 
            data += chunk.toString();
            
        });
        res.on('end', () => { 
            done(null);   
        });
        res.on('error', (err) => done(err));
    });
}
each(
    [
        process.argv[2],
        process.argv[3],
     ] ,
    (url,done)=>makeHttpReq(url, done)
    , (err: Error, results: string[]) => {
    if (err) return console.error(err);
    console.log(results);
});