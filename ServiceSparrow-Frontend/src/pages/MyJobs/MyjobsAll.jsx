import React, { useEffect, useState } from "react";
import { BackJobs, DescJob, HeadingJob, PositionJob, PriceJob, PostedBy, RightCategory, MyjobsContainer } from "../CategoryDetail/CetegoryDetailStyles";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { Button, useMediaQuery } from "@material-ui/core";
import { Skeleton, Typography } from "@mui/material";
import { CompleteJob, GetJobs } from "../../api";
import Chip from '@mui/material/Chip';
import ReviewModal from "../../components/ReviewModal";
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { MenuItem } from "@material-ui/core";
import { RatingJobs } from "../Home/HomeStyles";
import StarIcon from "@mui/icons-material/Star";


const Status = [
    {
        id: 1,
        label: 'My Jobs',
        value: 'OWN'

    },
    {
        id: 2,
        label: 'My Work Diary',
        value: 'My Work Diary'
    }
]
const Data = [
    {
        id: 1,
        name: 'Autowäsche',
        desc: 'afjakfdjaofjw',
        price: '125',
        status: 'Completed',
        postedBy: 'XYZ'
    },
    {
        id: 2,
        name: 'Autowäsche',
        desc: 'afjakfdjaofjw',
        price: '125',
        status: 'In Progress',
        postedBy: 'XYZ'
    },
    {
        id: 3,
        name: 'Autowäsche',
        desc: 'afjakfdjaofjw',
        price: '125',
        status: 'Posted',
        postedBy: 'XYZ'
    },
]

