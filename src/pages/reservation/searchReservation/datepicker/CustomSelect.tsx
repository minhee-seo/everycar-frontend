import React, { useState, useRef, useEffect } from 'react';
import styles from './CustomSelect.module.scss';
import { ReservationInfo } from '../../../../types/reservation';

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
  let startTime = 0;

  // 오늘이면 현재시간 + 4시간 이후부터 가능
  if (startDate && now.toDateString() === startDate.toDateString()) {
    startTime = now.getHours() + 4;
  }

  for (let hour = startTime; hour < 24; hour++) {
    for (let min of [0, 30]) {
      if (hour === 24 && min > 0) continue;
      const h = String(hour % 24).padStart(2, '0');
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
