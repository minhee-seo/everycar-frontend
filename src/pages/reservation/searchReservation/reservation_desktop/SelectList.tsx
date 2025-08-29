import React from 'react'
import styles from './SelectList.module.scss';

function SelectList() {
    return (
        <div className={styles.selectArea}>
            <h3>어디에서 출발하시나요?</h3>
            <ul>
                <li>서울</li>
                <li>경기도</li>
                <li>인천광역시</li>
                <li>부산광역시</li>
                <li>강원도</li>
            </ul>
        </div>
    )
}

export default SelectList