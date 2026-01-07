import React from 'react'
import styles from './MypageInfo.module.scss';

function MypageSide() {
    return (
        <aside className={styles.sideMenu}>
            <h2>마이페이지</h2>
            <ul>
                <li className={styles.active}>개인정보 관리</li>
                <li>예약 내역</li>
                <li>결제 수단 관리</li>
                <li>고객센터</li>
            </ul>
        </aside>
    )
}

export default MypageSide