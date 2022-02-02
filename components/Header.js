import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import {ConnectButton} from './ConnectButton';
import HeaderMenu from './HeaderMenu';
import Grid from '@mui/material/Grid';
import {styleHeaderContainer} from './SharedStyles';

export function Header(connectProps) {
  console.log('Header');
  console.log(connectProps);
  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="static">
        <Toolbar>
            <Grid container direction="row" justifyContent="space=around" style={styleHeaderContainer}>
                <Grid item xs={3}>
                    <HeaderMenu />
                </Grid>
                <Grid item xs={6}>
                </Grid>
                
                <Grid item xs={3} style={{paddingLeft:"10%"}}> 
                  <ConnectButton {...connectProps}/>
                </Grid>
            </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}