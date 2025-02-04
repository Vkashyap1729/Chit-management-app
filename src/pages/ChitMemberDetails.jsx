import { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Tooltip,
  TextField,
  Button,
  useTheme,
} from "@mui/material";
import dayjs from "dayjs";

// Theme-aware colors for better contrast
const getStatusColor = (status, theme) => {
  const isDarkMode = theme.palette.mode === "dark";
  return {
    paid: isDarkMode ? "#66bb6a" : "#4CAF50", // Softer green
    unpaid: isDarkMode ? "#e57373" : "#F44336", // Softer red
    lifted: isDarkMode ? "#ffb74d" : "#FFA500", // Softer orange
  }[status] || (isDarkMode ? "#888" : "#ccc");
};

// Mock Data
const mockChitMember = {
  name: "Rajesh Kumar",
  chitName: "Gold Savings Chit",
  duration: 12,
  monthlyPayment: 5000,
  startDate: "2024-01-01",
  payments: [
    "paid",
    "paid",
    "lifted",
    "unpaid",
    "unpaid",
    "paid",
    "paid",
    "unpaid",
    "paid",
    "paid",
    "paid",
    "unpaid",
  ],
};

const ChitMemberDetails = () => {
  const [liftMonth, setLiftMonth] = useState(null);
  const [calculatedAmount, setCalculatedAmount] = useState(null);
  const theme = useTheme(); // Get current theme mode

  const handleCalculate = () => {
    if (liftMonth !== null && liftMonth < mockChitMember.duration) {
      const baseAmount = mockChitMember.monthlyPayment;
      const interest = baseAmount * 0.01;
      setCalculatedAmount(baseAmount + interest);
    }
  };

  return (
    <Card
      sx={{
        padding: 3,
        maxWidth: 900,
        margin: "auto",
        boxShadow: 5,
        borderRadius: 3,
        backgroundColor: theme.palette.background.paper, // Adapts to light/dark mode
      }}
    >
      <CardContent>
        {/* Center Alignment */}
        <Box textAlign="center">
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {mockChitMember.chitName}
          </Typography>
          <Typography variant="h6" fontStyle="italic" color="text.primary">
            Member: {mockChitMember.name}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Duration: {mockChitMember.duration} months
          </Typography>
          <Typography variant="h6" fontWeight="bold" color="success.main">
            Monthly Payment: ₹{mockChitMember.monthlyPayment}
          </Typography>
          <Typography variant="h6" fontWeight="bold" color="warning.main">
            Total Amount: ₹{mockChitMember.duration * mockChitMember.monthlyPayment}
          </Typography>
        </Box>

        {/* Payment Grid */}
        <Grid container spacing={2} mt={3} justifyContent="center">
          {mockChitMember.payments.map((status, index) => {
            const monthName = dayjs(mockChitMember.startDate)
              .add(index, "month")
              .format("MMMM");
            const paymentAmount =
              status === "lifted"
                ? (mockChitMember.monthlyPayment * 1.01).toFixed(2)
                : mockChitMember.monthlyPayment;

            return (
              <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
                <Tooltip
                  title={
                    <Box textAlign="center">
                      <Typography variant="body2" color="text.primary">
                        {monthName}
                      </Typography>
                      <Typography variant="body2" color="text.primary">
                        ₹{paymentAmount}
                      </Typography>
                    </Box>
                  }
                  arrow
                >
                  <Box
                    sx={{
                      width: "100%",
                      aspectRatio: 1,
                      backgroundColor: getStatusColor(status, theme),
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontWeight: "bold",
                      borderRadius: 2,
                      boxShadow: 3,
                      padding: 1,
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="body1" fontWeight="bold">
                      {index + 1}
                    </Typography>
                    <Typography variant="body2" fontStyle="italic">
                      {monthName}
                    </Typography>
                    <Typography variant="body2">₹{paymentAmount}</Typography>
                  </Box>
                </Tooltip>
              </Grid>
            );
          })}
        </Grid>

        {/* Lift Amount Calculator */}
        <Box mt={4} textAlign="center">
          <Typography variant="h6" fontWeight="bold">
            Lift Amount Calculator
          </Typography>
          <TextField
            label="Enter Month to Lift"
            type="number"
            value={liftMonth || ""}
            onChange={(e) => setLiftMonth(Number(e.target.value))}
            fullWidth
            margin="normal"
            inputProps={{ min: 1, max: mockChitMember.duration }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleCalculate}
            fullWidth
          >
            Calculate Payout
          </Button>
          {calculatedAmount && (
            <Typography
              variant="h5"
              mt={2}
              fontWeight="bold"
              color="success.main"
            >
              Expected Payout: ₹{calculatedAmount.toFixed(2)}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ChitMemberDetails;
