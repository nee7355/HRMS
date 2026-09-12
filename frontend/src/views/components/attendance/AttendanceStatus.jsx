import { Chip } from "@mui/material";

const AttendanceStatus = ({ status }) => {
    const config = {
        PRESENT: {
            label: "Present",
            color: "success"
        },
        LATE: {
            label: "Late",
            color: "warning"
        },
        ABSENT: {
            label: "Absent",
            color: "error"
        },
        ON_LEAVE: {
            label: "On Leave",
            color: "info"
        },
        HALF_DAY: {
            label: "Half Day",
            color: "warning"
        },
        COMPLETED: {
            label: "Completed",
            color: "success"
        }
    };

    const current =
        config[status] || {
            label: status || "Unknown",
            color: "default"
        };

    return (
        <Chip
            label={current.label}
            color={current.color}
            size="small"
            variant="outlined"
        />
    );
};

export default AttendanceStatus;