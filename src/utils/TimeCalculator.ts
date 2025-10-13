// 총 대여 시간 계산기
import { ReservationInfo } from "../types/reservation";

interface ReservationTime {

}
export const TimeCalculator = (combinedStart: Date | null, combinedEnd: Date | null) => {
    if(!combinedEnd || !combinedStart) return null;
    
    const diffMs = combinedEnd.getTime() - combinedStart.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);

    return diffHours < 0 ? diffHours + 24 : diffHours;
 };

