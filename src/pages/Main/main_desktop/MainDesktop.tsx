import React, { useState } from 'react'
import styles from './MainDesktop.module.scss';
import Content from '../../../components/common/reservationControl/Content.tsx';
import ShortCut from './ShortCut.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faArrowRight, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import ReservationDatePicker from '../../reservation/searchReservation/datepicker/ReservationDatePicker.tsx';
import { ReservationInfo } from '../../../types/reservation.tsx';
import FormatKoreanDate, { FormatTime } from '../../../utils/dateUtils.ts';
import { getFourHoursLater, getSixHoursAfterFourHoursLater } from '../../../utils/CurrentTime.ts';
import { getRoundedTime } from '../../../utils/getRoundedTime.tsx';

const MainDesktop = () => {
    const [isDatepickerOpen, setIsDatePickerOpen] = useState<boolean>(false);

const start = getFourHoursLater();
const end = getSixHoursAfterFourHoursLater();

const [reservationInfo, setReservationInfo] = useState<ReservationInfo>({
  startDate: start,
  endDate: end,
  startTime: FormatTime(start),
  endTime: FormatTime(end),
  totalTime: null,
});

    const handleDateSelect = (info: ReservationInfo) => {
        setReservationInfo(info)
    }

    return (
        <>
            <div className={styles.container}>
                <Content
                    setIsDatePickerOpen={setIsDatePickerOpen}
                    reservationInfo={reservationInfo}
                />
                <ShortCut></ShortCut>
                <div className={styles.bottomMenu}>
                    <div className={styles.banner}>
                        <div className={styles.guide}>
                            <p>답답할 땐 바로 물어보세요</p>
                            <div className={styles.iconText}>
                                <FontAwesomeIcon icon={faBell} className={styles.icon} />
                                <h5>문의하기</h5>
                                <FontAwesomeIcon icon={faArrowRight} className={styles.arrow} />
                            </div>
                        </div>
                        <div className={styles.guide}>
                            <p>사고가 발생해도 당황하지 마세요</p>
                            <div className={styles.iconText}>
                                <FontAwesomeIcon icon={faTriangleExclamation} className={styles.icon} />
                                <h5>사고처리 가이드</h5>
                                <FontAwesomeIcon icon={faArrowRight} className={styles.arrow} />
                            </div>
                        </div>
                    </div>

                    <div className={styles.event}>
                    </div>
                </div>
            </div>
            {
                isDatepickerOpen && (
                    <>
                        <div className={styles.datepicker}>
                            <ReservationDatePicker
                                onClose={() => setIsDatePickerOpen(false)}
                                onDateSelect={handleDateSelect}
                            />
                        </div>
                        <div className={styles.background}></div>
                    </>
                )
            }
        </>
    )
}

export default MainDesktop