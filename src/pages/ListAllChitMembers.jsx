import { Card, CardContent, Typography, Grid, Tooltip, Box, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";

const statusColors = {
  paid: "#4CAF50", // Green
  unpaid: "#F44336", // Red
};

const months = Array.from({ length: 19 }, (_, i) => {
  const date = new Date();
  date.setMonth(date.getMonth() + i);
  return date.toLocaleString("default", { month: "short", year: "2-digit" });
});

const Circle = styled(Box)(({ status }) => ({
  width: 30,
  height: 30,
  borderRadius: "50%",
  backgroundColor: statusColors[status] || "#ccc",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  fontSize: 12,
  fontWeight: "bold",
}));

const ChitMemberCard = ({ member }) => {
    const theme = useTheme(); // Get the current theme (light or dark)
  return (
    <Card sx={{ mb: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {member.serialNo}. {member.name}
        </Typography>
        <Typography
            variant="body2"
            color="textSecondary"
            sx={{ mb: 2, color: theme.palette.text.secondary }} // Adjust color based on theme
        >
            Total Amount: ₹{member.amount}
        </Typography>
        <Typography
            variant="body2"
            sx={{
            fontWeight: "bold",
            color: theme.palette.text.primary, // Adjust color based on theme
            }}
        >
            Monthly Payment: ₹{member.amount}
        </Typography>
        <Grid container spacing={1} mt={2}>
          {months.map((month, index) => (
            <Grid item key={index}>
              <Tooltip title={month} arrow>
                <Circle status={member.payments[index] || "unpaid"}>{month.split(" ")[0]}</Circle>
              </Tooltip>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

const mockChitMembers = [
  { serialNo: 1, name: "Rajesh Kumar", amount: 5000, payments: ["paid", "paid", "paid", "unpaid", "unpaid", "unpaid"] },
  { serialNo: 2, name: "Priya Sharma", amount: 4500, payments: ["paid", "paid", "paid", "paid", "unpaid"] },
  { serialNo: 3, name: "Amit Verma", amount: 6000, payments: ["paid", "paid", "paid", "paid", "paid"] },
  { serialNo: 4, name: "Suresh Gupta", amount: 5500, payments: ["paid", "paid", "paid", "unpaid", "unpaid"] },
  { serialNo: 5, name: "Neha Chawla", amount: 4800, payments: ["paid", "unpaid", "paid", "paid", "paid"] },
  { serialNo: 6, name: "Anil Yadav", amount: 5200, payments: ["paid", "paid", "paid", "paid", "unpaid"] },
  { serialNo: 7, name: "Sunita Rao", amount: 5100, payments: ["paid", "paid", "unpaid", "paid", "paid"] },
  { serialNo: 8, name: "Vikas Jain", amount: 5300, payments: ["paid", "unpaid", "paid", "paid", "unpaid"] },
  { serialNo: 9, name: "Pooja Bhatia", amount: 4900, payments: ["paid", "paid", "paid", "unpaid", "paid"] },
  { serialNo: 10, name: "Manoj Desai", amount: 4700, payments: ["paid", "unpaid", "unpaid", "paid", "paid"] },
];

const ChitMembersList = () => {
  return (
    <Grid container spacing={3} sx={{justifyContent: "center", alignItems: "center", padding: "20px"}}>
      {mockChitMembers.map((member) => (
        <Grid item xs={12} sm={6} md={4} key={member.serialNo}>
          <ChitMemberCard member={member} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ChitMembersList;


