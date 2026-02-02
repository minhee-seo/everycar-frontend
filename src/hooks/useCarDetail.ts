import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { CarDetailResponse, getCarDetail } from '../api/carDetail.ts';

export const useCarDetail = () => {
    const location = useLocation();
    const [data, setData] = useState<CarDetailResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [mapInstance, setMapInstance] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    // URL 파라미터 추출
    const queryParams = new URLSearchParams(location.search);
    const carId = queryParams.get('carId');
    const rentalDatetime = queryParams.get('rentalDatetime') || '';
    const returnDatetime = queryParams.get('returnDatetime') || '';

    // 1. 데이터 페칭 로직
    useEffect(() => {
        if (!carId || !rentalDatetime || !returnDatetime) return;

        const fetchData = async () => {
            try {
                setIsLoading(true);
                const result = await getCarDetail(carId, rentalDatetime, returnDatetime);
                setData(result);
            } catch (error) {
                console.error("상세 정보 호출 실패:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [carId, rentalDatetime, returnDatetime]);

    // 2. 지도 인스턴스 핸들러
    const handleMapLoad = useCallback((map: any) => {
        setMapInstance(map);
    }, []);

    // 3. 지도 마커 및 중심점 설정 로직
    useEffect(() => {
        if (!mapInstance || !data?.car?.parking) return;

        const { car } = data;
        const kakao = window.kakao;
        if (!kakao || !kakao.maps) return;

        const lat = car.parking_latitude ?? 37.5665;
        const lng = car.parking_longitude ?? 126.9780;
        const markerPosition = new kakao.maps.LatLng(lat, lng);

        mapInstance.relayout();
        const marker = new kakao.maps.Marker({
            position: markerPosition,
            map: mapInstance
        });

        mapInstance.setLevel(3);
        mapInstance.setCenter(markerPosition);

        const timer = setTimeout(() => {
            mapInstance.panTo(markerPosition);
        }, 100);

        return () => {
            marker.setMap(null);
            clearTimeout(timer);
        };
    }, [mapInstance, data]);

    // 4. 공통 포맷팅 유틸리티
    const formatPeriod = (start: string, end: string) => {
        const format = (dateStr: string) => dateStr.replace('T', ' ').slice(0, 16);
        return start && end ? `${format(start)} ~ ${format(end)}` : '';
    };

    // 예외처리
    const fetchData = useCallback(async () => {
        if (!carId) return;

        try {
            setIsLoading(true);
            setError(null);
            const result = await getCarDetail(carId, rentalDatetime, returnDatetime);
            setData(result);
        } catch (err: any) {
            setError(err.message || '데이터를 가져오지 못했습니다.');
        } finally {
            setIsLoading(false);
        }
    }, [carId, rentalDatetime, returnDatetime]); // 의존성 배열 확인

    // 2. 처음 로드될 때 실행
    useEffect(() => {
        fetchData();
    }, [fetchData]);
    
    return {
        data,
        isLoading,
        rentalDatetime,
        returnDatetime,
        handleMapLoad,
        formatPeriod,
        formatPrice: (price: number) => price?.toLocaleString() ?? '0',
        error,
        refetch: fetchData
    };
};