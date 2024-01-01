import styled from "styled-components";

export const LeftCategory = styled.div`
  width: 25%;
 background-color: #fff;
 border-radius: 8px;
 box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
 height:15%;
 @media (max-width: 950px) {
    width: 100%;
    margin: auto;
    margin-top: 4% !important;

  }
`;
export const RightCategory = styled.div`
width: 73%;
border: 0.5px solid grey;
 @media (max-width: 950px) {
    width: 100%;
    margin-top:4%;

  }

`;
export const MyjobsContainer = styled.div`
width: 80%;
margin: auto;
margin-top: 3%;
border: 0.5px solid grey;
 @media (max-width: 950px) {
    width: 95%;
    margin-top:4%;
    

  }

`;
export const BackJobs = styled.div`
  width: 95%;
 background-color: #fff;
 box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
 padding: 2%;
 margin: auto;
 margin-bottom:2%;
 margin-top:2%;
 @media (max-width: 950px) {
    width: 95%;
    margin: auto;
    padding: 2%;
 margin: auto;
 margin-bottom:2%;
 margin-top:2%;
  }
`;
export const BackCatDetail = styled.div`
    width: 100%;
    border-radius: 8px;
    justify-content: center;
    align-items: center;
    display: flex;
    padding: 5px;
`
export const CatimageDetail = styled.img`
    width: 50%;
    height: 50%;
    margin:auto;
    /* resize: inherit; */
`
export const CategoryName = styled.p`
   font-size:18px;
   font-weight:600;
   text-align:center;
   font-weight:poppins;
   margin:auto;
`
export const HeadingJob = styled.p`
   font-size:24px;
   font-weight:600;
   font-weight:poppins;
   text-align:left;
   color:#000;
`
export const DescJob = styled.p`
   font-size:15px;
   font-weight:500;
   font-weight:poppins;
   text-align:left;
   color:grey;
`
export const PriceJob = styled.p`
   font-size:18px;
   font-weight:600;
   font-weight:poppins;
   color:#AA222B;
`
export const PostedBy = styled.p`
   font-size:18px;
   font-weight:600;
   font-weight:poppins;
   color:#000000;
`
export const PositionJob =  styled.div`
display:flex;
flex-direction:row;
justify-content:space-between;
width:70%;
@media (max-width: 950px) {
  width: 90%;
}
`

