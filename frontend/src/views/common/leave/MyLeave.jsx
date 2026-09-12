import {
    Box,
    Card,
    CardContent,
    Grid,
    Stack,
    Typography
} from "@mui/material";

import CustomTale from "../../components/CustomTale";
import LeaveStatus from "../../components/leave/leaveStatusChip";
import LeaveSummary from "./LeaveSummary";

const MyLeaves = () => {


    const columns = [
        {
            id: "leaveType",
            header: "Leave Type",
            key: "leaveType"
        },
        {
            id: "startDate",
            header: "Start Date",
            key: "startDate"
        },
        {
            id: "endDate",
            header: "End Date",
            key: "endDate"
        },
        {
            id: "days",
            header: "Days",
            key: "days"
        },
        {
            id: "status",
            header: "Status",
            key: "status",
            Cell: (row) => (
                <LeaveStatus status={row.status} />
            )
        }
    ];

    const leaves = [
        {
            id: 1,
            leaveType: "Casual Leave",
            startDate: "18 Sep 2026",
            endDate: "20 Sep 2026",
            days: 3,
            status: "PENDING"
        },
        {
            id: 2,
            leaveType: "Sick Leave",
            startDate: "05 Sep 2026",
            endDate: "05 Sep 2026",
            days: 1,
            status: "APPROVED"
        }
    ];

    return (
        <Stack spacing={3}>
            <LeaveSummary
                total={18}
                used={6}
                available={12}
                pending={2}
            />

            <CustomTale
                column={columns}
                data={leaves}
                enablePagination={false}
            />
        </Stack>
    );  
};


export default MyLeaves;