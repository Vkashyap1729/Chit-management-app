import { Card, CardContent, Typography, CardActionArea, Box, Grid, IconButton } from "@mui/material";
import { ChevronRight } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import dayjs from "dayjs"; // for date formatting

export default function ChitCard({ chit }) {
  const theme = useTheme(); // Get the current theme (light or dark)

  // Calculate start date and end date
  const startDate = dayjs(chit.startDate); // Assuming chit.startDate is in a valid date format
  const endDate = startDate.add(chit.duration, 'month'); // Calculate the end date based on duration

  // Calculate months left
  const monthsLeft = endDate.diff(dayjs(), 'month');

  const handleCardClick = () => {
    // navigate to chit details page
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card sx={{ borderRadius: "10px", boxShadow: 3, backgroundColor: theme.palette.background.paper }}>
        <CardActionArea onClick={handleCardClick}>
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }} gutterBottom>
                {chit.name}
              </Typography>
              <IconButton>
                <ChevronRight />
              </IconButton>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.text.primary, // Adjust color based on theme
                }}
              >
                Duration: {chit.duration} months
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.text.primary, // Adjust color based on theme
                }}
              >
                People: {chit.totalPeople}
              </Typography>
            </Box>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ mb: 2, color: theme.palette.text.secondary }} // Adjust color based on theme
            >
              Total Amount: ₹{chit.totalAmount}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontWeight: "bold",
                color: theme.palette.text.primary, // Adjust color based on theme
              }}
            >
              Monthly Payment: ₹{chit.monthlyPayment}
            </Typography>
            {/* Add Start Date, End Date, and Months Left */}
            <Box sx={{ mt: 2 }}>
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.text.primary, // Adjust color based on theme
                }}
              >
                Start Date: {startDate.format("MMMM YYYY")}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.text.primary, // Adjust color based on theme
                }}
              >
                End Date: {endDate.format("MMMM YYYY")}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.text.primary, // Adjust color based on theme
                }}
              >
                Months Left: {monthsLeft > 0 ? monthsLeft : 0}
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
