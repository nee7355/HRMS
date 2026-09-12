import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Divider,
    Grid,
    IconButton,
    InputAdornment,
    MenuItem,
    OutlinedInput,
    Select,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography
} from "@mui/material";

import {
    IconCalendar,
    IconCalendarStats,
    IconClock,
    IconCheck,
    IconX,
    IconPlus,
    IconSearch,
    IconFilterOff
} from "@tabler/icons-react";

import { useMemo, useState } from "react";
import LeaveSummaryCard from "../../components/leave/LeaveSummaryCard";
import LeaveEmptyState from "../../components/leave/LeaveEmptyState";
import ApplyLeaveModal from "../../components/modals/ApplyLeaveModal";
import { useDispatch, useSelector } from "react-redux";
import { applyLeave, getLeave, leaveSelector } from "../../../store/slices/leaveSlice";
import CustomTale from "../../components/CustomTale";
import { useEffect } from "react";
import { formatDateInDMY } from "../../components/utils/fn";

// Your existing Apply Leave modal
// import ApplyLeaveModal from "./ApplyLeaveModal";

const leaveData = [
    {
        id: 1,
        leaveType: "Casual Leave",
        startDate: "18 Sep 2026",
        endDate: "20 Sep 2026",
        days: 3,
        reason: "Family function",
        appliedOn: "10 Sep 2026",
        status: "PENDING"
    },
    {
        id: 2,
        leaveType: "Sick Leave",
        startDate: "05 Sep 2026",
        endDate: "05 Sep 2026",
        days: 1,
        reason: "Not feeling well",
        appliedOn: "04 Sep 2026",
        status: "APPROVED"
    },
    {
        id: 3,
        leaveType: "Earned Leave",
        startDate: "12 Aug 2026",
        endDate: "14 Aug 2026",
        days: 3,
        reason: "Personal work",
        appliedOn: "01 Aug 2026",
        status: "REJECTED"
    }
];

const summaryData = [
    {
        title: "Total Leave",
        value: 18,
        subtitle: "Annual entitlement",
        icon: IconCalendarStats
    },
    {
        title: "Used Leave",
        value: 6,
        subtitle: "Leave days used",
        icon: IconCheck
    },
    {
        title: "Available",
        value: 12,
        subtitle: "Days remaining",
        icon: IconCalendar
    },
    {
        title: "Pending",
        value: 1,
        subtitle: "Awaiting approval",
        icon: IconClock
    }
];

const getStatusColor = (status) => {
    switch (status) {
        case "APPROVED":
            return "success";

        case "REJECTED":
            return "error";

        case "PENDING":
            return "warning";

        case "CANCELLED":
            return "default";

        default:
            return "default";
    }
};

