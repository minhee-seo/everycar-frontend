// utils/time.js
// 30분 단위 반올림 로직
// utils/time.js
export function getRoundedDate(dateObj?: Date): Date {
    const now = dateObj || new Date();
    
    // 1. 새로운 Date 객체를 생성하고 초와 밀리초를 0으로 초기화합니다.
    const baseDate = new Date(now);
    baseDate.setSeconds(0);
    baseDate.setMilliseconds(0);
    
    let minute = baseDate.getMinutes();
    let timeInMs = baseDate.getTime();
    
    // 2. 30분 단위 반올림/올림 로직
    if (minute < 15) {
        // 00분으로 조정
        timeInMs -= minute * 60 * 1000;
    } else if (minute < 45) {
        // 30분으로 조정
        const minutesToAdjust = 30 - minute;
        timeInMs += minutesToAdjust * 60 * 1000;
    } else {
        // 다음 시간 00분으로 조정
        const minutesToNextHour = 60 - minute;
        timeInMs += minutesToNextHour * 60 * 1000;
    }

    return new Date(timeInMs);
}