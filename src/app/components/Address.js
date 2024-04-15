import { FormControl, TextareaAutosize, Box } from "@mui/material";
import React from "react";
import "../../index.css"

const Address = ({ label, onChange, value }) => {
  return (
    <Box mt={2}>
      <FormControl fullWidth>
        <label className="label">{label}</label>
        <TextareaAutosize
          id="address-textarea"
          aria-label={label}
          minRows={5}
          value={value}
          onChange={onChange}
        ></TextareaAutosize>
      </FormControl>
    </Box>
  );
};

export default Address;
