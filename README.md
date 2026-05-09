# Everycar - 렌터카 예약 웹 서비스
<img width="276" height="100" alt="Image" src="https://github.com/user-attachments/assets/9a10458e-dc60-4cb2-b2a8-115466583aff" />
> K-디지털트레이닝 과정 팀 프로젝트 | 11인 팀 | 팀장

<br>

## 프로젝트 소개
<img width="1184" height="469" alt="Image" src="https://github.com/user-attachments/assets/b83f413b-bfea-4142-9348-d256cb337400" />
차량 검색부터 예약·결제까지 한 번에 처리하는 렌터카 예약 웹 서비스입니다.  
사용자 페이지는 **React SPA**, 관리자 페이지는 **Thymeleaf 서버 렌더링**으로 구성했으며, 11명의 팀원이 역할을 나눠 개발했습니다.  
팀장으로서 프론트엔드·백엔드 설계 및 개발과 팀 일정 조율을 담당했습니다.

| 구분 | 내용 |
|---|---|
| 팀 구성 | 11명 (팀장 포함) |
| 담당 역할 | 팀장, 풀스택 개발 |
| 개발 기간 | 2024.11 ~ 2025.04 |

<br>

## 기술 스택

**Backend**
| 기술 | 버전 | 용도 |
|---|---|---|
| Java | 17 | 언어 |
| Spring Boot | 3.4.8 | 웹 프레임워크 |
| Spring Security | 6 | 인증/인가 |
| JJWT | - | JWT 토큰 발급/검증 |
| MyBatis | 3.0.4 | ORM |
| MySQL | - | 데이터베이스 |
| Thymeleaf | - | 관리자 페이지 SSR |

**Frontend**
| 기술 | 버전 | 용도 |
|---|---|---|
| React | 18 | UI 프레임워크 |
| TypeScript | - | 정적 타입 (일부 적용) |
| Redux Toolkit | 2.x | 전역 상태 관리 (인증 상태) |
| React Router | v6 | SPA 라우팅 / Protected Route |
| Axios | 1.x | HTTP 클라이언트 (토큰 인터셉터 포함) |
| SCSS / SCSS Modules | - | 컴포넌트 스코프 스타일링 |
| react-responsive | 10.x | 디바이스별 컴포넌트 분기 |
| PortOne Browser SDK | v2 | 결제 게이트웨이 (카드 / 간편결제) |
| KakaoMap API | - | 주차장 위치 지도 시각화 |
| react-hot-toast | 2.x | 모바일 알림 UX |
| date-fns | 4.x | 날짜 포맷 / 연산 |
| Swiper | 11.x | 메인 페이지 차량 슬라이드 |

**Infra**
| 기술 | 용도 |
|---|---|
| AWS EC2 | 백엔드 배포 |
| AWS S3 | 프론트엔드 정적 배포 |

<br>

## 기술적 도전과 해결 과정

### 1. 예외 상태 공통 오류 화면 처리

**문제 인식**

초반에는 API 호출 실패 처리를 각 페이지 컴포넌트 안에 개별적으로 작성했습니다. 그러다 보니 어떤 페이지는 빈 화면이 그냥 남고, 어떤 페이지는 콘솔에만 에러가 찍혔습니다. 사용자 입장에서는 화면이 멈춘 건지 로딩 중인 건지 알 수 없는 상태였고, 오류 UI도 페이지마다 제각각이었습니다.

**접근 방식**

오류 화면을 공통 컴포넌트(`ErrorView`)로 분리하고, `message`와 `onRetry` 콜백을 props로 받아 각 상황에 맞게 재사용할 수 있도록 설계했습니다. 차량 상세 조회(`useCarDetail`)처럼 사용자가 직접 재시도할 수 있는 경우에는 `refetch` 함수를 `onRetry`로 전달해 버튼을 표시하고, 단순 데이터 로딩 실패처럼 재시도가 의미 없는 경우에는 메시지만 노출하는 방식으로 구분했습니다.

