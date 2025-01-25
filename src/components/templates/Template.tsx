import { TemplateTypes } from "../../constants";
import { Template1Column } from "./Template1Column";
import { Template2Columns } from "./Template2Columns";

export const Template = ({
  selectedTemplate,
  data,
  color,
  bgColor,
  headingColor,
}: {
  selectedTemplate: TemplateTypes;
  data: any;
  color: string;
  bgColor: string;
  headingColor: string;
}) => {
  switch (selectedTemplate) {
    case TemplateTypes.ONE_COLUMN:
      return (
        <Template1Column
          data={data}
          color={color}
          bgColor={bgColor}
          headingColor={headingColor}
        />
      );
    case TemplateTypes.TWO_COLUMNS:
      return (
        <Template2Columns
          data={data}
          color={color}
          bgColor={bgColor}
          headingColor={headingColor}
        />
      );
    default:
      return (
        <Template1Column
          data={data}
          color={color}
          bgColor={bgColor}
          headingColor={headingColor}
        />
      );
  }
};
