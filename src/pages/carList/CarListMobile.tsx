import React from 'react'
import styles from './CarListMobile.module.scss';
import './Slide.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faLocationDot, faCarSide, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';

function CarListMobile() {
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
                        <div className={styles.inputCont}>
                            <FontAwesomeIcon icon={faLocationDot} />
                            <div className={styles.location}>강남역지하주차장</div>
                            <div className={`${styles.date}`}>
                                01.01 (월) 10:00
                                -
                                01.02 (화) 10:00
                            </div>
                            <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.faX} />

                        </div>
                    </div>
                </div>
                <button className={styles.researchButton}>주차장 재검색</button>
            </div>

            <div className={styles.contentWrapper}>
                <aside className={styles.filterSidebar}>
                    <Swiper
                        slidesPerView={5}
                        spaceBetween={10}
                        freeMode={true}
                        modules={[FreeMode, Pagination]}
                        className="option"

                    >
                        <ul className={styles.filterList}>
                            <li className={styles.filterItem}>
                                <h3>등급</h3>
                                <ul className={styles.checkboxGroup}>
                                    <SwiperSlide>
                                        <li><label><input type="checkbox" /> Premium</label></li>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <li><label><input type="checkbox" /> Standard</label></li>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <li><label><input type="checkbox" /> 경차</label></li>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <li><label><input type="checkbox" /> 소형</label></li>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <li><label><input type="checkbox" /> 중형</label></li>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <li><label><input type="checkbox" /> 중형</label></li>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <li><label><input type="checkbox" /> 대형</label></li>
                                    </SwiperSlide>
                                    <SwiperSlide>
                                        <li><label><input type="checkbox" /> SUV</label></li>
                                    </SwiperSlide>
                                </ul>
                            </li>
                        </ul>
                    </Swiper>
                </aside>
                <section className={styles.carListSection}>
                    <ul className={styles.carList}>
                        {Array.from({ length: 5 }).map((_, index) =>
                            carListData.map((car, index) => (
                                <li key={index}>
                                    <Link to="/reservation/carDetail">
                                    <article className={styles.carCard}>
                                        <header className={styles.cardHeader}>
                                            <h4>{car.model}</h4>
                                            <p>{car.year}</p>
                                            <p>{car.grade}</p>
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
                                    </Link>
                                </li>
                            )))}
                    </ul>
                </section>
            </div>
        </main>
    )
}

export default CarListMobile