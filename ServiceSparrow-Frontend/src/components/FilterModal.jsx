import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { MenuItem, Select } from '@material-ui/core';



const Rating = [
    {
        id: 1, name: 'Average (Less than 3)', value: 'Average'
    },

    {
        id: 2, name: 'Good (Less than 4)', value: 'Good'
    },
    {
        id: 3, name: 'Best (4 to 5)', value: 'Best'
    },


]
export default function FilterModal({ open, onClose, onFilterChange }) {
    const [rating, setRating] = React.useState('');
    const handleChange = (event) => {
        setRating(event.target.value);
    };


    return (
        <React.Fragment>
            <Dialog
                onClose={onClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                fullWidth

            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Filter Providers  
                </DialogTitle>    
                <DialogContent dividers sx={{ width: '80%', margin: 'auto' }}>
                    <Typography gutterBottom>              
                        Select Rating to filter Top Providers  
                    </Typography>         
                    <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"     
                        label="Rating"
                        fullWidth   
                        variant='outlined'
                        value={rating}
                        onChange={handleChange}
                    >
                        {Rating.map((data) => {
                            return (
                                <MenuItem value={data.value}>{data.name}</MenuItem>
                            )
                            
                        })}
                    </Select>        
                         
                </DialogContent>
                <DialogActions>
                <Button onClick={() => onClose()}>
                        Cancel
                    </Button>
                    <Button onClick={() => { onFilterChange(rating); onClose(); }}>
                        Save changes
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}