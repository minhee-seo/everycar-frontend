import styles from './MainMobile.module.scss';

import Searchbar from './Searchbar'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faMapMarkerAlt, faCheck, faComments, faFile, } from '@fortawesome/free-solid-svg-icons';
import Footer from '../../../components/common/Footer';
import { useCurrentLocation } from '../../../utils/useCurrentLocation';
import { Link } from 'react-router-dom';
import Slide from '../main_desktop/Slide';

function MainMobile() {
    const { address, error } = useCurrentLocation();

    return (
        <div className={styles.container}>
            <div className={styles.searchBar}>
                <Searchbar></Searchbar>
            </div>
            <section className={styles.searchCont}>
                <div className={styles.search}>
                    <span className={styles.searchTitle}>
                        <span>
                            <FontAwesomeIcon icon={faMapMarkerAlt} />
                            {address}
                        </span> 에서<br></br>
                        렌터카를 빠르게 대여하세요
                    </span>
                    <p className={styles.searchText}>빠르고 간편하게 만나는 렌터카 서비스</p>
                    <Link to="/reservation">
                        <button className={styles.searchBtn}>
                            에브리카 예약하기
                            <FontAwesomeIcon icon={faArrowRight} />
                        </button>
                    </Link>
                </div>
                <div className={styles.shortcut}>
                    <ul>
                        <Link to="/myPage/reservations" className={styles.list}>
                            <li>
                                <FontAwesomeIcon icon={faCheck} />
                                예약확인
                            </li>
                        </Link>
                        {/* <li>
                            <FontAwesomeIcon icon={faComments} />
                            1 : 1 상담
                        </li> */}
                        <Link to="/estimate" className={styles.list}>
                            <li>
                                <FontAwesomeIcon icon={faFile} />
                                견적확인
                            </li>
                        </Link>
                    </ul>
                </div>
            </section>
            <section className={styles.mainCont}>
                <div className={styles.event}>
                    <Slide />
                </div>
                <div className={styles.boon}>
                    <h3>에브리카 혜택</h3>
                    <div className={styles.bannerCont}>
                        <img src="/main/promotion/option1.png" alt="" />
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default MainMobile