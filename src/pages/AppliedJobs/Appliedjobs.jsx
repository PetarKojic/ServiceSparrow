import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useLocation } from "react-router-dom";
import JobsPage from "./JobsPage";

const AppliedJobs = () => {
    const location = useLocation();
    const detailData = location.state && location.state.detailData;
    console.log(detailData,"detaildata")
    return (
        <div>
            <Header show={"false"}/>
            <JobsPage detailData={detailData}/>
            <Footer />
        </div>
    )
}
export default AppliedJobs