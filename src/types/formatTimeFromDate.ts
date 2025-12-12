// src/utils/TimeFormat.ts (예시)

export function formatTimeFromDate(dateObj: Date): string {
    if (!(dateObj instanceof Date) || isNaN(dateObj.getTime())) {
        return '';
    }
    
    // 시간과 분을 두 자리로 패딩
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    
    return `${hours}:${minutes}`;
}