import React, { useEffect, useMemo, useState } from 'react'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import styles from './ReservationDatePicker.module.scss';

import { ko } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import CustomSelect from './CustomSelect.tsx';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCarSide } from '@fortawesome/free-solid-svg-icons';

import { getRoundedDate } from '../../../../utils/getRoundedTime.tsx';

// 날짜, 시간 타입
import { ReservationInfo } from '../../../../types/reservation.tsx';
import FormatKoreanDate from '../../../../utils/dateUtils.ts';
import { TimeCalculator } from '../../../../utils/TimeCalculator.ts';
import CombineDateAndTime from '../../../../utils/CombineDateAndTime.ts';
import { formatTimeFromDate } from '../../../../types/formatTimeFromDate.ts';

interface ReservationDatePickerProps {
  reservationInfo: ReservationInfo;
  setReservationInfo: React.Dispatch<React.SetStateAction<ReservationInfo>>;
  onClose: () => void;
}

const ReservationDatePicker: React.FC<ReservationDatePickerProps> = ({ reservationInfo, setReservationInfo, onClose }) => {
  // 날짜
  const monthsShown = useMemo(() => 2, []);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    reservationInfo.startDate,
    reservationInfo.endDate,
  ]);
  let [startDate, endDate] = dateRange;
  // 시간
  const now = new Date();
  const initialRentDate = getRoundedDate();

  // 2. 초기 반납 시점 (대여 시작 시점 + 6시간)
  const initialReturnDate = new Date(initialRentDate.getTime() + 6 * 60 * 60 * 1000);

  // 3. HH:mm 문자열로 변환
  const pad = (num: number) => String(num).padStart(2, '0');
  const rentTime = `${pad(initialRentDate.getHours())}:${pad(initialRentDate.getMinutes())}`;
  const returnTime = `${pad(initialReturnDate.getHours())}:${pad(initialReturnDate.getMinutes())}`;
  const [start, setStart] = useState(rentTime);
  const [end, setEnd] = useState(returnTime);

  // width 리사이즈 감지
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 선택완료 후 파라미터 넘기기
  const handleSelectComplete = () => {
    const [startDate, endDate] = dateRange;
    // const { startTime, endTime } = reservationInfo;

    if (startDate && endDate && start && end) {
      const combinedStart = CombineDateAndTime(startDate, start);
      const combinedEnd = CombineDateAndTime(endDate, end);
      const totalTime = TimeCalculator(combinedStart, combinedEnd);

      setReservationInfo({
        startDate: combinedStart,
        endDate: combinedEnd,
        // startTime: start,
        // endTime: end,
        totalTime
      });

    } else {
      alert("날짜와 시간을 입력해주세요");
    }
    onClose();
  }

  const updateDateWithNewTime = (originalDate: Date, newTimeStr: string): Date => {
    if (!(originalDate instanceof Date) || isNaN(originalDate.getTime())) {
        // 유효하지 않은 Date 객체인 경우, 에러 처리하거나 현재 시각을 반환할 수 있습니다.
        // 여기서는 유효하지 않은 날짜를 반환하지 않도록 주의합니다.
        throw new Error("유효한 원본 Date 객체가 필요합니다.");
    }
    
    const [hours, minutes] = newTimeStr.split(':').map(Number);

    // 기존 날짜를 복사하여 새로운 Date 객체를 만듭니다.
    const newDate = new Date(originalDate);
    
    // 시간과 분을 설정하고, 초/밀리초는 0으로 초기화합니다.
    newDate.setHours(hours);
    newDate.setMinutes(minutes);
    newDate.setSeconds(0);
    newDate.setMilliseconds(0);
    
    return newDate;
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
            <CustomSelect
              label="대여 시각"
              // ✅ 수정된 부분: startDate가 있을 경우에만 시간 부분을 추출하여 value로 사용합니다.
              value={
                reservationInfo.startDate
                  ? formatTimeFromDate(reservationInfo.startDate)
                  : ""
              }
              onChange={updateDateWithNewTime}
              startDate={reservationInfo.startDate}
            />
          </div>
          <div className={styles.selectTime}>
            <CustomSelect
              label="반납 시각"
              value={reservationInfo.endTime ?? ""}
              onChange={(value) =>
                setReservationInfo((prev) => ({ ...prev, endTime: value }))
              }
              startDate={reservationInfo.startDate}
            />
          </div>
        </div>
        <div className={styles.result}>
          <div className={styles.resultCont}>
            <span className={styles.title}>시작일</span>
            <span className={styles.date}>{startDate ? FormatKoreanDate(startDate) : ''}</span>
          </div>
          <FontAwesomeIcon icon={faCarSide} />
          <div className={styles.resultCont}>
            <span className={styles.title}>반납일</span>
            <span className={styles.date}>{endDate ? FormatKoreanDate(endDate) : ''}</span>
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