const MyjobsAll = () => {
    const [open, setOpen] = React.useState(false);

    const [status, setStatus] = useState('OWN')
    const handleChange = (event) => {
        console.log(event,"filt")
        setStatus(event);
        filterData(event)
    };
    const isMobile = useMediaQuery('(min-width: 450px)');
    const [load, setLoad] = useState(false)
    const [jobs, setjobs] = useState([])
    const [jobsF, setjobsF] = useState([])
    const [jobsWork, setjobsWork] = useState([])
    const [jobId, setJobId] = useState("")
    const filteredData = status ? Data.filter(job => job.status === status) : Data;
    const userId = localStorage.getItem('userId');
    const filterData = (type) => {
        if (type == "OWN") {
            setjobsF(jobs)
        }
        else {
            setjobsF(jobsWork)
        }
        console.log(jobsWork , jobs, jobsF,"filtd")

    }
    useEffect(() => {
        setLoad(true)
        GetJobs()
            .then((e) => {
                setLoad(false)
                const filteredJobs = e.data.filter(data => data.userId !== null && data.userId._id === userId);
                const filteredJobsF = e.data.filter(data => data.jobHolder !== null && data.jobHolder._id == userId);
                setjobsWork(filteredJobsF)
                setjobs(filteredJobs);
                // handleChange("OWN")
                setjobsF(e.data.filter(data => data.userId !== null && data.userId._id === userId))
                
               

            })

    }, []);
    const [displayCount, setDisplayCount] = useState(5);


    const handleShowMore = () => {
        setDisplayCount(prevCount => prevCount + 5);
    };

    const handleAcceptClick = (jobId) => {
        setJobId(jobId);
        setOpen(true);
    };
    return (
        <MyjobsContainer>
            {load === true ?
                <div style={{ padding: '10px' }}>
                    <Skeleton variant="rectangular" width={'100%'} height={60} animation="wave" sx={{ marginTop: '3%' }} />
                    <Skeleton variant="rectangular" width={'100%'} height={60} animation="wave" sx={{ marginTop: '3%' }} />
                    <Skeleton variant="rectangular" width={'100%'} height={60} animation="wave" sx={{ marginTop: '3%' }} />
                    <Skeleton variant="rectangular" width={'100%'} height={60} animation="wave" sx={{ marginTop: '3%' }} />


                </div> :
                <>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2%', marginRight: '3%' }}>
                        {/* Filter Select Component */}
                        <FormControl style={{ borderRadius: 20, width: isMobile ? '25%' : '40%', textAlign: 'left' }}>
                            <Select
                                size="small"
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                label=""
                                variant="outlined"
                                displayEmpty

                                renderValue={(value) => (value !== '' ? value : <Typography style={{ opacity: 1, color: '#000', fontSize: '14px' }}>{'Select Jobs'}</Typography>)}
                                value={status}
                                onChange={(e)=>handleChange(e.target.value)}
                            >
                                {Status.map((data) => {
                                    return (
                                        <MenuItem key={data.id} value={data.value}>
                                            {data.label}
                                        </MenuItem>
                                    )
                                }

                                )}
                            </Select>
                        </FormControl>
                    </div>
                    {status === '' ? <p style={{ color: '#000', fontSize: 18, marginTop: '5%' }}>Please Select Jobs</p> : jobsF.length === 0 ? <p style={{ color: 'red', fontSize: 18, marginTop: '5%' }}>No Jobs Found</p> :
                        jobsF.slice(0, displayCount).map((data) => {
                            return (
                                <BackJobs key={data.id}>
                                    <HeadingJob>{data.title}</HeadingJob>
                                    <DescJob>{data.desc}</DescJob>
                                    <PositionJob>
                                        <PriceJob><MonetizationOnIcon />{data.price}</PriceJob>
                                        <PostedBy>Posted By: {data.userId && `${data.userId.first_name} ${data.userId.last_name}`}</PostedBy>
                                        {data.status !== "OPEN" && <PostedBy>Freelancer: {data.jobHolder && `${data.jobHolder.first_name} ${data.jobHolder.last_name}`}</PostedBy>}
                                    </PositionJob>
                                    {data.status === 'COMPLETED' ?
                                        <Chip label="Completed" color="success" style={{ width: isMobile ? '20%' : '40%' }} />
                                        :
                                        data.status === 'ACCEPTED' ?
                                            <Chip label="In Progress" color="primary" style={{ width: isMobile ? '20%' : '40%' }} />
                                            :
                                            data.status === 'OPEN' ?

                                                <Chip label="open" color="secondary" style={{ width: isMobile ? '20%' : '40%' }} />
                                                :
                                                <></>
                                    }
                                    {status !== "OWN" && data.status !== "COMPLETED" &&
                                        <Button style={{ backgroundColor: '#AA222B', color: '#fff', width: isMobile ? '20%' : '40%', borderRadius: 20, marginLeft: '4%', textTransform: 'none' }} onClick={() => {
                                            CompleteJob(data._id)
                                            alert("Job Completed")
                                            window.location.reload()

                                        }}>Complete Job</Button>}
                                    {data.review && data.review.JobOwnerRating.length > 0 && data.review && data.review.JobOwnerComment.length > 0 ?
                                        <></>
                                        :
                                        data.status == "COMPLETED" && status == "OWN" && <Button style={{ backgroundColor: '#AA222B', color: '#fff', width: isMobile ? '20%' : '40%', borderRadius: 20, marginLeft: '4%', textTransform: 'none' }} onClick={() => {
                                            handleAcceptClick(data._id)
                                        }}>Post A Review</Button>
                                    }
                                    {data.review && data.review.JobDoerRating.length > 0 && data.review && data.review.JobDoerComment.length > 0 ?
                                        <></>
                                        :
                                        status != "OWN" && data.status === 'COMPLETED' &&
                                        <Button size="small" style={{ backgroundColor: '#AA222B', color: '#fff', width: isMobile ? '20%' : '40%', borderRadius: 20, marginLeft: '4%', textTransform: 'none' }} onClick={() => handleAcceptClick(data._id)}>Give Review</Button>

                                    }
                                    {/* {data.status === 'REVIEWED' &&
                                        <Button size="small" style={{ backgroundColor: '#AA222B', color: '#fff', width: isMobile ? '20%' : '40%', borderRadius: 20, marginLeft: '4%', textTransform: 'none' }} >View Rating</Button>

                                    } */}
                                    {status === "OWN" ?
                                        data.status === 'COMPLETED' &&
                                        <>
                                            <div style={{ display: 'flex', flexDirection: 'row', textAlign: 'left' }}>
                                                <RatingJobs>MyReview:</RatingJobs>
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        marginLeft: '1%'
                                                    }}
                                                >
                                                    {data.review.JobOwnerRating.length == 0 ? <></>
                                                        :
                                                        <StarIcon style={{ color: "#F1B538" }} />
                                                    }
                                                    <RatingJobs>{data.review && data.review.JobOwnerRating}</RatingJobs>
                                                </div>
                                                {data.review.JobOwnerComment.length == 0 ?
                                                    <></>
                                                    :
                                                    <DescJob style={{ marginLeft: '1%', marginTop: '0.2%' }}>Review: {data.review && data.review.JobOwnerComment}</DescJob>
                                                }
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'row', textAlign: 'left' }}>
                                            <RatingJobs>OtherReview:</RatingJobs>

                                                <div
                                                    style={{
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        marginLeft: '1%'

                                                    }}
                                                >
                                                    {data.review.JobDoerRating.length == 0 ? <></>
                                                        :
                                                        <StarIcon style={{ color: "#F1B538" }} />
                                                    }
                                                    <RatingJobs>{data.review && data.review.JobDoerRating}</RatingJobs>
                                                </div>
                                                {data.review.JobDoerComment.length == 0 ?
                                                    <></>
                                                    :
                                                    <DescJob style={{ marginLeft: '1%', marginTop: '0.2%' }}>Review:{data.review && data.review.JobDoerComment}</DescJob>
                                                }
                                            </div>
                                        </>
                                        :
                                        data.status === 'COMPLETED' &&
                                        <>
                                            <div style={{ display: 'flex', flexDirection: 'row', textAlign: 'left' }}>
                                                <RatingJobs>MyReview:</RatingJobs>
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        marginLeft: '1%'
                                                    }}
                                                >
                                                    {data.review.JobDoerRating.length == 0 ? <></>
                                                        :
                                                        <StarIcon style={{ color: "#F1B538" }} />
                                                    }
                                                    <RatingJobs>{data.review && data.review.JobDoerRating}</RatingJobs>
                                                </div>
                                                {data.review.JobDoerComment.length == 0 ?
                                                    <></>
                                                    :
                                                    <DescJob style={{ marginLeft: '1%', marginTop: '0.2%' }}>Review: {data.review && data.review.JobDoerComment}</DescJob>
                                                }
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'row', textAlign: 'left' }}>
                                            <RatingJobs>OtherReview:</RatingJobs>

                                                <div
                                                    style={{
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        marginLeft: '1%'

                                                    }}
                                                >
                                                    {data.review.JobOwnerRating.length == 0 ? <></>
                                                        :
                                                        <StarIcon style={{ color: "#F1B538" }} />
                                                    }
                                                    <RatingJobs>{data.review && data.review.JobOwnerRating}</RatingJobs>
                                                </div>
                                                {data.review.JobOwnerComment.length == 0 ?
                                                    <></>
                                                    :
                                                    <DescJob style={{ marginLeft: '1%', marginTop: '0.2%' }}>Review:{data.review && data.review.JobOwnerComment}</DescJob>
                                                }
                                            </div>
                                        </>

                                    }




                                </BackJobs>
                            )

                        })}
                </>
            }
            {status === '' ?
                <></>
                :
                jobs.length > 5 && displayCount < jobs.length && (
                    <Button onClick={handleShowMore} variant="outlined" style={{ backgroundColor: '#AA222B', color: '#fff', width: '40%', borderRadius: 20, marginBottom: isMobile ? '2%' : '4%', marginTop: isMobile ? '2%' : '4%' }}>Show More</Button>
                )
            }
            <ReviewModal jobId={jobId} own={status} open={open} onClose={() => setOpen(false)} />
        </MyjobsContainer>
    )
}
export default MyjobsAll;