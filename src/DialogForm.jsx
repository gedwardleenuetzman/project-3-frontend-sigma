import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";

/**
 * 
 * @param {*} children, open, title, layout, actions, onAction, onClode, initial
 * @returns 
 */
const IngredientDialog = ({ children, open, title, layout, actions, onAction, onClose, initial }) => {
    const [form, setForm] = React.useState({})

    React.useEffect(() => {
        setForm({
            ...initial
        })
    }, [initial])

    const handleAction = (action) => {
        return () => {
            onAction(action, form)
        }
    }
    
    const handleChange = (field) => {
        return (event) => {
            setForm((prev) => {
                return { ...prev, [field.name]: event.target.value }
            })
        }
    }   

    return (
        <Dialog open={ open } onClose={ onClose }>
            <DialogTitle>{ title }</DialogTitle>

            <DialogContent>
                {layout && layout.map( (field, index) => 
                    <TextField
                        key={index}
                        margin="dense"
                        fullWidth
                        label={ field.name } 
                        type={ field.type } 
                        value={ form[field.name] }
                        onChange={ handleChange(field) }
                    />
                )}
                { children }
            </DialogContent>

            <DialogActions>
                {actions && actions.map((name, index) =>
                    <Button variant="contained" key={index} onClick={ handleAction(name) }>{ name }</Button>
                )}
            </DialogActions>
        </Dialog>
    )
}

export default IngredientDialog;
