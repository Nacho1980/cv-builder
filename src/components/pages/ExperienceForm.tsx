import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import BadgeIcon from "@mui/icons-material/Badge";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Switch,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addExperience,
  removeExperience,
  updateExperience,
  validateExperience,
} from "../../reducers/experienceSlice";
import { RootState } from "../../store/store";
import { compareDatesMMYYYY, isLaterThanToday } from "../../utils";
import CustomAccordion from "../CustomAccordion";
import DateSelector from "../DateSelector";
const ExperienceForm: React.FC = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.experience);
  const [errorFields, setErrorFields] = useState<string[]>([]);

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
      if (field !== "currentlyWorking") {
        setNewExperience({
          ...newExperience,
          [field]: event.target.value,
        });
      } else {
        setNewExperience({
          ...newExperience,
          [field]: !newExperience.currentlyWorking,
        });
      }
    };
  // Action creator for validating the field when leaving the field
  const handleBlur = (field: keyof typeof newExperience) => () => {
    if (newExperience[field] === "" && !errorFields.includes(field)) {
      setErrorFields([...errorFields, field]);
    } else if (errorFields.includes(field)) {
      setErrorFields(errorFields.filter((f) => f !== field));
    }
  };
  const handleDateChange = (field: string) => (value: string) => {
    setNewExperience({
      ...newExperience,
      currentlyWorking:
        field === "finishDate" ? false : newExperience.currentlyWorking,
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
    <>
      <Box className="page-header">Work experience</Box>

      {/* Add a new experience item or edit an existing one */}
      <Box display="flex" flexDirection="column" gap={2}>
        <Box display="flex" flexDirection="row" alignItems="center" gap={2}>
          <CalendarMonthIcon style={{ fontSize: 40, color: "coral" }} />
          <Box display="flex" alignItems="center" gap={2}>
            <DateSelector
              label="Start date"
              onDateChange={handleDateChange("startDate")}
              selectedDate={newExperience.startDate}
              error={isLaterThanToday(newExperience.startDate)}
            />
          </Box>
          {newExperience.currentlyWorking === false && (
            <Box display="flex" alignItems="center" gap={2}>
              <DateSelector
                label="End date"
                onDateChange={handleDateChange("finishDate")}
                selectedDate={newExperience.finishDate}
                error={
                  isLaterThanToday(newExperience.finishDate) ||
                  (!!newExperience.startDate &&
                    !!newExperience.finishDate &&
                    compareDatesMMYYYY(
                      newExperience.startDate,
                      newExperience.finishDate
                    ) >= 0)
                }
              />
            </Box>
          )}
          <Box>
            <Switch
              checked={newExperience.currentlyWorking === true}
              onChange={handleChange("currentlyWorking")}
              inputProps={{ "aria-label": "Currently working" }}
            />
            Current employer
          </Box>
        </Box>
        <Box display="flex" alignItems="center" gap={2}>
          <BusinessCenterIcon style={{ fontSize: 40, color: "coral" }} />
          <TextField
            label="Company"
            value={newExperience.companyName}
            onChange={handleChange("companyName")}
            onBlur={handleBlur("companyName")}
            fullWidth
            error={errorFields.includes("companyName")}
          />
        </Box>
        <Box display="flex" alignItems="center" gap={2}>
          <BadgeIcon style={{ fontSize: 40, color: "coral" }} />
          <TextField
            label="Position"
            value={newExperience.positionName}
            onChange={handleChange("positionName")}
            onBlur={handleBlur("positionName")}
            fullWidth
            error={errorFields.includes("positionName")}
          />
        </Box>
        <Box display="flex" alignItems="center" gap={2}>
          <TextField
            label="Summary of the tasks performed"
            value={newExperience.summary}
            onChange={handleChange("summary")}
            onBlur={handleBlur("summary")}
            multiline
            rows={4}
            fullWidth
            error={errorFields.includes("summary")}
          />
        </Box>
        <Box display="flex" justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddOrUpdate}
            disabled={
              !newExperience.companyName ||
              !newExperience.startDate ||
              !newExperience.positionName ||
              !newExperience.summary ||
              (!newExperience.finishDate && !newExperience.currentlyWorking) ||
              (!!newExperience.startDate &&
                !!newExperience.finishDate &&
                compareDatesMMYYYY(
                  newExperience.startDate,
                  newExperience.finishDate
                ) >= 0)
            }
            startIcon={<AddCircleOutlineIcon />}
          >
            {editIndex !== null ? "Update" : "Add"} Experience
          </Button>
        </Box>
      </Box>

      {/* Listing of experiences */}
      {items.length > 0 && (
        <CustomAccordion title="Experience">
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
                        <b>
                          {item.startDate} &rarr;{" "}
                          {item.currentlyWorking ? "Today" : item.finishDate}
                        </b>{" "}
                        {item.companyName}
                      </span>
                    }
                    secondary={item.positionName}
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

export default ExperienceForm;
