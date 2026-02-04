import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './ContractMobile.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faCreditCard, faMobileScreenButton, faCheckCircle, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { reservationService } from '../../api/reservationService.ts';
import CarNameMapper from '../../utils/carnamemapper.ts';
import PaymentButton from '../../components/payment/PaymentButton.tsx';

function ContractMobile() {
  const navigate = useNavigate();
  const location = useLocation();

  // 파라미터에서 car 정보 추출
  const queryParams = new URLSearchParams(location.search);
  const carId = queryParams.get('carId');
  const parkingId = queryParams.get('parkingId');
  const rentalDatetime = queryParams.get('rentalDatetime');
  const returnDatetime = queryParams.get('returnDatetime');

  // 유저 정보 불러오기 
  const { userName, userId, userNum } = useSelector((state: RootState) => state.user);

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [contractData, setContractData] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // 숫자만 입력 가능하도록 제한
    if (name.startsWith('phone') && !/^\d*$/.test(value)) return;

    // 글자 수 충족 시 다음 칸으로 자동 포커스 이동
    if (name === 'phone2' && value.length === 4) {
      document.getElementById('phone3')?.focus();
    }
  };

  const [driverInfo, setDriverInfo] = useState({
    name: userName || '',
    phone1: '010',
    phone2: '',
    phone3: '',
  });

  useEffect(() => {
    // 오류처리
    if (!carId || !parkingId) {
      navigate(-1);
      return;
    }

    const loadData = async () => {
      try {
        setLoading(true);
        // 테스트용 파라미터
        const data = await reservationService.getContractDetails({
          carId: Number(carId),
          userNum: Number(userNum),
          parkingId: Number(parkingId)
        });
        setContractData(data);

      } catch (error) {
        console.error("데이터 로드 중 오류 발생:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handlePaymentSuccess = (paymentId: string) => {
    alert("예약이 확정되었습니다.");
    navigate('/myPage/reservations');
  };

  if (loading) return <div>로딩 중...</div>;
  if (!contractData) return <div>데이터가 없습니다.</div>;

  const { carDto, totalPrice, userDTO } = contractData;

  return (

    <>
      <div className={styles.container}>
        {/* 1. 자동차 정보 섹션 */}
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>대여 정보</h3>
          <div className={styles.carInfoCard}>
            <div className={styles.carText}>
              <span className={styles.carBrand}>{carDto.model.model_brand}</span>
              <h4>{carDto.model.model_name} ({carDto.car_fuel})</h4>
              <p className={styles.rentalPeriod}>{rentalDatetime}</p>
              <p className={styles.rentalPeriod}>{returnDatetime}</p>
              <p className={styles.location}>{carDto.parking.parking_address}</p>
            </div>
            <div className={styles.carImage}>
              <img
                src={`/main/car/${CarNameMapper(carDto.model.model_name)}.png`}
                alt={carDto.model.model_name}
              />
            </div>
          </div>
        </section>

        {/* 2. 개인 정보 섹션 */}
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>운전자 정보</h3>
          <div className={styles.infoBox}>
            <div className={styles.infoRow}>
              <span>이름</span>
              <p>홍길동</p>
            </div>
            <div className={styles.infoRow}>
              <span>연락처</span>
              <p>010-1234-5678</p>
            </div>
          </div>
        </section>

        {/* 3. 결제 수단 섹션 */}
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>결제 수단 선택</h3>
          <div className={styles.paymentMethods}>
            <button
              className={`${styles.methodBtn} ${paymentMethod === 'card' ? styles.active : ''}`}
              onClick={() => setPaymentMethod('card')}
            >
              <FontAwesomeIcon icon={faCreditCard} />
              <span>신용/체크카드</span>
            </button>
            <button
              className={`${styles.methodBtn} ${paymentMethod === 'kakao' ? styles.active : ''}`}
              onClick={() => setPaymentMethod('kakao')}
            >
              <FontAwesomeIcon icon={faMobileScreenButton} />
              <span>카카오페이</span>
            </button>
          </div>
        </section>

        {/* 4. 최종 결제 요약 */}
        <section className={`${styles.section} ${styles.summarySection}`}>
          <h3 className={styles.sectionTitle}>결제 금액</h3>
          <div className={styles.priceRow}>
            <span>대여 및 보험료</span>
            <p>{totalPrice}원</p>
          </div>
          <hr />
          <div className={`${styles.priceRow} ${styles.totalPrice}`}>
            <span>총 결제 금액</span>
            <p>{totalPrice}원</p>
          </div>
        </section>

      </div>
      {/* 하단 고정 버튼 */}
      <footer className={styles.footer}>
        <div className={styles.agreeText}>
          <FontAwesomeIcon icon={faCheckCircle} className={styles.checkIcon} />
          예약 조건 및 개인정보 처리방침에 동의합니다.
        </div>
        <PaymentButton
          amount={totalPrice}
          orderName={`${carDto.model.model_brand} ${carDto.model.model_name} 대여`}
          payMethod={paymentMethod}
          customer={{
            name: driverInfo.name,
            phone: `${driverInfo.phone1}${driverInfo.phone2}${driverInfo.phone3}`,
            email: userDTO?.userEmail || ""
          }}
          carId={Number(carId)}
          userNum={Number(userNum)}
          rentalDatetime={rentalDatetime || ""}
          returnDatetime={returnDatetime || ""}
          onSuccess={handlePaymentSuccess}
          className={styles.submitBtn} // 모바일 스타일 적용을 위해 클래스 전달
        />
      </footer>
    </>
  );
}

export default ContractMobile
