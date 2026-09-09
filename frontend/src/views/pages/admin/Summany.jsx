import React from 'react'
import SummanyCard from '../../components/SummanyCard'
import Box from '@mui/material/Box'
import { IconUsers } from '@tabler/icons-react'
import DashboardCard from '../../components/dashboard/DashboardCard'

const Summany = () => {
  return (
    <Box>
        {/* <SummanyCard 
            icon={<IconUsers style={{color:'#3944B8'}} width={40} height={40}/>}
            title={"Total Employee"}
            totalCount={511}
            /> */}
            <DashboardCard title={"Total employee"} />
    </Box>
  )
}

export default Summany