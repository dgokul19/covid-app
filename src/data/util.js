import {data as stateList} from './files.json';
import _ from 'underscore';

export const keyPairToObject = (params, type) => {
    let districts = [];
    let main = {};
    if (type === 'state') {
        let key = Object.keys(params)[0];
        let values = Object.values(params)[0];
        main.code = key;
        main.name = stateList.find(list => list.key === key).value;
        for (let i in values) {
            main[i] =values[i]
        }
    } else {
        for (let i in params) {
            let key = Object.keys(params[i]);
            let values = Object.values(params[i]);
            let ext = _.object(key, values);
            districts.push({
                name : i,
                ...ext
            })
        }
    }
    return type === 'state' ? main : districts;
}

export const formatTime = (date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm.toUpperCase();
    return strTime;
}

export const getCurrentTime = () => {
    let date = new Date();
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let currentDate = ((date.getDate() + 1).toString().length == 1) ? `0${date.getDate()}` : date.getDate();
    let currentMonth = months[date.getMonth() - 1];
    
    let currentTime = formatTime (date);
    
    let digitMonth = ((date.getMonth() + 1).toString().length == 1) ? `0${date.getMonth() + 1}` : date.getMonth();
    return {
        date : currentDate,
        month : currentMonth,
        time :    currentTime,
        year : date.getFullYear(),
        us_format : `${date.getFullYear()}-${digitMonth}-${currentDate}`
    } ;
};