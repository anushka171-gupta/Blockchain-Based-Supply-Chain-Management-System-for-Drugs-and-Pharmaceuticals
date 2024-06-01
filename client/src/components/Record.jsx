import { Card, CardContent, IconButton, Typography, Grid, Box } from '@mui/material';
import React from 'react';
import DesciptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import { grey } from '@mui/material/colors';
import moment from 'moment';
import CloudDownloadRoundedIcon from '@mui/icons-material/CloudDownloadRounded';
import { useNavigate } from 'react-router-dom';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
// import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import TableRecords from './Table';

const columns = [
    { field: "id", headerName: "Address" },
    { field: "role", headerName: "Role" },
    { field: "timeAdded", headerName: "Time Added" }
]

const Record = ({ record }) => {
    const temp = record;
    console.log(" Record: ", record);
    const navigate = useNavigate();

    return (
        // <Card>
        //     <CardContent>
                <Grid container spacing={2}>
                    {/* <Grid item xs={1}>
                        <DescriptionRoundedIcon style={{
                            fontSize: 40,
                            color: grey[700]
                        }} />
                    </Grid> */}
                    {/* <Grid item xs={3}> */}
                    <Box sx={{ minWidth: '97%', marginLeft: 1.5, marginTop: 3, marginBottom: 3}} display='flex' justifyContent='center'>
                        <Box sx={{ minWidth: '48.5%'}}>
                            <Typography textAlign='left' variant='h5'>
                                Drug Id
                            </Typography>
                            <Typography textAlign='left'  variant='h6' color={'#008ECC'}>{record[0].drugId}</Typography>
                        </Box>

                        <Box sx={{ minWidth: '48.5%'}}>
                            <Typography textAlign='right' variant='h5'>
                                Drug Name
                            </Typography>
                            <Typography textAlign='right' variant='h6' color={'#008ECC'}>{record[0].drugName}</Typography>
                        </Box>
                        </Box>
                    {/* </Grid> */}

                    <Grid sx={{minWidth:'96%'}}>
                        <TableRecords record={record} />
                   
                        {/* <Box display='flex' flexDirection='column'>
                        <Typography variant='h6' color={grey[600]}>
                            Created time
                        </Typography>
                        <Typography variant='h6'>{moment.unix(timestamp).format('MM-DD-YYYY HH:mm')}</Typography>
                        </Box> */}
                    </Grid>
                   
                </Grid>
        //     </CardContent>
        // </Card>
    )
}

export default Record;