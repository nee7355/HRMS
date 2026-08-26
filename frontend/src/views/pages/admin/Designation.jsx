import React, { useEffect, useMemo, useState } from 'react'
import Header from '../../components/Header'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button';
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react';
import AddDesignationModal from '../../components/modals/AddDesignationModal';
import CustomTale from '../../components/CustomTale';
import { useDispatch, useSelector } from 'react-redux';
import { designationSelector, fetchDesignation } from '../../../store/slices/designationSlice';
import IconButton from '@mui/material/IconButton';

const Designation = () => {
    const [searchText, setSearchText] = useState("");
    const [openAddDesignationModal, setOpenAddDesignationModal] = useState(false);
    const [actionType, setActionType] = useState('Add')
    const {designation} = useSelector(designationSelector);

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchDesignation());
    },[])

    const actionProps = useMemo(() => {
        return <Button
            color='primary'
            variant='contained'
            size='small'
            startIcon={<IconPlus fontSize={'16px'} />}
            onClick={() => setOpenAddDesignationModal(true)}
        >Add Designation</Button>
    }, []);

    const handleEdit = ()=>{
        
    }
    const handleDelete = ()=>{

    }

    const column = useMemo(()=>[
        {
            id:1,
            header: 'Sr No',
            Cell: (row, index)=>index+1
        },
        {
            id:2,
            header: 'Name',
            key: 'name',
        },
        {
            id:3,
            header: 'Department',
            key: 'departmentId',
        },
        {
            id:4,
            header: 'Status',
            key: 'status',
        },
        {
            id:5,
            header: 'Action',
             Cell: (row) => <Box>
                <IconButton onClick={() => {handleEdit(row); setActionType('Edit')}} sx={{ width: '18px', height: '18px', padding: 0, marginRight: 1 }}>
                    <IconEdit />
                </IconButton>
                <IconButton onClick={() => handleDelete(row._id)} sx={{ width: '18px', height: '18px', padding: 0, marginRight: 1 }}>
                    <IconTrash color='red' />
                </IconButton>
            </Box>
        },
    ],[])

  return (
    <>
    <Box>
        <Header searchText={searchText} setSearchText={setSearchText} action={actionProps}/>

        <CustomTale column={column} data={designation}/>
    </Box>
    {openAddDesignationModal&&<AddDesignationModal open={openAddDesignationModal} handleClose={()=>setOpenAddDesignationModal(false)}/>}
    </>
  )
}

export default Designation