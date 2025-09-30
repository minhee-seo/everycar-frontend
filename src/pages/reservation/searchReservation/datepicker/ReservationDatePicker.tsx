import React, { useEffect, useMemo, useState } from 'react'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from './ReservationDatePicker.module.scss';

import { ko } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import CustomSelect from './CustomSelect.tsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCarSide } from '@fortawesome/free-solid-svg-icons';

interface ReservationDatePickerProps {
  onClose: () => void; // 달력 닫기
  onDateSelect: (range: [Date | null, Date | null]) => void; // 선택 값 전달
}

const generateTimes = () => {
  const times: string[] = [];
  for (let hour = 0; hour <= 24; hour++) {
    for (let min of [0, 30]) {
      if (hour === 24 && min > 0) continue;
      const h = String(hour).padStart(2, '0');
      const m = String(min).padStart(2, '0');
      times.push(`${h}:${m}`);
    }
  }
  return times;
};

const ReservationDatePicker: React.FC<ReservationDatePickerProps> = ({ onClose, onDateSelect }) => {
  const monthsShown = useMemo(() => 2, []);

  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;

  // 현재 시각을 구하고 30분 단위로 끊는 함수
  const now = new Date();
  let hour = now.getHours();
  const minute = now.getMinutes();
  let roundedMinute = 0; // 30분 단위 반올림

  if (minute < 15) {
    roundedMinute = 0;
  } else if (minute < 45) {
    roundedMinute = 30;
  } else {
    roundedMinute = 0;
    hour = (hour + 1) % 24;
  }

  const pad = (num) => String(num).padStart(2, '0');

  const rentHour = hour;
  const rentMinute = roundedMinute;
  const returnHour = (rentHour + 6) % 24;
  const returnMinute = rentMinute;

  const [rentTime, setRentTime] = useState(`${pad(rentHour)}:${pad(rentMinute)}`);
  const [returnTime, setReturnTime] = useState(`${pad(returnHour)}:${pad(returnMinute)}`);
  
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
              // onClose();
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
                {monthDate.toLocaleString("KO-US", {
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
          <div className={styles.selectTime}>
            <CustomSelect label="대여 시각" value={rentTime} onChange={setRentTime} />
          </div>
          <div className={styles.selectTime}>
            <CustomSelect label="반납 시각" value={returnTime} onChange={setReturnTime} />
          </div>
        </div>

        <div className={styles.result}>
          <div className={styles.resultCont}>
            <span>시작일</span>
            <span> 10 : 00</span>
          </div>
          <FontAwesomeIcon icon={faCarSide} />
          <div className={styles.resultCont}>
            <span>반납일</span>
            <span> 01월 02일 10 : 00</span>
          </div>
        </div>

        <div className={styles.button}>
          <button
            className={styles.reset}
            onClick={() => {
              onClose();
            }}
          >b
            취소
          </button>
          <button
            className={styles.submit}
            onClick={() => {
              if (startDate && endDate && rentTime && returnTime) {
                console.log('예약 정보:', {
                  날짜: [startDate, endDate],
                  대여시각: rentTime,
                  반납시각: returnTime,
                });
                onDateSelect([startDate, endDate]); // 필요 시 시간도 전달
                onClose();
              } else {
                alert('날짜와 시간을 모두 선택해주세요.');
              }
            }}>
            선택 완료
          </button>
        </div>
      </div>
    </>
  )
};

export default ReservationDatePicker;
