import React from 'react'
import styles from './reservationController.module.scss';
function reservationController() {
    return (
        <>
            <form className={styles.searchWrap}>
                <div className={styles.date}>
                    <div className={styles.rentalDate}>
                        <input type="text" /> 월
                        <input type="text" /> 일
                    </div>
                    <div className={styles.rentalDate}>
                        <input type="text" /> 월
                        <input type="text" /> 일
                    </div>
                </div>
                <div className={styles.rentalState}>
                    <input type="text" className={styles.inputState} placeholder='렌트 지역을 입력해주세요' />
                </div>
            </form>
        </>
    )
}

export default reservationController