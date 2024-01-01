import React from "react";
import { Container, LeftWidth, PositionHome, RightWidth, SubContainer } from "./HomeStyles";
import PopularCat from "./PopularCategories/PopularCategories";
import Recommended from "./Recommendation/Recommended";
import TopProviders from "./TopProviders/TopProviders";
import { Button, useMediaQuery } from "@material-ui/core";
import AddJobModal from "../../components/AddJob";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useNavigate } from "react-router-dom";
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
const HomeContent = () => {
    const [open, setOpen] = React.useState(false);
    const isMobile = useMediaQuery('(min-width: 450px)');
    const navigate = useNavigate('')
    return (
        <Container>
            <SubContainer>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent:isMobile ? 'flex-end' :'space-between' }}>
                    <Button endIcon={<AddCircleIcon style={{ color: '#fff' }} />} onClick={() => setOpen(true)} variant="outlined" style={{ backgroundColor: '#AA222B', color: '#fff', width: isMobile ? '20%' :'40%', borderRadius: 20, marginBottom: '2%' }}>Add a Job</Button>

                    <Button endIcon={<WorkHistoryIcon style={{ color: '#fff' }} />} onClick={() => navigate('/myjobs')} variant="outlined" style={{ backgroundColor: '#AA222B', color: '#fff',width: isMobile ? '20%' :'40%', borderRadius: 20, marginBottom: '2%', marginLeft:isMobile ? '60%' :'0%' }}>My Jobs</Button>
                </div>
                
            
  
                <PositionHome>
                
                    <LeftWidth>
                        <PopularCat />
                        <div style={{ marginTop: '5%' }}>
                            <Recommended />
                        </div>
                    </LeftWidth> 
                    <RightWidth>
                        <TopProviders />
                    </RightWidth>
                </PositionHome>
            </SubContainer>
            <AddJobModal open={open} onClose={() => setOpen(false)} />
        </Container>
    )
}
export default HomeContent;