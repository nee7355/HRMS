import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import React, { useEffect, useMemo, useState } from 'react'
import Header from './header'
import Toolbar from '@mui/material/Toolbar'
import CustomTale from '../../components/CustomTale'
import { useDispatch, useSelector } from 'react-redux'
import { getUsersData, handleUserAction, userSelector } from '../../../store/slices/userSlice'
import IconButton from '@mui/material/IconButton'
import { IconEdit, IconTrash, IconUser } from '@tabler/icons-react'
import AddEditUserModel from '../../components/modals/AddEditUserModel'
import UserProfileModal from '../../components/modals/UserProfileModal'
import useDebounce from '../../hooks/useDebounce'

const itemPerPage = 50;

const Employee = () => {
  const[openAddEditModal, SetOpenAddEditModal] = useState(false);
  const[userData, setUserData] = useState({});
  const {users, totalPages, totalUsers} = useSelector(userSelector);
  const[openUserProfile, setOpenUserProfile] = useState(false);
  const[searchText, setSearchText] = useState('');
  const [page, setPge] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);

  const debounceSearch = useDebounce(searchText);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getUsersData(page, itemPerPage, debounceSearch));
  },[page, debounceSearch]);

const handleEdit = (row) => {
  setUserData(row);
  SetOpenAddEditModal(true);
}
const handleDelete = (row) => {
    dispatch(handleUserAction(row, 'delete'));
}

const handleUserProfile = (user)=>{
  setUserData(user);
  setOpenUserProfile(true)

}
// const userTableData = useMemo(()=>{
//   const query = searchText.trim().toLocaleLowerCase();
  
//   const filt = users.filter((user)=>{
//     return user?.firstName?.includes(query) || user?.lastName?.includes(query) || user?.email?.includes(query)
//   })

//   return filt;
// },[searchText, users]);

  const column = [
    {
      id:1,
      header: 'First Name',
      key: 'firstName'
    },
    {
      id:2,
      header: 'Last Name',
      key: 'lastName'
    },
    {
      id:4,
      header: 'Email',
      key: 'email'
    },
    {
      id:5,
      header: 'Action',
      Cell: (row)=><Box>
        <IconButton onClick={()=>handleUserProfile(row)} sx={{width: '18px', height: '18px', padding: 0, marginRight: 1}}>
          <IconUser />
        </IconButton>
        <IconButton onClick={()=>handleEdit(row)} sx={{width: '18px', height: '18px', padding: 0, marginRight: 1}}>
          <IconEdit/>
          </IconButton>
        <IconButton onClick={handleDelete} sx={{width: '18px', height: '18px', padding: 0, marginRight: 1}}>
          <IconTrash color='red'/>
        </IconButton>
      </Box>
    }
  ]
  return (
    <>
    <Box>
        <Stack direction="row"></Stack>
        <Header searchText={searchText} setSearchText={setSearchText}/>
        <Toolbar sx={{ minHeight: { xs: 54, sm: 46, md: 76 } }} />
        {/* <h1>filter</h1> */}
        <CustomTale
          column={column}
          data={users}
          enablePagination= {true}
          page = {page}
          setPage = {setPge}
          totalPages={totalPages}
          itemPerPage = {itemPerPage}
          />
    </Box>

    {openAddEditModal&&<AddEditUserModel open={openAddEditModal} handleClose={()=>SetOpenAddEditModal(false)} data = {userData} action={'edit'}/>}
      {openUserProfile&&<UserProfileModal open={openUserProfile} handleClose={()=>setOpenUserProfile(false)} data={userData}/>}
    </>
  )
}

export default Employee