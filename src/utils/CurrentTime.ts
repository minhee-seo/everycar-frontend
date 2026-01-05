// src\utils\CurrentTime.ts

import { getRoundedDate } from "./getRoundedTime.tsx";

// 현재 시간으로부터 4시간 이후 계산
export function getFourHoursLaterRounded(): Date {
    // 현재 시각을 기준으로 30분 단위로 올림된 시각
    const roundedDate = getRoundedDate(new Date());
    // 반올림된 시각 + 4시간
    return new Date(roundedDate.getTime() + 4 * 60 * 60 * 1000);
}

// 현재 시간으로부터 4시간 후 시점의 6시간 이후 계산
export function getSixHoursAfterFourHoursLater(): Date {
    const fourHoursLater = getFourHoursLaterRounded();
    return new Date(fourHoursLater.getTime() + 6 * 60 * 60 * 1000);
}