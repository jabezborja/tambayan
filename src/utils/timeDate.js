
const unixToDate = (unix) => {
    return new Date(unix * 1000);
}

const convertMilitaryToRegularTime = (hours, minutes) => {
    hours %= 12;
    hours = hours || 12;    
    minutes = minutes < 10 ? `0${minutes}` : minutes;

    return { hours, minutes }
}

const isYesterday = (date) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (yesterday.toDateString() === date.toDateString()) return true;

    return false;
}

const isFewDaysAgo = (date) => {
    const today = new Date();

    if (today.getDate() - 1 > date.getDate()) return true;

    return false;
}

const getTime = (date) => {
    const { hours, minutes } = convertMilitaryToRegularTime(date.getHours(), date.getMinutes());
    const ampm = date.getHours() >= 12 ? 'pm' : 'am';

    const time = `${hours}:${minutes} ${ampm}`;

    return time;
}

const getWeekday = (date) => {
    const day = date.getDay();
    var weekday;

    if (day === 0) weekday = "Sunday"
    else if (day === 1) weekday = "Monday"
    else if (day === 2) weekday = "Tuesday"
    else if (day === 3) weekday = "Wednesday"
    else if (day === 4) weekday = "Thursday"
    else if (day === 5) weekday = "Friday"
    else weekday = "Saturday"

    return weekday;
}

const completeDate = (unix) => {
    const date = unixToDate(unix);
    const weekday = getWeekday(date);
    const fullDate = date.toLocaleString('en-us', { month: 'long', day: '2-digit', year: 'numeric' });
    const time = getTime(date);

    return `${weekday}, ${fullDate} ${time}`
}

export default (unix) => {
    var completeTime;

    const date = unixToDate(unix);

    var year = date.getFullYear(),
        month = date.getMonth(),
        day = date.getDate();

    const time = getTime(date);

    if (!isFewDaysAgo(date)) {
        completeTime = `${isYesterday(date) ? 'Yesterday at ' : 'Today at '} ${time}`;
    } else {
        completeTime = `${month}/${day}/${year} at ${time}`
    }

    return completeTime;
};

export { completeDate }