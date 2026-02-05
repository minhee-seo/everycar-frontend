import React, { useState } from 'react'
import styles from './MainDesktop.module.scss';
import Content from '../../../components/common/reservationControl/Content';
import ShortCut from './ShortCut';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faArrowRight, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import ReservationDatePicker from '../../reservation/searchReservation/datepicker/ReservationDatePicker';
import { ReservationInfo } from '../../../types/ReservationInfo';
import FormatKoreanDate, { FormatTime } from '../../../utils/dateUtils';
import { getFourHoursLaterRounded, getSixHoursAfterFourHoursLater } from '../../../utils/CurrentTime';
import { getRoundedDate } from '../../../utils/getRoundedTime';
import Slide from './Slide';

const MainDesktop = () => {
    const [isDatepickerOpen, setIsDatePickerOpen] = useState<boolean>(false);

    const start = getFourHoursLaterRounded();
    const end = getSixHoursAfterFourHoursLater();

    // 기본 시간값
    const [reservationInfo, setReservationInfo] = useState<ReservationInfo>({
        startDate: start,
        endDate: end,
        // startTime: getRoundedTime(
        //     start.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit", hour12: false })
        // ).rentTime,
        // endTime: getRoundedTime(
        //     start.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit", hour12: false })
        // ).returnTime,
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
                        <Slide />
                    </div>
                </div>
            </div>
            {
                isDatepickerOpen && (
                    <>
                        <div className={styles.datepicker}>
                            <ReservationDatePicker
                                reservationInfo={reservationInfo}
                                setReservationInfo={setReservationInfo}
                                onClose={() => setIsDatePickerOpen(false)}
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