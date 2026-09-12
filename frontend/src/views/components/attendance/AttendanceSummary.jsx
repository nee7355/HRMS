import {
    Box,
    Card,
    CardContent,
    Grid,
    Stack,
    Typography
} from "@mui/material";

import {
    IconUsers,
    IconUserCheck,
    IconUserX,
    IconClock,
    IconCalendarEvent
} from "@tabler/icons-react";

const AttendanceSummary = ({
    total = 0,
    present = 0,
    absent = 0,
    late = 0,
    onLeave = 0
}) => {

    const summary = [
        {
            key: "total",
            title: "Total Employees",
            value: total,
            description: "Total team members",
            icon: IconUsers
        },
        {
            key: "present",
            title: "Present",
            value: present,
            description: "Checked in today",
            icon: IconUserCheck
        },
        {
            key: "absent",
            title: "Absent",
            value: absent,
            description: "Not checked in",
            icon: IconUserX
        },
        {
            key: "late",
            title: "Late",
            value: late,
            description: "Late arrivals",
            icon: IconClock
        },
        {
            key: "leave",
            title: "On Leave",
            value: onLeave,
            description: "Employees on leave",
            icon: IconCalendarEvent
        }
    ];

    return (
        <Grid container spacing={2}>
            {summary.map((item) => {
                const Icon = item.icon;

                return (
                    <Grid
                        key={item.key}
                        size={{
                            xs: 12,
                            sm: 6,
                            md: 4,
                            lg: 2.4
                        }}
                    >
                        <Card
                            elevation={0}
                            sx={{
                                height: "100%",
                                border: 1,
                                borderColor: "divider",
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
                                            {item.description}
                                        </Typography>
                                    </Box>

                                    <Box
                                        sx={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: 1.5,
                                            bgcolor:
                                                "action.hover",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}
                                    >
                                        <Icon size={20} />
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

export default AttendanceSummary;