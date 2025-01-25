import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
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
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SchoolIcon from "@mui/icons-material/School";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import DateSelector from "../DateSelector";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CustomAccordion from "../CustomAccordion";

const EducationForm: React.FC = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.education);
  const [errorFields, setErrorFields] = useState<string[]>([]);

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
  // Action creator for validating the field when leaving the field
  const handleBlur = (field: keyof typeof newEducation) => () => {
    if (newEducation[field] === "" && !errorFields.includes(field)) {
      setErrorFields([...errorFields, field]);
    } else if (errorFields.includes(field)) {
      setErrorFields(errorFields.filter((f) => f !== field));
    }
  };

  const handleDateChange = (field: string) => (value: string) => {
    setNewEducation({
      ...newEducation,
      [field]: value,
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
    <>
      <Box className="page-header">Education</Box>

      {/* Add a new education item or edit an existing one */}
      <Box display="flex" alignItems="center" gap={4}>
        <Box display="flex" alignItems="center" gap={2}>
          <CalendarMonthIcon style={{ fontSize: 40, color: "coral" }} />
          <DateSelector
            onDateChange={handleDateChange("year")}
            selectedDate={newEducation.year}
            label="Select year/month"
          />
        </Box>
        <Box display="flex" alignItems="center" gap={2} flex={1}>
          <AssuredWorkloadIcon style={{ fontSize: 40, color: "coral" }} />
          <TextField
            label="Center"
            value={newEducation.center}
            onChange={handleChange("center")}
            onBlur={handleBlur("center")}
            fullWidth
            error={errorFields.includes("center")}
            sx={{
              width: "100%",
            }}
          />
        </Box>
      </Box>
      <Box display="flex" alignItems="center" gap={2}>
        <SchoolIcon style={{ fontSize: 40, color: "coral" }} />
        <TextField
          label="Degree or Certification"
          value={newEducation.degree}
          onChange={handleChange("degree")}
          onBlur={handleBlur("degree")}
          fullWidth
          error={errorFields.includes("degree")}
          sx={{}}
        />
      </Box>
      <Box display="flex" justifyContent="center">
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
      {items.length > 0 && (
        <CustomAccordion title="Education">
          <List>
            {items.map((item, index) => (
              <React.Fragment key={index}>
                <ListItem
                  key={index}
                  secondaryAction={
                    <Box>
                      <IconButton
                        onClick={() => handleEdit(index)}
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(index)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  }
                >
                  <ListItemText
                    primary={
                      <span>
                        <b>{item.year}</b> {item.center}
                      </span>
                    }
                    secondary={item.degree}
                  />
                </ListItem>
                {index < items.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </CustomAccordion>
      )}
    </>
  );
};

export default EducationForm;
