import React, { useState } from 'react'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; 

import styles from './ReservationDatePicker.module.scss';

const ReservationDatePicker: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  return (
    <div className={styles.datePickerWrapper}>
      <div>
        <label>대여 시작</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          minDate={new Date()}
          dateFormat="yyyy.MM.dd (EEE) HH:mm"
          showTimeSelect
        />
      </div>
      <div>
        <label>반납</label>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate || new Date()}
          dateFormat="yyyy.MM.dd (EEE) HH:mm"
          showTimeSelect
        />
      </div>
    </div>
  );
};

export default ReservationDatePicker;
