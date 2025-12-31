import ResponsiveSwitch from '../../components/responsive/ResponsiveSwitch.tsx';
import ContractDesktop from './ContractDesktop.tsx';
import ContractMobile from './ContractMobile.tsx';

const Contract = () => {
    return (
        <ResponsiveSwitch
            mobileComponent={<ContractMobile />}
            desktopComponent={<ContractDesktop />}
        />
    );
};


export default Contract;