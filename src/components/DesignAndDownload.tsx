import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { TemplateTypes } from "../constants";
import { Template } from "./templates/Template";
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";
import BallotIcon from "@mui/icons-material/Ballot";
import { Button } from "@mui/material";

const DesignAndDownload: React.FC = () => {
  const data = useSelector((state: RootState) => state); // Retrieve data from Redux
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateTypes>(
    TemplateTypes.ONE_COLUMN
  );
  const [color, setColor] = useState<string>("#000000");

  return (
    <div>
      <h2>We are almost done! Select a template for your CV</h2>
      <div>
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
      </div>

      <h2>Pick the text color</h2>
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />

      <h2>Preview</h2>
      <div style={{ height: "600px", border: "1px solid #ddd" }}>
        <PDFViewer style={{ width: "100%", height: "100%" }}>
          <Template
            selectedTemplate={selectedTemplate}
            data={data}
            color={color}
          />
        </PDFViewer>
      </div>

      <h2>Download PDF</h2>
      <PDFDownloadLink
        document={
          <Template
            selectedTemplate={selectedTemplate}
            data={data}
            color={color}
          />
        }
        fileName="cv.pdf"
      >
        <div>
          <span>Download</span>
        </div>
      </PDFDownloadLink>
    </div>
  );
};

export default DesignAndDownload;
