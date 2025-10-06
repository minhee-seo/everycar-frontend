// 날짜 데이터 폼 한글형으로 변환
// 0월 0일 00:00

import React from 'react'

const FormatKoreanDate = (date: Date | null): string => {
    return new Intl.DateTimeFormat('ko-kr', {month: 'long', day: 'numeric'}).format(date);
}
export default FormatKoreanDate