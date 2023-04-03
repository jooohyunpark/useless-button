import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";

const thumbSize = 22;
const margin = 2;
const trackWidth = 52;
const trackHeight = thumbSize + margin * 2;
const color = "#33cf4d";

export const Button = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" {...props} />
))(({ theme }) => ({
  width: trackWidth,
  height: trackHeight,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: `translateX(${trackWidth - thumbSize - margin * 2}px)`,
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: color,
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: color,
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color: theme.palette.grey[100],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: 0.7,
    },
    "& .MuiSwitch-input": {
      width: "500%",
      left: "-200%",
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: thumbSize,
    height: thumbSize,
  },
  "& .MuiSwitch-track": {
    borderRadius: trackHeight / 2,
    backgroundColor: "rgba(0,0,0,.25)",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));