```tsx
// useCarDetail.ts 에서 에러 상태를 노출하고
const { error, refetch } = useCarDetail();

// 페이지에서는 ErrorView에 맡김
if (error) return <ErrorView message={error} onRetry={refetch} />;
```

**남은 과제**

현재는 API 응답 실패에 대한 처리만 되어 있습니다. 런타임 렌더링 에러(예: undefined 접근으로 인한 컴포넌트 크래시)는 아직 잡지 못하고 있습니다. React의 `Error Boundary`를 도입해 렌더링 레이어의 예외까지 통합 처리하는 구조로 발전시키는 것이 목표입니다.

---

### 2. 디바이스별 컴포넌트 분리 (ResponsiveSwitch)

**문제 인식**

단순히 CSS 미디어쿼리로 요소를 숨기고 보이는 방식은 모바일과 PC 사이에 UX 흐름 자체가 달라져야 할 때 한계가 있습니다. 예약 페이지 하나만 봐도 PC는 지도와 검색 패널을 좌우로 배치하고, 모바일은 전체화면 지도 위에 바텀시트를 올리는 구조였습니다. 이를 한 컴포넌트 안에서 조건 분기로 처리하면 코드가 매우 복잡해집니다.

**접근 방식**

`react-responsive`의 `useMediaQuery`를 래핑한 `ResponsiveSwitch` 컴포넌트를 만들어, 기기에 따라 아예 다른 컴포넌트 트리를 렌더링하도록 했습니다.

```tsx
// 768px 이하이면 mobile, 초과이면 desktop 컴포넌트를 렌더링
const ResponsiveSwitch = ({ mobileComponent, desktopComponent, breakpoint = 768 }) => {
  const isMobile = useMediaQuery({ maxWidth: breakpoint });
  return isMobile ? mobileComponent : desktopComponent;
};
```

레이아웃 단계(공통 헤더/푸터 분기), 페이지 단계(예약, 차량 목록, 계약서 등), 컴포넌트 단계 모두 이 패턴을 일관되게 사용해 CSS로 숨기고 보이는 방식이 아닌 렌더링 자체를 분기하는 구조를 가져갑니다. 덕분에 모바일용/데스크탑용 파일이 명확히 분리되어 유지보수가 쉬워졌습니다.

**남은 과제**

현재 브레이크포인트가 768px로 고정되어 있어 태블릿 환경에서는 어느 쪽에도 최적화되지 않은 화면이 나올 수 있습니다. 태블릿 구간을 별도로 정의하거나, SCSS의 브레이크포인트 맵(`_media.scss`)과 기준을 통일하는 작업이 필요합니다.

---

### 3. KakaoMap API 동적 로딩과 React 생명주기 연결

**문제 인식**

KakaoMap SDK는 `<script>` 태그로 외부에서 불러오는 라이브러리로, `window.kakao` 전역 객체가 생성된 이후에만 지도를 초기화할 수 있습니다. CRA 환경에서 React 컴포넌트가 마운트되는 시점과 SDK 로드 완료 시점이 맞지 않아 `window.kakao is not defined` 오류가 반복됐습니다.

**접근 방식**

스크립트 로딩을 Promise로 감싸 `async/await`로 처리할 수 있게 만들었습니다. 이미 로드된 경우에는 즉시 resolve하는 캐싱 처리도 포함시켜 중복 로딩을 방지했습니다.

