import { useEffect, useState } from "react";
import Switch, { SwitchProps } from "@mui/material/Switch";
import styles from "./index.module.scss";

export default function Button() {
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  useEffect(() => {
    let timeoutID = null;

    if (checked) {
      timeoutID = setTimeout(() => {
        setChecked(false);
      }, 1000);
    }

    return () => {
      clearTimeout(timeoutID);
    };
  }, [checked]);

  return <Switch checked={checked} onChange={handleChange} />;
}
