import {
  Card,
  CardContent,
  Typography,
  Grid,
  Tooltip,
  Box,
  useTheme,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert"; 
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "@mui/icons-material";

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
  const theme = useTheme();
  const navigate = useNavigate();

  // State for Menu (Kebab)
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  // State for Edit Dialog
  const [openEdit, setOpenEdit] = useState(false);
  const [editedAmount, setEditedAmount] = useState(member.amount);

  // State for Delete Confirmation
  const [openDelete, setOpenDelete] = useState(false);

  return (
    <Card sx={{ mb: 2, boxShadow: 3, position: "relative", borderRadius: "10px" }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6" gutterBottom>
            {member.serialNo}. {member.name}
          </Typography>
          {/* Kebab Icon (More Options) */}
          <IconButton onClick={handleMenuOpen}>
            <MoreVertIcon />
          </IconButton>
        </Box>

        <Typography
          variant="body2"
          sx={{ mb: 2, color: theme.palette.text.secondary }}
        >
          Total Amount: ₹{member.amount}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
          Monthly Payment: ₹{member.amount}
        </Typography>

        <Grid container spacing={1} mt={2}>
          {months.map((month, index) => (
            <Grid item key={index}>
              <Tooltip title={month} arrow>
                <Circle status={member.payments[index] || "unpaid"}>
                  {month.split(" ")[0]}
                </Circle>
              </Tooltip>
            </Grid>
          ))}
        </Grid>

        {/* Keyboard Icon for Navigation */}
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <IconButton>
            <ChevronRight />
          </IconButton>
        </Box>
      </CardContent>

      {/* Menu Items */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem
          onClick={() => {
            setOpenEdit(true);
            handleMenuClose();
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            setOpenDelete(true);
            handleMenuClose();
          }}
        >
          Delete
        </MenuItem>
      </Menu>

      {/* Edit Pop-up Dialog */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Edit Member Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Modify the details and save the changes.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Amount"
            type="number"
            fullWidth
            variant="outlined"
            value={editedAmount}
            onChange={(e) => setEditedAmount(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
          <Button
            onClick={() => {
              console.log(`Updated Amount: ₹${editedAmount}`);
              setOpenEdit(false);
            }}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle>Delete Member</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete {member.name}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDelete(false)}>Cancel</Button>
          <Button
            onClick={() => {
              console.log(`Deleted Member: ${member.name}`);
              setOpenDelete(false);
            }}
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

const mockChitMembers = [
  { serialNo: 1, name: "Rajesh Kumar", amount: 5000, payments: ["paid", "paid", "paid", "unpaid", "unpaid", "unpaid"] },
  { serialNo: 2, name: "Priya Sharma", amount: 4500, payments: ["paid", "paid", "paid", "paid", "unpaid"] },
  { serialNo: 3, name: "Amit Verma", amount: 6000, payments: ["paid", "paid", "paid", "paid", "paid"] },
  { serialNo: 4, name: "Suresh Gupta", amount: 5500, payments: ["paid", "paid", "paid", "unpaid", "unpaid"] },
  { serialNo: 5, name: "Neha Chawla", amount: 4800, payments: ["paid", "unpaid", "paid", "paid", "paid"] },
];

const ChitMembersList = () => {
  return (
    <Grid container spacing={3} sx={{ justifyContent: "center", alignItems: "center", padding: "20px" }}>
      {mockChitMembers.map((member) => (
        <Grid item xs={12} sm={6} md={4} key={member.serialNo}>
          <ChitMemberCard member={member} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ChitMembersList;
