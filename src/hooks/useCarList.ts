import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getAvailableCars } from '../api/reservationApi.ts';
import { CarDetail } from '../types/carDetail'; // 타입을 별도 파일로 분리하는 것이 좋습니다.

export const useCarList = () => {
    const location = useLocation();
    const [carListData, setCarListData] = useState<CarDetail[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // URL 쿼리 파라미터 추출
    const queryParams = new URLSearchParams(location.search);
    const parkingId = queryParams.get('parkingId');
    const rentalDatetime = queryParams.get('rentalDatetime');
    const returnDatetime = queryParams.get('returnDatetime');


    const fetchCars = async () => {
        if (!parkingId || !rentalDatetime || !returnDatetime) {
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            setError(null);
            const cars = await getAvailableCars(parkingId, rentalDatetime, returnDatetime);
            setCarListData(cars);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchCars();
    }, [parkingId, rentalDatetime, returnDatetime]);


    return {
        carListData,
        isLoading,
        error,
        refetch: fetchCars,
        params: {
            parkingId,
            rentalDatetime,
            returnDatetime,
        },
        formatPrice: (price: number) => price.toLocaleString('ko-KR')
    };
};