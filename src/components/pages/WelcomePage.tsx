import DesignServicesIcon from "@mui/icons-material/DesignServices";
import DownloadIcon from "@mui/icons-material/Download";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { Alert, Avatar, Step, StepLabel, Stepper } from "@mui/material";
import { MY_LINKEDIN_PROFILE } from "../../constants";

const WelcomePage: React.FC = () => {
  return (
    <div className="welcome">
      <Avatar
        alt="Ignacio Santos"
        sx={{ bgcolor: "lightblue", color: "bisque" }}
        className="avatar"
      >
        <a href={MY_LINKEDIN_PROFILE}>IS</a>
      </Avatar>
      <h1>CV Builder</h1>
      <div className="paragraph margin-below">
        Create and download your CV in PDF in a few simple steps:
      </div>
      <Stepper
        alternativeLabel
        sx={{
          "& .MuiStepConnector-line": {
            borderColor: "coral", // Change to your desired color
            borderWidth: 2, // Optional: change thickness
          },
        }}
      >
        <Step key={1}>
          <StepLabel icon={<EditNoteIcon color="primary" />}>
            Fill in the details
          </StepLabel>
        </Step>
        <Step key={2}>
          <StepLabel icon={<DesignServicesIcon color="primary" />}>
            Customize the look
          </StepLabel>
        </Step>
        <Step key={3}>
          <StepLabel icon={<DownloadIcon color="primary" />}>
            Download
          </StepLabel>
        </Step>
      </Stepper>
      <div className="paragraph disclaimer">
        <Alert severity="success">
          Unlike other online tools CV Builder is &nbsp;
          <span className="bold-text">FREE</span>, requires no registration and
          no personal information is stored anywhere :)
        </Alert>
      </div>
    </div>
  );
};

export default WelcomePage;
