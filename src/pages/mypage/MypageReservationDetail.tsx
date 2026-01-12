import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './MypageReservationDetail.module.scss';
import MypageSide from './MypageSide.tsx';
import { userApi } from '../../api/mypageUserApi.ts';
import { ReservationDetail as IDetail } from '../../types/ReservationDetail.ts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faMapMarkerAlt, faClock } from '@fortawesome/free-solid-svg-icons';

const MypageReservationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [detail, setDetail] = useState<IDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        // 서버에 상세 정보 요청 (기존 userApi에 메서드 추가 필요)
        const data = await userApi.getReservationDetail(Number(id));
        setDetail(data);
      } catch (error) {
        console.error("상세 정보 로드 실패:", error);
        alert("정보를 불러올 수 없습니다.");
        navigate(-1);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id, navigate]);

  if (loading) return <div className={styles.loading}>정보를 불러오는 중...</div>;
  if (!detail) return <div className={styles.error}>데이터가 없습니다.</div>;

  const handleCancelRequest = () => {
    if (window.confirm("정말로 예약을 취소하시겠습니까? 결제 금액은 전액 환불됩니다.")) {
      // 결제 취소 API 로직 연결 예정
      alert("취소 요청이 접수되었습니다.");
    }
  };

  return (
    <div className="container">
      <div className={styles.pageWrapper}>
        <MypageSide />
        
        <main className={styles.content}>
          <button className={styles.backBtn} onClick={() => navigate(-1)}>
            <FontAwesomeIcon icon={faChevronLeft} /> 목록으로 돌아가기
          </button>

          <section className={styles.detailHeader}>
            <div className={styles.titleArea}>
              <h2>예약 상세 내역</h2>
              <span className={styles.statusBadge}>{detail.status}</span>
            </div>
            <p className={styles.resNum}>예약번호: {detail.reservationId}</p>
          </section>

          {/* 1. 차량 정보 */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>차량 정보</h3>
            <div className={styles.carInfoCard}>
              <img src={detail.carImg || '/sample-car.png'} alt={detail.carName} />
              <div className={styles.carText}>
                <span className={styles.brand}>{detail.brand}</span>
                <h4>{detail.carName}</h4>
                <p>{detail.fuel} · 자동변환</p>
              </div>
            </div>
          </section>

          {/* 2. 대여/반납 정보 */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>이용 정보</h3>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <div className={styles.iconLabel}><FontAwesomeIcon icon={faClock} /> 대여 일시</div>
                <p>{detail.rentalDate}</p>
              </div>
              <div className={styles.infoItem}>
                <div className={styles.iconLabel}><FontAwesomeIcon icon={faClock} /> 반납 일시</div>
                <p>{detail.returnDate}</p>
              </div>
              <div className={styles.infoItem + ' ' + styles.fullWidth}>
                <div className={styles.iconLabel}><FontAwesomeIcon icon={faMapMarkerAlt} /> 대여/반납 장소</div>
                <p><strong>{detail.parkingName}</strong></p>
                <p className={styles.address}>{detail.parkingAddress}</p>
              </div>
            </div>
          </section>

          {/* 3. 결제 정보 */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>결제 상세</h3>
            <div className={styles.paymentCard}>
              <div className={styles.priceRow}>
                <span>총 결제금액</span>
              </div>
              <div className={styles.priceRow}>
                <span>결제 일시</span>
                <span>{detail.createdAt}</span>
              </div>
              <div className={styles.priceRow}>
                <span>결제 번호</span>
                <span>{detail.paymentId}</span>
              </div>
            </div>
          </section>

          {/* 하단 액션 버튼 */}
          <div className={styles.actions}>
            {detail.status === '이용예정' && (
              <button className={styles.cancelBtn} onClick={handleCancelRequest}>
                예약 취소하기
              </button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MypageReservationDetail;