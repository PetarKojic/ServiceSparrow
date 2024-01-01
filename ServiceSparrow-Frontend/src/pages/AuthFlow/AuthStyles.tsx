import styled from "styled-components";


export const Container = styled.div`
  background-color: #fff;
  flex:1;
  
`;

export const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  width: 40%;
  border-radius: 5px;
  padding: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  @media (max-width: 950px) {
  width: 90%;
  }
`;

export const Position = styled.div`
display: flex;
flex-direction: row;
`;
export const PositionBetween = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
`;
export const PositionCol = styled.div`
display: flex;
flex-direction: column;
flex: 1;
`;

export const Headimage = styled.p`
color: #292929;
font-style: normal;
font-weight: 800;
font-size: 30px;
align-self: flex-start;
text-align: left;

`;
export const ImageContent = styled.div`
margin-left: 6%;
margin-top: 10%;
`;
export const SubImage = styled.p`

font-style: normal;
font-weight: 500;
font-size: 25px;
align-self: flex-start;
text-align: left;

`;

export const TopRightText = styled.p`

font-style: normal;
font-weight: 500;
font-size: 14px;
color: #000000;
display: inline-block;

`;
export const TopRightText1 = styled.p`

font-style: normal;
font-weight: 500;
font-size: 14px;
color: #7476D1;
margin-left: 5px;
display: inline;

`;

export const HeadingTop = styled.p`

font-style: normal;
font-weight: 500;
font-size: 22px;
line-height: 28px;
text-align: left;

`;
export const SubHeading = styled.p`

font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 21px;
text-align: left;
color: #47464A;
flex-wrap: wrap;
width: '80%';

`;

export const CenterContent = styled.div`


display: flex;
width: 80%;
margin: auto;
margin-top: 3% !important;
margin-bottom: 3% !important;
flex-direction: column;
@media (max-width: 950px) {
  width: 100%;
  }
`;
export const Bottomtext = styled.p`
font-style: normal;
font-weight: 400;
font-size: 12px;
color: #84818A;
margin-left: 0.5%;

`;
export const Bottomtextpurple = styled.p`
font-style: normal;
font-weight: 400;
font-size: 12px;
color: #7476D1;
margin-left: 0.5%;


`;

export const ForgetPass = styled.p`
font-style: normal;
font-weight: 400;
font-size: 14px;
text-align: left;
align-self: center;
color: #7476D1;
cursor: pointer;
float: left;
margin-left: 0%;

`;

export const ErrorText = styled.p`
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 18px;

text-align: left;

color: #FF5353;

margin-left: 0.5%;

`;








