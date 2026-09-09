import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import React from 'react'
import PresentationCard from '../../../components/cards/PresentationCard'
import Typography from '@mui/material/Typography'
import { useMemo } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { attendanceSelector, checkInApi, checkOutApi, getTodayAttendance } from '../../../store/slices/attendanceSlice'
import { useDispatch, useSelector } from 'react-redux'
import Stack from '@mui/material/Stack'
import { IconCircleCheck, IconClockHour9 } from '@tabler/icons-react'
import { localTime } from '../utils/fn'
import Divider from '@mui/material/Divider'
import { authSelector } from '../../../store/slices/authSllice'

const MarkAttendance = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [workingTime, setWorkingTime] = useState("0hr, 0m 0s")
    const { attendance } = useSelector(attendanceSelector);
    const { user } = useSelector(authSelector);
    const [actionType, setActionType] = useState('checkIn')
    const dispatch = useDispatch();

    const currentDate = useMemo(() => {
        const date = new Date();
        const formattedDate = new Intl.DateTimeFormat('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(date);
        return `Today, ${formattedDate}`;
    }, []);

    const attendaceSession = useMemo(() => {
        if (!attendance?.sessions?.length) return null

            const marking = [...attendance?.sessions].sort((a, b) => new Date(b?.checkIn) - new Date(a?.checkIn));
            return marking?.[0];
        
    }, [attendance]);

    useEffect(() => {
        const time = setInterval(() => {
            const date = new Date();
            setCurrentTime(date);
        }, 1000);

        return () => clearInterval(time);
    }, []);

    useEffect(() => {
        dispatch(getTodayAttendance());
    }, [])

    const handleCheckInOut = (actionType) => {
        if (actionType === 'checkIn') {
            dispatch(checkInApi());
        }
        else if (actionType === 'checkOut') {
            dispatch(checkOutApi());
        }

    }


    useEffect(() => {
        if (!attendaceSession?.checkIn) {
            setWorkingTime("0hr 0m 0s");
            return;
        }

        const checkInTime = new Date(attendaceSession?.checkIn).getTime();

        const updateTime = () => {
            const currentTime = Date.now();
            const diff = currentTime - checkInTime

            const totalSecond = Math.floor(diff / 1000);

            const hours = Math.floor(totalSecond / 3600);
            const minutes = Math.floor((totalSecond % 3600) / 60);
            const seconds = totalSecond % 60;

            setWorkingTime(`${hours}hr ${minutes}m ${seconds}s`);
        }

        updateTime();

        const interval = setInterval(updateTime, 1000);

        return () => clearInterval(interval);
    }, [attendaceSession?.checkIn]);

    const greetingMessage = useMemo(()=>{
        const date = new Date();
        // date.setHours(22, 1,0,0)
        const hour = date.getHours();
        const minute = date.getMinutes();

        let greetMessaage = ''
        if(hour>=0&&hour<=12){
            greetMessaage = "Good morning";
        }
       
        else if(hour>=12&&hour<17){
            greetMessaage = "Good Afternoon";
        }
        else if(hour>=17&&hour<19){
            greetMessaage = "Good evening";
        }
        else if(hour>=19&&hour<=23){
            greetMessaage = "Good night";
        }
        
        return `${greetMessaage}, ${user.firstName}`;
    },[])

    // console.log('attendancesessioon', attendaceSession)
    return (
        <Box sx={{ display: 'flex', gap: 3, flexDirection:'column' }}>
            <Box>
               <Typography variant='h6' fontWeight={'bold'}> {greetingMessage}</Typography>
                <Typography>{currentDate}</Typography>
            </Box>
            <PresentationCard cardSx={{ width: '100%' }}>
                <Box sx={{ textAlign: 'center' }}>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <Typography>My Attendance</Typography>
                        <Typography>Today</Typography>

                    </Stack>
                    {/* <Typography variant="h3" fontWeight={'bold'} color="text.secondary">
                      {currentTime.toLocaleTimeString("en-IN",{
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: true
                      })}
                    </Typography> */}
                </Box>
                {!attendaceSession?.checkIn && <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} spacing={4} >
                    <Box><IconClockHour9 style={{ width: '50px', height: '50px', color: 'blue' }} /></Box>
                    <Stack direction={'column'} justifyContent={'flex-start'} spacing={1}>
                        <Typography variant='h3' fontWeight={'bold'}>You haven't checked in yet</Typography>
                        <Typography>Please check in to mark your attendance today.</Typography>
                        <Button variant='contained' color='success' onClick={() => handleCheckInOut('checkIn')} sx={{ mt: '24px' }}>{'CheckIn'}</Button>

                    </Stack>
                </Stack>}

                {attendaceSession?.checkIn && !attendaceSession?.checkOut && <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} spacing={3} py={3}>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} spacing={3} >
                        <IconCircleCheck />
                        <Box>
                            <Typography variant='h6' fontWeight={'bold'} color='success'>Checked In</Typography>
                            <Typography fontWeight={'bold'}>{localTime(attendaceSession?.checkIn)}</Typography>
                        </Box>
                    </Stack>
                    <Box sx={{ width: '50%' }}>
                        <Box sx={{
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            padding: '16px',
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}>
                            <Box sx={{ width: '40%', textAlign: 'center' }}>
                                <Typography>Checke In</Typography>
                                <Typography fontWeight={'bold'}>{localTime(attendaceSession?.checkIn)}</Typography>
                            </Box>
                            <Box sx={{ textAlign: 'center' }}>

                                <Divider orientation='vertical' />
                            </Box>
                            <Box sx={{ width: '40%', textAlign: 'center' }}>
                                <Typography>Working Time</Typography>
                                <Typography variant='h6' fontWeight={'bold'} color='success'>{workingTime}</Typography>
                            </Box>
                        </Box>

                    </Box>
                    <Box textAlign={'center'}>
                        {attendance?.totalWorkingHours>0 && <Box>
                            <Typography>Total Working Time (Today)</Typography>
                            <Typography variant='h6' fontWeight={'bold'} color='success'>{attendance?.totalWorkingHours}</Typography>
                        </Box>}
                        {attendaceSession?.checkIn && !attendaceSession?.checkOut && <Button variant='contained' color='success' onClick={() => handleCheckInOut('checkOut')} sx={{ mt: '24px' }}>{'Check Out'}</Button>}
                    </Box>
                    {/* <Button variant='contained' color='success' onClick={handleCheckInOut} sx={{ mt: '24px' }}>{'Check Out'}</Button> */}

                </Stack>}

                {/* ui after completing one session  */}
                {attendaceSession?.checkIn && attendaceSession?.checkOut && <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} spacing={3} py={3}>
                    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} spacing={3} >
                        <IconCircleCheck color='success' />
                        <Box>
                            <Typography variant='h6' fontWeight={'bold'} color='success'>Session completed</Typography>
                            <Typography fontWeight={'bold'}>You have successfully checkedout</Typography>
                        </Box>
                    </Stack>
                    <Box sx={{ width: '50%' }}>
                        <Box sx={{
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            padding: '16px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexDirection: 'column',
                            gap: '8px'
                        }}>
                            <Box sx={{

                                display: 'flex',
                                justifyContent: 'space-between'
                            }}>
                                <Box sx={{ width: '40%', textAlign: 'center' }}>
                                    <Typography>Checke In</Typography>
                                    <Typography fontWeight={'bold'}>{localTime(attendaceSession?.checkIn)}</Typography>
                                </Box>
                                <Box sx={{ textAlign: 'center' }}>

                                    <Divider orientation='vertical' />
                                </Box>
                                <Box sx={{ width: '40%', textAlign: 'center' }}>
                                    <Typography>Check Out</Typography>
                                    <Typography fontWeight={'bold'}>{localTime(attendaceSession?.checkOut)}</Typography>
                                </Box>
                            </Box>

                            <Divider />
                            <Box textAlign={'center'}>
                                <Typography>Session Duration</Typography>
                                <Typography variant='h6' fontWeight={'bold'} color='success'>{attendance?.totalWorkingHours}</Typography>
                            </Box>
                        </Box>


                    </Box>
                    <Box textAlign={'center'}>
                        <Box>
                            <Typography>Total Working Time (Today)</Typography>
                            <Typography variant='h6' fontWeight={'bold'} color='success'>{attendance?.totalWorkingHours}</Typography>
                        </Box>
                        {attendaceSession?.checkIn && attendaceSession?.checkOut && <Button variant='contained' color='success' onClick={() => handleCheckInOut('checkIn')} sx={{ mt: '24px' }}>{'Check In Again'}</Button>}
                    </Box>

                </Stack>}
                {/* <Button variant='contained' color='success' onClick={handleCheckInOut}>{attendance?.checkIn?'checkOut':'CheckIn'}</Button> */}
            </PresentationCard>

            {/* <Box>
                <Button variant='contained' color='primary'>CheckOut</Button>
            </Box> */}
        </Box>
    )
}

export default MarkAttendance