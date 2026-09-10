import { Button } from '@mui/material'
import { IconPlus } from '@tabler/icons-react'
import React from 'react'

const AddButton = ({handle, addBtnText="add"}) => {
    return (
        <Button
            color='primary'
            variant='contained'
            size='small'
            startIcon={<IconPlus fontSize={'14px'} width={'16px'} height={'16px'} />}
            onClick={handle}
        >{addBtnText}</Button>
    )
}

export default AddButton