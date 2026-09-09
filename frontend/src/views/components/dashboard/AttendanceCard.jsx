import {
  Box,
  Typography,
} from "@mui/material";

import { PieChart } from "@mui/x-charts";

import DashboardCard from "./DashboardCard";


const AttendanceCard = () => {

  const attendance = {
    total: 124,
    present: 108,
    absent: 10,
    late: 6,
  };

  return (
    <DashboardCard title="Today's Attendance">

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >

        {/* Chart */}

        <PieChart
          series={[
            {
              data: [
                {
                  id: 0,
                  value: attendance.present,
                  label: "Present",
                  color: "#27A875",
                },
                {
                  id: 1,
                  value: attendance.absent,
                  label: "Absent",
                  color: "#E45B63",
                },
                {
                  id: 2,
                  value: attendance.late,
                  label: "Late",
                  color: "#EFBD36",
                },
              ],

              innerRadius: 30,
              outerRadius: 42,

              paddingAngle: 2,

              cornerRadius: 3,
            },
          ]}
          width={120}
          height={120}
          hideLegend
        />


        {/* Details */}

        <Box sx={{ flex: 1 }}>

          <AttendanceItem
            color="#27A875"
            label="Present"
            value={attendance.present}
          />

          <AttendanceItem
            color="#E45B63"
            label="Absent"
            value={attendance.absent}
          />

          <AttendanceItem
            color="#EFBD36"
            label="Late"
            value={attendance.late}
          />

        </Box>

      </Box>


      <Typography
        align="center"
        sx={{
          fontSize: 10,
          color: "text.secondary",
        }}
      >
        Total: {attendance.total}
      </Typography>

    </DashboardCard>
  );
};


const AttendanceItem = ({
  color,
  label,
  value,
}) => {

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 1,
      }}
    >

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.7,
        }}
      >

        <Box
          sx={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            bgcolor: color,
          }}
        />

        <Typography
          sx={{
            fontSize: 10,
            color: "text.secondary",
          }}
        >
          {label}
        </Typography>

      </Box>


      <Typography
        sx={{
          fontSize: 9,
          color: "text.secondary",
        }}
      >
        {value}
      </Typography>

    </Box>
  );
};

export default AttendanceCard;