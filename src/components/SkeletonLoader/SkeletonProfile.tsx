import { Skeleton } from "@mui/material";
import React, { FC } from "react";


const SkeletonProfile :FC =() => {
    return(
        <div style={{padding:'10px'}}>
        <Skeleton variant="rectangular" width={'100%'} height={60} animation="wave" sx={{marginTop:'3%'}}/>

    </div>
    )
}
export default SkeletonProfile;