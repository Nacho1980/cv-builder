import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { months } from "../constants";
import { blue } from "@mui/material/colors";

interface DateSelectorProps {
  onDateChange: (date: string) => void; // Callback to return the selected date in MM-YYYY format
  selectedDate: string;
  label: string;
}

const DateSelector: React.FC<DateSelectorProps> = ({
  onDateChange,
  selectedDate,
  label,
}) => {
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
      {/*       <Button variant="contained" onClick={handleOpen}>
        <CalendarTodayRoundedIcon />
      </Button> */}
      <TextField
        label={label}
        value={selectedDate || "Click to select"}
        onClick={handleOpen}
        sx={{
          cursor: "pointer", // Makes the entire field clickable
          "& .MuiInputBase-root": {
            pointerEvents: "none", // Prevents direct editing
          },
          "& .MuiInputBase-input": {
            cursor: "pointer", // Pointer cursor for the text
            color: "blue", // Hyperlink-like text color
            textDecoration: "underline", // Underline to mimic a hyperlink
          },
          "& .MuiInputLabel-root": {
            cursor: "pointer", // Pointer cursor for the label
          },
        }}
      />

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
              <Grid key={month.value} size={{ xs: 4 }}>
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
