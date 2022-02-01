import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { styleLink, styleConnectButton, styleMenuItem } from './SharedStyles';
import Link from 'next/link';
import Typography from '@mui/material/Typography';

export default function HeaderMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        style={styleConnectButton}
      >
          Navigation
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose} style={styleMenuItem}>
            <Link href="/" as="/" style={styleLink}>
                <Typography> Home </Typography>
            </Link>
        </MenuItem>
        <MenuItem onClick={handleClose} style={styleMenuItem}>
            <Link href="/waveportal" as="/waveportal" style={styleLink}>
                <Typography> Wave Portal </Typography>
            </Link>
        </MenuItem>
        <MenuItem onClick={handleClose} style={styleMenuItem}>
            <Link href="/mintNFT" as="/mintNFT" style={styleLink}>
                <Typography> Mint NFT </Typography>
            </Link>
        </MenuItem>
        <MenuItem onClick={handleClose} style={styleMenuItem}>
            <Link href="/nftgame" as="/nftgame" style={styleLink}>
                <Typography> NFT Game </Typography>
            </Link>
        </MenuItem>
      </Menu>
    </div>
  );
}