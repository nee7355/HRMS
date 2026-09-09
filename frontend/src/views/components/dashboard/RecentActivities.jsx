import {
  Box,
  Typography,
} from "@mui/material";

import {
  UserCheck,
  FileText,
  UserPlus,
  Receipt,
} from "lucide-react";

import DashboardCard from "./DashboardCard";


const RecentActivities = () => {

  const activities = [
    {
      icon: UserCheck,
      title: "Rahul Sharma checked in",
      time: "09:41 AM",
    },

    {
      icon: FileText,
      title: "Priya Singh applied for leave",
      time: "09:21 AM",
    },

    {
      icon: UserPlus,
      title: "New employee John Doe added",
      time: "Yesterday",
    },

    {
      icon: Receipt,
      title: "Payroll for August generated",
      time: "Yesterday",
    },
  ];


  return (
    <DashboardCard title="Recent Activities">

      {activities.map((activity, index) => {

        const Icon = activity.icon;

        return (
          <Box
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              py: 1,
              borderBottom: "1px solid",
              borderColor: "divider",

              "&:last-child": {
                borderBottom: 0,
              },
            }}
          >

            <Box
              sx={{
                width: 26,
                height: 26,
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 1,

                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                color: "text.secondary",
                flexShrink: 0,
              }}
            >
              <Icon size={14} />
            </Box>


            <Box
              sx={{
                flex: 1,
                minWidth: 0,
                display: "flex",
                justifyContent: "space-between",
                gap: 1,
              }}
            >

              <Typography
                noWrap
                sx={{
                  fontSize: 9,
                  color: "text.primary",
                }}
              >
                {activity.title}
              </Typography>

              <Typography
                sx={{
                  fontSize: 8,
                  color: "text.secondary",
                  whiteSpace: "nowrap",
                }}
              >
                {activity.time}
              </Typography>

            </Box>

          </Box>
        );
      })}

    </DashboardCard>
  );
};

export default RecentActivities;