import { TextField } from "@mui/material";
import React from "react";
import SearchIcon from '@mui/icons-material/Search';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div>
      <TextField
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
        size="small"
        id="outlined-basic"
        label="Search for news"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        value={searchTerm}
        variant="outlined"
      />
    </div>
  );
};

export default SearchBar;
