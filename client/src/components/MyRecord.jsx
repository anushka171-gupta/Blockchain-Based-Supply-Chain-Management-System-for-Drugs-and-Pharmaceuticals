import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, IconButton } from '@mui/material';
import React from 'react';

const MyRecord = ({ record }) => {
    record = record;
    console.log("My Record: ", record);

    return (
<TableContainer>
            <Table sx={{ maxWidth: '97%' }} aria-label="simple table" stickyHeader={true}>
                <TableHead>
                <TableRow>
                    <TableCell sx={{  border: 1, borderColor: '#eee',backgroundColor: ' #e6f7ff', fontSize: 15, fontWeight: 'bold', textAlign: 'center'   }}>Drug ID</TableCell>
                    <TableCell sx={{  border: 1, borderColor: '#eee',backgroundColor: ' #e6f7ff', fontSize: 15, fontWeight: 'bold', textAlign: 'center'   }}>Drug Name</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {record.map((row) => (
                    <TableRow
                    key={row.fileName}
                    // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell sx={{ border: 1, borderColor: '#eee', fontSize: 12, textAlign: 'center'   }}>{row.id}</TableCell>
                    <TableCell sx={{ border: 1, borderColor: '#eee', fontSize: 12, textAlign: 'center'   }}>{row.name}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default MyRecord;