import React, { useEffect, useMemo, useState } from 'react'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from './ReservationDatePicker.module.scss';

import { ko } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";

interface ReservationDatePickerProps {
  onClose: () => void; // 달력 닫기
  onDateSelect: (range: [Date | null, Date | null]) => void; // 선택 값 전달
}

const ReservationDatePicker: React.FC<ReservationDatePickerProps> = ({ onClose, onDateSelect }) => {
  const [localKeyword, setLocalKeyword] = useState('');
  const monthsShown = useMemo(() => 2, []);

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  return (
    <>
      <div className={styles.datepicker}>
        <DatePicker
          calendarClassName="customalendar"
          className={styles.inputCont}
          locale={ko} // 한글화
          inline // 인라인 창
          // 날짜 관련 속성
          selectsRange={true} //날짜 연속 선택
          startDate={startDate} //시작일
          endDate={endDate} //종료일
          onChange={(update: [Date | null, Date | null]) => {
            setDateRange(update);

            // endDate가 선택되면 닫고 값 전달
            if (update[0] && update[1]) {
              onDateSelect(update);
              onClose();
            }
          }}
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
        <div className={styles.rentTime}>
          <div>
            <label>대여 시각</label>
            <select >
              <option value="09:00">09:00</option>
              <option value="10:00">10:00</option>
              <option value="11:00">11:00</option>
              <option value="12:00">12:00</option>
            </select>
          </div>

          <div>
            <label>반납 시각</label>
            <select >
              <option value="09:00">09:00</option>
              <option value="10:00">10:00</option>
              <option value="11:00">11:00</option>
              <option value="12:00">12:00</option>
            </select>
          </div>
        </div>

        <div>
          <button>선택 완료</button>
        </div>
      </div>
    </>
  )
};

export default ReservationDatePicker;
