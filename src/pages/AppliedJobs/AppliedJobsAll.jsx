import React, { useEffect, useState } from "react";
import { BackJobs, DescJob, HeadingJob, PositionJob, PriceJob, PostedBy } from "../CategoryDetail/CetegoryDetailStyles";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { Button, useMediaQuery } from "@material-ui/core";
import { Skeleton, Typography } from "@mui/material";
import { GetJobs } from "../../api";
import Chip from '@mui/material/Chip';
import ReviewModal from "../../components/ReviewModal";
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { MenuItem } from "@material-ui/core";
import { PositionBetween } from "../AuthFlow/AuthStyles";
import { Rating, RatingJobs } from "../Home/HomeStyles";
import StarIcon from "@mui/icons-material/Star";


const Status = [
    {
        id: 1,
        label: 'In Progress',
        value: 'ACCEPTED'

    },
    {
        id: 2,
        label: 'Completed',
        value: 'COMPLETED'
    },
    {
        id: 3,
        label: 'ALL',
        value: ''
    },

]

const AppliedjobsAll = ({ detailData }) => {
    const [open, setOpen] = React.useState(false);
     let StatusRating = ""
    const [status, setStatus] = useState('')
    const handleChange = (event) => {
        setStatus(event.target.value);
    };
    console.log(detailData.name, "catnem")
    const isMobile = useMediaQuery('(min-width: 450px)');
    const [load, setLoad] = useState(false)
    const [jobs, setjobs] = useState([])
    const filteredData = status ? jobs.filter(job => job.status === status) : jobs;
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        setLoad(true)
        GetJobs()
            .then((e) => {
                setLoad(false)
                const filteredJobs = e.data.filter(data => data.userId !== null && (data.userId._id === detailData._id || (data.jobHolder !== null && data.jobHolder._id == detailData._id)));
                setjobs(filteredJobs);

            })

    }, [detailData.name]);
    const [displayCount, setDisplayCount] = useState(5);

    const handleShowMore = () => {
        setDisplayCount(prevCount => prevCount + 5);
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

                                renderValue={(value) => (value !== '' ? value : <Typography style={{ opacity: 1, color: '#000', fontSize: '14px' }}>{'Filter Status'}</Typography>)}
                                value={status}
                                onChange={handleChange}
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
                    {filteredData.length === 0 ? <p style={{ color: 'red', fontSize: 18, marginTop: '5%' }}>No Jobs Found</p> :
                        filteredData.slice(0, displayCount).map((data) => {
                            StatusRating = (detailData._id == data.userId._id ? "OWN" :"")
                            return (
                                <BackJobs key={data.id}>
                                    <PositionBetween>

                                        <HeadingJob>{data.title}</HeadingJob>
                                        {data.status === 'COMPLETED' ?
                                            <Chip label="Completed" color="success" style={{ width: isMobile ? '20%' : '40%' }} />
                                            :
                                            data.status === 'ACCEPTED' ?
                                                <Chip label="In Progress" color="primary" style={{ width: isMobile ? '20%' : '40%' }} />
                                                :
                                                <Chip label="Posted" color="secondary" style={{ width: isMobile ? '20%' : '40%' }} />
                                        }
                                    </PositionBetween>
                                    <DescJob>{data.desc}</DescJob>
                                    <PositionJob>
                                        <PriceJob><MonetizationOnIcon />{data.price}</PriceJob>
                                        <PostedBy>Posted By: {data.userId && `${data.userId.first_name} ${data.userId.last_name}`}</PostedBy>
                                    </PositionJob>

                                    {/* {
                                    
                                    data.status === 'COMPLETED' &&
                                        <>
                                            <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        flexDirection: "row",
                                                    }}
                                                >
                                                    <StarIcon style={{ color: "#F1B538" }} />
                                                    <RatingJobs>{detailData._id == data.userId._id ?  data.review && data.review.JobOwnerRating : data.review && data.review.JobDoerRating }</RatingJobs>
                                                </div>
                                                
                                                <DescJob>MyReview: {detailData._id == data.userId._id ?  data.review && data.review.JobOwnerComment : data.review && data.review.JobDoerComment}</DescJob>
                                            

                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        flexDirection: "row",
                                                    }}
                                                >
                                                    <StarIcon style={{ color: "#F1B538" }} />
                                                    <RatingJobs>{data.review && data.review.JobOwnerRating}</RatingJobs>
                                                </div>
                                                <DescJob>Other: {detailData._id == data.jobHolder._id ?  data.review && data.review.JobOwnerComment : data.review && data.review.JobDoerComment}</DescJob>
                                            </div>
                                        </>
                                    } */}
                                     {StatusRating === "OWN" ?
                                        data.status === 'COMPLETED' &&
                                        <>
                                            <div style={{ display: 'flex', flexDirection: 'row', textAlign: 'left' }}>
                                                <RatingJobs>Customer Review:</RatingJobs>
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
                                                <RatingJobs>Customer Review:</RatingJobs>
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
            {filteredData.length > 5 && displayCount < filteredData.length && (
                <Button onClick={handleShowMore} variant="outlined" style={{ backgroundColor: '#AA222B', color: '#fff', width: '40%', borderRadius: 20, marginBottom: isMobile ? '2%' : '4%', marginTop: isMobile ? '2%' : '4%' }}>Show More</Button>
            )}
            <ReviewModal open={open} onClose={() => setOpen(false)} />
        </div>
    )
}
export default AppliedjobsAll;