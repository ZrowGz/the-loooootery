import { stylePaper, styleLink } from './SharedStyles';
import { Paper, Typography } from '@mui/material';
import Link from 'next/link';

export const ConnectedContract = ({connectedContract}) => {
    let ETHERSCAN_LINK = 'https://rinkeby.etherscan.io/address/';
    if (connectedContract) {
      ETHERSCAN_LINK = `https://rinkeby.etherscan.io/address/${connectedContract.address}`
    } 
    // justify center?
    return (
        <Link href={ETHERSCAN_LINK} >
                <a style={{color:'white'}}>View contract on Etherscan</a>
        </Link>
    )
}