import ResponsiveSwitch from '../../components/responsive/ResponsiveSwitch';
import ContractDesktop from './ContractDesktop';
import ContractMobile from './ContractMobile';

const Contract = () => {
    return (
        <ResponsiveSwitch
            mobileComponent={<ContractMobile />}
            desktopComponent={<ContractDesktop />}
        />
    );
};


export default Contract;