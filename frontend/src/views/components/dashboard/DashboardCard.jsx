import {
  Card,
  CardHeader,
  CardContent,
  Divider,
} from "@mui/material";

const DashboardCard = ({
  title,
  children,
  action,
}) => {
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
      <CardHeader
        title={title}
        action={action}
        sx={{
          px: 1.5,
          py: 1,
          "& .MuiCardHeader-title": {
            fontSize: "0.75rem",
            fontWeight: 600,
          },
        }}
      />

      <Divider />

      <CardContent sx={{ p: 1.5 }}>
        {children}
      </CardContent>
    </Card>
  );
};

export default DashboardCard;