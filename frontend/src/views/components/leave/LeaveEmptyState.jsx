import { Box, Button, Typography } from "@mui/material";
import { IconCalendar } from "@tabler/icons-react";

const LeaveEmptyState = ({ onClear }) => {
    return (
        <Box
            sx={{
                py: 7,
                px: 2
            }}
        >
            <Box
                sx={{
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    bgcolor: "action.hover",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 2
                }}
            >
                <IconCalendar size={25} />
            </Box>

            <Typography
                variant="subtitle1"
                fontWeight={600}
            >
                No leave requests found
            </Typography>

            <Typography
                variant="body2"
                color="text.secondary"
                mt={0.5}
                mb={2}
            >
                You haven't applied for any leave yet.
            </Typography>

            <Button
                size="small"
                variant="outlined"
                onClick={onClear}
            >
                Clear Filters
            </Button>
        </Box>
    );
};

export default LeaveEmptyState;