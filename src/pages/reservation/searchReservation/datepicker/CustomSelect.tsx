import React, { useState, useRef, useEffect } from 'react';
import styles from './CustomSelect.module.scss';

const generateTimes = (startDate: Date | null) => {
  const times: string[] = [];
  let startTime = 0;
  // 현재시간 이전 선택 불가능
  const now = new Date();
  if (now.getDate() == startDate?.getDate()) {
    startTime = now.getDate();
  }

  for (let hour = startTime; hour <= 24; hour++) {
    for (let min of [0, 30]) {
      if (hour === 24 && min > 0) continue;
      const h = String(hour).padStart(2, '0');
      const m = String(min).padStart(2, '0');
      times.push(`${h}:${m}`);
    }
  }

  return times;
};

interface CustomSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  startDate: Date | null;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ label, value, onChange, startDate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const options = generateTimes(startDate);
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

  // useEffect(() => {
  //   onChange("");
  // }, [startDate])

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
