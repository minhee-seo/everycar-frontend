// 날짜 데이터 폼 한글형으로 변환
// 0월 0일(요일)
// 시간은 포함시키지 않고 별도 변수를 사용험

import React from 'react'

const FormatKoreanDate = (date: Date | null): string => {
  if (!date) return '';

  const d = new Date(date);
  return d.toLocaleString('ko-KR', {
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  });
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
