import React from 'react';
import styles from './CarDetail.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faChair, faMapSigns, faLocationDot, faClock } from '@fortawesome/free-solid-svg-icons';

function CarDetail() {
    return (
        <div className={styles.container}>
            <section className={styles.ContentSection_article}>
                <div className={styles.rentalTime}>
                    <h2>대여기간</h2>
                    <p>01. 01(월) 10:00 ~ 01. 02(화) 10:00</p>
                </div>
            </section>
            <section className={styles.ContentSection_article}>
                <div className={styles.infoSection}>
                    <div className={styles.carImage}>
                        {/* Placeholder for car image */}
                    </div>
                    <div className={styles.carInfo}>
                        <div className={styles.infoHeader}>
                            <h3>EV6</h3>
                            <span>premium</span>
                        </div>
                        <div className={styles.info}>
                            <ul className={styles.specList}>
                                <li><strong>제조사</strong><span>기아</span></li>
                                <li><strong>등급</strong><span>대형SUV</span></li>
                                <li><strong>변속</strong><span>자동</span></li>
                                <li><strong>연료</strong><span>전기</span></li>
                                <li><strong>인원</strong><span>5인승</span></li>
                                <li><strong>연식</strong><span>2025</span></li>
                            </ul>
                        </div>
                        <div className={styles.option}>
                            <h3 className={styles.subTitle}>옵션</h3>
                            <ul className={styles.optionList}>
                                <li><FontAwesomeIcon icon={faVideo} /> 후면카메라</li>
                                <li><FontAwesomeIcon icon={faChair} /> 열선시트</li>
                                <li><FontAwesomeIcon icon={faMapSigns} /> 네비게이션</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={styles.carPrice}>
                    <div className={styles.priceDisplay}>
                        <span className={styles.priceLabel}>총 금액</span>
                        <p className={styles.priceValue}>200,000원</p>
                    </div>
                    <button className={styles.reservationButton}>예약하기</button>
                </div>
            </section>
            <section className={styles.ContentSection_article}>
                <h2>대여 위치</h2>
                <div className={styles.locationSection}>
                    <div className={styles.location}>

                        <div className={styles.locationCont}>
                            <div className={styles.iconCont}>
                                <FontAwesomeIcon icon={faLocationDot} />
                            </div>
                            <div className={styles.textCont}>
                                <h3>대여장소</h3>
                                <p>강남역주차장</p>
                                <p>서울특별시 강남구 서초동 어쩌구 저쩌구 강남역주차장</p>
                            </div>
                        </div>
                        <div className={styles.locationCont}>
                            <div className={styles.iconCont}>
                                <FontAwesomeIcon icon={faClock} />
                            </div>
                            <div className={styles.textCont}>
                                <h3>대여 기간</h3>
                                <p>2025.01.01(월) 10:00 ~ 2025.01.02(화) 10:00</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.map}>

                    </div>
                </div>
            </section>
        </div>
    );
}

export default CarDetail;
