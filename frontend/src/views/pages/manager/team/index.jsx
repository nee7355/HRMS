import { useMemo, useState } from "react";

import {
    Box,
    Card,
    CardContent,
    Chip,
    InputAdornment,
    OutlinedInput,
    Stack,
    Typography
} from "@mui/material";

import {
    IconSearch,
    IconUsers
} from "@tabler/icons-react";
import CustomTale from "../../../components/CustomTale";

// import CustomTale from "../../components/CustomTale";

const MyTeam = () => {

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const [totalPages, setTotalPages] =
        useState(1);

    const employees = [
        {
            _id: "1",
            firstName: "Rahul",
            lastName: "Sharma",
            email: "rahul@example.com",
            department: "Engineering",
            designation:
                "Frontend Developer",
            status: "ACTIVE"
        },
        {
            _id: "2",
            firstName: "Priya",
            lastName: "Singh",
            email: "priya@example.com",
            department: "Engineering",
            designation:
                "Backend Developer",
            status: "ACTIVE"
        },
        {
            _id: "3",
            firstName: "Amit",
            lastName: "Kumar",
            email: "amit@example.com",
            department: "Engineering",
            designation:
                "UI Developer",
            status: "ACTIVE"
        },
        {
            _id: "4",
            firstName: "Neha",
            lastName: "Patel",
            email: "neha@example.com",
            department: "Engineering",
            designation:
                "Software Developer",
            status: "ACTIVE"
        }
    ];

    const columns = useMemo(() => [
        {
            id: "employee",
            header: "Employee",
            key: "employee",
            Cell: (row) => (
                <Stack
                    direction="row"
                    spacing={1.5}
                    alignItems="center"
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
                                "center"
                        }}
                    >
                        {row.firstName
                            ?.charAt(0)}
                    </Box>

                    <Box>
                        <Typography
                            variant="body2"
                            fontWeight={600}
                        >
                            {row.firstName}{" "}
                            {row.lastName}
                        </Typography>

                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            {row.email}
                        </Typography>
                    </Box>
                </Stack>
            )
        },
        {
            id: "department",
            header: "Department",
            key: "department"
        },
        {
            id: "designation",
            header: "Designation",
            key: "designation"
        },
        {
            id: "status",
            header: "Status",
            key: "status",
            Cell: (row) => (
                <Chip
                    label={row.status}
                    size="small"
                    color={
                        row.status ===
                        "ACTIVE"
                            ? "success"
                            : "default"
                    }
                />
            )
        }
    ], []);

    return (
        <Box>

            {/* =====================================
                PAGE HEADER
            ====================================== */}

            <Stack
                direction={{
                    xs: "column",
                    sm: "row"
                }}
                justifyContent="space-between"
                alignItems={{
                    xs: "flex-start",
                    sm: "center"
                }}
                spacing={2}
                mb={3}
            >
                <Box>
                    <Typography
                        variant="h5"
                        fontWeight={600}
                    >
                        My Team
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        mt={0.5}
                    >
                        View and manage your team
                        members.
                    </Typography>
                </Box>

                <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                >
                    <IconUsers size={20} />

                    <Typography
                        variant="body2"
                        fontWeight={500}
                    >
                        {employees.length} Members
                    </Typography>
                </Stack>
            </Stack>

            {/* =====================================
                SUMMARY
            ====================================== */}

            <TeamQuickSummary
                employees={employees}
            />

            {/* =====================================
                TABLE CARD
            ====================================== */}

            <Card
                elevation={0}
                sx={{
                    mt: 2,
                    border: 1,
                    borderColor: "divider",
                    borderRadius: 2
                }}
            >
                <CardContent>

                    <Stack
                        direction={{
                            xs: "column",
                            sm: "row"
                        }}
                        justifyContent="space-between"
                        spacing={2}
                        mb={2}
                    >
                        <Box>
                            <Typography
                                variant="h6"
                                fontWeight={600}
                            >
                                Team Members
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Employees reporting to
                                you.
                            </Typography>
                        </Box>

                        <OutlinedInput
                            size="small"
                            value={search}
                            onChange={(event) => {
                                setSearch(
                                    event.target
                                        .value
                                );
                                setPage(1);
                            }}
                            placeholder="Search team..."
                            startAdornment={
                                <InputAdornment position="start">
                                    <IconSearch
                                        size={18}
                                    />
                                </InputAdornment>
                            }
                            sx={{
                                minWidth: {
                                    xs: "100%",
                                    sm: 260
                                }
                            }}
                        />
                    </Stack>

                    <CustomTale
                        column={columns}
                        data={employees}
                        enablePagination={
                            totalPages > 1
                        }
                        page={page}
                        setPage={setPage}
                        totalPages={
                            totalPages
                        }
                        itemPerPage={10}
                    />

                </CardContent>
            </Card>

        </Box>
    );
};


/* =========================================
   TEAM QUICK SUMMARY
========================================= */

const TeamQuickSummary = ({
    employees
}) => {

    const active = employees.filter(
        employee =>
            employee.status === "ACTIVE"
    ).length;

    const departments = new Set(
        employees.map(
            employee =>
                employee.department
        )
    ).size;

    const designations = new Set(
        employees.map(
            employee =>
                employee.designation
        )
    ).size;

    const summary = [
        {
            title: "Team Members",
            value: employees.length
        },
        {
            title: "Active",
            value: active
        },
        {
            title: "Departments",
            value: departments
        },
        {
            title: "Designations",
            value: designations
        }
    ];

    return (
        <Stack
            direction={{
                xs: "column",
                sm: "row"
            }}
            spacing={2}
        >
            {summary.map((item) => (
                <Card
                    key={item.title}
                    elevation={0}
                    sx={{
                        flex: 1,
                        border: 1,
                        borderColor:
                            "divider",
                        borderRadius: 2
                    }}
                >
                    <CardContent>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            {item.title}
                        </Typography>

                        <Typography
                            variant="h5"
                            fontWeight={600}
                            mt={1}
                        >
                            {item.value}
                        </Typography>
                    </CardContent>
                </Card>
            ))}
        </Stack>
    );
};

export default MyTeam;