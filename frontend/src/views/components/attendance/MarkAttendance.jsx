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

const MarkAttendance = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const {attendance} = useSelector(attendanceSelector);
    const dispatch = useDispatch();
    const currentDate = useMemo(()=>{
        const date = new Date();
        const formattedDate = new Intl.DateTimeFormat('en-GB',{
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(date);
        return `Today, ${formattedDate}`;
    },[]);

    useEffect(()=>{
       const time =  setInterval(()=>{
            const date = new Date();
            setCurrentTime(date);
        },1000);

        return ()=> clearInterval(time);
    },[]);

    useEffect(()=>{
        dispatch(getTodayAttendance());
    },[])

    const handleCheckInOut = ()=>{
        if(!attendance?.checkIn){
        dispatch(checkInApi());
        }
        else if(attendance?.checkIn){
        dispatch(checkOutApi());
        }
        
    }

    return (
        <Box sx={{display:'flex', alignItems:'center', gap: 3}}>
             <PresentationCard  cardSx={{width: '250px'}}>
                <Box sx={{textAlign: 'center'}}>
                    <Typography variant="body2" color="text.secondary">
                      {currentDate}
                    </Typography>
                    <Typography variant="h3" fontWeight={'bold'} color="text.secondary">
                      {currentTime.toLocaleTimeString("en-IN",{
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: true
                      })}
                    </Typography>
                    </Box>
                     <Button variant='contained' color='success' onClick={handleCheckInOut}>{attendance?.checkIn?'checkOut':'CheckIn'}</Button>
                  </PresentationCard>
           
            {/* <Box>
                <Button variant='contained' color='primary'>CheckOut</Button>
            </Box> */}
        </Box>
    )
}

export default MarkAttendance