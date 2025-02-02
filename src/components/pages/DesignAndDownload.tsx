import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";
import BallotIcon from "@mui/icons-material/Ballot";
import { Box, Divider, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { useState } from "react";
import { useSelector } from "react-redux";
import { TemplateTypes } from "../../constants";
import useIsPhone from "../../hooks/useIsPhone";
import { RootState } from "../../store/store";
import ColorSelector from "../ColorSelector";
import { Template } from "../templates/Template";

const DesignAndDownload: React.FC = () => {
  const isPhone = useIsPhone();
  const data = useSelector((state: RootState) => state); // Retrieve data from Redux
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateTypes>(
    TemplateTypes.ONE_COLUMN
  );
  const [color, setColor] = useState<string>("#000000");
  const [bgColor, setBgColor] = useState<string>("#FFFFFF");
  const [headingColor, setHeadingColor] = useState<string>("#FF7F50");

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newTemplate: TemplateTypes
  ) => {
    setSelectedTemplate(newTemplate);
  };

  return (
    <div>
      <Box className="page-header">Template | Color</Box>
      <Box
        display="flex"
        flexDirection={isPhone ? "column" : "row"}
        alignItems="center"
        gap={3}
        mb={3}
        justifyContent="space-between"
      >
        <Box gap={1} display="flex" flexDirection="row" alignItems="center">
          <ToggleButtonGroup
            color="primary"
            value={selectedTemplate}
            exclusive
            onChange={handleChange}
            aria-label="Template"
          >
            <ToggleButton value={TemplateTypes.ONE_COLUMN}>
              <BallotIcon />
              Single column
            </ToggleButton>
            <ToggleButton value={TemplateTypes.TWO_COLUMNS}>
              <AutoAwesomeMosaicIcon />
              Two columns
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Box display="flex" flexDirection="row" gap={1}>
          <ColorSelector
            label="Text"
            onChange={(newVal) => setColor(newVal)}
            color={color}
          />
          {isPhone && (
            <Divider orientation="vertical" variant="middle" flexItem />
          )}
          <ColorSelector
            label="Background"
            onChange={(newVal) => setBgColor(newVal)}
            color={bgColor}
          />
          {isPhone && (
            <Divider orientation="vertical" variant="middle" flexItem />
          )}
          <ColorSelector
            label="Heading"
            onChange={(newVal) => setHeadingColor(newVal)}
            color={headingColor}
          />
        </Box>
      </Box>

      <Box className="download-container">
        <PDFDownloadLink
          document={
            <Template
              selectedTemplate={selectedTemplate}
              data={data}
              color={color}
              bgColor={bgColor}
              headingColor={headingColor}
            />
          }
          fileName="cv.pdf"
        >
          <button className="download-button">
            <span>Download</span>
          </button>
        </PDFDownloadLink>
      </Box>
      {!isPhone && (
        <div
          style={{
            height: isPhone ? "80vh" : "600px",
            border: "1px solid #ddd",
          }}
        >
          <PDFViewer style={{ width: "100%", height: "100%" }}>
            <Template
              selectedTemplate={selectedTemplate}
              data={data}
              color={color}
              bgColor={bgColor}
              headingColor={headingColor}
            />
          </PDFViewer>
        </div>
      )}
    </div>
  );
};

export default DesignAndDownload;
