import React from "react";
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from "@mui/material";

const IngredientDialog = ({ mode, title, layout } ) => {
    const [open, setOpen] = useState(false)
    const [state, setState] = React.useState({})
    
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const handleSubmit = async () => {
        // const data = {
        //     name: 'Ingredient Name',
        //     description: 'Ingredient Description',
        //     threshold: 10,
        //     quantity: 20,
        // };
          
        // const res = await fetch('/api/ingredients', {
        //     method: 'POST',
        //     headers: {
        //       'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(data)
        // });
        submit()
        setOpen(false)
    };

    return (
        <Dialog open={ open } onClose={handleClose}>
            <DialogTitle>{ title }</DialogTitle>

            <DialogContent>
                {layout.map((field) => (
                    <TextField 
                        margin="dense"
                        fullWidth
                        label={ field.name } 
                        type={ field.type } 
                        value={ field.value } 
                        onChange={(e) => setName(e.target.value)}
                    />
                ))}
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Create</Button>
            </DialogActions>
        </Dialog>
    )
}

export default IngredientDialog;
