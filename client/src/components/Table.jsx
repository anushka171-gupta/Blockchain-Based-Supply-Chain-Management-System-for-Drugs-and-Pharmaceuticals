import React from 'react';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, IconButton } from '@mui/material';
import moment from 'moment';
import CloudDownloadRoundedIcon from '@mui/icons-material/CloudDownloadRounded';

const TableRecords = (record) => {

    record = record.record;

    return (
        <TableContainer>
            <Table sx={{ minWidth: '97.3%', maxWidth: '97.3%', marginLeft: 3 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell sx={{  border: 1, borderColor: '#eee',backgroundColor: ' #e6f7ff', fontSize: 14, fontWeight: 'bold', textAlign: 'center' }}>User</TableCell>
                    <TableCell sx={{  border: 1, borderColor: '#eee',backgroundColor: ' #e6f7ff', fontSize: 14, fontWeight: 'bold', textAlign: 'center'  }}>Role</TableCell>
                    <TableCell sx={{  border: 1, borderColor: '#eee',backgroundColor: ' #e6f7ff', fontSize: 14, fontWeight: 'bold', textAlign: 'center'  }}>Time Added</TableCell>
                    <TableCell sx={{  border: 1, borderColor: '#eee',backgroundColor: ' #e6f7ff', fontSize: 14, fontWeight: 'bold', textAlign: 'center'  }}>File Name</TableCell>
                    <TableCell sx={{  border: 1, borderColor: '#eee',backgroundColor: ' #e6f7ff', fontSize: 14, fontWeight: 'bold', textAlign: 'center'  }}>Download File</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {record.map((row) => (
                    <TableRow
                    key={row.fileName}
                   
                    >
                    <TableCell sx={{ border: 1, borderColor: '#eee', fontSize: 12, textAlign: 'center'  }}>{row.userName}</TableCell>
                    <TableCell sx={{ border: 1, borderColor: '#eee', fontSize: 12, textAlign: 'center'  }}>{row.userRole}</TableCell>
                    <TableCell sx={{ border: 1, borderColor: '#eee', fontSize: 12, textAlign: 'center'  }}>{moment.unix(row.timeAdded).format('MM-DD-YYYY HH:mm')}</TableCell>
                    <TableCell sx={{ border: 1, borderColor: '#eee', fontSize: 12, textAlign: 'center'  }}>{row.fileName}</TableCell>
                    <TableCell sx={{ border: 1, borderColor: '#eee', fontSize: 12, textAlign: 'center'  }}>
                        <a href={`https://med-chain.infura-ipfs.io/ipfs/${row.ipfsHash}`} target='_blank' rel='noopener noreferrer'>
                            <IconButton>
                                <CloudDownloadRoundedIcon fontSize='large' />
                            </IconButton>
                        </a>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TableRecords;