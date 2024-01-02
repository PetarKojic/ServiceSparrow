import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import CategoryPage from "./components/CategoryPage";
import { useLocation } from "react-router-dom";

const CategoryDetail = () => {
    const location = useLocation();
    const detailData = location.state && location.state.detailData;
    console.log(detailData,"detaildata")
    return (
        <div>
            <Header show={"false"}/>
            <CategoryPage detailData={detailData}/>
            <Footer />
        </div>
    )
}
export default CategoryDetail