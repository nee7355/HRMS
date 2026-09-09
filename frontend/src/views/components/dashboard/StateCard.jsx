import {
  Card,
  Box,
  Typography,
} from "@mui/material";

const StatCard = ({
  title,
  value,
  icon: Icon,
  color = "primary",
  change,
  changeText,
  changeType = "up",
}) => {
  const colors = {
    primary: {
      bg: "#EAF4FF",
      color: "#1976D2",
    },
    secondary: {
      bg: "#F0EBFF",
      color: "#7B61D1",
    },
    success: {
      bg: "#E8F7EE",
      color: "#2E9E68",
    },
    warning: {
      bg: "#FFF2DD",
      color: "#E69520",
    },
  };

  const currentColor = colors[color];

  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
        height: "100%",
      }}
    >
      <Box
        sx={{
          p: 1.5,
          display: "flex",
          alignItems: "flex-start",
          gap: 1.5,
        }}
      >
        {/* Icon */}

        <Box
          sx={{
            width: 38,
            height: 38,
            borderRadius: 1.5,
            bgcolor: currentColor.bg,
            color: currentColor.color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Icon size={18} />
        </Box>

        {/* Content */}

        <Box>
          <Typography
            sx={{
              fontSize: 11,
              fontWeight: 600,
              color: "text.secondary",
              mb: 0.3,
            }}
          >
            {title}
          </Typography>

          <Typography
            sx={{
              fontSize: 21,
              fontWeight: 700,
              lineHeight: 1.2,
            }}
          >
            {value}
          </Typography>

          {change && (
            <Typography
              sx={{
                fontSize: 9,
                mt: 0.5,
                color:
                  changeType === "up"
                    ? "success.main"
                    : "text.secondary",
              }}
            >
              {changeType === "up" ? "↗" : "—"}{" "}
              <strong>{change}</strong>{" "}
              {changeText}
            </Typography>
          )}
        </Box>
      </Box>
    </Card>
  );
};

export default StatCard;