// import * as React from 'react';
// import Typography from '@mui/material/Typography';
// import openZeppelin from '../public/assets/openZeppelin.jpg'
// import alchemy from '../public/assets/alchemy.jpg';
// import ethers from '../public/assets/ethers.jpg';
// import hardhat from '../public/assets/hardhat.jpg';
// import materialui from '../public/assets/materialui.png';
// import nextjs from '../public/assets/nextjs.jpg';
// import Image from 'next/dist/client/image'; //put image link here
// import Grid from '@mui/material/Grid';
// import { Paper } from '@mui/material';
// import {stylePaper, styleContainer} from './SharedStyles';


// const friends = [
//     {
//         title:'Hardhat',
//         subheader:'Write, test, and deploy smart contracts',
//         img: hardhat,
//         url:'https://hardhat.org/',
//     },
//     {
//         title:'Ethers.js',
//         subheader:'Javascript library that lets your client iniate blockchain transactions',
//         img: ethers,
//         url:'https://docs.ethers.io/v5/',
//     },
//     {
//         title:'Alchemy',
//         subheader:'Blockchain explorer and API. Allows us to add our contracts and transactions to the blockchain.',
//         img: alchemy,
//         url:'https://www.alchemy.com/',
//     },
//     {
//         title:'Open Zeppelin',
//         subheader:'Library of smart trusted and tested contracts',
//         img: openZeppelin,
//         url:'https://openzeppelin.com/'
//     },
//     {
//         title:'Material UI',
//         subheader:'React UI library to make things pretty',
//         img: materialui,
//         url:'https://mui.com/',

//     },
//     {
//         title:'Nextjs',
//         subheader:'React framework to quickly deploy prodution ready apps',
//         img: nextjs,
//         url:'https://nextjs.org/',

//     },   
// ]

// export default function FriendsCards() {

//   return (
//     <div style={styleContainer}>
//     <Grid container spacing={3} align="center" style={{marginLeft:'3%', marginRight:'3%', maxWidth:'1200px'}}>
//     {friends.map((friend, index) => (
//         <Grid item xs={4} key={index}>
//             <Paper style={stylePaper}>
   
//             <Typography variant='h4'>
//                 {friend.title}
//             </Typography>
//             <Typography variant='body1'>
//                 {friend.subheader}
//             </Typography>
//             <a href={friend.url}>
//                 <Image src={friend.img} alt={`${friend.title} logo`}/> // put this line in devilsLotto.js or index
//             </a>
//             </Paper>
//     </Grid>
//     ))}
//     </Grid>
//     </div>
//   );
// }