import React from 'react'
import Search from './Search'
import { Button, Stack } from '@mui/material'
import { IconPlus } from '@tabler/icons-react'

const SearchAdd = ({searchText, setSearchText, handle, addBtnText="Add"}) => {
    return (
        <>
            <Stack direction={'row'} justifyContent={'space-between'} mb={2}>
                <Search searchText={searchText} setSearchText={setSearchText} />
                <Button
                    color='primary'
                    variant='contained'
                    size='small'
                    startIcon={<IconPlus fontSize={'16px'} />}
                    onClick={handle}
                >{addBtnText}</Button>
            </Stack>
        </>
    )
}

export default SearchAdd