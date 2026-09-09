import {
  Box,
  Grid,
} from "@mui/material";

import {
  Users,
  Building2,
  UserCheck,
  UserMinus,
} from "lucide-react";


import MarkAttendance from "../../components/dashboard/MarkAttendance";
import LeaveOverview from "../../components/dashboard/LeaveOverview";
import RecentActivities from "../../components/dashboard/RecentActivities";
import StatCard from "../../components/dashboard/StateCard";


const Dashboard = () => {

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


  return (
    <Box
      sx={{
        p: 2,
        bgcolor: "#F8FAFC",
        minHeight: "100vh",
      }}
    >

      {/* =========================
          STAT CARDS
      ========================= */}

      <Grid
        container
        spacing={2}
        sx={{ mb: 2 }}
      >
       <Grid
          size={{
            xs: 12,
          }}
        >
          <MarkAttendance/>
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


      {/* =========================
          DASHBOARD CARDS
      ========================= */}

      <Grid
        container
        spacing={2}
      >

       


        <Grid
          size={{
            xs: 12,
            md: 4,
          }}
        >
          <LeaveOverview />
        </Grid>


        <Grid
          size={{
            xs: 12,
            md: 4,
          }}
        >
          <RecentActivities />
        </Grid>

      </Grid>

    </Box>
  );
};

export default Dashboard;