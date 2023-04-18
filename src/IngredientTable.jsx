import React from 'react';

import { Table, TableBody, TableCell, TableHead, TableRow, TextField, IconButton, Autocomplete } from '@mui/material';
import { Clear as ClearIcon, Add as AddIcon } from '@mui/icons-material';

import AutocompleteWithQuery from 'src/AutocompleteWithQuery';

const IngredientTable = ({ initial=[], onChange }) => {
    const [data, setData] = React.useState(initial)

    const [ingredient, setIngredient] = React.useState()
    const [quantity, setQuantity] = React.useState(1)

    React.useEffect(() => {
        onChange(data)
    }, [data])

    const handleAddRow = () => {
        let state = [...data]
        const row = state.find((row) => row.ingredient.id == ingredient.id)

        if (row) {
            row.quantity += quantity
        } else {
            state.push({ingredient: ingredient, quantity: quantity})
        }

        setData(state)
    }

    const handleDeleteRow = (index) => {
        return () => {
            let state = [...data]
            state.splice(index, 1)

            setData(state)
        }
    }

    const handleIngredient = (event, option) => {
        setIngredient(option)
    }

    const handleQuantity = (event) => {
        setQuantity(parseInt(event.target.value))
    }

    const queryIngredients = async (filter = '') => {
        const res = await fetch(`/api/manage/inventory/search?filter=${ filter }`, { method: "GET" })
        const json = await res.json()

        return json.rows
    }  

    return (
        <Table>

            <TableHead>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                {data.map((row, index) => (
                    <TableRow key={ index }>
                        <TableCell>{ row.ingredient.name }</TableCell>
                        <TableCell>{ row.quantity }</TableCell>
                        <TableCell>
                            <IconButton variant="contained" color="secondary" onClick={() => handleDeleteRow(index)}>
                                <ClearIcon/>
                            </IconButton>
                        </TableCell>
                    </TableRow>
                ))}

                <TableRow>
                    <TableCell>
                        <AutocompleteWithQuery
                            onChange={ handleIngredient }
                            renderInput={(params) => (
                                <TextField {...params} label="Name" variant="outlined" />
                            )}
                            query={ queryIngredients }
                        />
                    </TableCell>

                    <TableCell>
                        <TextField
                            sx={{width: 150}}
                            label="Quantity"
                            defaultValue={1}
                            inputProps={{
                                min: 1,
                            }}
                            type="number"
                            onChange={ handleQuantity }
                            variant="outlined"
                        />
                    </TableCell>

                    <TableCell>
                        {(ingredient && quantity > 0) &&
                            <IconButton variant="contained" color="primary" onClick={handleAddRow}>
                                <AddIcon/>
                            </IconButton>
                        }
                    </TableCell>

                </TableRow>

            </TableBody>
        </Table>
    );
};

export default IngredientTable