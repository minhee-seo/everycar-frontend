import React from 'react'
import ResponsiveLayout from '../../../layouts/ResponsiveLayout.tsx'
import ResponsiveSwitch from '../../../components/responsive/ResponsiveSwitch.tsx';

import Mobile from './reservation_mobile/reservation_mobile.tsx';
import Desktop from './reservation_desktop/reservation_desktop.tsx';
import { useLocation } from 'react-router-dom';
import { ReservationInfo } from '../../../types/reservation.tsx';

interface LocationState {
    address?: string;
    reservationInfo?: ReservationInfo;
}

export default function Reservation() {
    const location = useLocation();

    const state = location.state as LocationState | null;

    const address = state?.address;
    const passedReservationInfo = state?.reservationInfo;

    return (
        <>
            <ResponsiveSwitch
                mobileComponent={
                    <Mobile
                        // address={address}
                        // reservationInfo={passedReservationInfo}
                    />
                }
                desktopComponent={
                    <Desktop
                        // address={address}
                        // reservationInfo={passedReservationInfo}
                    />
                }
            />
        </>
    );
}