import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import React, { useEffect, useMemo, useState } from 'react'
import Header from './header'
import Toolbar from '@mui/material/Toolbar'
import CustomTale from '../../components/CustomTale'
import { useDispatch, useSelector } from 'react-redux'
import { getUsersData, handleUserAction, userSelector } from '../../../store/slices/userSlice'
import IconButton from '@mui/material/IconButton'
import { IconEdit, IconPlus, IconTrash, IconUser } from '@tabler/icons-react'
import AddEditUserModel from '../../components/modals/AddEditUserModel'
import UserProfileModal from '../../components/modals/UserProfileModal'
import useDebounce from '../../hooks/useDebounce'
import Search from '../../components/Search'
import { Button } from '@mui/material'
import SearchAdd from '../../components/SearchAdd'

const itemPerPage = 50;

const Employee = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState(false);
  const [userData, setUserData] = useState({});
  const { employees, totalPages, totalUsers } = useSelector(userSelector);
  const [openUserProfile, setOpenUserProfile] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [page, setPge] = useState(1);
  const[action, setAction] = useState('add');
  // const [totalPages, setTotalPages] = useState(1);

  const debounceSearch = useDebounce(searchText);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersData(page, itemPerPage, debounceSearch));
  }, [page, debounceSearch]);

  const handleOpenAddEditModal = (action)=>{
     setOpenAddEditModal(true)
     setAction(action)
  }

  const handleEdit = (row) => {
    setUserData(row);
    handleOpenAddEditModal('edit')
  }
  const handleDelete = (row) => {
    dispatch(handleUserAction(row, 'delete'));
  }

  const handleUserProfile = (user) => {
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
      id: 1,
      header: 'First Name',
      key: 'firstName'
    },
    {
      id: 2,
      header: 'Last Name',
      key: 'lastName'
    },
    {
      id: 4,
      header: 'Email',
      key: 'email'
    },
    {
      id: 5,
      header: 'Role',
      key: 'role.name'
    },
    {
      id: 5,
      header: 'Action',
      Cell: (row) => <Box>
        <IconButton onClick={() => handleUserProfile(row)} sx={{ width: '18px', height: '18px', padding: 0, marginRight: 1 }}>
          <IconUser />
        </IconButton>
        <IconButton onClick={() => handleEdit(row)} sx={{ width: '18px', height: '18px', padding: 0, marginRight: 1 }}>
          <IconEdit />
        </IconButton>
        <IconButton onClick={() => handleDelete(row)} sx={{ width: '18px', height: '18px', padding: 0, marginRight: 1 }}>
          <IconTrash color='red' />
        </IconButton>
      </Box>
    }
  ]
  return (
    <>
      <Box>

        {/* <Header searchText={searchText} setSearchText={setSearchText}/> */}
        {/* <Toolbar sx={{ minHeight: { xs: 54, sm: 46, md: 76 } }} /> */}
        {/* <h1>filter</h1> */}
        {/* <Stack direction={'row'} spacing={2} justifyContent={"space-between"} mb={2}>
          <Search searchText={searchText} setSearchText={setSearchText} />
          <Button
            color='primary'
            variant='contained'
            size='small'
            startIcon={<IconPlus fontSize={'16px'} />}
            onClick={handleOpenAddEditModal}
          >Add Employee</Button>
        </Stack> */}
        <SearchAdd
          searchText={searchText}
          setSearchText={setSearchText}
          handle={handleOpenAddEditModal}
          addBtnText='AddEmployee'
        />
        <CustomTale
          column={column}
          data={employees}
          enablePagination={true}
          page={page}
          setPage={setPge}
          totalPages={totalPages}
          itemPerPage={itemPerPage}
        />
      </Box>

      {openAddEditModal && <AddEditUserModel open={openAddEditModal} handleClose={() => setOpenAddEditModal(false)} data={userData} action={action} />}
      {openUserProfile && <UserProfileModal open={openUserProfile} handleClose={() => setOpenUserProfile(false)} data={userData} />}
    </>
  )
}

export default Employee