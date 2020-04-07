"use strict";

export function Event(){
    "use strict";
    var events = {};
    this.on = function(eventName,cb){
        events[eventName] = events[eventName] || [];
        events[eventName].push(cb);
    }

    this.call = function(eventName,args){
        args = args || [];
        if(events[eventName])
            events[eventName].forEach(cb=>{
                cb(...args);
            });
    }

    this.clear = function(eventName){
        events[eventName] = [];
    }
}
