import React, { FC } from "react";
import { Link } from "react-router-dom";
import { Position, TopRightText, TopRightText1 } from "../pages/AuthFlow/AuthStyles";

interface Props {
    title: string;
    title1: string;
    to:string


    onClick: () => void;
    style?: any;
}


const BottomLink: FC<Props> = (props) => {
    return (
<div style={{textAlign:'center',margin:'auto',marginTop:'10%'}}>
            <TopRightText>{props.title}</TopRightText>
            <Link to={props.to} onClick={props.onClick}>
            <TopRightText1 >{props.title1}</TopRightText1>
            </Link>
        </div>
    )
}
export default BottomLink
