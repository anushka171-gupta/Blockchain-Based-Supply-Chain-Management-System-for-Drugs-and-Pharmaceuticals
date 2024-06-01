import { Card, CardContent, IconButton, Typography, Grid, Box } from '@mui/material';
import React from 'react';
import DesciptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import { grey } from '@mui/material/colors';
import moment from 'moment';
import CloudDownloadRoundedIcon from '@mui/icons-material/CloudDownloadRounded';
import { useNavigate } from 'react-router-dom';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import { DataGrid } from "@material-ui/data-grid";

const EntityTable = ({ columns, records }) => {

    return (
        <>
            <DataGrid
                rows={records}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10,50,100]}
            />
        </>
    )
}

export default EntityTable;