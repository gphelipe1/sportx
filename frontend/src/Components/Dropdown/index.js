import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { InputLabel, FormControl } from '@mui/material';

export default function Dropdown({controller, setController, label, size, items}) {

    const handleChange = (event) => {
      setController(event.target.value);
    };

  return (
       <FormControl sx={{ m: 1, minWidth: size }}>
        <InputLabel id="demo-simple-select-helper-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={controller}
          label={label}
          onChange={handleChange}
        >
          <MenuItem >
            <em>None </em>
          </MenuItem>
          {items.map((value, i) => {
             return <MenuItem value={i}>{value}</MenuItem>
          })} 
        </Select>
        </FormControl>
  );
}
