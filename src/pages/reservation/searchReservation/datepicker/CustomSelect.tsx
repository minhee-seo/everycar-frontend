import React, { useState, useRef, useEffect } from 'react';
import styles from './CustomSelect.module.scss';
import { ReservationInfo } from '../../../../types/reservation';


interface CustomSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;

  // ✅ 추가된 Props
  startDate: Date | null;
  endDate?: Date | null; // 반납 시각 옵션 생성 시 필요
  isEnd: boolean; // 이 셀렉트가 대여 시각(false)인지 반납 시각(true)인지 구분
}

// src/components/CustomSelect/CustomSelect.tsx (generateTimes 함수)

export const generateTimes = (
  startDate: Date | null,
  endDate: Date | null | undefined, // 추가
  isEnd: boolean // 추가
) => {
  const times: string[] = [];
  const now = new Date();

  // 시간 옵션의 최소 시작점 (hour: 0-23, minute: 0 or 30)
  let minHour = 0;
  let minMinute = 0;

  // 최대 종료점 (항상 23:30)
  const maxHour = 23;
  const maxMinute = 30;

  if (!startDate) {
    // startDate가 없으면 시간 옵션을 보여줄 수 없음
    return [];
  }

  // 1. 대여 시각 (isEnd=false) 로직
  if (!isEnd) {
    // 오늘이면 '현재 시간 + 4시간' 이후부터 시작
    if (now.toDateString() === startDate.toDateString()) {
      // 이전에 정의한 getRoundedDate (Date 객체 반환) 함수를 사용하면 더 정확
      // 여기서는 단순하게 현재 시간 + 4시간으로 계산
      const fourHoursLater = new Date(now.getTime() + 4 * 60 * 60 * 1000);
      minHour = fourHoursLater.getHours();
      minMinute = (fourHoursLater.getMinutes() > 30) ? 30 : 0; // 30분 단위 올림 단순화
    }
  }
  // 2. 반납 시각 (isEnd=true) 로직
  else if (isEnd && endDate) {
    // 반납일이 대여일과 같을 경우, 대여 시각 이후부터만 선택 가능
    if (startDate.toDateString() === endDate.toDateString()) {
      minHour = startDate.getHours();
      minMinute = startDate.getMinutes();
      // 대여 시간 직후부터 시작해야 하므로, minMinute을 30분 단위로 올림
      if (minMinute === 0) {
        minMinute = 30;
      } else if (minMinute > 30) {
        minHour += 1;
        minMinute = 0;
      } else {
        minMinute = 30;
      }
    }
    // (반납일이 대여일보다 늦으면, 00:00부터 시작 가능)
  }

  // 3. 시간 목록 생성
  for (let hour = minHour; hour <= maxHour; hour++) {
    for (let min of [0, 30]) {
      // 최소 분보다 작은 경우는 건너뜀 (첫 시간대 처리)
      if (hour === minHour && min < minMinute) {
        continue;
      }
      // 마지막 시간 처리 (23:30까지만)
      if (hour === maxHour && min > maxMinute) {
        continue;
      }

      const h = String(hour).padStart(2, '0');
      const m = String(min).padStart(2, '0');
      times.push(`${h}:${m}`);
    }
  }

  return times;
};


const CustomSelect: React.FC<CustomSelectProps> = ({ label, value, onChange, startDate, endDate, isEnd }) => {
  const [isOpen, setIsOpen] = useState(false);
  const options = generateTimes(startDate, endDate, isEnd);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.selectWrapper} ref={ref}>
      <label className={styles.label}>{label}</label>
      <div className={styles.selected} onClick={() => setIsOpen(!isOpen)}>
        {value}
        <span className={styles.arrow}>▼</span>
      </div>
      {isOpen && (
        <div className={styles.options}>
          {options.map((time) => (
            <div
              key={time}
              className={styles.option}
              onClick={() => {
                onChange(time);
                setIsOpen(false);
              }}
            >
              {time}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
