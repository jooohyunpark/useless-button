import { useEffect, useState } from "react";
import { Button } from "./styles";

export default function UselessButton() {
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

  return <Button checked={checked} onChange={handleChange} disableRipple />;
}
