import React, { useState } from "react";
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from "@mui/material";

const IngredientDialog = (props) => {
    const [open, setOpen] = useState(false)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [threshold, setThreshold] = useState("")
    const [quantity, setQuantity] = useState("")
    const [enabled, setEnabled] = useState(false)
    const [file, setFile] = useState(null)

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleRemoveFile = () => {
        setFile(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div>
            <Button variant="contained" onClick={handleOpen}>Open Dialog</Button>
            <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add Item</DialogTitle>
            <DialogContent>
                <DialogContentText>
                Please enter the following details for the new item:
                </DialogContentText>
                <form onSubmit={handleSubmit}>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Name"
                    type="text"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Description"
                    type="text"
                    fullWidth
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Threshold"
                    type="number"
                    fullWidth
                    value={threshold}
                    onChange={(e) => setThreshold(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Quantity"
                    type="number"
                    fullWidth
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
                <Checkbox
                    checked={enabled}
                    onChange={(e) => setEnabled(e.target.checked)}
                    inputProps={{ "aria-label": "Enable item" }}
                />
                <Typography variant="subtitle1">Enabled</Typography>
                <input
                    accept="image/*"
                    id="contained-button-file"
                    type="file"
                    onChange={handleFileChange}
                />
                <label htmlFor="contained-button-file">
                    <Button variant="contained" component="span">
                    Upload
                    </Button>
                </label>
                {file && (
                    <>
                    <Typography variant="subtitle1">{file.name}</Typography>
                    <Button variant="contained" onClick={handleRemoveFile}>
                        Remove
                    </Button>
                    </>
                )}
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Add</Button>
            </DialogActions>
            </Dialog>
        </div>
    );
};

export default IngredientDialog;
