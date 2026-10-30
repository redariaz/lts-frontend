
import React from "react";
import {
  TextField,
  InputAdornment,
  IconButton
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

const TextFieldBox = ({
  value,
  onChange,
  label,
  name,
  id,
  fullWidth = true,
  clearable = true,
  ...rest
}) => {

  const handleClear = () => {
    if (onChange) {
      onChange({
        target: {
          name,
          value: ""
        }
      });
    }
  };

  return (
    <TextField
      fullWidth={fullWidth}
      name={name}
      id={id || name}
      label={label}
      value={value ?? ""}
      onChange={onChange}
      slotProps={{
        inputLabel: {
          shrink: Boolean(value)
        },
        input: {
          endAdornment:
            clearable && value ? (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={handleClear}
                  edge="end"
                  aria-label="Clear text"
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ) : null
        }
      }}
      {...rest}
    />
  );
};

export default TextFieldBox;
