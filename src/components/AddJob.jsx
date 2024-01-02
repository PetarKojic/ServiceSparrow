import React, { useEffect, useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Input from "./Input";
import MultilineInput from "./MultilineInput";
import { FormControl, InputLabel, Select, Button } from "@mui/material";
import { AddJob, GetCategory } from "../api";
import { notifyError, notifySuccess } from "./Toastifycom";
import Loadercom from "./Loadercom";
import { MenuItem } from "@material-ui/core";


const AddJobModal = ({ open, onClose }) => {
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [load, setLoad] = useState(false)
    const [fieldsError, setFieldsError] = useState(false);
    const [descError, setDescError] = useState(false);

    const handleChange = (event) => {
        setCategory(event.target.value);
    };
    const [catData, setCatData] = useState([]);
    console.log(category, "catData")
    useEffect(() => {
        GetCategory()
            .then((e) => {

                setCatData(e.data);

            })
        if (title && desc && price && category) {
            setFieldsError(false);
        }
    }, [title, desc, price, category]);
    const userId = localStorage.getItem('userId');

    const ClearJobs = () => {
        setTitle("")
        setDesc("")
        setPrice("")
        setCategory("")
    }

    const handleSubmit = () => {
        if (!title || !desc || !price || !category) {
            setFieldsError(true);
            return;
        }
        if (desc.length > 600) {
            setDescError(true);
            notifyError("Description should not exceed 600 characters");
            return;
        }


        setLoad(true)
        AddJob(userId, title, desc, price, category).then(e => {
            setLoad(false)
            console.log(e)
            if (e.status == false) {
                notifyError(e.message)
            }

            else {
                onClose()
                ClearJobs()
                notifySuccess(e.message)

            }
        }).catch(err => {
            setLoad(false)
            notifyError("Network error detected.")

        })
    }




    return (
        <div>

            <Dialog
                onClose={onClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                fullWidth

            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Add a Job
                </DialogTitle>
                <DialogContent dividers sx={{ width: '100%', margin: 'auto' }}>
                    <Input value={title} onChange={(e) => setTitle(e.target.value)} label="Title" placeholder="Enter Title" width={'100%'} />
                    <MultilineInput value={desc} onChange={(e) => setDesc(e.target.value)} label="Description" placeholder="Enter Description" width={'100%'} />
                    <Input value={price} onChange={(e) => setPrice(e.target.value)} label="Price" placeholder="Enter Price" width={'100%'} inputMode={"numeric"} />

                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            label="Category"
                            fullWidth
                            variant='outlined'
                            value={category}
                            onChange={handleChange}
                            style={{ borderRadius: 12 }}  // Add some top margin

                        >
                            {catData.map((data) => (
                                <MenuItem key={data.name} value={data.name}>
                                    {data.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {fieldsError && <p style={{ color: 'red', textAlign: 'center', marginTop: '1%' }}>All fields are required!</p>}

                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>
                        Cancel
                    </Button>
                    {
                        load === true ? (
                            <Loadercom />
                        ) : (
                            <Button onClick={handleSubmit}>
                                Save changes
                            </Button>
                        )
                    }
                </DialogActions>

            </Dialog>
        </div>
    )
}
export default AddJobModal;