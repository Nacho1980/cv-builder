import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import {
  addEducation,
  updateEducation,
  removeEducation,
  validateEducation,
} from "../../reducers/educationSlice";

const EducationForm: React.FC = () => {
  const dispatch = useDispatch();
  const { items, errors } = useSelector((state: RootState) => state.education);

  const [newEducation, setNewEducation] = useState({
    year: "",
    center: "",
    degree: "",
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewEducation({
        ...newEducation,
        [field]: event.target.value,
      });
    };

  const handleAddOrUpdate = () => {
    if (editIndex !== null) {
      dispatch(updateEducation({ index: editIndex, item: newEducation }));
      setEditIndex(null);
    } else {
      dispatch(addEducation(newEducation));
    }
    setNewEducation({ year: "", center: "", degree: "" });
    dispatch(validateEducation());
  };

  const handleEdit = (index: number) => {
    setNewEducation(items[index]);
    setEditIndex(index);
  };

  const handleDelete = (index: number) => {
    dispatch(removeEducation(index));
    dispatch(validateEducation());
  };

  return (
    <Box>
      <Typography variant="h2" gutterBottom>
        Add any relevant education
      </Typography>

      {/* Add a new education item or edit an existing one */}
      <Box display="flex" flexDirection="column" gap={2} mb={3}>
        <TextField
          label="Year of completion"
          value={newEducation.year}
          onChange={handleChange("year")}
          fullWidth
          error={!newEducation.year}
          helperText={!newEducation.year ? "Year is required" : ""}
        />
        <TextField
          label="Center"
          value={newEducation.center}
          onChange={handleChange("center")}
          fullWidth
          error={!newEducation.center}
          helperText={!newEducation.center ? "Center is required" : ""}
        />
        <TextField
          label="Degree or Certification"
          value={newEducation.degree}
          onChange={handleChange("degree")}
          fullWidth
          error={!newEducation.degree}
          helperText={!newEducation.degree ? "Degree is required" : ""}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddOrUpdate}
          disabled={
            !newEducation.year || !newEducation.center || !newEducation.degree
          }
          startIcon={<AddCircleOutlineIcon />}
        >
          {editIndex !== null ? "Update" : "Add"} Education
        </Button>
      </Box>

      {/* Listing of education */}
      <Typography variant="h6" gutterBottom>
        Education
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
              primary={`${item.year} - ${item.center}`}
              secondary={item.degree}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default EducationForm;
