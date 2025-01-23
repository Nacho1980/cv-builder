import { TemplateTypes } from "../../constants";
import { Template1Column } from "./Template1Column";
import { Template2Columns } from "./Template2Columns";

export const Template = ({
  selectedTemplate,
  data,
  color,
}: {
  selectedTemplate: TemplateTypes;
  data: any;
  color: string;
}) => {
  switch (selectedTemplate) {
    case TemplateTypes.ONE_COLUMN:
      return <Template1Column data={data} color={color} />;
    case TemplateTypes.TWO_COLUMNS:
      return <Template2Columns data={data} color={color} />;
    default:
      return <Template1Column data={data} color={color} />;
  }
};
