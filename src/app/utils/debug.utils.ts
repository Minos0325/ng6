import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';


// declare module 'rxjs' {
//     interface Observable<T> {
//         debug: (...any)=> Observable<T>;
//     }
// }
// Observable.prototype.debug = function(message: string) {
//     return this.do(
//         (next)=>{ 
//             if(!environment.production) {
//                 console.log(message, next);
//             }
//         },
//         (err)=>{
//             if(!environment.production) {
//                 console.error('error>>', message, err);
//             }
//         },
//         ()=>{
//             if(!environment.production) {
//                 console.log('Completed');
//             }
//         },
//     )
// }
export const debug = 
    <T>(message: string) => 
        (source: Observable<T>) => new Observable<T>(
            (subscriber) => {
                source.subscribe({
                    next(value) { 
                        if(!environment.production) {
                            console.log(message, value);
                        }
                        subscriber.next(value); 
                    },
                    error(err) { 
                        if(!environment.production) {
                            console.error('error>>', message, err);
                        }
                        subscriber.error(err); 
                    },
                    complete() { 
                        if(!environment.production) {
                            console.log('Completed---', message);
                        }
                        subscriber.complete(); 
                    },
                })
            }
        );



// return new Observable((subscriber) => {
//     this.subscribe(
        // (next)=>{ 
        //     if(!environment.production) {
        //         console.log(message, next);
        //     }
        // },
        // (err)=>{
            // if(!environment.production) {
            //     console.error('error>>', message, err);
            // }
        // },
        // ()=>{
            // if(!environment.production) {
            //     console.log('Completed');
            // }
        // }
//    );
// })