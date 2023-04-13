import React from 'react';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';

const AutocompleteWithQuery = ({ query, onChange }) => {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event, value) => {
    if (event && event.type === 'change' && event.target && event.target.value !== '') {
      setLoading(true);

      query(event.target.value).then((result) => {
        setOptions(result);
        setLoading(false);
      });
    }

    onChange(event, value)
  }

  return (
    <Autocomplete
      sx={{width: 250}}
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
      options={options}
      loading={loading}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search"
          variant="outlined"
          onChange={handleInputChange}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading && <CircularProgress color="inherit" size={20} />}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default AutocompleteWithQuery;