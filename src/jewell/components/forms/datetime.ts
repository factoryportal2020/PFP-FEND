
const addDays = (days: any) => {
    var result = new Date();
    result.setDate(result.getDate() + days);
    return result;
};

const showDateTime = (obj: any) => {
    if (obj == null || !obj) {
        return '-';
    }
    var date = obj.split(" ")[0];
    var time = obj.split(" ")[1];
    var dateSplit = date.split("-");
    var timeSplit = time.split(":");
    var Y = dateSplit[0];
    var m = dateSplit[1];
    var d = dateSplit[2];
    var H = timeSplit[0];
    var i = timeSplit[1];
    return d + '-' + m + '-' + Y + ' ' + H + ':' + i;
};

const getDateTimeFromObject = (obj: any) => {
    console.log(obj);
    let d = ('0' + obj.getDate()).slice(-2);
    let m = ('0' + (obj.getMonth() + 1)).slice(-2);
    let Y = obj.getFullYear();
    let H = ('0' + obj.getHours()).slice(-2);
    let i = ('0' + obj.getMinutes()).slice(-2);
    let s = obj.getSeconds();
    return d + '-' + m + '-' + Y + ' ' + H + ':' + i;
}


interface Datetime {
    [key: string]: Function;
}

const datetime: Datetime = {
    addDays,
    showDateTime,
    getDateTimeFromObject
};
export default datetime;