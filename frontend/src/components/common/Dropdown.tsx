import React from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import { styled } from '@mui/material/styles';

interface DropdownOption {
  value: string | number;
  label: string;
}

interface DropdownProps {
  label: string;
  value: string | number;
  options: DropdownOption[];
  onChange: (value: string | number) => void;
  fullWidth?: boolean;
}

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

export const Dropdown: React.FC<DropdownProps> = ({ label, value, options, onChange, fullWidth = false }) => {
  const handleChange = (event: SelectChangeEvent<string | number>) => {
    onChange(event.target.value);
  };

  return (
    <StyledFormControl fullWidth={fullWidth} size="small">
      <InputLabel>{label}</InputLabel>
      <Select value={value} label={label} onChange={handleChange}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </StyledFormControl>
  );
};
