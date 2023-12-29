import React, { useContext, useEffect, useState } from "react";
import { BackReImage, BackRecom, CategoryRe, LeftLabel, NameRe, PosCate, PosCateInn, Rating, UserImage } from "../HomeStyles";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import useMediaQuery from "../../../hooks/MediaQuery";
import { useNavigate } from "react-router-dom";
import StarIcon from '@mui/icons-material/Star';
import './Recommended.css'
import { GetRecommended } from "../../../api";
import { notifyError } from "../../../components/Toastifycom";
import SkeletonProfile from "../../../components/SkeletonLoader/SkeletonProfile";
import { Context } from "../../../Context/ContextStates";
import UserImg from '../../../Assets/Images/profile.png'
const Recommended = () => {
    const { searchRec } = useContext(Context);

    const navigate = useNavigate()
    const isMobile = useMediaQuery('(min-width: 950px)');
    const [startIndex, setStartIndex] = useState(0);
    const [rec, setRec] = useState([])
    const itemsPerPage = isMobile ? 3 : 2;
    const ShowItem = 1
    const endIndex = startIndex + itemsPerPage;
    const [load, setLoad] = useState(false)
    useEffect(() => {
        setLoad(true)
        GetRecommended().then(e => {
            if (e.status == false) {
                notifyError("Something went wrong.")
                setLoad(false)
            }
            else {
                setRec(e.data)
                console.log(e.data)
                setLoad(false)
            }
        }).catch(err => {
            notifyError("Network Error Detected.")
        })
    }, [])
    const filterData =rec && rec.filter((item) => {
        const matchesSearch = item.first_name.toLowerCase().includes(searchRec.toLowerCase());
        return matchesSearch;
    });
    useEffect(() => {
        setStartIndex(0);
    }, [searchRec]);

    const displayedData = filterData && filterData.slice(startIndex, endIndex);

    const handleNextClick = () => {
        if (endIndex < filterData && filterData.length) {
            setStartIndex(startIndex + ShowItem);
        }
    };

    const handlePreviousClick = () => {
        if (startIndex > 0) {
            setStartIndex(startIndex - ShowItem);
        }
    };
    
    const isLeftDisabled = startIndex === 0;
    const isRightDisabled = endIndex >= rec && rec.length;
    const getRandomColor = () => {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      };
    return (
        <div>
            <LeftLabel>Recommended for You</LeftLabel>
            {load === true ? <SkeletonProfile />
                :

                <PosCate>
                    <button
                        className="nav-btn"
                        onClick={handlePreviousClick}
                        disabled={isLeftDisabled}
                        style={{ cursor: isLeftDisabled ? 'no-drop' : 'pointer' }}


                    >
                        <ChevronLeftIcon style={{ color: '#fff' }} />
                    </button>
                    <PosCateInn>
                        {displayedData.length === 0 ? <p style={{ textAlign: 'center', margin: 'auto' }}>No Data Found</p>
                            :
                            displayedData.length > 0 && displayedData.map((data) => {
                            return (
                                <BackRecom style={{ backgroundColor: '#90ee90'  }} onClick={() => navigate('/AppliedJobs', { state: { detailData: data } })}>
                                    <div style={{ display: 'flex', flexDirection: 'column', }}>
                                        <BackReImage>
                                            <UserImage src={UserImg} />
                                        </BackReImage>
                                        <NameRe>{data.first_name} {data.last_name}</NameRe>
                                        {/* <div style={{ width: isMobile ? '90%' : '100%', margin: 'auto' }}>
                                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                    <StarIcon style={{ color: '#F1B538' }} />

                                                    <Rating>{data.rating}</Rating>
                                                </div>
                                                <CategoryRe>{data.category}</CategoryRe>
                                            </div>
                                        </div> */}
                                    </div>
                                </BackRecom>
                            )
                        })}
                    </PosCateInn>
                    <button
                        className="nav-btn"
                        onClick={handleNextClick}
                        disabled={isRightDisabled}
                        style={{ cursor: isRightDisabled ? 'no-drop' : 'pointer' }}



                    >
                        <ChevronRightIcon style={{ color: '#fff' }} />
                    </button>
                </PosCate>
            }
        </div>
    )
}
export default Recommended;