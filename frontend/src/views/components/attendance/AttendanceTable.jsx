import {
    Box,
    Button,
    Stack,
    Typography
} from "@mui/material";

import {
    IconEye
} from "@tabler/icons-react";

import CustomTale from "../CustomTale";
import AttendanceStatus from "./AttendanceStatus";

const AttendanceTable = ({
    data = [],
    page = 1,
    setPage,
    totalPages = 1,
    onView
}) => {

    const columns = [
        {
            id: "employee",
            header: "Employee",
            key: "employee",
            Cell: (row) => (
                <Stack
                    direction="row"
                    spacing={1.5}
                    alignItems="center"
                >
                    <Box
                        sx={{
                            width: 36,
                            height: 36,
                            borderRadius: "50%",
                            bgcolor: "action.hover",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0
                        }}
                    >
                        {row.employee?.name
                            ?.charAt(0)
                            ?.toUpperCase()}
                    </Box>

                    <Box>
                        <Typography
                            variant="body2"
                            fontWeight={600}
                        >
                            {row.employee?.name}
                        </Typography>

                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            {row.employee?.designation}
                        </Typography>
                    </Box>
                </Stack>
            )
        },

        {
            id: "date",
            header: "Date",
            key: "date"
        },

        {
            id: "checkIn",
            header: "Check In",
            key: "checkIn"
        },

        {
            id: "checkOut",
            header: "Check Out",
            key: "checkOut"
        },

        {
            id: "workingHours",
            header: "Working Hours",
            key: "workingHours",
            Cell: (row) => (
                <Typography variant="body2">
                    {row.workingHours
                        ? `${row.workingHours} hrs`
                        : "-"}
                </Typography>
            )
        },

        {
            id: "sessions",
            header: "Sessions",
            key: "sessions",
            Cell: (row) => (
                <Typography variant="body2">
                    {row.sessions?.length || 0}
                </Typography>
            )
        },

        {
            id: "status",
            header: "Status",
            key: "status",
            Cell: (row) => (
                <AttendanceStatus
                    status={row.status}
                />
            )
        },

        {
            id: "action",
            header: "Action",
            key: "action",
            Cell: (row) => (
                <Button
                    size="small"
                    variant="outlined"
                    startIcon={
                        <IconEye size={16} />
                    }
                    onClick={() =>
                        onView?.(row)
                    }
                >
                    View
                </Button>
            )
        }
    ];

    return (
        <CustomTale
            column={columns}
            data={data}
            enablePagination={true}
            page={page}
            setPage={setPage}
            totalPages={totalPages}
            itemPerPage={10}
        />
    );
};

export default AttendanceTable;