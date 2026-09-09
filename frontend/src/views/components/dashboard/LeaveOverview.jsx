import {
  Box,
  Typography,
} from "@mui/material";

import {
  Clock3,
  CheckCircle2,
  XCircle,
  ChevronRight,
} from "lucide-react";

import DashboardCard from "./DashboardCard";


const LeaveOverview = () => {

  const leaves = [
    {
      label: "Pending",
      value: 6,
      icon: Clock3,
      color: "#E69520",
      bg: "#FFF2DD",
    },

    {
      label: "Approved",
      value: 12,
      icon: CheckCircle2,
      color: "#3478D4",
      bg: "#EAF3FF",
    },

    {
      label: "Rejected",
      value: 2,
      icon: XCircle,
      color: "#DF5965",
      bg: "#FFEBED",
    },
  ];


  return (
    <DashboardCard title="Leave Overview">

      {leaves.map((leave) => {

        const Icon = leave.icon;

        return (
          <Box
            key={leave.label}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
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
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >

              <Box
                sx={{
                  width: 26,
                  height: 26,
                  borderRadius: 1,
                  bgcolor: leave.bg,
                  color: leave.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon size={15} />
              </Box>

              <Typography
                sx={{
                  fontSize: 10,
                  color: "text.secondary",
                }}
              >
                {leave.label}
              </Typography>

            </Box>


            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >

              <Typography
                sx={{
                  fontSize: 10,
                  fontWeight: 600,
                }}
              >
                {leave.value}
              </Typography>

              <ChevronRight
                size={15}
                color="#9CA3AF"
              />

            </Box>

          </Box>
        );
      })}

    </DashboardCard>
  );
};

export default LeaveOverview;