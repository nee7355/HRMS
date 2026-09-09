import React, { useEffect, useMemo, useState } from 'react'
import Header from '../../components/Header'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button';
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react';
import AddDesignationModal from '../../components/modals/AddDesignationModal';
import CustomTale from '../../components/CustomTale';
import { useDispatch, useSelector } from 'react-redux';
import { deleteDesignation, designationSelector, editDesignation, fetchDesignation } from '../../../store/slices/designationSlice';
import IconButton from '@mui/material/IconButton';
import SearchAdd from '../../components/SearchAdd';

const Designation = () => {
    const [searchText, setSearchText] = useState("");
    const [openAddDesignationModal, setOpenAddDesignationModal] = useState(false);
    const [actionType, setActionType] = useState('Add')
    const {designation} = useSelector(designationSelector);
    const[selectedData, setSelectedData] = useState({});

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

  
    const handleEdit = (data)=>{
        setSelectedData(data);
        setActionType('Edit')
        setOpenAddDesignationModal(true)
        dispatch(editDesignation(data._id));
    }
    const handleDelete = (id)=>{
       
        dispatch(deleteDesignation(id))
    }

    const handleOpenAddEditModal = ()=>{
        setOpenAddDesignationModal(true)
    }

    const column = useMemo(()=>[
        {
            id:1,
            header: 'Sr No',
            Cell: (row, index)=>index+1
        },
        {
            id:2,
            header: 'Designation',
            key: 'name',
        },
        {
            id:3,
            header: 'Department',
            key: 'departmentId.name',
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
                <IconButton onClick={() => {handleEdit(row);}} sx={{ width: '18px', height: '18px', padding: 0, marginRight: 1 }}>
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
        {/* <Header searchText={searchText} setSearchText={setSearchText} action={actionProps}/> */}
              <SearchAdd
                  searchText={searchText}
                  setSearchText={setSearchText}
                  handle={handleOpenAddEditModal}
                  addBtnText='Add Designation'
              />

        <CustomTale column={column} data={designation}/>
    </Box>
    {openAddDesignationModal&&<AddDesignationModal action={actionType} open={openAddDesignationModal} handleClose={()=>setOpenAddDesignationModal(false)} data={selectedData}/>}
    </>
  )
}

export default Designation