import { Box, Divider, FormControl, Modal, TextField, Typography, Backdrop, CircularProgress } from '@mui/material';
import { Chip, IconButton } from '@mui/material'
import { DropzoneAreaBase } from 'material-ui-dropzone';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import React, { useCallback } from 'react';
import { useState } from 'react';
import CustomButton from '../../components/CustomButton';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import useEth from '../../contexts/EthContext/useEth';
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';
import useAlert from '../../contexts/AlertContext/useAlert';
// import AddRecordModal from './AddRecordModal';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import ipfs from '../../ipfs';
import Record from '../../components/Record';
import MyRecord from '../../components/MyRecord';

const User = () => {
    const {
        state: { contract, accounts, role, loading },
    } = useEth();
    const { setAlert } = useAlert();

    const [drugExist, setDrugExist] = useState(false);
    const [searchDrugId, setSearchDrugId] = useState('');
    const [addDrugId, setAddDrugId] = useState('');
    const [addDrugName, setAddDrugName] = useState('');
    const [addFileName, setAddFileName] = useState('');
    const [records, setRecords] = useState([]);
    const [addRecord, setAddRecord] = useState(false);
    const [myRecords, setMyRecords] = useState([]);
    const [myRecordsExist, setMyRecordsExist] = useState(false);

    const [file, setFile] = useState(null)
    const [buffer, setBuffer] = useState(null)

    const searchDrug = async () => {
        try {

          console.log(searchDrugId);
            const drugExists = await contract.methods.checkDrugExists(searchDrugId).call({ from: accounts[0] });
            if(drugExists) {
                const records = await contract.methods.getDrugRecord(searchDrugId).call({ from: accounts[0] });
                console.log(records);
                setRecords(records);
                console.log(" Index Record: ", records);
                setSearchDrugId('');
                setDrugExist(true);

            } else {
                setAlert('Drug does not exist', 'error');
            }
        } catch (err) {
            console.log(err);
        }
    }

    const addDrug = async () => {
        try {
          // setAddRecord(true);
          await contract.methods.addDrug(addDrugId, addDrugName, "temp_file", "hash").send({ from: accounts[0] });

        } catch (err) {
            console.log(err);
        }
    }

    const handleFileChange = fileObj => {
      const { file } = fileObj

      setFile(file)
      console.log('file.name :>> ', file.name)
  
      const reader = new FileReader()
      reader.readAsArrayBuffer(file)
      reader.onloadend = () => {
        const buffer = Buffer.from(reader.result)
        setBuffer(buffer)
      }

      console.log("add record model done -----");
      console.log("\nfile: ", file, "\n\n");
    }

    // const addRecordCallback = useCallback(
    //     async (buffer, drugId, filename) => {
    
    const addRecordCallback = async (buffer, drugId, filename)  => {
            if(!drugId) {
                setAlert('Please search for a drug first', 'error');
                return;
            }


            try {
              console.log("\n\n Callback buffer 1: ", buffer, "\n\n");
              console.log("\n\n Callback file 1: ", filename, "\n\n");
              console.log("\n\n\n1\n\n\n");
                const res = await ipfs.add(buffer);
                const ipfsHash = res[0].hash;
                console.log("IPFS Hash: ", ipfsHash);
                console.log("\n\n\n2\n\n\n");

                if(ipfsHash && filename) {
                  setAddRecord(false);
                  console.log("Name, Id: ", addDrugName, addDrugId);
                  console.log("\n\n Callback file: ", file, "\n\n");
                  await contract.methods.addDrug(addDrugId, addDrugName, filename, ipfsHash).send({ from: accounts[0] });
                  
                  console.log("\n\n\n3\n\n\n");
                    // await contract.methods.addRecord(drugId, drugName, filename).send({ from: accounts[0] });
                    setAlert('New record uploaded', 'success');

                    setAddDrugId('');
                    setAddDrugName('');
                    setFile(null);

                    // const f = await ipfs.get(ipfsHash);
                    const records = await contract.methods.getDrugRecord(addDrugId).call({ from: accounts[0] });
                    setRecords(records);

                } 
            } catch (err) {
              setAddDrugId('');
              setAddDrugName('');
              setFile(null);
                setAlert('Record upload failed', 'error');
                console.log(err);
            }
        }
        // [addDrugId, accounts, contract]
    // )


    const getMyRecords = async () => {
      const temp = await contract.methods.getDrugsListFromUser(accounts[0]).call({ from: accounts[0] });
      if(temp && temp.length > 0) {
        console.log(temp);
        setMyRecordsExist(true);
        setMyRecords(temp);
      }
    }

    if(loading) {
        return (
            <Backdrop sx={{
                color: '#fff',
                zIndex: theme => theme.zIndex.drawer + 1
            }} open={loading}>
                <CircularProgress color='inherit' />
            </Backdrop>
        )
    } else {
        return (
        <Box display='flex' justifyContent='center' width='100vw'>
            <Box width='60%' my={5}>
                {!accounts ? (
                    <Box display='flex' justifyContent='center'>
                        <Typography variant='h6'>
                        Open your MetaMask wallet to get connected, then refresh this page
                        </Typography>
                    </Box>
                ) : (
                    <>
                        { role === 'unknown' && (
                            <Box display='flex' justifyContent='center'>
                                <Typography variant='h5'>You're not registered, please go to home page</Typography>
                            </Box>
                        )}
                        
                            <>
                                {/* <Modal open={addRecord} onClose={() => setAddRecord(false)}>
                                    <AddRecordModal
                                        handleClose={() => setAddRecord(false)}
                                        handleUpload={addRecordCallback}
                                        drugId = {searchDrugId}
                                    />
                                </Modal> */}
                                 {/* Manufacturer Portal */}

                  <Box alignItems='center'>
                  <Typography variant='h4'>Register Drug</Typography>
                  <Box alignItems='center' my={1}>
                    <Box my={3}>
                    <FormControl style={{minWidth: '47.5%', marginRight: 10}}>
                    <Typography variant='h5'>Drug Id:</Typography>
                      <TextField
                        variant='outlined'
                        placeholder='Enter Drug Id'
                        value={addDrugId}
                        onChange={e => setAddDrugId(e.target.value)}
                        InputProps={{ style: { fontSize: '15px' } }}
                        InputLabelProps={{ style: { fontSize: '15px' } }}
                        size='small'
                      />
                    </FormControl>
                    
                    <FormControl style={{minWidth: '47.5%', marginLeft: 10}}>
                    <Typography variant='h5'>Drug Name:</Typography>
                      <TextField
                        variant='outlined'
                        placeholder='Enter Drug Name'
                        value={addDrugName}
                        onChange={e => setAddDrugName(e.target.value)}
                        InputProps={{ style: { fontSize: '15px' } }}
                        InputLabelProps={{ style: { fontSize: '15px' } }}
                        size='small'
                      />
                    </FormControl>
                    </Box>

                    <Typography variant='h5'>Add File:</Typography>
                    <Box sx={{
                      maxWidth: '97.5%',
                      // maxHeight: 100
                    }} mt={1}>
                    
                    <DropzoneAreaBase
                  onAdd={fileObjs => handleFileChange(fileObjs[0])}
                  onDelete={fileObj => {
                    setFile(null)
                    setBuffer(null)
                  }}

                  onAlert={(message, variant) => setAlert(message, variant)}
                />
                                </Box>
                    
                    <Box display='flex' justifyContent='space-between' mb={2}>
                {file && <Chip label={file.name} onDelete={() => setFile(null)} style={{ fontSize: '12px' }} />}
                <Box flexGrow={1} />

                {/* <CustomButton
                  text='upload'
                  handleClick={() => addRecordCallback(buffer, addDrugId, file.name)}
                /> */}
              </Box>



                    <Box my={3}>
                      <CustomButton text={'Add Drug'} handleClick={() => addRecordCallback(buffer, addDrugId, file.name)}>
                        <PersonAddAlt1RoundedIcon style={{ color: 'white' }} />
                      </CustomButton>
                    </Box>
                  </Box>
              </Box>

                  <Box mt={6} mb={4}>
                    <Divider />
                  </Box>

                  <Typography variant='h4'>Drug Records</Typography>
                  <Box display='flex' alignItems='center' my={1}>
                    <FormControl fullWidth>
                      <TextField
                        variant='outlined'
                        placeholder='Enter drug Id'
                        value={searchDrugId}
                        onChange={e => setSearchDrugId(e.target.value)}
                        InputProps={{ style: { fontSize: '15px' } }}
                        InputLabelProps={{ style: { fontSize: '15px' } }}
                        size='small'
                      />
                    </FormControl>
                    <Box mx={2}>
                      <CustomButton text={'Search'} handleClick={() => searchDrug()}>
                        <SearchRoundedIcon style={{ color: 'white' }} />
                      </CustomButton>
                    </Box>
                    {/* <CustomButton text={'New Record'} handleClick={() => setAddRecord(true)} disabled={!patientExist}>
                      <CloudUploadRoundedIcon style={{ color: 'white' }} />
                    </CustomButton> */}
                  </Box>

                  {drugExist && records.length === 0 && (
                    <Box display='flex' alignItems='center' justifyContent='center' my={5}>
                      <Typography variant='h5'>No records found</Typography>
                    </Box>
                  )}

                  {drugExist && (
                    <>
                    <Box display='flex' flexDirection='column' mt={3} mb={-2}>
                      
                      
                      {/* {records.map((record, index) => (
                        <Box mb={2}> */}
                          <Record record={records} />
                        {/* </Box>
                      ))} */}
                      
                    </Box>
                    <Box mt={5}>
                      <CustomButton mx={2} text={'Close'} handleClick={() => setDrugExist(false)}>
                        {/* <PersonAddAlt1RoundedIcon style={{ color: 'white' }} /> */}
                      </CustomButton>
                    </Box>
                    </>
                  )}


                             </>
                             <Box mt={6} mb={4}>
                    <Divider />
                  </Box>

                  <Typography variant='h4'>Get My Records</Typography>
                  <Box alignItems='center' my={1}>

                    <Box my={3}>
                      <CustomButton text={'Get My Records'} handleClick={() => getMyRecords()}>
                        {/* <SearchRoundedIcon style={{ color: 'white' }} /> */}
                      </CustomButton>
                    </Box>

                    {(myRecordsExist && myRecords.length === 0) && (
                    <Box display='flex' alignItems='center' justifyContent='center' my={5}>
                      <Typography variant='h5'>No records found</Typography>
                    </Box>
                  )}

                  {myRecordsExist && myRecords.length > 0 && (
                    <>
                    <Box display='flex' flexDirection='column' mt={3} mb={-2}>
                      
                          <MyRecord record={myRecords} />
                      
                    </Box>
                    <Box mt={5}>
                      <CustomButton mx={2} text={'Close'} handleClick={() => setMyRecordsExist(false)}>
                        
                      </CustomButton>
                    </Box>
                    </>
                  )}

                    </Box>
                          
                    </>
                )}

                 

            </Box>
            
        </Box>
        )
    }

}

export default User;