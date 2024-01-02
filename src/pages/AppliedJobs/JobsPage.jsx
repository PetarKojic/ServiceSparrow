import React, { useState } from "react";
import { BackCatDetail, CategoryName, CatimageDetail, LeftCategory, RightCategory } from "../CategoryDetail/CetegoryDetailStyles";
import { Container, PositionHome, SubContainer } from "../Home/HomeStyles";
import AppliedjobsAll from "./AppliedJobsAll";
import { Button } from "@mui/material";
import useMediaQuery from "../../hooks/MediaQuery";
import HireMe from "../../components/HireMeModal";
import User from '../../Assets/Images/profile.png'

const JobsPage = ({ detailData }) => {
    const isMobile = useMediaQuery('(min-width: 450px)');
    const [open,setOpen]=useState(false)
    const [status, setStatus] = useState('')
    const handleChange = (event) => {
        setStatus(event.target.value);
    };
    const getRandomColor = () => {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      };
    return (
        <Container>
            <SubContainer>
               
                <PositionHome>
                    <LeftCategory>
                        
                        <BackCatDetail style={{ backgroundColor: '#90ee90' }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <CatimageDetail src={User} />
                                <CategoryName>{detailData.first_name} {detailData.last_name}</CategoryName>
                            </div>

                        </BackCatDetail>
                        <Button size="small" style={{ backgroundColor: '#AA222B', color: '#fff', width: isMobile ? '60%' : '40%', borderRadius: 20, textTransform: 'none',marginTop:"2%",marginBottom:'2%' }} onClick={() => setOpen(true)}>Hire Me</Button>

                    </LeftCategory>
                    <RightCategory>
                        <AppliedjobsAll detailData={detailData} />
                    </RightCategory>
                </PositionHome>
            </SubContainer>
            <HireMe open={open} onClose={() => setOpen(false)} Userdata={detailData}/>
        </Container>
    )
}
export default JobsPage;