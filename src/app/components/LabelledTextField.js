import { FormControl, TextField, Box } from "@mui/material";
import React from "react";
import "../../index.css"

const LabelledTextField = ({ label, onChange, value, onKeyDown, type, disabled }) => {
  return (
    <Box mt={2}>
      <FormControl fullWidth>
        <label className="label">{label}</label>
        <TextField
          id="product-textfield"
          rows={1}
          value={value}
          variant="standard"
          onChange={onChange}
          onKeyDown={onKeyDown}
          type={type}
          disabled={disabled}
        />
      </FormControl>
    </Box>
  );
};

export default LabelledTextField;
