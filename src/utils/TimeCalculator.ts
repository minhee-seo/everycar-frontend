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

//  일단 입략할때 리텀 타입을 수정해야함... 날짜 시간을 포함시키게 만들수있는지 안되면 시간 빼고 리턴하게
//  그담에 파라미터를 이렇게 넘기는게 맞는지좀 봐야겠음..
//  값을 정제된 형태로 만들기 전에 계산 가능한 형태에서 연산을 완료하고 출력 형태로 만들자
