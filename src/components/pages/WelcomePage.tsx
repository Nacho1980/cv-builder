import Looks3Icon from "@mui/icons-material/Looks3";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import { Alert, Avatar } from "@mui/material";
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
      <div className="paragraph">
        Create and download your CV in PDF in a few simple steps:
      </div>
      <div className="paragraph enum">
        <div>
          <LooksOneIcon
            sx={{
              fontSize: 40,
              backgroundColor: "lightblue",
              color: "coral",
            }}
          />
          Fill in the required info
        </div>
        <div>
          <LooksTwoIcon
            sx={{
              fontSize: 40,
              backgroundColor: "lightblue",
              color: "coral",
            }}
          />
          Customize the look
        </div>
        <div>
          <Looks3Icon
            sx={{
              fontSize: 40,
              backgroundColor: "lightblue",
              color: "coral",
            }}
          />
          Download the CV
        </div>
      </div>
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
