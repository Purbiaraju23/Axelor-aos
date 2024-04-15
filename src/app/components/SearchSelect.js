import React from "react";
import { FormControl, Select, MenuItem } from "@mui/material";

const SearchSelect = ({
  label,
  onChange,
  value,
  onOpen,
  onClose,
  options,
  onMenuSelected,
  disabled
}) => {
  return (
    <FormControl variant="standard">
      <label style={{ fontSize: "1.2rem" }}>{label}</label>
      <Select
        onChange={onChange}
        value={value}
        onOpen={onOpen}
        onClose={onClose}
        disabled={disabled}
      >
        {options ? options.map((item) => (
          <MenuItem
            key={item?.id}
            value={item?.name || item?.fullName}
            onClick={() => {
              if (onMenuSelected) {
                onMenuSelected(item)
              }
            }}
          >
            {item?.name || item?.fullName}
          </MenuItem>
        ))
          : <MenuItem><i>No Results Found</i></MenuItem>}
      </Select>
    </FormControl>
  );
};

export default SearchSelect;