```ts
// utils/LoadKaKaoMap.ts
export const loadKakaoMap = (): Promise<typeof window.kakao> => {
  return new Promise((resolve, reject) => {
    // 이미 로드됐으면 즉시 반환 (중복 로딩 방지)
    if (window.kakao && window.kakao.maps) {
      resolve(window.kakao);
      return;
    }
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=...&autoload=false`;
    script.onload = () => window.kakao.maps.load(() => resolve(window.kakao));
    script.onerror = reject;
    document.head.appendChild(script);
  });
};
```

지도 인스턴스는 부모 컴포넌트가 state로 들고 있고(`setMap`), 주차장 마커 표시 로직은 `useEffect` 의존성 배열에 `map` 인스턴스와 `parkingData`를 함께 두어 지도가 준비된 이후에만 마커가 그려지도록 했습니다. 메인 페이지에서 지역명을 입력하고 예약 페이지로 진입하면 `location.state`로 키워드가 전달되어 해당 지역의 주차장 목록과 마커가 자동으로 표시됩니다.

**남은 과제**

현재는 지도 전체를 클라이언트에서 렌더링합니다. KakaoMap SDK API 키가 소스 코드에 노출되어 있어, 환경 변수로 분리하는 작업이 필요합니다.

---

### 4. 로그인 후 이전 페이지 자동 복귀

**문제 인식**

비로그인 상태에서 예약 진행을 시도하면 로그인 페이지로 이동하는 것까지는 구현했지만, 로그인 완료 후 항상 메인(`/`)으로 가버렸습니다. 사용자 입장에서는 예약하려던 차량을 다시 찾아야 하는 불편이 생겼습니다.

**접근 방식**

React Router v6의 `Navigate` 컴포넌트와 `state` prop을 활용해 리디렉션 시 원래 경로를 전달하고, 로그인 성공 시 해당 경로로 되돌아가도록 구현했습니다.

```tsx
// ProtectedRoute.tsx - 비인증 시 현재 경로를 state로 담아 login 페이지로 이동
if (!isAuthenticated) {
  return <Navigate to="/login" state={{ from: location }} replace />;
}

// Login.tsx - 로그인 성공 시 원래 있던 경로로 복귀 (없으면 메인)
const from = location.state?.from?.pathname || "/";

const handleSubmit = async (e) => {
  const result = await dispatch(loginUser({ userId, userPassword }));
  if (loginUser.fulfilled.match(result)) {
    navigate(from, { replace: true }); // 브라우저 히스토리를 오염시키지 않도록 replace
  }
};
```

`replace: true`를 사용한 이유는, 복귀 후 사용자가 뒤로 가기를 눌렀을 때 다시 로그인 페이지로 돌아가는 UX를 방지하기 위해서입니다.

**남은 과제**

현재는 pathname만 저장하고 있어 쿼리스트링(`?carId=...&rentalDatetime=...`)이 포함된 경로로의 완전한 복귀가 되지 않습니다. `location.state?.from`에 `search`까지 포함해 복귀 경로를 완성하는 것이 다음 개선 대상입니다.

<br>

## API 목록

Base URL: `http://localhost:8080/api`  
인증이 필요한 API는 요청 헤더에 `Authorization: Bearer {accessToken}`을 포함합니다.

### 인증

| Method | Endpoint | 설명 | 인증 |
|---|---|---|---|
| `POST` | `/login` | 로그인 (accessToken, refreshToken 발급) | ✗ |
| `POST` | `/refresh` | 액세스 토큰 재발급 | ✗ |
| `POST` | `/api/logout` | 로그아웃 | ✓ |

### 예약

| Method | Endpoint | 설명 | 인증 |
|---|---|---|---|
| `GET` | `/parking?region={지역}` | 지역별 주차장 목록 조회 | ✗ |
| `GET` | `/reservation/cars?parkingId=&rentalDatetime=&returnDatetime=` | 예약 가능 차량 목록 조회 | ✗ |
| `GET` | `/reservation/cars/{carId}?rental_datetime=&return_datetime=` | 차량 상세 정보 조회 | ✗ |
| `GET` | `/reservation/contract-details?carId=&userNum=&parkingId=&rentalDatetime=&returnDatetime=` | 계약서 정보 조회 | ✓ |
| `POST` | `/reservation/complete` | 결제 검증 및 예약 확정 | ✓ |

### 마이페이지

| Method | Endpoint | 설명 | 인증 |
|---|---|---|---|
| `GET` | `/mypage/{userId}` | 내 프로필 정보 조회 | ✓ |
| `PUT` | `/mypage/update` | 프로필 정보 수정 | ✓ |
| `GET` | `/mypage/reservation/{userNum}` | 내 예약 목록 조회 | ✓ |
| `GET` | `/mypage/reservation/detail/{reservationId}` | 예약 상세 내역 조회 | ✓ |
