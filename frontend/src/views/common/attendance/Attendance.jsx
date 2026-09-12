import {
    Box,
    Card,
    CardContent,
    Stack,
    Typography
} from "@mui/material";

import { useEffect, useState } from "react";

// import AttendanceWidget from "../../components/attendance/AttendanceWidget";
import AttendanceSummary from "../../components/attendance/AttendanceSummary";
import AttendanceFilters from "../../components/attendance/AttendanceFilters";
import AttendanceTable from "../../components/attendance/AttendanceTable";
import AttendanceDetails from "../../components/attendance/AttendanceDetails";
import AttendanceWidget from "../../components/dashboard/AttendanceWidget";

export const attendanceDummyData = [
    {
        _id: "att_001",
        employee: {
            _id: "emp_001",
            name: "Rahul Sharma",
            designation: "Frontend Developer"
        },
        date: "12 Sep 2026",
        checkIn: "09:12 AM",
        checkOut: "06:18 PM",
        workingHours: 8.6,
        status: "PRESENT",

        sessions: [
            {
                _id: "session_001",
                checkIn: "09:12 AM",
                checkOut: "01:15 PM",
                workingHours: 4.05
            },
            {
                _id: "session_002",
                checkIn: "02:05 PM",
                checkOut: "06:18 PM",
                workingHours: 4.22
            }
        ]
    },

    {
        _id: "att_002",
        employee: {
            _id: "emp_002",
            name: "Priya Singh",
            designation: "Backend Developer"
        },
        date: "12 Sep 2026",
        checkIn: "09:42 AM",
        checkOut: "06:25 PM",
        workingHours: 8.2,
        status: "LATE",

        sessions: [
            {
                _id: "session_003",
                checkIn: "09:42 AM",
                checkOut: "01:20 PM",
                workingHours: 3.63
            },
            {
                _id: "session_004",
                checkIn: "02:10 PM",
                checkOut: "06:25 PM",
                workingHours: 4.25
            }
        ]
    },

    {
        _id: "att_003",
        employee: {
            _id: "emp_003",
            name: "Amit Kumar",
            designation: "UI Developer"
        },
        date: "12 Sep 2026",
        checkIn: null,
        checkOut: null,
        workingHours: 0,
        status: "ABSENT",
        sessions: []
    },

    {
        _id: "att_004",
        employee: {
            _id: "emp_004",
            name: "Neha Patel",
            designation: "Software Developer"
        },
        date: "12 Sep 2026",
        checkIn: null,
        checkOut: null,
        workingHours: 0,
        status: "ON_LEAVE",
        sessions: []
    },

    {
        _id: "att_005",
        employee: {
            _id: "emp_005",
            name: "Vikas Verma",
            designation: "QA Engineer"
        },
        date: "12 Sep 2026",
        checkIn: "09:05 AM",
        checkOut: "01:10 PM",
        workingHours: 4.08,
        status: "HALF_DAY",

        sessions: [
            {
                _id: "session_005",
                checkIn: "09:05 AM",
                checkOut: "01:10 PM",
                workingHours: 4.08
            }
        ]
    },

    {
        _id: "att_006",
        employee: {
            _id: "emp_006",
            name: "Anjali Gupta",
            designation: "HR Executive"
        },
        date: "12 Sep 2026",
        checkIn: "08:55 AM",
        checkOut: "05:50 PM",
        workingHours: 8.75,
        status: "PRESENT",

        sessions: [
            {
                _id: "session_006",
                checkIn: "08:55 AM",
                checkOut: "01:00 PM",
                workingHours: 4.08
            },
            {
                _id: "session_007",
                checkIn: "01:55 PM",
                checkOut: "05:50 PM",
                workingHours: 3.92
            }
        ]
    },

    {
        _id: "att_007",
        employee: {
            _id: "emp_007",
            name: "Rohit Mehta",
            designation: "Node.js Developer"
        },
        date: "12 Sep 2026",
        checkIn: "09:20 AM",
        checkOut: null,
        workingHours: null,
        status: "PRESENT",

        sessions: [
            {
                _id: "session_008",
                checkIn: "09:20 AM",
                checkOut: "01:05 PM",
                workingHours: 3.75
            },
            {
                _id: "session_009",
                checkIn: "02:00 PM",
                checkOut: null,
                workingHours: null
            }
        ]
    },

    {
        _id: "att_008",
        employee: {
            _id: "emp_008",
            name: "Sneha Joshi",
            designation: "Product Designer"
        },
        date: "12 Sep 2026",
        checkIn: "09:08 AM",
        checkOut: "06:02 PM",
        workingHours: 8.3,
        status: "PRESENT",

        sessions: [
            {
                _id: "session_010",
                checkIn: "09:08 AM",
                checkOut: "01:10 PM",
                workingHours: 4.03
            },
            {
                _id: "session_011",
                checkIn: "02:00 PM",
                checkOut: "06:02 PM",
                workingHours: 4.03
            }
        ]
    },

    {
        _id: "att_009",
        employee: {
            _id: "emp_009",
            name: "Karan Malhotra",
            designation: "DevOps Engineer"
        },
        date: "12 Sep 2026",
        checkIn: "10:15 AM",
        checkOut: "06:30 PM",
        workingHours: 7.25,
        status: "LATE",

        sessions: [
            {
                _id: "session_012",
                checkIn: "10:15 AM",
                checkOut: "01:30 PM",
                workingHours: 3.25
            },
            {
                _id: "session_013",
                checkIn: "02:30 PM",
                checkOut: "06:30 PM",
                workingHours: 4
            }
        ]
    },

    {
        _id: "att_010",
        employee: {
            _id: "emp_010",
            name: "Pooja Yadav",
            designation: "Business Analyst"
        },
        date: "12 Sep 2026",
        checkIn: null,
        checkOut: null,
        workingHours: 0,
        status: "ABSENT",
        sessions: []
    }
];


