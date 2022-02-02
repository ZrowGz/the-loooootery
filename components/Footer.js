// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import {styleFooter, stlyeLink} from './SharedStyles';
// import Grid from '@mui/material/Grid';
// import TwitterIcon from '@mui/icons-material/Twitter';
// import { ConnectedContract } from './ConnectedContract';
// import Link from 'next/link';
// const TWITTER_HANDLE = 'jonValjonathan';
// const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
// const GITHUB_LINK = 'https://github.com/jonvaljonathan/hardhat-nextjs-mui-starter'



// export default function Footer({connectedContract}) {
//   return (
//     <Box sx={{ flexGrow: 1 }} style={styleFooter}>
//             <Grid container direction="row" justifyContent="space=around">
//                 <Grid item xs={3}>
//                 <TwitterIcon />
//                 <Link stlye={stlyeLink}
//                   href={TWITTER_LINK}            
//                 > 
//                   <a > {`built by @${TWITTER_HANDLE}`} </a>
//                 </Link>
//                 </Grid>
//                 <Grid item xs={6}>
//                   <ConnectedContract connectedContract={connectedContract} />
//                 </Grid>
//               <Grid item xs={3}>
//                 <Link href={GITHUB_LINK} >
//                   <a style={{color:'white'}}>Github Repo</a>
//                 </Link>
//               </Grid>
//             </Grid>
//     </Box>
//   );
// }