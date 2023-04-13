import * as React from 'react';

import { Table, TableBody, TableCell, TableHead, TableRow, TextField, IconButton, Autocomplete } from '@mui/material';
import { Clear as ClearIcon, Add as AddIcon } from '@mui/icons-material';

import AutocompleteWithQuery from 'src/AutocompleteWithQuery';

const initialRows = [{ id: 1, name: '', quantity: '' }];

const IngredientTable = ({ initial }) => {
    const [data, setData] = React.useState([])
    const [name, setName] = React.useState("")
    const [quantity, setQuantity] = React.useState(1)

    const formatData = (info) => {
        let dict = {}

        info.forEach((row) => {
            dict[row.id] = (dict[row.id] || 0) + row.quantity
        })

        return dict
    }

    const handleAddRow = () => {

    }

    const handleDeleteRow = (id) => {
        return () => {
            let target = 0

            info.forEach((row, index) => {
                if (row.id == id) {
                    target = index
                }
            }
        }
    }

    const handleNameChange = (id, newName) => {

    }

    const handleQuantityChange = (id, newQuantity) => {

    }

    const queryIngredients = async (filter) => {
        const res = await fetch(`/api/manage/ingredients/search?filter=${ filter }`, { method: "GET" })
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
                        <TableCell>{ row.name }</TableCell>
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
                            optionChanged={(event, option) =>
                                handleIngredientChange(row.id, newValue)
                            }
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
                            type="number"
                            onChange={(event) =>
                                handleQuantityChange(row.id, event.target.value)
                            }
                            variant="outlined"
                        />
                    </TableCell>

                    <TableCell>
                        <IconButton variant="contained" color="primary" onClick={handleAddRow}>
                            <AddIcon/>
                        </IconButton>
                    </TableCell>

                </TableRow>

            </TableBody>
        </Table>
    );
};

export default IngredientTable