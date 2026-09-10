import {
    Box,
    Card,
    CardContent,
    Stack,
    Typography
} from "@mui/material";

const LeaveSummaryCard = ({
    title,
    value,
    subtitle,
    icon
}) => {
    return (
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
                            mb={1}
                        >
                            {title}
                        </Typography>

                        <Typography
                            variant="h4"
                            fontWeight={600}
                        >
                            {value}
                        </Typography>

                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            {subtitle}
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            width: 42,
                            height: 42,
                            borderRadius: 1.5,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            bgcolor: "action.hover",
                            color: "primary.main"
                        }}
                    >
                        {icon}
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
};


export default LeaveSummaryCard;