const LeaveTest = () => {
    const [openApplyModal, setOpenApplyModal] = useState(false);

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("ALL");
    const [leaveTypeFilter, setLeaveTypeFilter] = useState("ALL");

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const { leaveType, leave } = useSelector(leaveSelector);

    const dispatch = useDispatch();

    useEffect(()=>{
        // alert("clicked");
        dispatch(getLeave());
    },[])

    const dbLeaveData = useMemo(()=>{
        const leaveClone = structuredClone(leave);
        

        return leaveClone?.map((l)=>{
           
            const start = formatDateInDMY(l.startDate);
            const end = formatDateInDMY(l.endDate);
            return {
                _id: l._id,
                leaveType: l?.leaveTypeId?.name,
                duration: `${start} to ${end}`,
                days: l.totalDays,
                reason: l.reason,
                appliedOn: formatDateInDMY(l.createdAt),
                status: l.status,

            }
        })
    },[leave]);

    const filteredLeaves = useMemo(() => {
        return dbLeaveData?.filter((leave) => {
            const matchesSearch =
                leave.leaveType
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                leave.reason
                    .toLowerCase()
                    .includes(search.toLowerCase());
            const matchesStatus =
                status === "ALL" || leave.status === status;

            const matchesLeaveType =
                leaveTypeFilter === "ALL" ||
                leave.leaveType === leaveTypeFilter;

            return (
                matchesSearch &&
                matchesStatus &&
                matchesLeaveType
            );
        });
    }, [search, status, leaveTypeFilter, dbLeaveData]);

    const handleClearFilters = () => {
        setSearch("");
        setStatus("ALL");
        setLeaveTypeFilter("ALL");
        setPage(0);
    };

    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };
    const submitLeaveApply = (data) => {

        if (!data) return;
        try {
            dispatch(applyLeave(data));
            setOpenApplyModal(false);
        } catch (error) {

        }
    }
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const column = useMemo(() => [
        {
            id: 1,
            header: 'Sr No',
            Cell: (row, index) => index + 1
        },
        {
            id: 2,
            header: 'Leave Type',
            key: 'leaveType',
        },
        {
            id: 3,
            header: 'Duration',
            key: 'duration'
        },
        {
            id: 3,
            header: 'Days',
            key: 'days',
        },
        {
            id: 3,
            header: 'Reason',
            key: 'reason',
        },
        {
            id: 3,
            header: 'Applied On',
            key: 'appliedOn',
        },
        {
            id: 3,
            header: 'Status',
            Cell: (row) => <Chip
                label={
                    row.status
                }
                color={getStatusColor(
                    row.status
                )}
                size="small"
                variant="soft"
            />
        },
        {
            id: 3,
            header: 'Action',
            Cell: (row) => <>
                {row.status ===
                    "PENDING" && (
                        <Button
                            size="small"
                            color="error"
                            startIcon={
                                <IconX
                                    size={
                                        16
                                    }
                                />
                            }
                        >
                            Cancel
                        </Button>
                    )}

                {row.status !==
                    "PENDING" && (
                        <Button
                            size="small"
                        >
                            View
                        </Button>
                    )}
            </>
        },
    ], [])

    return (
        <Box>
            {/* =========================================
                PAGE HEADER
            ========================================== */}

            <Stack
                direction={{ xs: "column", sm: "row" }}
                justifyContent="space-between"
                alignItems={{ xs: "flex-start", sm: "center" }}
                spacing={2}
                mb={3}
            >
                <Box>
                    <Typography
                        variant="h5"
                        fontWeight={600}
                        mb={0.5}
                    >
                        Leave Management
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        Manage your leave requests and track
                        your leave balance.
                    </Typography>
                </Box>

                <Button
                    variant="contained"
                    startIcon={<IconPlus size={19} />}
                    onClick={() => setOpenApplyModal(true)}
                >
                    Apply Leave
                </Button>
            </Stack>

            {/* =========================================
                SUMMARY CARDS
            ========================================== */}

            <Grid container spacing={2} mb={3}>
                {summaryData.map((item) => {
                    const Icon = item.icon;

                    return (
                        <Grid
                            key={item.title}
                            size={{
                                xs: 12,
                                sm: 6,
                                md: 3
                            }}
                        >
                            <LeaveSummaryCard
                                title={item.title}
                                value={item.value}
                                subtitle={item.subtitle}
                                icon={<Icon size={22} />}
                            />
                        </Grid>
                    );
                })}
            </Grid>

            {/* =========================================
                LEAVE REQUESTS
            ========================================== */}

            <Card
                elevation={0}
                sx={{
                    border: 1,
                    borderColor: "divider",
                    borderRadius: 2
                }}
            >
                <CardContent sx={{ p: 0 }}>
                    {/* TABLE HEADER */}

                    <Box
                        sx={{
                            px: 2.5,
                            py: 2,
                        }}
                    >
                        <Stack
                            direction={{
                                xs: "column",
                                md: "row"
                            }}
                            justifyContent="space-between"
                            alignItems={{
                                xs: "stretch",
                                md: "center"
                            }}
                            spacing={2}
                        >
                            <Box>
                                <Typography
                                    variant="h6"
                                    fontWeight={600}
                                >
                                    My Leave Requests
                                </Typography>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    mt={0.3}
                                >
                                    View and track all your leave
                                    applications.
                                </Typography>
                            </Box>

                            <Stack
                                direction={{
                                    xs: "column",
                                    sm: "row"
                                }}
                                spacing={1.5}
                            >
                                {/* SEARCH */}

                                <OutlinedInput
                                    size="small"
                                    value={search}
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                        setPage(0);
                                    }}
                                    placeholder="Search leave..."
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <IconSearch size={18} />
                                        </InputAdornment>
                                    }
                                    sx={{
                                        minWidth: {
                                            xs: "100%",
                                            sm: 220
                                        }
                                    }}
                                />

                                {/* LEAVE TYPE */}

                                <Select
                                    size="small"
                                    value={leaveTypeFilter}
                                    onChange={(e) => {
                                        setLeaveTypeFilter(
                                            e.target.value
                                        );
                                        setPage(0);
                                    }}
                                    sx={{
                                        minWidth: 150
                                    }}
                                >
                                    <MenuItem value="ALL">
                                        All Leave Types
                                    </MenuItem>

                                    <MenuItem value="Casual Leave">
                                        Casual Leave
                                    </MenuItem>

                                    <MenuItem value="Sick Leave">
                                        Sick Leave
                                    </MenuItem>

                                    <MenuItem value="Earned Leave">
                                        Earned Leave
                                    </MenuItem>
                                </Select>

                                {/* STATUS */}

                                <Select
                                    size="small"
                                    value={status}
                                    onChange={(e) => {
                                        setStatus(e.target.value);
                                        setPage(0);
                                    }}
                                    sx={{
                                        minWidth: 130
                                    }}
                                >
                                    <MenuItem value="ALL">
                                        All Status
                                    </MenuItem>

                                    <MenuItem value="PENDING">
                                        Pending
                                    </MenuItem>

                                    <MenuItem value="APPROVED">
                                        Approved
                                    </MenuItem>

                                    <MenuItem value="REJECTED">
                                        Rejected
                                    </MenuItem>

                                    <MenuItem value="CANCELLED">
                                        Cancelled
                                    </MenuItem>
                                </Select>

                                {(search ||
                                    status !== "ALL" ||
                                    leaveTypeFilter !== "ALL") && (
                                        <IconButton
                                            onClick={handleClearFilters}
                                            size="small"
                                            title="Clear filters"
                                        >
                                            <IconFilterOff size={19} />
                                        </IconButton>
                                    )}
                            </Stack>
                        </Stack>
                    </Box>

                    <Divider />

                    {/* =========================================
                        TABLE
                    ========================================== */}
                    <CustomTale 
                    column={column} 
                    data={filteredLeaves} 
                    containerSX={{maxHeight: 'calc(100vh - 440px)'}}
                    tableSX={{border:'none'}}
                    />
                    {/* <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        Leave Type
                                    </TableCell>

                                    <TableCell>
                                        Duration
                                    </TableCell>

                                    <TableCell>
                                        Days
                                    </TableCell>

                                    <TableCell>
                                        Reason
                                    </TableCell>

                                    <TableCell>
                                        Applied On
                                    </TableCell>

                                    <TableCell>
                                        Status
                                    </TableCell>

                                    <TableCell align="right">
                                        Action
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {filteredLeaves.length > 0 ? (
                                    filteredLeaves
                                        .slice(
                                            page * rowsPerPage,
                                            page * rowsPerPage +
                                            rowsPerPage
                                        )
                                        .map((leave) => (
                                            <TableRow
                                                key={leave.id}
                                                hover
                                            >
                                                <TableCell>
                                                    <Typography
                                                        variant="body2"
                                                        fontWeight={600}
                                                    >
                                                        {
                                                            leave.leaveType
                                                        }
                                                    </Typography>
                                                </TableCell>

                                                <TableCell>
                                                    <Box>
                                                        <Typography
                                                            variant="body2"
                                                        >
                                                            {
                                                                leave.startDate
                                                            }
                                                        </Typography>

                                                        {leave.startDate !==
                                                            leave.endDate && (
                                                                <Typography
                                                                    variant="caption"
                                                                    color="text.secondary"
                                                                >
                                                                    to{" "}
                                                                    {
                                                                        leave.endDate
                                                                    }
                                                                </Typography>
                                                            )}
                                                    </Box>
                                                </TableCell>

                                                <TableCell>
                                                    <Typography
                                                        variant="body2"
                                                        fontWeight={500}
                                                    >
                                                        {leave.days}{" "}
                                                        {leave.days ===
                                                            1
                                                            ? "Day"
                                                            : "Days"}
                                                    </Typography>
                                                </TableCell>

                                                <TableCell>
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            maxWidth: 220,
                                                            overflow:
                                                                "hidden",
                                                            textOverflow:
                                                                "ellipsis",
                                                            whiteSpace:
                                                                "nowrap"
                                                        }}
                                                        title={
                                                            leave.reason
                                                        }
                                                    >
                                                        {
                                                            leave.reason
                                                        }
                                                    </Typography>
                                                </TableCell>

                                                <TableCell>
                                                    <Typography
                                                        variant="body2"
                                                        color="text.secondary"
                                                    >
                                                        {
                                                            leave.appliedOn
                                                        }
                                                    </Typography>
                                                </TableCell>

                                                <TableCell>
                                                    <Chip
                                                        label={
                                                            leave.status
                                                        }
                                                        color={getStatusColor(
                                                            leave.status
                                                        )}
                                                        size="small"
                                                        variant="soft"
                                                    />
                                                </TableCell>

                                                <TableCell align="right">
                                                    {leave.status ===
                                                        "PENDING" && (
                                                            <Button
                                                                size="small"
                                                                color="error"
                                                                startIcon={
                                                                    <IconX
                                                                        size={
                                                                            16
                                                                        }
                                                                    />
                                                                }
                                                            >
                                                                Cancel
                                                            </Button>
                                                        )}

                                                    {leave.status !==
                                                        "PENDING" && (
                                                            <Button
                                                                size="small"
                                                            >
                                                                View
                                                            </Button>
                                                        )}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={7}
                                            align="center"
                                        >
                                            <LeaveEmptyState
                                                onClear={
                                                    handleClearFilters
                                                }
                                            />
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer> */}

                    {/* PAGINATION */}

                    {/* {filteredLeaves.length > 0 && (
                        <TablePagination
                            component="div"
                            count={filteredLeaves.length}
                            page={page}
                            onPageChange={handleChangePage}
                            rowsPerPage={rowsPerPage}
                            onRowsPerPageChange={
                                handleChangeRowsPerPage
                            }
                            rowsPerPageOptions={[
                                5,
                                10,
                                25
                            ]}
                        />
                    )} */}
                </CardContent>
            </Card>

            {openApplyModal && <ApplyLeaveModal open={openApplyModal} onClose={() => setOpenApplyModal(false)} onSubmitLeave={submitLeaveApply} leaveTypes={leaveType} />}


        </Box>
    );
};

export default LeaveTest;