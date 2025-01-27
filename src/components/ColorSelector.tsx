import { Box, Typography } from "@mui/material";

interface ColorSelectorProps {
  label: string;
  onChange: (newVal: string) => void;
  color: string;
}

const ColorSelector: React.FC<ColorSelectorProps> = ({
  label,
  onChange,
  color,
}) => {
  return (
    <Box gap={1} display="flex" flexDirection="row" alignItems="center">
      <Typography variant="body1">{label}</Typography>
      <Box
        component="label"
        sx={{
          position: "relative",
          display: "inline-block",
          width: 40,
          height: 40,
          borderRadius: "50%",
          backgroundColor: color,
          overflow: "hidden",
          cursor: "pointer",
          border: "2px solid #ccc",
        }}
      >
        <input
          type="color"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            opacity: 0,
            cursor: "pointer",
          }}
        />
      </Box>
    </Box>
  );
};

export default ColorSelector;
