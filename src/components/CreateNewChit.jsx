import { useState } from "react";
import { Grid, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Box, Card, CardContent, IconButton, Tooltip, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add"; 

const CreateNewChit = () => {
  const [open, setOpen] = useState(false);
  const [chit, setChit] = useState({
    name: "",
    duration: "",
    totalPeople: "",
    totalAmount: "",
    monthlyPayment: "",
    startDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChit({ ...chit, [name]: value });
  };

  const handleClose = () => setOpen(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Chit Created", chit);
    setOpen(false);
  };

  const handleOpen = () => setOpen(true);

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Tooltip title="Create New Chit" >
        <Card
          onClick={handleOpen}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: 200,
            borderRadius: '10px',
            boxShadow: 3,
            cursor: 'pointer',
            backgroundColor: '#f5f5f5', // Grey background
            '&:hover': {
              backgroundColor: '#e0e0e0',
              boxShadow: 6,
            }
          }}
        >
          <CardContent>
            <IconButton
              sx={{
                fontSize: 40,
                color: '#424242', // Dark grey color
              }}
            >
              <AddIcon />
            </IconButton>
          </CardContent>
        </Card>
      </Tooltip>

      {/* Dialog for creating a chit */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create a New Chit</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField label="Chit Name" name="name" value={chit.name} onChange={handleChange} fullWidth required margin="normal" />
            <TextField label="Duration (Months)" name="duration" value={chit.duration} onChange={handleChange} fullWidth required margin="normal" />
            <TextField label="Total People" name="totalPeople" value={chit.totalPeople} onChange={handleChange} fullWidth required margin="normal" />
            <TextField label="Total Amount" name="totalAmount" value={chit.totalAmount} onChange={handleChange} fullWidth required margin="normal" />
            <TextField label="Monthly Payment" name="monthlyPayment" value={chit.monthlyPayment} onChange={handleChange} fullWidth required margin="normal" />
            <TextField label="Start Date" name="startDate" type="date" value={chit.startDate} onChange={handleChange} fullWidth required margin="normal" InputLabelProps={{ shrink: true }} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button type="submit" onClick={handleSubmit} color="primary">Create Chit</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default CreateNewChit;
