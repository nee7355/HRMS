import { useEffect, useMemo, useState } from "react";
import {
    Box,
    Button,
    Chip,
    InputAdornment,
    OutlinedInput,
    Stack,
    Typography
} from "@mui/material";

import {
    IconEye,
    IconSearch,
    IconFilterOff
} from "@tabler/icons-react";

import CustomTale from "../../components/CustomTale";
import LeaveRequestDetails from "./LeaveRequestDetails";
import LeaveStatus from "../../components/leave/leaveStatusChip";

const TeamLeaveRequests = () => {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("ALL");

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [leaves, setLeaves] = useState([]);

    const [selectedLeave, setSelectedLeave] =
        useState(null);

    const [openDetails, setOpenDetails] =
        useState(false);

    const [loading, setLoading] = useState(false);
    const [actionLoading, setActionLoading] =
        useState(false);

    /*
     * Replace this with your API call.
     */
    const fetchTeamLeaves = async () => {
        try {
            setLoading(true);

            /*
            const response = await getTeamLeaves({
                page,
                limit: 10,
                search,
                status
            });

            setLeaves(response.data.leaves);
            setTotalPages(response.data.totalPages);
            */

            // Temporary data for UI
            const data = [
                {
                    id: "1",
                    employee: {
                        firstName: "Rahul",
                        lastName: "Sharma",
                        designation: "Frontend Developer"
                    },
                    leaveType: "Casual Leave",
                    startDate: "18 Sep 2026",
                    endDate: "20 Sep 2026",
                    days: 3,
                    appliedOn: "12 Sep 2026",
                    reason: "Family function",
                    status: "PENDING"
                },
                {
                    id: "2",
                    employee: {
                        firstName: "Priya",
                        lastName: "Singh",
                        designation: "Backend Developer"
                    },
                    leaveType: "Sick Leave",
                    startDate: "15 Sep 2026",
                    endDate: "15 Sep 2026",
                    days: 1,
                    appliedOn: "11 Sep 2026",
                    reason: "Not feeling well",
                    status: "PENDING"
                },
                {
                    id: "3",
                    employee: {
                        firstName: "Amit",
                        lastName: "Kumar",
                        designation: "UI Developer"
                    },
                    leaveType: "Earned Leave",
                    startDate: "20 Sep 2026",
                    endDate: "22 Sep 2026",
                    days: 3,
                    appliedOn: "08 Sep 2026",
                    reason: "Personal work",
                    status: "APPROVED"
                }
            ];

            setLeaves(data);
            setTotalPages(1);

        } catch (error) {
            console.error(
                "Error fetching team leaves:",
                error
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeamLeaves();
    }, [page, status]);

    const handleSearch = () => {
        setPage(1);
        fetchTeamLeaves();
    };

    const handleClearFilter = () => {
        setSearch("");
        setStatus("ALL");
        setPage(1);
    };

    const handleView = (leave) => {
        setSelectedLeave(leave);
        setOpenDetails(true);
    };

    const handleCloseDetails = () => {
        setOpenDetails(false);
        setSelectedLeave(null);
    };

    const handleApprove = async (leave) => {
        try {
            setActionLoading(true);

            /*
            await approveLeave(leave.id);

            await fetchTeamLeaves();
            */

            handleCloseDetails();

        } catch (error) {
            console.error(
                "Error approving leave:",
                error
            );
        } finally {
            setActionLoading(false);
        }
    };

    const handleReject = async (leave) => {
        try {
            setActionLoading(true);

            /*
            await rejectLeave(leave.id, reason);

            await fetchTeamLeaves();
            */

            handleCloseDetails();

        } catch (error) {
            console.error(
                "Error rejecting leave:",
                error
            );
        } finally {
            setActionLoading(false);
        }
    };

    const columns = useMemo(() => [
        {
            id: "employee",
            header: "Employee",
            key: "employee",
            Cell: (row) => (
                <Box>
                    <Typography
                        variant="body2"
                        fontWeight={600}
                    >
                        {row.employee?.firstName}{" "}
                        {row.employee?.lastName}
                    </Typography>

                    <Typography
                        variant="caption"
                        color="text.secondary"
                    >
                        {row.employee?.designation}
                    </Typography>
                </Box>
            )
        },
        {
            id: "leaveType",
            header: "Leave Type",
            key: "leaveType"
        },
        {
            id: "duration",
            header: "Duration",
            key: "duration",
            Cell: (row) => (
                <Box>
                    <Typography variant="body2">
                        {row.startDate}
                    </Typography>

                    {row.startDate !==
                        row.endDate && (
                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            to {row.endDate}
                        </Typography>
                    )}
                </Box>
            )
        },
        {
            id: "days",
            header: "Days",
            key: "days"
        },
        {
            id: "appliedOn",
            header: "Applied On",
            key: "appliedOn"
        },
        {
            id: "status",
            header: "Status",
            key: "status",
            Cell: (row) => (
                <LeaveStatus status={row.status} />
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
                        handleView(row)
                    }
                >
                    View
                </Button>
            )
        }
    ], []);

    return (
        <Box>
            {/* Header */}

            <Stack
                direction={{
                    xs: "column",
                    md: "row"
                }}
                justifyContent="space-between"
                alignItems={{
                    xs: "flex-start",
                    md: "center"
                }}
                spacing={2}
                mb={2}
            >
                <Box>
                    <Typography
                        variant="h6"
                        fontWeight={600}
                    >
                        Team Leave Requests
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        mt={0.5}
                    >
                        Review leave applications from
                        your team members.
                    </Typography>
                </Box>

                <Stack
                    direction={{
                        xs: "column",
                        sm: "row"
                    }}
                    spacing={1}
                    width={{
                        xs: "100%",
                        md: "auto"
                    }}
                >
                    <OutlinedInput
                        size="small"
                        value={search}
                        placeholder="Search employee..."
                        onChange={(event) =>
                            setSearch(
                                event.target.value
                            )
                        }
                        onKeyDown={(event) => {
                            if (
                                event.key === "Enter"
                            ) {
                                handleSearch();
                            }
                        }}
                        startAdornment={
                            <InputAdornment position="start">
                                <IconSearch size={18} />
                            </InputAdornment>
                        }
                    />

                    <OutlinedInput
                        select
                        size="small"
                        value={status}
                        onChange={(event) => {
                            setStatus(
                                event.target.value
                            );
                            setPage(1);
                        }}
                        sx={{ minWidth: 140 }}
                    >
                        <option value="ALL">
                            All Status
                        </option>

                        <option value="PENDING">
                            Pending
                        </option>

                        <option value="APPROVED">
                            Approved
                        </option>

                        <option value="REJECTED">
                            Rejected
                        </option>
                    </OutlinedInput>

                    <Button
                        variant="outlined"
                        onClick={handleClearFilter}
                        startIcon={
                            <IconFilterOff size={17} />
                        }
                    >
                        Clear
                    </Button>
                </Stack>
            </Stack>

            {/* Table */}

            <CustomTale
                column={columns}
                data={leaves}
                enablePagination={true}
                page={page}
                setPage={setPage}
                totalPages={totalPages}
                itemPerPage={10}
            />

            {/* Details */}

            <LeaveRequestDetails
                leave={selectedLeave}
                open={openDetails}
                onClose={handleCloseDetails}
                onApprove={handleApprove}
                onReject={handleReject}
                loading={actionLoading}
            />
        </Box>
    );
};



export default TeamLeaveRequests;