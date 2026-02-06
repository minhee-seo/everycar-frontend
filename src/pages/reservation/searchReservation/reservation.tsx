import React from 'react'
import ResponsiveLayout from '../../../layouts/ResponsiveLayout'
import ResponsiveSwitch from '../../../components/responsive/ResponsiveSwitch';

import Mobile from './reservation_mobile/reservation_mobile';
import Desktop from './reservation_desktop/reservation_desktop';
import { useLocation } from 'react-router-dom';
import { ReservationInfo } from '../../../types/ReservationInfo';

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