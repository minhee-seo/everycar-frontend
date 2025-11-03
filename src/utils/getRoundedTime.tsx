// utils/time.js
// 30분 단위 반올림 로직
export function getRoundedTime(timeStr?: string | null) {
    let hour = 0;
    let minute = 0;

    if (timeStr) {
        const [h, m] = timeStr.split(':').map(Number);
        hour = h;
        minute = m;
    } else {
        const now = new Date();
        hour = now.getHours();
        minute = now.getMinutes();
    }

    let roundedMinute = 0;
    if (minute < 15) {
        roundedMinute = 0;
    } else if (minute < 45) {
        roundedMinute = 30;
    } else {
        roundedMinute = 0;
        hour = (hour + 1) % 24;
    }

    const pad = (num: number) => String(num).padStart(2, '0');

    const rentHour = hour;
    const rentMinute = roundedMinute;
    const returnHour = (rentHour + 6) % 24;
    const returnMinute = rentMinute;

    return {
        rentTime: `${pad(rentHour)}:${pad(rentMinute)}`,
        returnTime: `${pad(returnHour)}:${pad(returnMinute)}`,
    };
}
