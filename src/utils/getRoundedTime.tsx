// utils/time.js
// 30분 단위 반올림 로직
export function getRoundedDate(dateObj?: Date): Date {
    const now = dateObj || new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
    
    // 현재 시각을 기준으로 밀리초를 계산
    let timeInMs = now.getTime();
    
    // 30분 단위 반올림/올림 로직
    if (minute < 15) {
        // 00분으로 조정
        const minutesToSubtract = minute;
        timeInMs -= minutesToSubtract * 60 * 1000;
    } else if (minute < 45) {
        // 30분으로 조정
        const minutesToAdjust = 30 - minute;
        timeInMs += minutesToAdjust * 60 * 1000;
    } else {
        // 다음 시간 00분으로 조정 (Hour + 1)
        const minutesToNextHour = 60 - minute;
        timeInMs += minutesToNextHour * 60 * 1000;
    }

    return new Date(timeInMs);
}