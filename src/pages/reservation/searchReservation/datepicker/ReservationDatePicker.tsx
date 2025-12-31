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

  // 초기 반납 시점 (대여 시작 시점 + 6시간)
  const initialReturnDate = new Date(initialRentDate.getTime() + 6 * 60 * 60 * 1000);

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

    if (reservationInfo.startDate && reservationInfo.endDate) {
      const totalTime = TimeCalculator(reservationInfo.startDate, reservationInfo.endDate);
      setReservationInfo({
        startDate: reservationInfo.startDate,
        endDate: reservationInfo.endDate,
        totalTime
      });

    } else {
      alert("날짜와 시간을 입력해주세요");
    }
    onClose();
  }

  const updateDateWithNewTime = (originalDate: Date, newTimeStr: string): Date => {
    if (!(originalDate instanceof Date) || isNaN(originalDate.getTime())) {
      throw new Error("유효한 원본 Date 객체가 필요합니다.");
    }

    const [hours, minutes] = newTimeStr.split(':').map(Number);

    const newDate = new Date(originalDate);

    newDate.setHours(hours);
    newDate.setMinutes(minutes);
    newDate.setSeconds(0);
    newDate.setMilliseconds(0);

    return newDate;
  }

  // 대여 시각 변경 핸들러
  const handleStartTimeChange = (newTimeStr: string) => {
    setReservationInfo((prev) => {
      if (!prev.startDate) return prev;

      try {
        const newStartDate = updateDateWithNewTime(prev.startDate, newTimeStr);

        if (prev.endDate && newStartDate.getTime() >= prev.endDate.getTime()) {
          alert("대여 시각은 반납 시각보다 빨라야 합니다.");
          return prev;
        }

        return { ...prev, startDate: newStartDate };

      } catch (error) {
        console.error("시각 업데이트 중 오류 발생:", error);
        return prev;
      }
    });
  };

  // 반납 시각 변경 핸들러
  const handleEndTimeChange = (newTimeStr: string) => {
    setReservationInfo((prev) => {
      if (!prev.endDate) return prev;

      try {
        const newEndDate = updateDateWithNewTime(prev.endDate, newTimeStr);

        if (prev.startDate && newEndDate.getTime() <= prev.startDate.getTime()) {
          alert("반납 시각은 대여 시각보다 늦어야 합니다.");
          return prev;
        }

        // endDate 업데이트
        return { ...prev, endDate: newEndDate };

      } catch (error) {
        console.error("반납 시각 업데이트 중 오류 발생:", error);
        return prev;
      }
    });
  };
  return (
    <>
      <div className={styles.datepicker}>
        <DatePicker
          calendarClassName="customalendar"
          className={styles.inputCont}
          locale={ko} // 한글화
          inline // 인라인 창
          selectsRange={true} //날짜 연속 선택
          startDate={startDate} //시작일
          endDate={endDate} //종료일
          minDate={new Date()} //현재날짜 이전 선택 불가능
          onChange={(update: [Date | null, Date | null]) => {
            const [newStartDate, newEndDate] = update;
            setDateRange(update);

            setReservationInfo((prev) => {
              const currentStartTime = prev.startDate ? formatTimeFromDate(prev.startDate) : rentTime;
              const updatedStartDate = newStartDate
                ? updateDateWithNewTime(newStartDate, currentStartTime)
                : null;

              const currentEndTime = prev.endDate ? formatTimeFromDate(prev.endDate) : returnTime;
              const updatedEndDate = newEndDate
                ? updateDateWithNewTime(newEndDate, currentEndTime)
                : null;

              if (updatedStartDate && updatedEndDate && updatedEndDate.getTime() <= updatedStartDate.getTime()) {
                const autoCorrectedEndDate = new Date(updatedStartDate.getTime() + 6 * 60 * 60 * 1000);
                return {
                  ...prev,
                  startDate: updatedStartDate,
                  endDate: autoCorrectedEndDate,
                };
              }

              return {
                ...prev,
                startDate: updatedStartDate,
                endDate: updatedEndDate,
              };
            });
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
              value={
                reservationInfo.startDate
                  ? formatTimeFromDate(reservationInfo.startDate)
                  : formatTimeFromDate(initialRentDate) // 초기값 반영
              }
              onChange={handleStartTimeChange}
              startDate={reservationInfo.startDate}
              endDate={reservationInfo.endDate} // 반납 시각 계산을 위해 넘겨줍니다.
              isEnd={false}
            />
          </div>
          <div className={styles.selectTime}>
            <CustomSelect
              label="반납 시각"
              value={
                reservationInfo.endDate
                  ? formatTimeFromDate(reservationInfo.endDate)
                  : formatTimeFromDate(initialReturnDate)
              }
              onChange={handleEndTimeChange}
              startDate={reservationInfo.startDate}
              endDate={reservationInfo.endDate}
              isEnd={true}
            />
          </div>
        </div>
        <div className={styles.result}>
          <div className={styles.resultCont}>
            <span className={styles.title}>시작일</span>
            <span className={styles.date}>{reservationInfo.startDate ? FormatKoreanDate(reservationInfo.startDate) : ''}</span>
          </div>
          <FontAwesomeIcon icon={faCarSide} />
          <div className={styles.resultCont}>
            <span className={styles.title}>반납일</span>
            <span className={styles.date}>{reservationInfo.endDate ? FormatKoreanDate(reservationInfo.endDate) : ''}</span>
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