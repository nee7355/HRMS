import {
    Box,
    Card,
    CardContent,
    Chip,
    Grid,
    Stack,
    Typography
} from "@mui/material";

import {
    IconUsers,
    IconUserCheck,
    IconUserX,
    IconClock,
    IconCalendarEvent,
    IconChevronRight
} from "@tabler/icons-react";
import AttendanceWidget from "../../../components/dashboard/AttendanceWidget";

// Reuse your existing attendance component
// import AttendanceWidget from "../../components/attendance/AttendanceWidget";

const ManagerDashboard = () => {

    return (
        <Box>
            {/* =========================================
                HEADER
            ========================================== */}

            {/* <Box mb={3}>
                <Typography
                    variant="h5"
                    fontWeight={600}
                >
                    Manager Dashboard
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    mt={0.5}
                >
                    Monitor your team and manage daily
                    activities.
                </Typography>
            </Box> */}

            {/* =========================================
                ATTENDANCE
            ========================================== */}

            <Box mb={3}>
                <AttendanceWidget />
            </Box>

            {/* =========================================
                TEAM SUMMARY
            ========================================== */}

            <TeamSummary />

            {/* =========================================
                MAIN CONTENT
            ========================================== */}

            <Grid container spacing={2} mt={0.5}>

                {/* Today's Attendance */}

                <Grid
                    size={{
                        xs: 12,
                        lg: 7
                    }}
                >
                    <TodayTeamAttendance />
                </Grid>

                {/* Pending Leaves */}

                <Grid
                    size={{
                        xs: 12,
                        lg: 5
                    }}
                >
                    <PendingLeaveRequests />
                </Grid>

            </Grid>
        </Box>
    );
};


/* =========================================
   TEAM SUMMARY
========================================= */

const TeamSummary = () => {

    const summary = [
        {
            title: "Total Team",
            value: 12,
            description: "Team members",
            icon: IconUsers
        },
        {
            title: "Present",
            value: 9,
            description: "Currently present",
            icon: IconUserCheck
        },
        {
            title: "Absent",
            value: 2,
            description: "Not checked in",
            icon: IconUserX
        },
        {
            title: "On Leave",
            value: 1,
            description: "Currently on leave",
            icon: IconCalendarEvent
        }
    ];

    return (
        <Grid container spacing={2} mb={2}>
            {summary.map((item) => {

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
                        <Card
                            elevation={0}
                            sx={{
                                height: "100%",
                                border: 1,
                                borderColor:
                                    "divider",
                                borderRadius: 2
                            }}
                        >
                            <CardContent>
                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="flex-start"
                                >
                                    <Box>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            {item.title}
                                        </Typography>

                                        <Typography
                                            variant="h4"
                                            fontWeight={600}
                                            mt={1}
                                        >
                                            {item.value}
                                        </Typography>

                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            {
                                                item.description
                                            }
                                        </Typography>
                                    </Box>

                                    <Box
                                        sx={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: 1.5,
                                            bgcolor:
                                                "action.hover",
                                            display:
                                                "flex",
                                            alignItems:
                                                "center",
                                            justifyContent:
                                                "center"
                                        }}
                                    >
                                        <Icon size={21} />
                                    </Box>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                );
            })}
        </Grid>
    );
};


/* =========================================
   TODAY TEAM ATTENDANCE
========================================= */

