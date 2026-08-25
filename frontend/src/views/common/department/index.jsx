import React, { useEffect, useMemo, useState } from 'react'
import Header from '../../components/Header'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button';
import { IconEdit, IconPlus, IconTrash, IconUser } from '@tabler/icons-react';
import DepartmentAddEditModal from '../../components/modals/DepartmentAddEditModal';
import CustomTale from '../../components/CustomTale';
import IconButton from '@mui/material/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import { deleteDepartment, deparmentSelector, fetchDepartments } from '../../../store/slices/departmentSlice';

const DepartmentComponent = () => {
    const[searchText, setSearchText] = useState('');
    const[openAddDepartmenModal, setOpenAddDepartmenModal] = useState(false);
    const[selectedRow, setSelectedRow] = useState({});
    const[actionType, setActionType] = useState('Add');

    const {departments} = useSelector(deparmentSelector);

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchDepartments());
    },[])

    const handleEdit = (row)=>{
        setSelectedRow(row);
        setOpenAddDepartmenModal(true)
    }
    const handleDelete = (id)=>{
        dispatch(deleteDepartment(id))
    }
    const actionProps = useMemo(()=>{
        return {
            action:<Button 
                color='primary' 
                variant='contained' 
                size='small' 
                startIcon={<IconPlus fontSize={'16px'}/>}
                onClick={()=>{setOpenAddDepartmenModal(true); setActionType('Add')}}
                >Add Department</Button>,
            searchText: searchText,
            setSearchText: setSearchText,
        }
    })

    const column = useMemo(()=>[
        {
            id: 1,
            header: 'Sr No',
            key: 'id',
            Cell:(row, index)=> index+1
        },
        {
            id: 2,
            header: 'Name',
            key: 'name',
        },
        {
            id: 2,
            header: 'Status',
            key: 'status',
        },
        {
            id: 2,
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
    ])
  return (
    <Box>
        <Header  {...actionProps}/>
        <CustomTale column={column} enablePagination={false} data={departments}/>

        {openAddDepartmenModal&&<DepartmentAddEditModal open={openAddDepartmenModal} handleClose={()=>setOpenAddDepartmenModal(false)} data={selectedRow} action={actionType}/>}
    </Box>
  )
}

export default DepartmentComponent