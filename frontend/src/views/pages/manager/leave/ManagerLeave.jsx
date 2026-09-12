import { useState } from "react";
import {
    Box,
    Button,
    Card,
    Divider,
    Stack,
    Tab,
    Tabs,
    Typography
} from "@mui/material";
import {
    IconCalendarPlus
} from "@tabler/icons-react";

// import MyLeaves from "./MyLeaves";
import TeamLeaveRequests from "../../../common/leave/TeamLeaveRequests";
import MyLeaves from "../../../common/leave/MyLeave";
import ApplyLeaveModal from "../../../components/leave/ApplyLeaveModel";
// import ApplyLeaveModal from "../../components/leave/ApplyLeaveModal";

const ManagerLeave = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [openApplyModal, setOpenApplyModal] = useState(false);

    const handleTabChange = (_, value) => {
        setActiveTab(value);
    };

    return (
        <Box>
            {/* Page Header */}
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
                    >
                        Leave Management
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        mt={0.5}
                    >
                        Manage your leaves and review
                        your team's leave requests.
                    </Typography>
                </Box>

                <Button
                    variant="contained"
                    startIcon={
                        <IconCalendarPlus size={18} />
                    }
                    onClick={() => setOpenApplyModal(true)}
                >
                    Apply Leave
                </Button>
            </Stack>

            {/* Leave Content */}
            <Card
                elevation={0}
                sx={{
                    border: 1,
                    borderColor: "divider",
                    borderRadius: 2
                }}
            >
                <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    sx={{
                        px: 2
                    }}
                >
                    <Tab label="My Leaves" />
                    <Tab label="Team Requests" />
                </Tabs>

                <Divider />

                <Box sx={{ p: 2.5 }}>
                    {activeTab === 0 && (
                        <MyLeaves />
                    )}

                    {activeTab === 1 && (
                        <TeamLeaveRequests />
                    )}
                </Box>
            </Card>

            {/* Existing Modal */}
            <ApplyLeaveModal
                open={openApplyModal}
                onClose={() => setOpenApplyModal(false)}
            />
        </Box>
    );
};

export default ManagerLeave;