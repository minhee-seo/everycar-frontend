import React, { useState, useEffect } from 'react';
import styles from './ReservationList.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import MypageSide from './MypageSide.tsx';
import { ReservationItem } from '../../types/mypage/ReservationItem.ts';
import { userApi } from '../../api/mypageUserApi.ts';
import { Link, useNavigate } from 'react-router-dom';

// 예약 상태 타입 정의
type ReservationStatus = '전체' | '이용예정' | '이용중' | '반납완료' | '취소됨';

const ReservationList = () => {
  const { userNum } = useSelector((state: RootState) => state.user);
  const [activeTab, setActiveTab] = useState<ReservationStatus>('전체');
  const [reservations, setReservations] = useState<ReservationItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // API 데이터 호출
  useEffect(() => {
    const fetchList = async () => {
      if (!userNum) return;
      try {
        setLoading(true);
        const data = await userApi.getMyReservations(Number(userNum));
        setReservations(data);
      } catch (error) {
        console.error("예약 내역 로드 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchList();
  }, [userNum]);

  const filteredList = activeTab === '전체'
    ? reservations
    : reservations.filter(item => item.status === activeTab);


  const getStatusClass = (status: string) => {
    switch (status) {
      case '이용예정': return styles.statusReady;
      case '이용중': return styles.statusIng;
      case '반납완료': return styles.statusDone;
      default: return styles.statusCancel;
    }
  };

  if (loading) return <div className={styles.loading}>로딩 중...</div>;

  return (
    <div className="container">
      <div className={styles.pageWrapper}>
        <MypageSide />

        <main className={styles.content}>
          <header className={styles.header}>
            <h3>예약 내역</h3>
            <p>회원님이 이용하신 EveryCar 예약 기록입니다.</p>
          </header>

          {/* 탭 메뉴 */}
          <nav className={styles.tabNav}>
            {['전체', '이용예정', '이용중', '반납완료'].map((tab) => (
              <button
                key={tab}
                className={activeTab === tab ? styles.activeTab : ''}
                onClick={() => setActiveTab(tab as ReservationStatus)}
              >
                {tab}
              </button>
            ))}
          </nav>

          <section className={styles.listSection}>
            {filteredList.length > 0 ? (
              filteredList.map((item) => (
                <div key={`reservationList_${item.reservationId}`} className={styles.reservationCard}>
                  <div className={styles.cardHeader}>
                    <span className={`${styles.statusBadge} ${getStatusClass(item.status)}`}>
                      {item.status}
                    </span>
                    <span className={styles.resId}>예약번호 {item.reservationId}</span>
                  </div>

                  <div className={styles.cardBody}>
                    <img src={item.carImg || '/sample-car.png'} alt={item.carName} className={styles.carThumb} />
                    <div className={styles.infoText}>
                      <span className={styles.carBrand}>{item.brand}</span>
                      <h4>{item.carName} ({item.fuel})</h4>
                      <div className={styles.dateInfo}>
                        <p><strong>대여:</strong> {item.rentalDate}</p>
                        <p><strong>반납:</strong> {item.returnDate}</p>
                        <p><strong>장소:</strong> {item.parkingName}</p>
                      </div>
                    </div>
                    <div className={styles.priceArea}>
                      <span className={styles.priceLabel}>결제금액</span>
                      <strong className={styles.priceValue}>{item.totalPrice.toLocaleString()}원</strong>
                    </div>
                  </div>

                  <div className={styles.cardFooter}>
                      <button className={styles.detailBtn} onClick={() => navigate(`/mypage/reservations/${item.reservationId}`)}>상세보기</button>
                    {item.status === '이용예정' && (
                      <button
                        className={styles.cancelBtn}
                        onClick={() => alert('결제 취소 로직을 구현하세요.')}
                      >
                        예약취소
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.emptyState}>
                <p>해당하는 예약 내역이 없습니다.</p>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

export default ReservationList;