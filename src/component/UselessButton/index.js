import { useEffect, useState } from "react";
import { Button } from "./styles";

export default function UselessButton() {
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  useEffect(() => {
    let timeoutID = null;
    let time = 250 + Math.random() * 750;

    if (checked) {
      timeoutID = setTimeout(() => {
        setChecked(false);
      }, time);
    }

    return () => {
      clearTimeout(timeoutID);
    };
  }, [checked]);

  return <Button checked={checked} onChange={handleChange} disableRipple />;
}