const TodayTeamAttendance = () => {

    const employees = [
        {
            id: 1,
            name: "Rahul Sharma",
            designation:
                "Frontend Developer",
            checkIn: "09:15 AM",
            working: "6h 42m",
            status: "PRESENT"
        },
        {
            id: 2,
            name: "Priya Singh",
            designation:
                "Backend Developer",
            checkIn: "09:32 AM",
            working: "6h 25m",
            status: "PRESENT"
        },
        {
            id: 3,
            name: "Amit Kumar",
            designation:
                "UI Developer",
            checkIn: "-",
            working: "-",
            status: "ABSENT"
        },
        {
            id: 4,
            name: "Neha Patel",
            designation:
                "Software Developer",
            checkIn: "09:05 AM",
            working: "6h 52m",
            status: "PRESENT"
        }
    ];

    return (
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
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                >
                    <Box>
                        <Typography
                            variant="h6"
                            fontWeight={600}
                        >
                            Today's Attendance
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            Your team's attendance
                            today.
                        </Typography>
                    </Box>

                    <IconClock size={21} />
                </Stack>

                <Stack spacing={1}>
                    {employees.map((employee) => (
                        <Stack
                            key={employee.id}
                            direction="row"
                            alignItems="center"
                            spacing={1.5}
                            sx={{
                                py: 1.25,
                                borderBottom: 1,
                                borderColor:
                                    "divider"
                            }}
                        >
                            <Box
                                sx={{
                                    width: 38,
                                    height: 38,
                                    borderRadius:
                                        "50%",
                                    bgcolor:
                                        "action.hover",
                                    display:
                                        "flex",
                                    alignItems:
                                        "center",
                                    justifyContent:
                                        "center",
                                    flexShrink: 0
                                }}
                            >
                                {employee.name
                                    .charAt(0)}
                            </Box>

                            <Box
                                sx={{
                                    flex: 1,
                                    minWidth: 0
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    fontWeight={600}
                                >
                                    {employee.name}
                                </Typography>

                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    {
                                        employee.designation
                                    }
                                </Typography>
                            </Box>

                            <Box
                                sx={{
                                    display: {
                                        xs: "none",
                                        sm: "block"
                                    }
                                }}
                            >
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    Check in
                                </Typography>

                                <Typography
                                    variant="body2"
                                >
                                    {
                                        employee.checkIn
                                    }
                                </Typography>
                            </Box>

                            <Chip
                                size="small"
                                label={
                                    employee.status
                                }
                                color={
                                    employee.status ===
                                    "PRESENT"
                                        ? "success"
                                        : "error"
                                }
                            />
                        </Stack>
                    ))}
                </Stack>

            </CardContent>
        </Card>
    );
};


/* =========================================
   PENDING LEAVE REQUESTS
========================================= */

const PendingLeaveRequests = () => {

    const leaves = [
        {
            id: 1,
            name: "Rahul Sharma",
            type: "Casual Leave",
            duration: "18 - 20 Sep",
            days: 3
        },
        {
            id: 2,
            name: "Priya Singh",
            type: "Sick Leave",
            duration: "15 Sep",
            days: 1
        },
        {
            id: 3,
            name: "Neha Patel",
            type: "Earned Leave",
            duration: "22 - 24 Sep",
            days: 3
        }
    ];

    return (
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
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                >
                    <Box>
                        <Typography
                            variant="h6"
                            fontWeight={600}
                        >
                            Pending Leaves
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            Requests waiting for
                            your approval.
                        </Typography>
                    </Box>

                    <Chip
                        label={`${leaves.length} Pending`}
                        color="warning"
                        size="small"
                    />
                </Stack>

                <Stack spacing={1.5}>
                    {leaves.map((leave) => (
                        <Box
                            key={leave.id}
                            sx={{
                                p: 1.5,
                                border: 1,
                                borderColor:
                                    "divider",
                                borderRadius: 1.5
                            }}
                        >
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Box>
                                    <Typography
                                        variant="body2"
                                        fontWeight={600}
                                    >
                                        {leave.name}
                                    </Typography>

                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                    >
                                        {leave.type} •{" "}
                                        {
                                            leave.duration
                                        }
                                    </Typography>
                                </Box>

                                <Typography
                                    variant="body2"
                                    fontWeight={600}
                                >
                                    {leave.days}d
                                </Typography>
                            </Stack>
                        </Box>
                    ))}
                </Stack>

                <ButtonLink />

            </CardContent>
        </Card>
    );
};


/* =========================================
   VIEW ALL LINK
========================================= */

const ButtonLink = () => {

    return (
        <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            spacing={0.5}
            sx={{
                mt: 2,
                cursor: "pointer"
            }}
        >
            <Typography
                variant="body2"
                fontWeight={500}
                color="primary"
            >
                View all requests
            </Typography>

            <IconChevronRight
                size={17}
            />
        </Stack>
    );
};

export default ManagerDashboard;