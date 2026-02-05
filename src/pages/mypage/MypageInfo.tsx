import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { userApi } from '../../api/mypageUserApi';
import ErrorView from '../../components/common/DataErrorView';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { useLogout } from '../../hooks/useLogout';
import { RootState } from '../../store/index';
import { UserLicense, UserProfileResponse } from '../../types/mypage/UserProfileResponse';
import styles from './MypageInfo.module.scss';
import MypageSide from './MypageSide';
const MyPage = () => {

  // 
  // 유저정보 
  // 
  const { userNum, userName: reduxName, userId: reduxId } = useSelector((state: RootState) => state.user);

  // 수정 모드 상태
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 유저 정보 상태 (초기값은 Redux나 기본값에서 가져옴)
  const [userInfo, setUserInfo] = useState<UserProfileResponse>({
    userNum: Number(userNum),
    userId: reduxId || '',
    userName: '',
    userEmail: '',
    userPhone: '',
    userGender: 1,
    userBirth: '',
    userAddress: '',
    licenseType: '',
    licenseNumber: '',
    licenseExpiry: ''
  });

  // 1. 유저 정보 상태에 licenseInfo 추가 (초기값 null이면 미등록 상태)
  const [licenseInfo, setLicenseInfo] = useState<UserLicense | null>({
    type: '',
    number: '',
    expiry: ''
  });

  const [isLicenseEdit, setIsLicenseEdit] = useState(false);


  // 수정 취소 시 되돌리기 위한 백업 데이터
  const [backupInfo, setBackupInfo] = useState({ ...userInfo });

  // 데이터 로드
  const fetchUserData = async () => {
    if (!reduxId) return;

    try {
      setIsLoading(true);
      setError(null);
      const response = await userApi.getUserProfile(Number(userNum));

      if (!response.data) throw new Error("유저 데이터를 찾을 수 없습니다.");

      setUserInfo(response.data);
      setBackupInfo(response.data);

      if (response.data.licenseNumber) {
        setLicenseInfo({
          type: response.data.licenseType || '1종 보통',
          number: response.data.licenseNumber,
          expiry: response.data.licenseExpiry || ''
        });
      }
    } catch (error: any) {
      console.error("데이터 로드 실패:", error);
      setError(error.response?.data?.message || "회원 정보를 불러오는 데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [reduxId, userNum]);

  // 전화번호 포맷팅 (출력용)
  const formatPhone = (phone: string) => {
    return phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  };

  // 입력값 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prev: any) => ({ ...prev, [name]: value }));
  };

  // 수정 시작
  const handleEditStart = () => {
    setBackupInfo({ ...userInfo }); // 현재 상태 백업
    setIsEditMode(true);
  };

  // 수정 취소
  const handleCancel = () => {
    setUserInfo({ ...backupInfo }); // 백업본으로 복구
    setIsEditMode(false);
  };

  // 2. 수정 저장 API 호출
  const handleSave = async () => {
    try {
      await userApi.updateUserProfile(userInfo);
      setIsEditMode(false);
      setBackupInfo({ ...userInfo });
      alert("정보가 수정되었습니다.");
    } catch (error) {
      console.error("저장 실패:", error);
      alert("저장 중 오류가 발생했습니다.");
    }
  };

  // 로그아웃
  const { handleLogout } = useLogout();

  if (isLoading) return <LoadingSpinner />;

  if (error) {
    return (
      <ErrorView
        title="네트워크 오류"
        message={error}
        onRetry={fetchUserData}
      />
    );
  }
  // 
  // 면허
  // 

  // 면허 삭제 핸들러
  const handleDeleteLicense = () => {
    if (window.confirm("등록된 면허 정보를 삭제하시겠습니까?")) {
      setLicenseInfo(null);
      alert("삭제되었습니다.");
    }
  };

  return (
    <div className="container">
      <div className={styles.myPageWrapper}>
        {/* 사이드 메뉴 */}
        <MypageSide />

        {/* 메인 콘텐츠 */}
        <main className={styles.main}>
          <section className={styles.content}>
            <header className={styles.header}>
              <h3>개인정보 관리</h3>
              <p>회원님의 정보를 안전하게 관리하세요.</p>
            </header>

            <section className={styles.infoSection}>
              {/* 아이디 - 절대 수정 불가 */}
              <div className={styles.inputGroup}>
                <label>아이디 (수정 불가)</label>
                <input
                  type="text"
                  value={userInfo.userId}
                  readOnly
                  className={styles.permanentReadOnly}
                />
              </div>

              {/* 이름 - 절대 수정 불가 */}
              <div className={styles.inputGroup}>
                <label>이름 (수정 불가)</label>
                <input
                  type="text"
                  value={userInfo.userName}
                  readOnly
                  className={styles.permanentReadOnly}
                />
              </div>

              {/* 이메일 */}
              <div className={styles.inputGroup}>
                <label>이메일</label>
                <input
                  type="email"
                  name="userEmail"
                  value={userInfo.userEmail}
                  onChange={handleChange}
                  readOnly={!isEditMode}
                  className={!isEditMode ? styles.readOnly : styles.editInput}
                />
              </div>

              {/* 휴대폰 번호 */}
              <div className={styles.inputGroup}>
                <label>휴대폰 번호</label>
                <input
                  type="text"
                  name="userPhone"
                  value={isEditMode ? userInfo.userPhone : formatPhone(userInfo.userPhone)}
                  onChange={handleChange}
                  readOnly={!isEditMode}
                  className={!isEditMode ? styles.readOnly : styles.editInput}
                  placeholder="숫자만 입력해 주세요"
                />
              </div>

              <div className={styles.row}>
                {/* 성별 */}
                <div className={styles.inputGroup}>
                  <label>성별</label>
                  <div className={`${styles.genderGroup} ${styles.readOnlyGender}`}>
                    <button type="button" className={userInfo.userGender === 1 ? styles.selected : ''}>남성</button>
                    <button type="button" className={userInfo.userGender === 2 ? styles.selected : ''}>여성</button>
                  </div>
                </div>

                {/* 생년월일 */}
                <div className={styles.inputGroup}>
                  <label>생년월일</label>
                  <input
                    type="date"
                    value={userInfo.userBirth}
                    readOnly
                    className={styles.permanentReadOnly}
                  />
                </div>
              </div>

              {/* 주소 */}
              <div className={styles.inputGroup}>
                <label>주소</label>
                <div className={styles.withButton}>
                  <input
                    type="text"
                    name="userAddress"
                    value={userInfo.userAddress}
                    onChange={handleChange}
                    readOnly={!isEditMode}
                    className={!isEditMode ? styles.readOnly : styles.editInput}
                    placeholder="주소를 입력하세요"
                  />
                  {isEditMode && (
                    <button type="button" className={styles.outlineBtn}>주소찾기</button>
                  )}
                </div>
              </div>
            </section>

            {/* 하단 버튼 영역 */}
            <footer className={styles.actionButtons}>
              {!isEditMode ? (
                <button type="button" className={styles.editStartBtn} onClick={handleEditStart}>
                  정보 수정하기
                </button>
              ) : (
                <div className={styles.editActions}>
                  <button type="button" className={styles.saveBtn} onClick={handleSave}>
                    변경사항 저장
                  </button>
                  <button type="button" className={styles.cancelBtn} onClick={handleCancel}>
                    취소
                  </button>
                </div>
              )}
            </footer>
          </section>
          <section className={styles.content}>
            <div className={styles.sectionHeader}>
              <h4>운전면허 정보</h4>
              {!licenseInfo ? null : !isLicenseEdit ? (
                <div className={styles.headerActions}>
                  <button onClick={() => setIsLicenseEdit(true)}>수정</button>
                  <button className={styles.deleteText} onClick={handleDeleteLicense}>삭제</button>
                </div>
              ) : (
                <div className={styles.headerActions}>
                  <button onClick={() => setIsLicenseEdit(false)}>취소</button>
                </div>
              )}
            </div>

            {!licenseInfo ? (
              /* 등록된 면허가 없을 때 */
              <div className={styles.emptyLicense}>
                <p>등록된 면허 정보가 없습니다. 서비스를 이용하시려면 면허를 등록해 주세요.</p>
                <button className={styles.addBtn}>+ 면허 등록하기</button>
              </div>
            ) : (
              /* 면허 정보 표시/수정 영역 */
              <div className={`${styles.licenseCard} ${isLicenseEdit ? styles.editing : ''}`}>
                <div className={styles.inputGroup}>
                  <label>면허 종류</label>
                  <select
                    disabled={!isLicenseEdit}
                    value={licenseInfo.type}
                    className={!isLicenseEdit ? styles.readOnly : styles.editInput}
                  >
                    <option>1종 보통</option>
                    <option>2종 보통</option>
                    <option>1종 대형</option>
                  </select>
                </div>

                <div className={styles.inputGroup}>
                  <label>면허 번호</label>
                  <input
                    type="text"
                    value={licenseInfo.number}
                    readOnly={!isLicenseEdit}
                    className={!isLicenseEdit ? styles.readOnly : styles.editInput}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label>만료일 (적성검사 기간)</label>
                  <input
                    type="date"
                    value={licenseInfo.expiry}
                    readOnly={!isLicenseEdit}
                    className={!isLicenseEdit ? styles.readOnly : styles.editInput}
                  />
                </div>

                {isLicenseEdit && (
                  <button className={styles.licenseSaveBtn} onClick={() => setIsLicenseEdit(false)}>
                    면허 정보 저장
                  </button>
                )}
              </div>
            )}
          </section >
          <button
            type="button"
            className={styles.mobileLogoutBtn}
            onClick={handleLogout}
          >
            로그아웃
          </button>
        </main >
      </div >

    </div >
  );
};

export default MyPage;