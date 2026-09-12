import {
    Box,
    Divider,
    Drawer,
    IconButton,
    Stack,
    Typography
} from "@mui/material";

import {
    IconX,
    IconClock,
    IconCalendar,
    IconLogin,
    IconLogout
} from "@tabler/icons-react";

const AttendanceDetails = ({
    attendance,
    open,
    onClose
}) => {

    if (!attendance) {
        return null;
    }

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            slotProps={{
                paper: {
                    sx: {
                        width: {
                            xs: "100%",
                            sm: 450
                        }
                    }
                }
            }}
        >
            {/* Header */}

            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                px={2.5}
                py={2}
            >
                <Box>
                    <Typography
                        variant="h6"
                        fontWeight={600}
                    >
                        Attendance Details
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        View attendance sessions
                    </Typography>
                </Box>

                <IconButton onClick={onClose}>
                    <IconX size={20} />
                </IconButton>
            </Stack>

            <Divider />

            <Box
                sx={{
                    p: 2.5,
                    overflowY: "auto"
                }}
            >
                {/* Employee */}

                <Box mb={3}>
                    <Typography
                        variant="subtitle1"
                        fontWeight={600}
                    >
                        {attendance.employee?.name}
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        {
                            attendance.employee
                                ?.designation
                        }
                    </Typography>
                </Box>

                {/* Date */}

                <DetailRow
                    icon={<IconCalendar size={19} />}
                    label="Date"
                    value={attendance.date}
                />

                <DetailRow
                    icon={<IconClock size={19} />}
                    label="Total Working Hours"
                    value={
                        attendance.workingHours
                            ? `${attendance.workingHours} hrs`
                            : "-"
                    }
                />

                <Divider sx={{ my: 3 }} />

                <Typography
                    variant="subtitle2"
                    fontWeight={600}
                    mb={2}
                >
                    Attendance Sessions
                </Typography>

                <Stack spacing={2}>
                    {attendance.sessions?.length ? (
                        attendance.sessions.map(
                            (session, index) => (
                                <Box
                                    key={
                                        session._id ||
                                        index
                                    }
                                    sx={{
                                        p: 2,
                                        border: 1,
                                        borderColor:
                                            "divider",
                                        borderRadius: 2
                                    }}
                                >
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                    >
                                        Session{" "}
                                        {index + 1}
                                    </Typography>

                                    <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                        mt={1.5}
                                    >
                                        <DetailRow
                                            icon={
                                                <IconLogin
                                                    size={
                                                        18
                                                    }
                                                />
                                            }
                                            label="Check In"
                                            value={
                                                session.checkIn ||
                                                "-"
                                            }
                                        />

                                        <DetailRow
                                            icon={
                                                <IconLogout
                                                    size={
                                                        18
                                                    }
                                                />
                                            }
                                            label="Check Out"
                                            value={
                                                session.checkOut ||
                                                "-"
                                            }
                                        />
                                    </Stack>
                                </Box>
                            )
                        )
                    ) : (
                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            No attendance sessions
                            available.
                        </Typography>
                    )}
                </Stack>
            </Box>
        </Drawer>
    );
};

const DetailRow = ({
    icon,
    label,
    value
}) => (
    <Stack
        direction="row"
        spacing={1}
        alignItems="center"
    >
        <Box
            sx={{
                color: "text.secondary",
                display: "flex"
            }}
        >
            {icon}
        </Box>

        <Box>
            <Typography
                variant="caption"
                color="text.secondary"
                display="block"
            >
                {label}
            </Typography>

            <Typography
                variant="body2"
                fontWeight={500}
            >
                {value}
            </Typography>
        </Box>
    </Stack>
);

export default AttendanceDetails;