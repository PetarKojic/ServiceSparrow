import React, { useContext, useEffect, useState } from "react";
import { BackCat, Catimage, LeftLabel, PosCate, PosCateInn } from "../HomeStyles";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import useMediaQuery from "../../../hooks/MediaQuery";
import { useNavigate } from "react-router-dom";
import './PopularCategories.css'
import { GetCategory } from "../../../api";
import { notifyError } from "../../../components/Toastifycom";
import { Context } from "../../../Context/ContextStates";
import SkeletonProfile from "../../../components/SkeletonLoader/SkeletonProfile";

const PopularCat = () => {
    const navigate = useNavigate()
    const isMobile = useMediaQuery('(min-width: 950px)');
    const [startIndex, setStartIndex] = useState(0);
    const { search } = useContext(Context);
    const [catData, setCatData] = useState([]);
    const [load, setLoad] = useState(false)
    const [filteredCatData, setFilteredCatData] = useState([]);
    const itemsPerPage = isMobile ? 3 : 3;
    const ShowItem = 1
    const endIndex = startIndex + itemsPerPage;

    useEffect(() => {
        setLoad(true)
        GetCategory()
            .then((e) => {
                if (e.status === false) {
                    notifyError("Something went wrong.")
                    setLoad(false)
                } else {
                    setCatData(e.data);
                    setFilteredCatData(e.data);
                    setLoad(false)

                }
            })
            .catch((err) => {
                notifyError("Network Error Detected.")
            });
    }, []);
    const filterData = catData.filter((item) => {
        const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
        return matchesSearch;
    });
    useEffect(() => {
        setStartIndex(0);
    }, [search]);

    const displayedData = filterData.slice(startIndex, endIndex);

    const handleNextClick = () => {
        if (endIndex < filterData.length) {
            setStartIndex(startIndex + ShowItem);
        }
    };

    const handlePreviousClick = () => {
        if (startIndex > 0) {
            setStartIndex(startIndex - ShowItem);
        }
    };
    const isLeftDisabled = startIndex === 0;
    const isRightDisabled = endIndex >= catData.length;
    return (
        <div>
            <LeftLabel>Popular Categories</LeftLabel>
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
                                    <BackCat key={data.id} style={{ backgroundColor: data.color }} onClick={() => navigate('/CategoryDetail', { state: { detailData: data } })}>
                                        <Catimage src={data.image} />
                                    </BackCat>
                                )
                            })

                        }
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
export default PopularCat;