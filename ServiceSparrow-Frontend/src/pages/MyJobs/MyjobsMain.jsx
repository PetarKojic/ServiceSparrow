import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import MyjobsAll from "./MyjobsAll";

const MyJobsMain = () => {
    return (
        <div>
            <Header show={"false"}/>
            <MyjobsAll/>
            <Footer />
        </div>
    )
}
export default MyJobsMain