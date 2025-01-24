import { useDispatch, useSelector } from "react-redux";
import {
  updateSummary,
  addLanguage,
  updateLanguage,
  removeLanguage,
  addSkill,
  removeSkill,
} from "../../reducers/optionalDataSlice";
import { RootState } from "../../store/store";
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
import { useState } from "react";
import DiscreteSlider from "../DiscreteSlider";
import { languageLevels } from "../../constants";

const OptionalSectionsForm: React.FC = () => {
  const dispatch = useDispatch();
  const { summary, languages, skills } = useSelector(
    (state: RootState) => state.optionalData
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

  return (
    <Box>
      <Box className="page-header">
        Consider adding a summary, a list of your skills and languages to your
        CV (all are optional)
      </Box>

      {/* Summary */}
      <Box display="flex" flexDirection="column" gap={2} mb={3}>
        <TextField
          label="Summary"
          value={summary}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChangeSummary(e)
          }
          fullWidth
        />
      </Box>

      {/* Add a new language */}
      <Box display="flex" flexDirection="column" gap={2} mb={3}>
        <TextField
          label="Language"
          value={newLanguage.language}
          onChange={handleChangeLanguage("language")}
          fullWidth
          error={!newLanguage.language}
          helperText={!newLanguage.language ? "Language is required" : ""}
        />
        <DiscreteSlider
          marks={languageLevels}
          onChange={handleChangeLanguageLevel}
        />
        <Button
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
      <Typography variant="h6" gutterBottom>
        Languages
      </Typography>
      <List>
        {languages.map((language, index) => (
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
              secondary={language.level}
            />
          </ListItem>
        ))}
      </List>

      {/* Add a new skill */}
      <Box display="flex" flexDirection="column" gap={2} mb={3}>
        <TextField
          label="Skill"
          value={newSkill}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewSkill(e.target.value)
          }
          fullWidth
        />
        <Button
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
      <Typography variant="h6" gutterBottom>
        Skills
      </Typography>
      <List>
        {skills.map((skill, index) => (
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
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default OptionalSectionsForm;
