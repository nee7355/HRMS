import React from 'react'
import AttendanceWidget from '../../../components/dashboard/AttendanceWidget'
import { Grid } from '@mui/material';
import StatCard from '../../../components/dashboard/StateCard';
import {
  Users,
  Building2,
  UserMinus,
  UserCheck,
  FileText,
  UserPlus,
  Receipt,
} from "lucide-react";

  const stats = [
    {
      title: "Total Employees",
      value: 124,
      icon: Users,
      color: "primary",
      change: 8,
      changeText: "this month",
    },

    {
      title: "Departments",
      value: 8,
      icon: Building2,
      color: "secondary",
      change: 0,
      changeText: "this month",
      changeType: "same",
    },

    {
      title: "Present Today",
      value: 108,
      icon: UserCheck,
      color: "success",
      change: 5,
      changeText: "today",
    },

    {
      title: "On Leave",
      value: 12,
      icon: UserMinus,
      color: "warning",
      change: 2,
      changeText: "today",
    },
  ];

const Dashboard = () => {
  return (
    <><Grid container spacing={2} mb={2}>
      <Grid size={{ xs: 12,}}>
            <AttendanceWidget/>
          </Grid>
      
      {stats.map((stat) => (
          <Grid
            key={stat.title}
            size={{
              xs: 12,
              sm: 6,
              md: 3,
            }}
          >
            <StatCard {...stat} />
          </Grid>
        ))}
        </Grid>
    </>
  )
}

export default Dashboard