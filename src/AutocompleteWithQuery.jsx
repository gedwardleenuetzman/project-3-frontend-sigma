import React from 'react';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';

/**
 * 
 * @param {*} param0 
 * @returns Automatically complete query
 */
const AutocompleteWithQuery = ({ query, onChange }) => {
  const [open, setOpen] = React.useState(false)
  const [options, setOptions] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [input, setInput] = React.useState('')

  React.useEffect(() => {
    setLoading(true);

    query(input).then((result) => {
      setOptions(result);
      setLoading(false);
    });
  }, [input])

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event, value) => {
    setInput(event.target.value)
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
      onChange={ onChange }
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