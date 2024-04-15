import React from "react";
import { FormControl, Select, MenuItem } from "@mui/material";
import Search from "@mui/icons-material/Search";
import "../../index.css"

const AdditionalSearchSelect = ({
  label,
  onOpen,
  onClose,
  onChange,
  value,
  options,
  addititonalOptions,
  onAddClick,
  onFirstOptionsClick,
  onNewOptionsClick,
  selected,
  additionalSelected,
  onMenuSelected,
  disabled = false
}) => {
  return (
    <FormControl variant="standard">
      <label className="label">{label}</label>
      <Select
        onOpen={onOpen}
        onClose={onClose}
        onChange={onChange}
        value={value}
        disabled={disabled}
      >
        {options?.map((item) => (
          <MenuItem
            key={item.id}
            onClick={() => {
              onFirstOptionsClick && onFirstOptionsClick({ ...item });
              onMenuSelected && onMenuSelected(item);
              selected && selected(true);
              additionalSelected && additionalSelected(false);
            }}
            value={
              (item.partnerSeq
                ? `${item.partnerSeq}-${item.name}`
                : item.name) || item.fullName
            }
          >
            {(item.partnerSeq
              ? `${item.partnerSeq}-${item.name || item.simpleFullName}`
              : item.name) || item.fullName}
          </MenuItem>
        ))}

        {addititonalOptions?.map((item) => (
          <MenuItem
            key={item.id}
            onClick={() => {
              onNewOptionsClick && onNewOptionsClick({ ...item });
              onMenuSelected && onMenuSelected(item);
              selected && selected(false);
              additionalSelected && additionalSelected(true);
            }}
            value={
              (item.partnerSeq
                ? `${item.partnerSeq}-${item.name || item.simpleFullName}`
                : item.name) || item.fullName
            }
          >
            {(item.partnerSeq
              ? `${item.partnerSeq}-${item.name || item.simpleFullName}`
              : item.name) || item.fullName}
          </MenuItem>
        ))}

        {onAddClick && (
          <MenuItem onClick={onAddClick}>
            <Search /> <i>Search more...</i>
          </MenuItem>
        )}
      </Select>
    </FormControl>
  );
};

export default AdditionalSearchSelect;
