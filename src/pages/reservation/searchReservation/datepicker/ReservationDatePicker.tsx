import React, { useEffect, useMemo, useState } from 'react'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from './ReservationDatePicker.module.scss';

import { ko } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import CustomSelect from './CustomSelect.tsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCarSide } from '@fortawesome/free-solid-svg-icons';

import { getRoundedTime } from '../../../../utils/getRoundedTime.tsx';

// 날짜, 시간 타입
import { ReservationInfo } from '../../../../types/reservation.tsx';
import FormatKoreanDate from '../../../../utils/dateUtils.ts';
import { TimeCalculator } from '../../../../utils/TimeCalculator.ts';
import CombineDateAndTime from '../../../../utils/CombineDateAndTime.ts';

interface ReservationDatePickerProps {
  onClose: () => void; // 달력 닫기
  onDateSelect: (reservationInfo: ReservationInfo) => void;
}

const ReservationDatePicker: React.FC<ReservationDatePickerProps> = ({ onClose, onDateSelect }) => {
  // 날짜
  const monthsShown = useMemo(() => 2, []);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  let [startDate, endDate] = dateRange;
  // 시간
  const { rentTime, returnTime } = getRoundedTime(); //3=30qns
  const [start, setStart] = useState(rentTime);
  const [end, setEnd] = useState(returnTime);

  // width 리사이즈 감지
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 날짜 + 시간 결합 로직
  // const combineDateAndTime = (date: Date | null, time: string): Date | null => {
  //   if (!date || !time) return null;

  //   const [hours, minutes] = time.split(":").map(Number);
  //   const combined = new Date(date);
  //   combined.setHours(hours, minutes, 0, 0);
  //   return combined;
  // }

  // 선택완료 후 파라미터 넘기기
  const handleSelectComplete = () => {
    if (startDate && endDate && start && end) {
      const combinedStart = CombineDateAndTime(startDate, start);
      const combinedEnd = CombineDateAndTime(endDate, end);
      const totalTime = TimeCalculator(combinedStart, combinedEnd);
      onDateSelect({
        startDate: combinedStart,
        endDate: combinedEnd,
        totalTime
      });

    } else {
      alert("날짜와 시간을 입력해주세요");
    }
    onClose();
  }

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
          minDate={new Date()} //현재날짜 이전 선택 불가능
          onChange={(update: [Date | null, Date | null]) => {
            setDateRange(update);

            // 시
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
              <button
                aria-label="Next Month"
                className={
                  "react-datepicker__navigation react-datepicker__navigation--next"
                }
                onClick={increaseMonth}
                style={{
                  visibility:
                    (isMobile && customHeaderCount === 0) ||
                      (!isMobile && customHeaderCount === monthsShown - 1)
                      ? "visible"
                      : "hidden",
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
              <span className="react-datepicker__current-month">
                {monthDate.toLocaleString("KO-US", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          )}
          selected={startDate}
          monthsShown={monthsShown}
        />
        <div className={styles.rentTime}>
          <div className={styles.selectTime}>
            <CustomSelect label="대여 시각" value={start} onChange={setStart} startDate={startDate} />
          </div>
          <div className={styles.selectTime}>
            <CustomSelect label="반납 시각" value={end} onChange={setEnd} />
          </div>
        </div>
        <div className={styles.result}>
          <div className={styles.resultCont}>
            <span className={styles.title}>시작일</span>
            <span className={styles.date}>{startDate ? FormatKoreanDate(startDate) : ''}</span>
            <span className={styles.time}>{start}</span>
          </div>
          <FontAwesomeIcon icon={faCarSide} />
          <div className={styles.resultCont}>
            <span className={styles.title}>반납일</span>
            <span className={styles.date}>{endDate ? FormatKoreanDate(endDate) : ''}</span>
            <span className={styles.time}>{end}</span>
          </div>
        </div>


        <div className={styles.button}>
          <button
            className={styles.reset}
            onClick={() => {
              onClose();
            }}
          >
            취소
          </button>
          <button
            className={styles.submit}
            onClick={() => {
              if (startDate && endDate && start && end) {
                handleSelectComplete();
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
