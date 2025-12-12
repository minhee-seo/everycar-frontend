// 날짜 데이터 폼 한글형으로 변환
// 0월 0일(요일)
// 시간은 포함시키지 않고 별도 변수를 사용험

import React from 'react'

const FormatKoreanDate = (dateObj: Date | null): string => {
  if (!(dateObj instanceof Date) || isNaN(dateObj.getTime())) {
    console.error("Invalid Date object provided to FormatKoreanDate.");
    return '';
  }

  // 1. 월, 일 추출
  // getMonth()는 0부터 시작하므로 1을 더해줍니다.
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();

  // 2. 요일 추출
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = weekDays[dateObj.getDay()];

  // 3. 시간 및 분 추출
  // getHours()는 0-23을 반환합니다.
  const hour = dateObj.getHours();
  const minute = dateObj.getMinutes();

  // 분을 두 자리로 패딩 (예: 5 -> 05)
  const formattedMinute = String(minute).padStart(2, '0');

  // 4. 결과 문자열 조합
  // * 시간은 두 자리 패딩을 하지 않고 (예: 8시) 출력하는 것이 일반적이므로 String(hour)만 사용합니다.
  const formattedString = `${month}월 ${day}일 (${dayOfWeek}) ${hour}:${formattedMinute}`;

  return formattedString;
}
export default FormatKoreanDate

// src/utils/FormatTime.ts
export const FormatTime = (date: Date | null): string => {
  if (!date) return '';
  const d = new Date(date);
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};
