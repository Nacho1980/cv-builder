import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Radio,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import {
  addExperience,
  updateExperience,
  removeExperience,
  validateExperience,
} from "../../reducers/experienceSlice";
import DateSelector from "../DateSelector";

const ExperienceForm: React.FC = () => {
  const dispatch = useDispatch();
  const { items, errors } = useSelector((state: RootState) => state.experience);

  const [newExperience, setNewExperience] = useState({
    startDate: "",
    finishDate: "",
    companyName: "",
    positionName: "",
    summary: "",
    currentlyWorking: false,
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewExperience({
        ...newExperience,
        [field]: event.target.value,
      });
    };
  const handleDateChange = (field: string) => (value: string) => {
    setNewExperience({
      ...newExperience,
      [field]: value,
    });
  };

  const handleAddOrUpdate = () => {
    if (editIndex !== null) {
      dispatch(updateExperience({ index: editIndex, item: newExperience }));
      setEditIndex(null);
    } else {
      dispatch(addExperience(newExperience));
    }
    setNewExperience({
      startDate: "",
      finishDate: "",
      companyName: "",
      positionName: "",
      summary: "",
      currentlyWorking: false,
    });
    dispatch(validateExperience());
  };

  const handleEdit = (index: number) => {
    const item = items[index];
    setNewExperience({
      ...item,
      finishDate: item.finishDate ?? "", // Default to empty string if undefined
      currentlyWorking: item.currentlyWorking ?? false, // Default to false if undefined
    });
    setEditIndex(index);
  };

  const handleDelete = (index: number) => {
    dispatch(removeExperience(index));
    dispatch(validateExperience());
  };

  return (
    <Box>
      <Typography variant="h2" gutterBottom>
        Add any relevant experience
      </Typography>

      {/* Add a new experience item or edit an existing one */}
      <Box display="flex" flexDirection="column" gap={2} mb={3}>
        <Box>
          Start date:{" "}
          <DateSelector onDateChange={handleDateChange("startDate")} />
        </Box>
        <Box>
          End date: <DateSelector onDateChange={handleDateChange("endDate")} />
        </Box>
        <Box>
          <Radio
            checked={newExperience.currentlyWorking === true}
            onChange={handleChange("currentlyWorking")}
            value={newExperience.currentlyWorking}
            name="radio-button"
            inputProps={{ "aria-label": "Currently working" }}
          />
          Currently working
        </Box>
        <TextField
          label="Company"
          value={newExperience.companyName}
          onChange={handleChange("companyName")}
          fullWidth
          error={!newExperience.companyName}
          helperText={!newExperience.companyName ? "Company is required" : ""}
        />
        <TextField
          label="Position"
          value={newExperience.positionName}
          onChange={handleChange("positionName")}
          fullWidth
          error={!newExperience.positionName}
          helperText={!newExperience.positionName ? "Position is required" : ""}
        />
        <TextField
          label="Description of the tasks performed"
          value={newExperience.summary}
          onChange={handleChange("summary")}
          fullWidth
          error={!newExperience.summary}
          helperText={!newExperience.summary ? "A description is required" : ""}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddOrUpdate}
          disabled={
            !newExperience.companyName ||
            !newExperience.startDate ||
            !newExperience.positionName ||
            !newExperience.summary ||
            (!newExperience.finishDate && !newExperience.currentlyWorking)
          }
          startIcon={<AddCircleOutlineIcon />}
        >
          {editIndex !== null ? "Update" : "Add"} Experience
        </Button>
      </Box>

      {/* Listing of experiences */}
      <Typography variant="h6" gutterBottom>
        Experience
      </Typography>
      {errors.length > 0 && (
        <Typography color="error" gutterBottom>
          {errors.join(", ")}
        </Typography>
      )}
      <List>
        {items.map((item, index) => (
          <ListItem
            key={index}
            secondaryAction={
              <Box>
                <IconButton onClick={() => handleEdit(index)} color="primary">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(index)} color="error">
                  <DeleteIcon />
                </IconButton>
              </Box>
            }
          >
            <ListItemText
              primary={`[${item.startDate} - ${item.finishDate}] ${item.companyName}`}
              secondary={item.positionName}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ExperienceForm;
