function isNumber(a){
    return typeof a == "number" || (typeof a == "string" && a.length > 0 && !isNaN(Number(a)));
}

export const VEHICLE_PARAMETERS = [
    {key:"capacity", title:"Depo Kapasitesi", validation:(val)=>isNumber(val), errorMessage:"", unit:"Lt"},
    {key:"refdrilltime", title:"Referans Delme Süresi", validation:(val)=>isNumber(val), errorMessage:"", unit:""},
    {key:"maxRPM", title:"Max Rpm", validation:(val)=>isNumber(val), errorMessage:"", unit:""},
    {key:"maxRPMtimelimit", title:"Max Rpm Süre Kısıtı", validation:(val)=>isNumber(val), errorMessage:"", unit:""},
    {key:"reffuel", title:"Referans Yakıt Verimi", validation:(val)=>isNumber(val), errorMessage:"", unit:"X Lt/Km"},
    {key:"refcarryloadspeed", title:"Referans Ortalama Hız", validation:(val)=>isNumber(val), errorMessage:"", unit:"Km/h"},
    {key:"refloadspeed", title:"Referans Yükleme Hızı", validation:(val)=>isNumber(val), errorMessage:"", unit:"Km/h"},
].reduce((prev,cur)=>{
    prev[cur.key] = cur;
    return prev;
},{});

export const validateType = (type,parent) => {
    return type.name != '' && !isNaN(type.parent) && type.parent &&
        Object.keys(parent.properties.rules)
        .reduce((prev,cur)=>prev && VEHICLE_PARAMETERS[cur].validation(type.properties.rules[cur]),true);
}