import React from "react";
import { BackCatDetail, CategoryName, CatimageDetail, LeftCategory, RightCategory } from "../CetegoryDetailStyles";
import {Container, PositionHome, SubContainer } from "../../Home/HomeStyles";
import Alljobs from "./AllJobs";


const CategoryPage = ({detailData}) => {
    return (
        <Container>
            <SubContainer>
                <PositionHome>
                    <LeftCategory>
                        <BackCatDetail style={{ backgroundColor: detailData.color }}>
                            <div style={{display:'flex',flexDirection:'column'}}>
                            <CatimageDetail src={detailData.image} />
                            <CategoryName>{detailData.name}</CategoryName>
                            </div>

                        </BackCatDetail>
                    </LeftCategory>
                    <RightCategory>
                        <Alljobs detailData={detailData}/>
                    </RightCategory>
                </PositionHome>
            </SubContainer>
        </Container>
    )
}
export default CategoryPage;