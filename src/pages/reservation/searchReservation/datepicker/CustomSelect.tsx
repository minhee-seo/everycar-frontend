import React, { useState, useRef, useEffect } from 'react';
import styles from './CustomSelect.module.scss';
import { ReservationInfo } from '../../../../types/reservation';
import { getFourHoursLaterRounded } from '../../../../utils/CurrentTime.ts';

interface CustomSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  startDate: Date | null;
  endDate?: Date | null;
  isEnd: boolean;
}

export const generateTimes = (startDate: Date | null, endDate: Date | null | undefined, isEnd: boolean) => {
  const times: string[] = [];
  const now = new Date();
  // 기준 시각 설정 (기본은 00:00)
  let limitHour = 0;
  let limitMin = 0;

  // 선택한 날짜가 '오늘'인 경우에만 4시간 후 제한 적용
  if (startDate && startDate.toDateString() === now.toDateString()) {
    const fourHoursLater = getFourHoursLaterRounded();
    limitHour = fourHoursLater.getHours();
    limitMin = fourHoursLater.getMinutes();
  }

  for (let hour = 0; hour < 24; hour++) {
    for (let min of [0, 30]) {
      // 제한 시간보다 이전 시간은 제외 (오늘인 경우)
      if (hour < limitHour) continue;
      if (hour === limitHour && min < limitMin) continue;

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