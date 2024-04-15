import React from "react";
import { FormControl, Select, MenuItem } from "@mui/material";

function SimpleSelector({ value, onChange, options }) {
  return (
    <FormControl variant="standard">
      <Select value={value} onChange={onChange}>
        {options.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SimpleSelector;
