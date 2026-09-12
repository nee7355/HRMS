import {
    Box,
    Button,
    Chip,
    Divider,
    Drawer,
    IconButton,
    Stack,
    Typography
} from "@mui/material";

import {
    IconCheck,
    IconX,
    IconCalendar,
    IconClock,
    IconUser,
    IconBriefcase,
    IconMessage,
    IconCircleX
} from "@tabler/icons-react";

const LeaveRequestDetails = ({
    leave,
    open,
    onClose,
    onApprove,
    onReject,
    loading = false
}) => {
    if (!leave) {
        return null;
    }

    console.log('leave', leave);
    const isPending = leave.status === "PENDING";

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
                            sm: 460
                        }
                    }
                }
            }}
        >
            {/* =========================================
                HEADER
            ========================================== */}

            <Box
                sx={{
                    px: 2.5,
                    py: 2,
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between"
                }}
            >
                <Box>
                    <Typography
                        variant="h6"
                        fontWeight={600}
                    >
                        Leave Request
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        mt={0.5}
                    >
                        Review employee leave details
                    </Typography>
                </Box>

                <IconButton
                    onClick={onClose}
                    size="small"
                >
                    <IconCircleX size={20} />
                </IconButton>
            </Box>

            <Divider />

            {/* =========================================
                CONTENT
            ========================================== */}

            <Box
                sx={{
                    px: 2.5,
                    py: 2.5,
                    flex: 1,
                    overflowY: "auto"
                }}
            >
                {/* Employee */}

                <Stack
                    direction="row"
                    spacing={1.5}
                    alignItems="center"
                    mb={3}
                >
                    <Box
                        sx={{
                            width: 48,
                            height: 48,
                            borderRadius: "50%",
                            bgcolor: "action.hover",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0
                        }}
                    >
                        <IconUser size={24} />
                    </Box>

                    <Box>
                        <Typography
                            variant="subtitle1"
                            fontWeight={600}
                        >
                            {`${leave?.employee?.firstName} ${leave?.employee.lastName}`}
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            {leave.designation}
                        </Typography>
                    </Box>
                </Stack>

                {/* Status */}

                <Box
                    sx={{
                        p: 2,
                        borderRadius: 2,
                        bgcolor: "action.hover",
                        mb: 3
                    }}
                >
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            Request Status
                        </Typography>

                        <Chip
                            label={leave.status}
                            color={getStatusColor(
                                leave.status
                            )}
                            size="small"
                        />
                    </Stack>
                </Box>

                {/* Leave Information */}

                <Typography
                    variant="subtitle2"
                    fontWeight={600}
                    mb={1.5}
                >
                    Leave Information
                </Typography>

                <Stack spacing={2}>
                    <DetailItem
                        icon={<IconBriefcase size={19} />}
                        label="Leave Type"
                        value={leave.leaveType}
                    />

                    <DetailItem
                        icon={<IconCalendar size={19} />}
                        label="Start Date"
                        value={leave.startDate}
                    />

                    <DetailItem
                        icon={<IconCalendar size={19} />}
                        label="End Date"
                        value={leave.endDate}
                    />

                    <DetailItem
                        icon={<IconClock size={19} />}
                        label="Duration"
                        value={`${leave.days} ${
                            leave.days === 1
                                ? "Day"
                                : "Days"
                        }`}
                    />

                    <DetailItem
                        icon={<IconClock size={19} />}
                        label="Applied On"
                        value={leave.appliedOn}
                    />
                </Stack>

                <Divider sx={{ my: 3 }} />

                {/* Reason */}

                <Typography
                    variant="subtitle2"
                    fontWeight={600}
                    mb={1.5}
                >
                    Reason
                </Typography>

                <Box
                    sx={{
                        p: 2,
                        border: 1,
                        borderColor: "divider",
                        borderRadius: 2
                    }}
                >
                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="flex-start"
                    >
                        <IconMessage
                            size={18}
                            style={{
                                marginTop: 2
                            }}
                        />

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            {leave.reason ||
                                "No reason provided."}
                        </Typography>
                    </Stack>
                </Box>

                {/* Rejection reason */}

                {leave.status === "REJECTED" &&
                    leave.rejectionReason && (
                        <Box mt={2}>
                            <Typography
                                variant="subtitle2"
                                fontWeight={600}
                                mb={1.5}
                            >
                                Rejection Reason
                            </Typography>

                            <Box
                                sx={{
                                    p: 2,
                                    border: 1,
                                    borderColor:
                                        "error.light",
                                    borderRadius: 2
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {
                                        leave.rejectionReason
                                    }
                                </Typography>
                            </Box>
                        </Box>
                    )}
            </Box>

            {/* =========================================
                FOOTER ACTIONS
            ========================================== */}

            {isPending && (
                <>
                    <Divider />

                    <Box
                        sx={{
                            p: 2.5
                        }}
                    >
                        <Stack
                            direction="row"
                            spacing={1.5}
                        >
                            <Button
                                fullWidth
                                variant="outlined"
                                color="error"
                                startIcon={
                                    <IconX size={18} />
                                }
                                disabled={loading}
                                onClick={() =>
                                    onReject?.(leave)
                                }
                            >
                                Reject
                            </Button>

                            <Button
                                fullWidth
                                variant="contained"
                                color="success"
                                startIcon={
                                    <IconCheck size={18} />
                                }
                                disabled={loading}
                                onClick={() =>
                                    onApprove?.(leave)
                                }
                            >
                                Approve
                            </Button>
                        </Stack>
                    </Box>
                </>
            )}
        </Drawer>
    );
};

const DetailItem = ({
    icon,
    label,
    value
}) => {
    return (
        <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
        >
            <Box
                sx={{
                    width: 36,
                    height: 36,
                    borderRadius: 1.5,
                    bgcolor: "action.hover",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "text.secondary",
                    flexShrink: 0
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
};

export default LeaveRequestDetails;