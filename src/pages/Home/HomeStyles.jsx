import styled from "styled-components";

export const BackgroundChecked1 = styled.div`
background: #C9F6EF;
border-radius: 10px;
padding: 8%;
margin-top: 8%;
width: 150%;
margin-left: -2%;
cursor: pointer;
@media (max-width: 750px) {
  width: 140%;
  padding: 4%;
  margin: auto;
  margin-left: -35%;



  }



`;
export const TextChecked = styled.div`
font-style: normal;
font-weight: 500;
font-size: 12px;
color: #000000;

`;
export const Container = styled.div`
  display: flex;
  background-color: #fff; 
  border-bottom: 0px;
  margin-top: 3%;
`;
export const SubContainer = styled.div`
 width: 90%;
 margin: auto;
 margin-bottom: 2% !important;
 
`;
export const PositionHome = styled.div`


display: flex;
flex-direction: row;
justify-content: space-between;
@media (max-width: 950px) {
    display: flex;
flex-direction: column;

  }
`;
export const LeftWidth = styled.div`
 width: 73%;
 @media (max-width: 950px) {
    width: 100%;
    margin: auto;

  }
`;
export const RightWidth = styled.div`
 width: 25%;
 background-color: #fff;
 box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
 @media (max-width: 950px) {
    width: 100%;
    margin: auto;
    margin-top: 4% !important;

  }
`;

export const LeftLabel = styled.p`
font-size: 18px;
font-weight: 600;
color: black;
text-align: left;
`

export const PosCate = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`
export const TopProvidersPos = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
export const TopProvidersPosInn = styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;
    margin: auto;
    margin-top: 2% !important;
`
export const PosCateInn = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 85%;
`
export const BackCat = styled.div`
    width: 30%;
    border-radius: 8px;
    justify-content: center;
    align-items: center;
    display: flex;
    padding: 5px;
    cursor:pointer;
`
export const BackRecom = styled.div`
    width: 30%;
    border-radius: 8px;
    justify-content: center;
    align-items: center;
    display: flex;
    padding: 5px;
    cursor: pointer;
    @media (max-width: 950px) {
    width: 47%;
  }
`
export const BackCatTop = styled.div`
    width: 100%;
    border-radius: 8px;
    justify-content: center;
    align-items: center;
    display: flex;
    margin-bottom: 2%;
    /* padding: 5px; */
`
export const Catimage = styled.img`
    width: 60%;
    height: 60%;
    /* resize: inherit; */
`
export const BackReImage = styled.div`
    width: 40%;
    height: 30%;
    border: 1px solid #000;
    margin: auto;
    justify-content: center;
    align-items: center;
    display: flex;
    margin-top: 4%;
`
export const BackReImageTop = styled.div`
    /* width: 20%;
    height: 10%; */
    border: 1px solid #000;
    margin: auto;
    justify-content: center;
    align-items: center;
    display: flex;
`
export const UserImage = styled.img`
    width: 100%;
    height: 100%;
`
export const UserImageTop = styled.img`
    width: 70px;
    height: 70px;
`
export const NameRe = styled.p`
    font-size: 14px;
    color: black;
    font-weight: 400;
    text-align: center;
    margin-top: 2%;
`
export const NameReTop = styled.p`
    font-size: 16px;
    color: black;
    font-weight: 600;
    text-align: center;
   margin-bottom: 3%;
`
export const Rating = styled.p`
    font-size: 14px;
    color: black;
    font-weight: 700;
    align-self: center;
    margin-left: 2%;
    margin-top: 3%;
`
export const RatingJobs = styled.p`
    font-size: 16px;
    color: black;
    font-weight: 700;
    align-self: center;
    margin-left: 0.5%;
    margin-top: 0.1%;
    
`
export const CategoryRe = styled.p`
font-size: 14px;
color: #9E9E9E;
font-weight: 500;
margin-top: 1%;
@media (max-width: 450px) {
    font-size: 13px;
    align-self: center;
    margin-top: 1%;
  }
    
`