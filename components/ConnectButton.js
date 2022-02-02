import Button from '@material-ui/core/Button';
import { styleConnectButton } from './SharedStyles';
import { checkIfWalletIsConnected } from '../lib/checkIfWalletIsConnected';

export const ConnectButton = (connectProps) => {
    
    const { currentAccount } = connectProps;
    const { setConnectWallet } = connectProps;
    
    return (
    <div>
        {currentAccount === "" ? (
            <Button style={styleConnectButton} onClick={setConnectWallet}> Connect to MetaMask </Button>
        ) : (
            <Button style={styleConnectButton}>Connected</Button>
        )}
    </div>
    )
}