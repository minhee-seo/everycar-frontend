// 총 대여 시간 계산기
import { ReservationInfo } from "../types/reservation";

interface ReservationTime {

}
export const TimeCalculator = (combinedStart: Date | null, combinedEnd: Date | null) => {
  if (!combinedStart || !combinedEnd) return null;

  const diffMs = combinedEnd.getTime() - combinedStart.getTime();

  // 음수면 하루(24시간) 더해줌 (자정 넘기는 경우)
  const adjustedDiffMs = diffMs < 0 ? diffMs + 24 * 60 * 60 * 1000 : diffMs;

  // 전체 시간 계산
  const totalHours = adjustedDiffMs / (1000 * 60 * 60);

  // 일/시간 분리
  const days = Math.floor(totalHours / 24);
  const hours = Math.floor(totalHours % 24);

  // 💬 문자열 형식으로 반환
  if (days > 0) {
    return `${days}일 ${hours}시간`;
  } else {
    return `${hours}시간`;
  }
};
