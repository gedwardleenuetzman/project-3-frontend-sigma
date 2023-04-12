import * as React from "react";
import { InputBase, IconButton, Paper } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
  
function SearchBar({ placeholder, onSearch }) {
    const [value, setValue] = React.useState("");

    const handleInputChange = (event) => {
        setValue(event.target.value);
    };

    const handleSearchClick = () => {
        if (onSearch) {
            onSearch(value);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && onSearch) {
            console.log("Search for: ", value)
            onSearch(value);
        }
    };

    return (
        <Paper sx={{ display: 'flex', alignItems: 'center', width: 400 }}>
            <InputBase sx={{ ml: 2, flex: 1 }} placeholder={placeholder} value={value} onChange={handleInputChange} onKeyDown={handleKeyDown}/>
            <IconButton type="button" sx={{ p: '10px' }} onClick={handleSearchClick}>
                <SearchIcon />
            </IconButton>
        </Paper>
    );R
}

export default SearchBar;