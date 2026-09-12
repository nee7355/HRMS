import {
    Button,
    InputAdornment,
    MenuItem,
    OutlinedInput,
    Select,
    Stack
} from "@mui/material";

import {
    IconSearch,
    IconRefresh
} from "@tabler/icons-react";

const AttendanceFilters = ({
    search = "",
    setSearch,

    date = "",
    setDate,

    status = "ALL",
    setStatus,

    department = "ALL",
    setDepartment,

    departments = [],

    onApply,
    onReset,

    showEmployeeFilter = true,
    showDepartmentFilter = true
}) => {

    return (
        <Stack
            direction={{
                xs: "column",
                sm: "row"
            }}
            spacing={1.5}
            flexWrap="wrap"
        >
            {showEmployeeFilter && (
                <OutlinedInput
                    size="small"
                    value={search}
                    onChange={(event) =>
                        setSearch(event.target.value)
                    }
                    placeholder="Search employee..."
                    startAdornment={
                        <InputAdornment position="start">
                            <IconSearch size={18} />
                        </InputAdornment>
                    }
                    sx={{
                        minWidth: {
                            xs: "100%",
                            sm: 220
                        }
                    }}
                />
            )}

            <OutlinedInput
                type="date"
                size="small"
                value={date}
                onChange={(event) =>
                    setDate(event.target.value)
                }
                sx={{
                    minWidth: {
                        xs: "100%",
                        sm: 170
                    }
                }}
            />

            {showDepartmentFilter && (
                <Select
                    size="small"
                    value={department}
                    onChange={(event) =>
                        setDepartment(
                            event.target.value
                        )
                    }
                    displayEmpty
                    sx={{
                        minWidth: {
                            xs: "100%",
                            sm: 170
                        }
                    }}
                >
                    <MenuItem value="ALL">
                        All Departments
                    </MenuItem>

                    {departments.map((item) => (
                        <MenuItem
                            key={item._id}
                            value={item._id}
                        >
                            {item.name}
                        </MenuItem>
                    ))}
                </Select>
            )}

            <Select
                size="small"
                value={status}
                onChange={(event) =>
                    setStatus(event.target.value)
                }
                sx={{
                    minWidth: {
                        xs: "100%",
                        sm: 140
                    }
                }}
            >
                <MenuItem value="ALL">
                    All Status
                </MenuItem>

                <MenuItem value="PRESENT">
                    Present
                </MenuItem>

                <MenuItem value="LATE">
                    Late
                </MenuItem>

                <MenuItem value="ABSENT">
                    Absent
                </MenuItem>

                <MenuItem value="ON_LEAVE">
                    On Leave
                </MenuItem>
            </Select>

            <Button
                variant="contained"
                size="small"
                onClick={onApply}
            >
                Apply
            </Button>

            <Button
                variant="outlined"
                size="small"
                startIcon={
                    <IconRefresh size={17} />
                }
                onClick={onReset}
            >
                Reset
            </Button>
        </Stack>
    );
};

export default AttendanceFilters;