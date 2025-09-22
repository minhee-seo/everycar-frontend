import React, { useEffect, useMemo, useState } from 'react'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from './ReservationDatePicker.module.scss';

import { ko } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";

const ReservationDatePicker: React.FC = () => {
  const [localKeyword, setLocalKeyword] = useState('');
  const monthsShown = useMemo(() => 2, []);

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  return (
      <DatePicker
        className={styles.inputCont}
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        locale={ko} // 한글화
        onChange={(update) => {
          setDateRange(update);
        }}
        withPortal
        renderCustomHeader={({
          monthDate,
          customHeaderCount,
          decreaseMonth,
          increaseMonth,
        }) => (
          <div>
            <button
              aria-label="Previous Month"
              className={
                "react-datepicker__navigation react-datepicker__navigation--previous"
              }
              onClick={decreaseMonth}
              style={{
                visibility: customHeaderCount === 0 ? "visible" : "hidden",
              }}
            >
              <span
                className={
                  "react-datepicker__navigation-icon react-datepicker__navigation-icon--previous"
                }
              >
                {"<"}
              </span>
            </button>
            <span className="react-datepicker__current-month">
              {monthDate.toLocaleString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </span>
            <button
              aria-label="Next Month"
              className={
                "react-datepicker__navigation react-datepicker__navigation--next"
              }
              onClick={increaseMonth}
              style={{
                visibility:
                  customHeaderCount === monthsShown - 1 ? "visible" : "hidden",
              }}
            >
              <span
                className={
                  "react-datepicker__navigation-icon react-datepicker__navigation-icon--next"
                }
              >
                {">"}
              </span>
            </button>
          </div>
        )}
        selected={startDate}
        monthsShown={monthsShown}
      />
  )
};

export default ReservationDatePicker;
