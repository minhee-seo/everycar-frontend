// utils/loadKakaoMap.ts
// 카카오 api 로드
export const loadKakaoMap = (): Promise<typeof window.kakao> => {
  return new Promise((resolve, reject) => {
    if (window.kakao && window.kakao.maps) {
      resolve(window.kakao);
      return;
    }

    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=1fc1193a647e2229d02c81559ac53d9e&autoload=false&libraries=services,clusterer`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => resolve(window.kakao));
    };

    script.onerror = reject;

    document.head.appendChild(script);
  });
};
