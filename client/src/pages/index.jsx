import { Box, Typography, Backdrop, CircularProgress, Divider, FormControl, Modal, TextField } from '@mui/material';
import React from 'react';
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import useEth from '../contexts/EthContext/useEth';
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';
import CustomButton from '../components/CustomButton';
import { useNavigate } from 'react-router-dom';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import { grey } from '@mui/material/colors';
import '../App.css';
import { useState } from 'react';
import logo from '../assets/logo.png';
import VideoCover from 'react-video-cover'
import BackgroundVideo from '../assets/BackgroundVideo.mp4'
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  input: {
    background: "rgb(232, 241, 250)"
  }
}));



const Home = () => {
    const {
        state: { contract, accounts, role, loading },
        dispatch,
    } = useEth();
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const classes = useStyles();

    const registerUser = async (roleType) => {
        console.log('user');
        console.log(accounts[0]);
        try {
          console.log("Role: ", roleType);

          console.log("Name: ", userName);
            await contract.methods.addUser(userName, roleType).send({ from: accounts[0] });
            console.log("done");

            if(roleType === 'manufacturer') {
              // console.log(".... Role: ", await contract.methods.getSenderRole(accounts[0]).call({ from: accounts[0] }));
              dispatch({
                type: 'ADD_MANUFACTURER'
              })
            }
            else if(roleType === 'retailer') {
              dispatch({
                type: 'ADD_RETAILER'
              })
            }
            else if(roleType === 'wholesaler') {
              dispatch({
                type: 'ADD_WHOLESALER'
              })
            }
            else if(roleType === 'medicalstore') {
              dispatch({
                type: 'ADD_MEDICALSTORE'
              })
            }
            else if(roleType === 'patient') {
              dispatch({
                type: 'ADD_PATIENT'
              })
            }
            
            
        } catch (err) {
            console.log(err);
        }
    }

    const ActionSection = () => {
        if(!accounts) {
            return (
                <Typography variant='h5' color='white'>
                Open your MetaMask wallet to get connected, then refresh this page
            </Typography>
            )
        } else {
          
          if (role === 'unknown' || role === undefined || role === null || role.length == 0) {
              return (
                <Box display='flex' flexDirection='column' alignItems='center'>

                  <Typography variant='h6' color='white'>Register Here</Typography>
                  <Box display='flex' alignItems='center' my={1} mb={1}>
                    <FormControl fullWidth>
                      <TextField
                        inputProps={{ background: 'white'}}
                        key="username"
                        autoFocus="autoFocus"
                        variant='outlined'
                        placeholder='Enter Name'
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        InputProps={{ style: { fontSize: '15px' }, className: classes.input }}
                        InputLabelProps={{ style: { fontSize: '15px' } }}
                        size='small'
                      />
                    </FormControl>
                  </Box>
                  <Typography variant='h6' color='white' mb={2}>as</Typography>
                  
                  <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                  <Box mx={0.5} sx={{ width: 200}}>
                    <CustomButton text='Manufacturer' handleClick={() => registerUser('manufacturer')}>
                      <PersonAddAlt1RoundedIcon style={{ color: 'white' }} />
                    </CustomButton>
                  </Box>
                  <Box mx={0.5} mb={1} sx={{ width: 200}}>
                    <CustomButton text='Wholesaler' handleClick={() => registerUser('wholesaler')} width={200}>
                      <PersonAddAlt1RoundedIcon style={{ color: 'white' }} />
                    </CustomButton>
                  </Box>
                  <Box mx={0.5} mb={1} sx={{ width: 200}}>
                    <CustomButton text='Retailer' handleClick={() => registerUser('retailer')}>
                      <PersonAddAlt1RoundedIcon style={{ color: 'white' }} />
                    </CustomButton>
                  </Box>
                  
                  <Box mx={0.5} mb={1} sx={{ width: 200}}>
                    <CustomButton text='Medical Store' handleClick={() => registerUser('medicalstore')}>
                      <PersonAddAlt1RoundedIcon style={{ color: 'white' }} />
                    </CustomButton>
                  </Box>
                  <Box mx={0.5} mb={1} sx={{ width: 200}}>
                    <CustomButton text='Patient' handleClick={() => registerUser('patient')}>
                      <PersonAddAlt1RoundedIcon style={{ color: 'white' }} />
                    </CustomButton>
                  </Box>


                  </Box>



                  {/* <Typography variant='h5' color='white'>
                    If you are a patient or a doctor, ask one of the above to register for you! 🫶
                  </Typography> */}
                </Box>
              )
            } else if(role === 'manufacturer') {
              return (
                  <CustomButton text='Manufacturer Portal' handleClick={() => navigate('/user')}>
                      <LoginRoundedIcon style={{ color: 'white'}} />
                  </CustomButton>
              )
            } else if(role === 'retailer') {
              return (
                  <CustomButton text='Retailer Portal' handleClick={() => navigate('/user')}>
                      <LoginRoundedIcon style={{ color: 'white'}} />
                  </CustomButton>
              )
            } else if(role === 'wholesaler') {
              return (
                  <CustomButton text='Wholesaler Portal' handleClick={() => navigate('/user')}>
                      <LoginRoundedIcon style={{ color: 'white'}} />
                  </CustomButton>
              )
            } else if(role === 'medicalstore') {
              return (
                  <CustomButton text='Medical Store Portal' handleClick={() => navigate('/user')}>
                      <LoginRoundedIcon style={{ color: 'white'}} />
                  </CustomButton>
              )
            } else if(role === 'patient') {
              return (
                  <CustomButton text='Patient Portal' handleClick={() => navigate('/user')}>
                      <LoginRoundedIcon style={{ color: 'white'}} />
                  </CustomButton>
              )
            } else {
              return (
                <> 
                Hello World
                </>
              )
            }
        }
    }

    if (loading) {
        return (
          <>
          {/* Hello World */}
            <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={loading}>
            <CircularProgress color='inherit' />
          </Backdrop>
          </>
        )
    } else {
        return (
            <Box
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
            width='100vw'
            height='100vh'
            id='background'
          >
            <Box
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                top: 0,
                left: 0,
                zIndex: -1,
              }}
            >
              <VideoCover
                videoOptions={{
                  src: BackgroundVideo,
                  autoPlay: true,
                  loop: true,
                  muted: true,
                }}
              />
            </Box>
            <Box id='home-page-box' display='flex' flexDirection='column' justifyContent='center' alignItems='center' p={9}>
              {/* <img src={logo} alt='med-chain-logo' style={{ height: 50 }} /> */}
              <Box mt={0.3}>
                <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center'>

                <img src={logo} alt='aushadhi-track-logo' style={{ height: 200, weight: 200 }} />

              </Box>
                <Typography variant='h4' color='white'>
                  AUSHADHI TRACK
                </Typography>
              </Box>
              <Box mt={2} mb={5}>
                <Typography variant='h5' color='white'>
                  Supply Chain Management (Drugs and Pharmaceuticals)
                </Typography>
              </Box>
              <ActionSection />
              {/* <Box display='flex' alignItems='center' mt={2}>
                <Typography variant='h5' color='white'>
                  powered by{' '}
                </Typography>
                <Box mx={1}>
                  <img
                    src='https://cdn.worldvectorlogo.com/logos/ethereum-1.svg'
                    alt='Ethereum logo vector'
                    style={{ height: 20 }}
                  ></img>
                </Box>
                <img
                  src='https://upload.wikimedia.org/wikipedia/commons/1/18/Ipfs-logo-1024-ice-text.png'
                  alt='Ethereum logo vector'
                  style={{ height: 20 }}
                ></img>
              </Box> */}
            </Box>
          </Box>
        )
    }
}

export default Home;