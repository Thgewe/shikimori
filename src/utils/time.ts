
/* Gets the elapsed time from the date and selects the appropriate text based on it */

interface ITime {
    years: number,
    months: number,
    days: number,
    hours: number,
    minutes: number,
    seconds: number,
}

export const getTimeSpan = (date: string | undefined) => {

    const timeSpan: ITime = {
        years: 0,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    }

    if (!date) return timeSpan

    const time = new Date(date)
    const second = time.getSeconds()
    const minute = time.getMinutes()
    const hour = time.getHours()
    const day = time.getDate()
    const month = time.getMonth()
    const year = time.getFullYear()

    const currentTime = new Date()

    if (year !== currentTime.getFullYear()) {
        timeSpan.years = Math.abs(currentTime.getFullYear() - year);
    }
    if (month !== currentTime.getMonth()) {
        timeSpan.months = Math.abs(currentTime.getMonth() - month);
    }
    if (day !== currentTime.getDate()) {
        if (Math.abs(currentTime.getDate() - day) * 24 - hour < 24) {

        } else {
            timeSpan.days = Math.abs(currentTime.getDate() - day);
        }
    }
    if (hour !== currentTime.getHours()) {
        if (currentTime.getHours() < hour) {
            timeSpan.hours = Math.abs(Math.abs(currentTime.getHours() - hour) - 24);
        } else {
            timeSpan.hours = Math.abs(currentTime.getHours() - hour);
        }
    }
    if (minute !== currentTime.getMinutes()) {
        timeSpan.minutes = Math.abs(currentTime.getMinutes() - minute);
    }
    if (second !== currentTime.getSeconds()) {
        timeSpan.seconds = Math.abs(currentTime.getSeconds() - second);
    }
    return timeSpan
}
export const timePassed = (time: ITime): string => {
    let str: string;

    switch (true) {
        case (time.years === 0):
            break;
        case (time.years === 1):
            str = 'год назад'
            return str;
        case (time.years >= 2 && time.years <=4 ):
            str = time.years + ' года назад'
            return str;
        case (time.years > 4):
            str = time.years + ' лет назад'
            return str;
        default:
            str = time.years + ' лет назад'
            return str;
    }
    switch (true) {
        case (time.months === 0):
            break;
        case (time.months === 1):
            str = 'месяц назад'
            return str;
        case (time.months >= 2 && time.months <= 4):
            str = time.months + ' месяца назад'
            return str;
        case (time.months > 4):
            str = time.months + ' месяцев назад'
            return str;
        default:
            str = time.months + ' месяцев назад'
            return str;
    }
    switch (true) {
        case (time.days === 0):
            break;
        case (time.days === 1):
            str = 'день назад'
            return str;
        case (time.days >= 2 && time.days <= 4):
            str = time.days + ' дня назад'
            return str;
        case (time.days > 4 && time.days <= 20):
            str = time.days + ' дней назад'
            return str;
        case (time.days === 21):
            str = time.days + ' день назад'
            return str;
        case (time.days > 21 && time.days <= 24):
            str = time.days + ' дня назад'
            return str;
        case (time.days > 24 && time.days <= 30):
            str = time.days + ' дней назад'
            return str;
        default:
            str = time.days + ' дней назад'
            return str;
    }
    switch (true) {
        case (time.hours === 0):
            break;
        case (time.hours === 1):
            str = 'час назад'
            return str;
        case (time.hours >= 2 && time.hours <= 4):
            str = time.hours + ' часа назад'
            return str;
        case (time.hours > 4 && time.hours <= 20):
            str = time.hours + ' часов назад'
            return str;
        case (time.hours === 21):
            str = time.hours + ' час назад'
            return str;
        case (time.hours > 21 && time.hours <= 24):
            str = time.hours + ' часа назад'
            return str;
        default:
            str = time.hours + ' часов назад'
            return str;
    }
    switch (true) {
        case (time.minutes === 0):
            str = 'меньше минуты назад'
            break;
        case (time.minutes === 1):
            str = 'минуту назад'
            return str;
        case (time.minutes >= 2 && time.minutes <= 4):
            str = time.minutes + ' минуты назад'
            return str;
        case (time.minutes > 4 && time.minutes <= 20):
            str = time.minutes + ' минут назад'
            return str;
        case (time.minutes === 21):
            str = time.minutes + ' минуту назад'
            return str;
        case (time.minutes > 21 && time.minutes <= 24):
            str = time.minutes + ' минуты назад'
            return str;
        case (time.minutes > 24 && time.minutes <= 30):
            str = time.minutes + ' минут назад'
            return str;
        case (time.minutes === 31):
            str = time.minutes + ' минуту назад'
            return str;
        case (time.minutes > 31 && time.minutes <= 34):
            str = time.minutes + ' минуты назад'
            return str;
        case (time.minutes > 34 && time.minutes <= 40):
            str = time.minutes + ' минут назад'
            return str;
        case (time.minutes === 41):
            str = time.minutes + ' минуту назад'
            return str;
        case (time.minutes > 41 && time.minutes <= 44):
            str = time.minutes + ' минуты назад'
            return str;
        case (time.minutes > 44 && time.minutes <= 50):
            str = time.minutes + ' минут назад'
            return str;
        case (time.minutes === 51):
            str = time.minutes + ' минуту назад'
            return str;
        case (time.minutes > 51 && time.minutes <= 54):
            str = time.minutes + ' минуты назад'
            return str;
        case (time.minutes > 54 && time.minutes <= 60):
            str = time.minutes + ' минут назад'
            return str;
        default:
            str = time.minutes + ' минут назад'
            return str;
    }
    return ''
}