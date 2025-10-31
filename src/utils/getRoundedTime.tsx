// utils/time.js
// 30분 단위 반올림 로직
export function getRoundedTime() {
    const now = new Date();
    let hour = now.getHours();
    const minute = now.getMinutes();
    let roundedMinute = 0; // 30분 단위 반올림

    if (minute < 15) {
        roundedMinute = 0;
    } else if (minute < 45) {
        roundedMinute = 30;
    } else {
        roundedMinute = 0;
        hour = (hour + 1) % 24;
    }

    const pad = (num) => String(num).padStart(2, '0');

    const rentHour = hour;
    const rentMinute = roundedMinute;
    const returnHour = (rentHour + 6) % 24;
    const returnMinute = rentMinute;

    return {
        rentTime: `${pad(rentHour)}:${pad(rentMinute)}`,
        returnTime: `${pad(returnHour)}:${pad(returnMinute)}`,
    };
}
