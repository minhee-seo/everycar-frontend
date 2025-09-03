import React from 'react'
import styles from './CarList.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faLocationDot, faCarSide, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';


function CarListDesktop() {
    const carListData = [
        {
            model: 'EV6',
            year: '2020년형',
            grade: 'Premium',
            imageUrl: '',
            type: '중형차 SUV',
            seats: '5인승',
            fuel: '전기',
            transmission: '오토',
            price: '500,000',
        },
    ];
    return (
        <main className={styles.container}>
            <div className={styles.searchHeader}>
                <div className={styles.searchOption}>
                    <div className={styles.locationCont}>
                        <p>대여장소</p>
                        <div className={styles.inputCont}>
                            <FontAwesomeIcon icon={faLocationDot} />
                            <div className={styles.location}>강남역지하주차장</div>
                            <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.faX} />
                        </div>
                    </div>
                    <div className={styles.locationCont}>
                        <p>대여기간</p>
                        <div className={`${styles.inputCont} ${styles.date}`}>
                            01.01 (월) 10:00
                            <FontAwesomeIcon icon={faCarSide} className={styles.carSide} />
                            01.02 (화) 10:00
                        </div>
                    </div>
                </div>
                <button className={styles.researchButton}>주차장 재검색</button>
            </div>

            <div className={styles.contentWrapper}>
                <aside className={styles.filterSidebar}>
                    <h2 className={styles.filterTitle}>차량검색</h2>
                    <ul className={styles.filterList}>
                        <li className={styles.filterItem}>
                            <h3>자동차 모델 검색</h3>
                            <div className={styles.modelSearch}>
                                <input type="text" placeholder='모델명을 입력하세요' />
                                <button>검색</button>
                            </div>
                        </li>
                        <li className={styles.filterItem}>
                            <h3>금액</h3>
                            <input type="range" className={styles.priceSlider} />
                        </li>
                        <li className={styles.filterItem}>
                            <h3>등급</h3>
                            <ul className={styles.checkboxGroup}>
                                <li><label><input type="checkbox" /> Premium</label></li>
                                <li><label><input type="checkbox" /> Standard</label></li>
                            </ul>
                        </li>
                        <li className={styles.filterItem}>
                            <h3>차급</h3>
                            <ul className={styles.checkboxGroup}>
                                <li><label><input type="checkbox" /> 경차</label></li>
                                <li><label><input type="checkbox" /> 소형</label></li>
                                <li><label><input type="checkbox" /> 중형</label></li>
                                <li><label><input type="checkbox" /> 준중형</label></li>
                                <li><label><input type="checkbox" /> 대형</label></li>
                                <li><label><input type="checkbox" /> SUV</label></li>
                            </ul>
                        </li>
                    </ul>
                </aside>
                <section className={styles.carListSection}>
                    <ul className={styles.carList}>
                        {carListData.map((car, index) => (
                            <li key={index}>
                                <article className={styles.carCard}>
                                    <header className={styles.cardHeader}>
                                        <div className={styles.title}>
                                            <h4>{car.model}</h4>
                                            <p className={`${styles.gradeBtn} ${styles.premium}`}>{car.grade}</p>
                                        </div>
                                        <p>{car.year}</p>
                                    </header>
                                    <div className={styles.carImage}>
                                        {/* Placeholder for image */}
                                    </div>
                                    <div className={styles.carDetails}>
                                        <ul className={styles.optionList}>
                                            <li>
                                                <FontAwesomeIcon icon={faCar} />
                                                {car.type}
                                            </li>
                                            <li>
                                                <FontAwesomeIcon icon={faCar} />
                                                {car.seats}
                                            </li>
                                            <li>
                                                <FontAwesomeIcon icon={faCar} />
                                                {car.fuel}
                                            </li>
                                            <li>
                                                <FontAwesomeIcon icon={faCar} />
                                                {car.transmission}
                                            </li>
                                        </ul>
                                    </div>
                                    <footer className={styles.priceSection}>
                                        <p>월 <span>{car.price} 원</span></p>
                                    </footer>
                                </article>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </main>
    );
}

export default CarListDesktop