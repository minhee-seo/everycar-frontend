import React, { useState } from 'react'
import styled from './Content.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faArrowRight, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

import { ReservationInfo } from '../../../types/reservation.tsx';
import { getRoundedTime } from '../../../utils/getRoundedTime.tsx';
import FormatKoreanDate from '../../../utils/dateUtils.ts';
import CurrentLocation from '../../../utils/CurrentLocation.tsx';

interface ReservationControllerProps {
  setIsDatePickerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  // onDateSelect: (reservationInfo: ReservationInfo) => void;
  reservationInfo: ReservationInfo;
}

function Content({ setIsDatePickerOpen, reservationInfo }: ReservationControllerProps) {
  // datepicker open
  const handleDatepicker = () => {
    setIsDatePickerOpen(true);
  }

  // 기본 입력값 (현재 날짜 현재시간)
  // 현재날짜 + (현재시간(30분단위끊기작업))
  const { rentTime, returnTime } = getRoundedTime();
  const [start, setStart] = useState(rentTime);
  const [end, setEnd] = useState(returnTime);

  // console.log(CurrentLocation);

  return (
    <>
      <div className={styled.contentContainer} >
        <div className={styled.mainImg}>
          <img src="/mainslide.png" alt="Logo" />
        </div>
        <div className={styled.rentContainer}>
          <div className={styled.rentPos}>
            <h5 className={styled.title}>렌트 장소</h5>
            <div className={styled.content}>
              <svg width="18" style={{ height: "auto" }} viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.875 8.75C16.875 14.875 9 20.125 9 20.125C9 20.125 1.125 14.875 1.125 8.75C1.125 6.66142 1.95468 4.65838 3.43153 3.18153C4.90838 1.70468 6.91142 0.875 9 0.875C11.0886 0.875 13.0916 1.70468 14.5685 3.18153C16.0453 4.65838 16.875 6.66142 16.875 8.75Z" stroke="#B3B3B3" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 11.375C10.4497 11.375 11.625 10.1997 11.625 8.75C11.625 7.30025 10.4497 6.125 9 6.125C7.55025 6.125 6.375 7.30025 6.375 8.75C6.375 10.1997 7.55025 11.375 9 11.375Z" stroke="#B3B3B3" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {/* 서울시 강남구 */}
              <CurrentLocation />
            </div>
          </div>

          <div style={{ borderRight: "1px solid #EAEAEA", width: "5%", height: "60%" }}></div>

          <div className={styled.rentTime} onClick={(e) => handleDatepicker()}>
            <h5 className='title'>렌트 기간</h5>
            <div className={styled.content}>
              <svg width="23" style={{ height: "auto" }} viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.5 5.74999V11.5L15.3334 13.4167M21.0834 11.5C21.0834 16.7927 16.7928 21.0833 11.5 21.0833C6.20729 21.0833 1.91669 16.7927 1.91669 11.5C1.91669 6.20726 6.20729 1.91666 11.5 1.91666C16.7928 1.91666 21.0834 6.20726 21.0834 11.5Z" stroke="#B3B3B3" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className={styled.period}>
                <p>
                  {FormatKoreanDate(reservationInfo.startDate)}
                  {reservationInfo.startTime}
                </p>
                <p className='period-wave'>~</p>
                <p>
                  {FormatKoreanDate(reservationInfo.endDate)}
                  {reservationInfo.endTime}
                </p>
              </div>
            </div>
          </div>
          <div className={styled.rentBtn}>
            <button>
              <FontAwesomeIcon icon={faArrowRight} className={styled.arrow} />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Content
