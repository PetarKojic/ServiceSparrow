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
import { AcceptJob, GetJobs } from '../api';
import { notifyError, notifySuccess } from './Toastifycom';



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
export default function HireMe({ open, onClose,Userdata }) {
    const [rating, setRating] = React.useState('');
    const handleChange = (event) => {
        setRating(event.target.value);
    };
    console.log(rating,"rating")
    const [load,setLoad]=React.useState(false)
    const [jobs, setJobs] = React.useState([])
    const userId = localStorage.getItem('userId');

    React.useEffect(() => {
        GetJobs()
            .then((e) => {
                const filteredJobs = e.data.filter(data => data.userId !== null && data.userId._id === userId && data.status == 'OPEN');
                setJobs(filteredJobs);
            })

    }, []);
    const handleSubmit = () => {
        setLoad(true);
    
        AcceptJob(Userdata._id,rating)
            .then((e) => {
                setLoad(false);
                console.log(e);
    
                if (e.status === false) {
                    onClose();
                    alert('Something wrong')

                    setTimeout(() => {
                        notifyError(e.message);
                    }, 1000); 
                } else {
                    onClose();
                    alert('Hired Successfully')
                    setTimeout(() => {
                        window.location.reload();
                        notifySuccess(e.message);
                    }, 1000); 
                }
            })
            .catch((err) => {
                setLoad(false);
                notifyError("Network error detected.");
            });
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
                    Select Job
                </DialogTitle>
                <DialogContent dividers sx={{ width: '80%', margin: 'auto' }}>
                    <Typography gutterBottom>
                        Select Job from list
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
                        {jobs.map((data) => {
                            return (
                                <MenuItem value={data._id}>{data.title}</MenuItem>
                            )

                        })}
                    </Select>

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => onClose()}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit}>
                        Hire Me
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}