import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { TemplateTypes } from "../constants";
import { Template } from "./templates/Template";
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";
import BallotIcon from "@mui/icons-material/Ballot";
import { Box, Button, Typography } from "@mui/material";
import ColorSelector from "./ColorSelector";

const DesignAndDownload: React.FC = () => {
  const data = useSelector((state: RootState) => state); // Retrieve data from Redux
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateTypes>(
    TemplateTypes.ONE_COLUMN
  );
  const [color, setColor] = useState<string>("#000000");
  const [bgColor, setBgColor] = useState<string>("#FFFFFF");
  const [headingColor, setHeadingColor] = useState<string>("#ADD8E6");

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
      >
        <Box gap={3} display="flex" flexDirection="row" alignItems="center">
          <Button
            onClick={() => setSelectedTemplate(TemplateTypes.ONE_COLUMN)}
            startIcon={<BallotIcon />}
          >
            Single column
          </Button>
          <Button
            onClick={() => setSelectedTemplate(TemplateTypes.TWO_COLUMNS)}
            startIcon={<AutoAwesomeMosaicIcon />}
          >
            2 columnns
          </Button>
        </Box>
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
