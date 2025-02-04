import { 
  Card, CardContent, Typography, CardActionArea, Box, Grid, 
  IconButton, Menu, MenuItem, Dialog, DialogTitle, DialogContent, 
  DialogActions, Button, TextField 
} from "@mui/material";
import { ChevronRight, MoreVert } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import dayjs from "dayjs";
import { useState } from "react";

export default function ChitCard({ chit, onEdit, onDelete }) {
  const theme = useTheme();
  const startDate = dayjs(chit.startDate);
  const endDate = startDate.add(chit.duration, "month");
  const monthsLeft = endDate.diff(dayjs(), "month");

  const [menuAnchor, setMenuAnchor] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editedChit, setEditedChit] = useState({ ...chit });

  const handleMenuOpen = (event) => setMenuAnchor(event.currentTarget);
  const handleMenuClose = () => setMenuAnchor(null);

  const handleEditOpen = () => {
    setEditDialogOpen(true);
    handleMenuClose();
  };
  const handleEditClose = () => setEditDialogOpen(false);
  
  const handleDeleteOpen = () => {
    setDeleteDialogOpen(true);
    handleMenuClose();
  };
  const handleDeleteClose = () => setDeleteDialogOpen(false);

  const handleEditSubmit = () => {
    onEdit(editedChit);
    setEditDialogOpen(false);
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card sx={{ borderRadius: "10px", boxShadow: 3, backgroundColor: theme.palette.background.paper }}>
        <CardActionArea>
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }} gutterBottom>
                {chit.name}
              </Typography>

              <Box>
                <IconButton onClick={handleMenuOpen}>
                  <MoreVert />
                </IconButton>
                <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleMenuClose}>
                  <MenuItem onClick={handleEditOpen}>Edit</MenuItem>
                  <MenuItem onClick={handleDeleteOpen}>Delete</MenuItem>
                </Menu>
              </Box>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
                Duration: {chit.duration} months
              </Typography>
              <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
                People: {chit.totalPeople}
              </Typography>
            </Box>

            <Typography variant="body2" color="textSecondary" sx={{ mb: 2, color: theme.palette.text.secondary }}>
              Total Amount: ₹{chit.totalAmount}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: "bold", color: theme.palette.text.primary }}>
              Monthly Payment: ₹{chit.monthlyPayment}
            </Typography>

            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
                Start Date: {startDate.format("MMMM YYYY")}
              </Typography>
              <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
                End Date: {endDate.format("MMMM YYYY")}
              </Typography>
              <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
                Months Left: {monthsLeft > 0 ? monthsLeft : 0}
              </Typography>
            </Box>
            {/* Keyboard Icon for Navigation */}
            <Box display="flex" justifyContent="flex-end" mt={2}>
              <IconButton>
                <ChevronRight />
              </IconButton>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={handleEditClose}>
        <DialogTitle>Edit Chit</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Chit Name"
            variant="outlined"
            margin="dense"
            value={editedChit.name}
            onChange={(e) => setEditedChit({ ...editedChit, name: e.target.value })}
          />
          <TextField
            fullWidth
            label="Total Amount"
            variant="outlined"
            margin="dense"
            type="number"
            value={editedChit.totalAmount}
            onChange={(e) => setEditedChit({ ...editedChit, totalAmount: e.target.value })}
          />
          <TextField
            fullWidth
            label="Monthly Payment"
            variant="outlined"
            margin="dense"
            type="number"
            value={editedChit.monthlyPayment}
            onChange={(e) => setEditedChit({ ...editedChit, monthlyPayment: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleEditSubmit} variant="contained" color="primary">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteClose}>
        <DialogTitle>Are you sure you want to delete this chit?</DialogTitle>
        <DialogActions>
          <Button onClick={handleDeleteClose}>Cancel</Button>
          <Button onClick={() => { onDelete(chit.id); setDeleteDialogOpen(false); }} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
