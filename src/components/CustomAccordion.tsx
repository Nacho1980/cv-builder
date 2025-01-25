import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface CustomAccordionProps {
  title: string;
  children: React.ReactNode;
}

const CustomAccordion: React.FC<CustomAccordionProps> = ({
  title,
  children,
}) => {
  return (
    <Accordion
      sx={{
        backgroundColor: "lightblue",
        "&.Mui-expanded": {
          maxHeight: "none", // Removes height limit when expanded
        },
        "&:before": {
          display: "none", // Remove the default divider line
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
        sx={{
          maxHeight: 80, // Set a max height when collapsed
          display: "flex",
          alignItems: "center", // Vertically center the text
          backgroundColor: "lightblue",
          border: "none", // Remove the border from the summary
          "&.Mui-expanded": {
            backgroundColor: "lightblue", // Keeps lightblue background when expanded
          },
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            color: "coral",
          }}
        >
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          backgroundColor: "lightblue",
        }}
      >
        {children}
      </AccordionDetails>
    </Accordion>
  );
};

export default CustomAccordion;
