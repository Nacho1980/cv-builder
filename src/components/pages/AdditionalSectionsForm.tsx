import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EngineeringIcon from "@mui/icons-material/Engineering";
import TranslateIcon from "@mui/icons-material/Translate";
import {
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { languageLevels } from "../../constants";
import {
  addLanguage,
  addSkill,
  removeLanguage,
  removeSkill,
  updateLanguage,
  updateSummary,
} from "../../reducers/additionalDataSlice";
import { RootState } from "../../store/store";
import CustomAccordion from "../CustomAccordion";
import DiscreteSlider from "../DiscreteSlider";

const AdditionalSectionsForm: React.FC = () => {
  const requiredFields = ["summary"];
  const [errorFields, setErrorFields] = useState<string[]>([]);
  const dispatch = useDispatch();
  const { summary, languages, skills } = useSelector(
    (state: RootState) => state.additionalData
  );
  const [newSkill, setNewSkill] = useState("");
  const [newLanguage, setNewLanguage] = useState({
    language: "",
    level: 1,
  });
  const [editLanguageIndex, setEditLanguageIndex] = useState<number | null>(
    null
  );

  const handleChangeSummary = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateSummary(event.target.value));
  };

  const handleAddOrUpdateLanguage = () => {
    if (editLanguageIndex !== null) {
      dispatch(updateLanguage({ index: editLanguageIndex, item: newLanguage }));
      setEditLanguageIndex(null);
    } else {
      dispatch(addLanguage(newLanguage));
    }
    setNewLanguage({ language: "", level: 1 });
  };

  const handleEditLanguage = (index: number) => {
    setNewLanguage(languages[index]);
    setEditLanguageIndex(index);
  };

  const handleDeleteLanguage = (index: number) => {
    dispatch(removeLanguage(index));
  };

  const handleChangeLanguage =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewLanguage({
        ...newLanguage,
        [field]: event.target.value,
      });
    };

  const handleChangeLanguageLevel = (value: number) => {
    setNewLanguage({
      ...newLanguage,
      level: value,
    });
  };

  const handleAddSkill = () => {
    dispatch(addSkill(newSkill));
    setNewSkill("");
  };

  const handleDeleteSkill = (index: number) => {
    dispatch(removeSkill(index));
  };

  // Action creator for validating the required field when leaving the field
  const handleBlur = (field: string) => () => {
    if (requiredFields.includes(field)) {
      if (summary === "" && !errorFields.includes(field)) {
        setErrorFields([...errorFields, field]);
      } else if (errorFields.includes(field) && summary.trim().length > 0) {
        setErrorFields(errorFields.filter((f) => f !== field));
      }
    }
  };

  return (
    <>
      <Box className="page-header">Summary | Skills | Languages</Box>

      {/* Summary */}
      <Box display="flex" flexDirection="column" gap={2} mb={2}>
        <TextField
          label="Summary"
          name="summary"
          helperText="Describe in a few lines how you are qualified for a future position"
          value={summary}
          multiline
          rows={4}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChangeSummary(e)
          }
          onBlur={handleBlur("summary")}
          fullWidth
          error={errorFields.includes("summary")}
        />
      </Box>

      {/* Add a new skill */}
      <Box mb={2} display="flex" flexDirection="column" gap={2}>
        <Box display="flex" gap={2}>
          <EngineeringIcon style={{ fontSize: 40, color: "coral" }} />
          <TextField
            label="Skill"
            name="skill"
            value={newSkill}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewSkill(e.target.value)
            }
            fullWidth
          />
        </Box>
        <Box display="flex" justifyContent="center">
          <Button
            name="addSkill"
            variant="contained"
            color="primary"
            onClick={handleAddSkill}
            disabled={!newSkill}
            startIcon={<AddCircleOutlineIcon />}
          >
            Add skill
          </Button>
        </Box>

        {/* Listing of skills */}
        {skills.length > 0 && (
          <CustomAccordion title="Skills">
            <List data-testid="list-of-skills">
              {skills.map((skill, index) => (
                <React.Fragment key={index}>
                  <ListItem
                    key={index}
                    secondaryAction={
                      <Box>
                        <IconButton
                          onClick={() => handleDeleteSkill(index)}
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    }
                  >
                    <ListItemText primary={`${skill}`} />
                    {index < skills.length - 1 && <Divider />}
                  </ListItem>
                </React.Fragment>
              ))}
            </List>
          </CustomAccordion>
        )}
      </Box>

      {/* Add a new language */}
      <Box display="flex" flexDirection="row" alignItems="center" gap={2}>
        <TranslateIcon style={{ fontSize: 40, color: "coral" }} />
        <TextField
          label="Language"
          name="language"
          value={newLanguage.language}
          onChange={handleChangeLanguage("language")}
        />
        <DiscreteSlider
          marks={languageLevels}
          onChange={handleChangeLanguageLevel}
        />
      </Box>
      <Box display="flex" justifyContent="center" mb={3}>
        <Button
          name="addLanguage"
          variant="contained"
          color="primary"
          onClick={handleAddOrUpdateLanguage}
          disabled={!newLanguage.language || !newLanguage.level}
          startIcon={<AddCircleOutlineIcon />}
        >
          {editLanguageIndex !== null ? "Update" : "Add"} Language
        </Button>
      </Box>

      {/* Listing of languages */}
      {languages.length > 0 && (
        <CustomAccordion title="Languages">
          <List data-testid="list-of-languages">
            {languages.map((language, index) => (
              <React.Fragment key={index}>
                <ListItem
                  key={index}
                  secondaryAction={
                    <Box>
                      <IconButton
                        onClick={() => handleEditLanguage(index)}
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeleteLanguage(index)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  }
                >
                  <ListItemText
                    primary={`${language.language}`}
                    secondary={
                      languageLevels.find(
                        (lang) => lang.value === language.level
                      )?.label
                    }
                  />
                </ListItem>
                {index < languages.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </CustomAccordion>
      )}
    </>
  );
};

export default AdditionalSectionsForm;
