import { resolve } from "path";

// wait for given time
// by default, will wait for 1 second 
export function delay(duration:number=1000){

    return new Promise<void>((resolve)=>{
            setTimeout(()=>resolve(),duration);
    })

}