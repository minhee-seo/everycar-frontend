import React from 'react'
import styles from './MainDesktop.module.scss';
import Content from '../../../components/common/reservationControl/Content.tsx';
import ShortCut from './ShortCut.tsx';
import CarSlider from '../main_commoon/CarSlide.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faArrowRight, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';


function MainDesktop() {
    return (
        <div className={styles.container}>
            <Content></Content>
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
    )
}

export default MainDesktop