const Attendance = ({
    role = "EMPLOYEE"
}) => {

    const isEmployee =
        role === "EMPLOYEE";

    const [search, setSearch] =
        useState("");

    const [date, setDate] =
        useState(
            new Date()
                .toISOString()
                .split("T")[0]
        );

    const [status, setStatus] =
        useState("ALL");

    const [department, setDepartment] =
        useState("ALL");

    const [departments, setDepartments] =
        useState([]);

    const [page, setPage] =
        useState(1);

    const [totalPages, setTotalPages] =
        useState(1);

    const [attendance, setAttendance] =
        useState(attendanceDummyData);

    const [summary, setSummary] =
        useState({
            total: 0,
            present: 0,
            absent: 0,
            late: 0,
            onLeave: 0
        });

    const [selectedAttendance, setSelectedAttendance] =
        useState(null);

    const [openDetails, setOpenDetails] =
        useState(false);

    /* =========================================
       FETCH ATTENDANCE
    ========================================== */

    const fetchAttendance = async () => {
        try {

            /*
            const response =
                await getAttendance({
                    page,
                    limit: 10,
                    date,
                    search,
                    status,
                    department
                });

            setAttendance(
                response.data.attendance
            );

            setTotalPages(
                response.data.totalPages
            );

            setSummary(
                response.data.summary
            );
            */

        } catch (error) {
            console.error(
                "Attendance fetch error:",
                error
            );
        }
    };

    useEffect(() => {
        fetchAttendance();
    }, [page]);

    /* =========================================
       FILTER
    ========================================== */

    const handleApplyFilter = () => {
        setPage(1);
        fetchAttendance();
    };

    const handleReset = () => {

        setSearch("");

        setDate(
            new Date()
                .toISOString()
                .split("T")[0]
        );

        setStatus("ALL");
        setDepartment("ALL");
        setPage(1);

        fetchAttendance();
    };

    /* =========================================
       VIEW DETAILS
    ========================================== */

    const handleView = (attendance) => {
        setSelectedAttendance(attendance);
        setOpenDetails(true);
    };

    return (
        <Box>

            {/* =====================================
                HEADER
            ====================================== */}

            <Box mb={3}>
                <Typography
                    variant="h5"
                    fontWeight={600}
                >
                    Attendance
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    mt={0.5}
                >
                    Track and manage employee
                    attendance.
                </Typography>
            </Box>

            {/* =====================================
                CHECK IN / CHECK OUT
            ====================================== */}

            <Box mb={3}>
                <AttendanceWidget />
            </Box>

            {/* =====================================
                SUMMARY
            ====================================== */}

            {!isEmployee && (
                <Box mb={3}>
                    <AttendanceSummary
                        {...summary}
                    />
                </Box>
            )}

            {/* =====================================
                FILTERS + TABLE
            ====================================== */}

            <Card
                elevation={0}
                sx={{
                    border: 1,
                    borderColor: "divider",
                    borderRadius: 2
                }}
            >
                <CardContent>

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
                        mb={2.5}
                    >
                        <Box>
                            <Typography
                                variant="h6"
                                fontWeight={600}
                            >
                                Attendance Records
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                View attendance history
                                and working sessions.
                            </Typography>
                        </Box>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            {date}
                        </Typography>
                    </Stack>

                    {/* Filters */}

                    {!isEmployee && (
                        <Box mb={2.5}>
                            <AttendanceFilters
                                search={search}
                                setSearch={setSearch}
                                date={date}
                                setDate={setDate}
                                status={status}
                                setStatus={setStatus}
                                department={department}
                                setDepartment={
                                    setDepartment
                                }
                                departments={
                                    departments
                                }
                                onApply={
                                    handleApplyFilter
                                }
                                onReset={
                                    handleReset
                                }
                                showEmployeeFilter={
                                    true
                                }
                                showDepartmentFilter={
                                    role === "ADMIN" ||
                                    role === "HR"
                                }
                            />
                        </Box>
                    )}

                    {/* Table */}

                    <AttendanceTable
                        data={attendance}
                        page={page}
                        setPage={setPage}
                        totalPages={totalPages}
                        onView={handleView}
                    />

                </CardContent>
            </Card>

            {/* =====================================
                DETAILS DRAWER
            ====================================== */}

            <AttendanceDetails
                attendance={
                    selectedAttendance
                }
                open={openDetails}
                onClose={() => {
                    setOpenDetails(false);
                    setSelectedAttendance(null);
                }}
            />

        </Box>
    );
};

export default Attendance;