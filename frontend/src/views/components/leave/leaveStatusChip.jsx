import { Chip } from "@mui/material";

const LeaveStatus = ({ status }) => {
    const config = {
        PENDING: {
            label: "Pending",
            color: "warning"
        },
        APPROVED: {
            label: "Approved",
            color: "success"
        },
        REJECTED: {
            label: "Rejected",
            color: "error"
        },
        CANCELLED: {
            label: "Cancelled",
            color: "default"
        }
    };

    const current =
        config[status] || config.PENDING;

    return (
        <Chip
            label={current.label}
            color={current.color}
            size="small"
        />
    );
};


export default LeaveStatus;