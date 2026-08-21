import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField'
import { IconSearch } from '@tabler/icons-react';
import React from 'react'

const Search = (props) => {
    const {searchText, setSearchText} = props;
  return (
    <>
      {/* <TextField
        label="Search here"
        value={searchText}
        onChange={(e)=>setSearchText(e.target.value)}
      
      /> */}
      <FormControl>
        {/* <InputLabel htmlFor={`search-input`}>Search</InputLabel> */}
        <OutlinedInput
            // id='search-input'
            value={searchText}
            onChange={(e)=>setSearchText(e.target.value)}
            type='text'
            startAdornment={
                <InputAdornment position='start'>
                    <IconSearch/>
                </InputAdornment>
            }

        
        />
      </FormControl>
    </>
  )
}

export default Search