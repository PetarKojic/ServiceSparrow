import React, { useEffect, useState } from "react";
import { BackJobs, DescJob, HeadingJob, PositionJob, PriceJob, PostedBy } from "../CetegoryDetailStyles";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { useMediaQuery } from "@material-ui/core";
import { AcceptJob, GetJobs } from "../../../api";
import { Button, Skeleton, Typography } from "@mui/material";
import Loadercom from "../../../components/Loadercom";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { notifyError, notifySuccess } from "../../../components/Toastifycom";


const Alljobs = ({ detailData }) => {
    const [open, setOpen] = useState(false)
    console.log(detailData.name, "catnem")
    const isMobile = useMediaQuery('(min-width: 450px)');
    const [load, setLoad] = useState(false)
    const [jobs, setjobs] = useState([])
    const userId = localStorage.getItem('userId');
    const [jobid, setJobid] = useState('')

    useEffect(() => {
        setLoad(true)
        GetJobs()
            .then((e) => {
                setLoad(false)
                const filteredJobs = e.data.filter(data => detailData.name === data.category && data.jobHolder === null && data.userId !== null && data.userId._id !== userId);
                setjobs(filteredJobs);

            })

    }, [detailData.name]);
    const [displayCount, setDisplayCount] = useState(5);

    const handleShowMore = () => {
        setDisplayCount(prevCount => prevCount + 5);
    };
    const handleAcceptClick = (jobId) => {
        setJobid(jobId);
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false)
    }
    const handleSubmit = () => {
        setLoad(true);
    
        AcceptJob(userId, jobid)
            .then((e) => {
                setLoad(false);
                console.log(e);
    
                if (e.status === false) {
                    handleClose();
                    setTimeout(() => {
                        notifyError(e.message);
                    }, 1000); 
                } else {
                    handleClose();
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
        <div>
            {load === true ?
                <div style={{ padding: '10px' }}>
                    <Skeleton variant="rectangular" width={'100%'} height={60} animation="wave" sx={{ marginTop: '3%' }} />
                    <Skeleton variant="rectangular" width={'100%'} height={60} animation="wave" sx={{ marginTop: '3%' }} />
                    <Skeleton variant="rectangular" width={'100%'} height={60} animation="wave" sx={{ marginTop: '3%' }} />
                    <Skeleton variant="rectangular" width={'100%'} height={60} animation="wave" sx={{ marginTop: '3%' }} />


                </div> :
                jobs.length === 0 ? <p style={{ color: 'red', fontSize: 18, marginTop: '5%' }}>No Jobs Found</p> :
                    jobs.slice(0, displayCount).map((data) => {
                        return (
                            <>
                                    <BackJobs key={data.id}>
                                        <HeadingJob>{data.title}</HeadingJob>
                                        <DescJob>{data.desc}</DescJob>
                                        <PositionJob>
                                            <PriceJob><MonetizationOnIcon />{data.price}</PriceJob>
                                            <PostedBy>Posted By: {data.userId && `${data.userId.first_name} ${data.userId.last_name}`}</PostedBy>
                                        </PositionJob>
                                        <Button style={{ backgroundColor: '#4CAF50', color: '#fff', width: isMobile ? '20%' : '40%', borderRadius: 20, marginBottom: isMobile ? '2%' : '4%', marginTop: isMobile ? '2%' : '4%', marginLeft: "50%" }}
                                            onClick={() => handleAcceptClick(data._id)}>Accept</Button>
                                    </BackJobs>
                                
                            </>
                        )
                    })}
            {jobs.length > 5 && displayCount < jobs.length && (
                <Button onClick={handleShowMore} variant="outlined" style={{ backgroundColor: '#AA222B', color: '#fff', width: '40%', borderRadius: 20, marginBottom: isMobile ? '2%' : '4%', marginTop: isMobile ? '2%' : '4%' }}>Show More</Button>
            )}
            <Dialog
                onClose={() => setOpen(false)}
                aria-labelledby="customized-dialog-title"
                open={open}
                fullWidth

            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Accept Job
                </DialogTitle>
                <DialogContent dividers sx={{ width: '100%', margin: 'auto' }}>
                    <Typography component="legend">Are you Sure you want to Accept this Job!</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>
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
export default Alljobs;