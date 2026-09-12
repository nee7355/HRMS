import { Box, Button, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddButton from '../../components/AddButton'
import ApplyLeaveModal from '../../components/modals/ApplyLeaveModal';
import { useDispatch, useSelector } from 'react-redux';
import { applyLeave, getLeaveType, leaveSelector } from '../../../store/slices/leaveSlice';
import LeaveTest from './leave';

const Leave = () => {
  const [openApplyModal, setOpenApplyModal] = useState(false);
  // const { leaveType } = useSelector(leaveSelector);

  const dispatch = useDispatch();

  const leaveApplyModal = () => {
    setOpenApplyModal(true);
  }


  const submitLeaveApply = (data) => {
    if (!data) return;
    try {
      dispatch(applyLeave(data));
      setOpenApplyModal(false);
    } catch (error) {

    }
  }
  return (
    <>
      {/* <Stack>
        <Box display={'flex'} justifyContent={"end"}>
          <AddButton addBtnText='Add Leave' handle={leaveApplyModal} />
        </Box>
      </Stack> */}

      <LeaveTest/>

     {openApplyModal&& <ApplyLeaveModal open={openApplyModal} onClose={() => setOpenApplyModal(false)} onSubmitLeave={submitLeaveApply} />}
    </>
  )
}

export default Leave;