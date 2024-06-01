import { AppBar, Chip, Toolbar, Box, Typography } from '@mui/material';
import React from 'react';
import useEth from '../../contexts/EthContext/useEth';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';

import { grey, teal } from '@mui/material/colors';
import logo from '../../assets/logo.png';

const HeaderAppBar = () => {
    const {
        state: { accounts, role },
    } = useEth();

    const username = window.sessionStorage.getItem("username");
    console.log("username:   ", username);

    return (
        <AppBar position='static' style={{ backgroundColor: 'white' }}>
            <Toolbar>
                <Box display='flex' justifyContent='space-between' alignItems='center' width='100%'>
                    
                <a href='/'>
                <img src={logo} alt='aushadhi-track-logo' style={{ height: 60, weight: 60 }} />
              </a>
                    <Typography variant='h3' color={"#008ECC"} ml={2} sx={{ fontFamily: 'sans-serif'}}>
                        Aushadhi Track
                    </Typography>
                    <Box flexGrow={1} />
                    <Box display='flex' alignItems='center'>
                        <Box mb={0.1}>
                            <PersonRoundedIcon style={{ color: grey[700], fontSize: '22px' }} />
                        </Box>
                        <Box ml={0.5} mr={2}>
                            <Typography variant='h6' color='black'>
                                {username ? username : 'Wallet not connected'}
                            </Typography>
                        </Box>
                        <Chip 
                            label={role === 'unknown' ? 'not registered': role 
                            }
                            style={{ fontSize: '12px', backgroundColor: "#008ECC", color: 'white' }} 
                        />
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default HeaderAppBar;