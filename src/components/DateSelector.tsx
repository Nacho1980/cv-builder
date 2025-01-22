import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

interface DateSelectorProps {
  onDateChange: (date: string) => void; // Callback to return the selected date in MM-YYYY format
}

const months = [
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

const DateSelector: React.FC<DateSelectorProps> = ({ onDateChange }) => {
  const currentYear = new Date().getFullYear();
  const [open, setOpen] = useState(false);
  const [year, setYear] = useState(currentYear);

  // Open and close the dialog
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Navigate between years
  const handlePreviousYear = () => setYear((prev) => prev - 1);
  const handleNextYear = () => setYear((prev) => prev + 1);

  // Handle month selection
  const handleMonthSelect = (month: string) => {
    const date = `${month}-${year}`;
    onDateChange(date);
    handleClose();
  };

  return (
    <Box>
      {/* Button with calendar icon */}
      <Button
        variant="contained"
        startIcon={<CalendarTodayRoundedIcon />}
        onClick={handleOpen}
      >
        Select Date
      </Button>

      {/* Overlay dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogContent>
          {/* Year Navigation */}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={2}
          >
            <IconButton onClick={handlePreviousYear}>
              <ArrowBackIosRoundedIcon />
            </IconButton>
            <Typography variant="h6">{year}</Typography>
            <IconButton onClick={handleNextYear}>
              <ArrowForwardIosRoundedIcon />
            </IconButton>
          </Box>

          {/* Months Grid */}
          <Grid container spacing={2}>
            {months.map((month) => (
              <Grid item xs={4} key={month.value}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => handleMonthSelect(month.value)}
                >
                  {month.label}
                </Button>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default DateSelector;
