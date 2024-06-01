import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import { grey, teal } from '@mui/material/colors'

const CustomButton = ({ text, handleClick, disabled = false, children, width=100 }) => {
  return (
    <Button
      startIcon={children}
      style={{
        backgroundColor: disabled ? grey[400] : "#008ECC	",
        textTransform: 'none',
        padding: '10px 20px',
        minWidth: 180
      }}
      onClick={handleClick}
      disabled={disabled}
    >
      <Typography variant='h5' color='white'>
        {text}
      </Typography>
    </Button>
  )
}

export default CustomButton
