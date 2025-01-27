import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";
import BallotIcon from "@mui/icons-material/Ballot";
import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { useState } from "react";
import { useSelector } from "react-redux";
import { TemplateTypes } from "../constants";
import { RootState } from "../store/store";
import ColorSelector from "./ColorSelector";
import { Template } from "./templates/Template";

const DesignAndDownload: React.FC = () => {
  const data = useSelector((state: RootState) => state); // Retrieve data from Redux
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateTypes>(
    TemplateTypes.ONE_COLUMN
  );
  const [color, setColor] = useState<string>("#000000");
  const [bgColor, setBgColor] = useState<string>("#FFFFFF");
  const [headingColor, setHeadingColor] = useState<string>("#ADD8E6");

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newTemplate: TemplateTypes
  ) => {
    setSelectedTemplate(newTemplate);
  };

  return (
    <div>
      <Box className="page-header">
        Almost done! Select a template and color for your CV
      </Box>
      <Box
        display="flex"
        flexDirection="row"
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
              <BallotIcon /> Single column
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
          <ColorSelector
            label="Background"
            onChange={(newVal) => setBgColor(newVal)}
            color={bgColor}
          />
          <ColorSelector
            label="Heading"
            onChange={(newVal) => setHeadingColor(newVal)}
            color={headingColor}
          />
        </Box>
      </Box>

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
        <div className="right-align margin-bottom">
          <span>Download</span>
        </div>
      </PDFDownloadLink>
      <div style={{ height: "600px", border: "1px solid #ddd" }}>
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
    </div>
  );
};

export default DesignAndDownload;
