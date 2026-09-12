import {
    Box,
    Card,
    CardContent,
    Grid,
    Stack,
    Typography
} from "@mui/material";

import {
    IconCalendar,
    IconCalendarCheck,
    IconCalendarX,
    IconClockHour4
} from "@tabler/icons-react";

const LeaveSummary = ({
    total = 0,
    used = 0,
    available = 0,
    pending = 0
}) => {

    const summary = [
        {
            key: "total",
            title: "Total Leave",
            value: total,
            description: "Annual entitlement",
            icon: IconCalendar
        },
        {
            key: "used",
            title: "Used Leave",
            value: used,
            description: "Days used",
            icon: IconCalendarCheck
        },
        {
            key: "available",
            title: "Available Leave",
            value: available,
            description: "Days remaining",
            icon: IconCalendarX
        },
        {
            key: "pending",
            title: "Pending",
            value: pending,
            description: "Awaiting approval",
            icon: IconClockHour4
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
                            md: 3
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
                                            sx={{
                                                mt: 1,
                                                lineHeight: 1.2
                                            }}
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
                                            alignItems:
                                                "center",
                                            justifyContent:
                                                "center",
                                            color:
                                                "text.secondary"
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

export default LeaveSummary;