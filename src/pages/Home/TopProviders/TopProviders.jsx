import React, { useContext, useEffect, useState } from "react";
import {
  BackCatTop,
  CategoryRe,
  LeftLabel,
  NameReTop,
  Rating,
  TopProvidersPos,
  TopProvidersPosInn,
  UserImageTop,
} from "../HomeStyles";
import useMediaQuery from "../../../hooks/MediaQuery";
import { useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import "./TopProviders.css";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { GetRecommended } from "../../../api";
import { notifyError } from "../../../components/Toastifycom";
import SkeletonProfile from "../../../components/SkeletonLoader/SkeletonProfile";
import FilterModal from "../../../components/FilterModal";
import { Context } from "../../../Context/ContextStates";
import UserImg from '../../../Assets/Images/profile.png'

const TopProviders = () => {
  const { searchTop } = useContext(Context);

  const [open, setOpen] = React.useState(false);
  const [filterRating, setFilterRating] = useState(null);
  const [noResults, setNoResults] = useState(false); // State to track if no results are found
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(min-width: 950px)");
  const [startIndex, setStartIndex] = useState(0);
  const [rec, setRec] = useState([]);
  const itemsPerPage = isMobile ? 3 : 2;
  const ShowItem = 1;
  const endIndex = startIndex + itemsPerPage;
  const [load, setLoad] = useState(false);
  useEffect(() => {
    setLoad(true);
    GetRecommended()
      .then((e) => {
        if (e.status === false) {
          notifyError("Something went wrong.");
          setLoad(false);
        } else {
          setRec(e.data);
          console.log(e.data);
          setLoad(false);
        }
      })
      .catch((err) => {
        notifyError("Network Error Detected.");
      });
  }, []);

  useEffect(() => {
    // Apply additional filtering logic if needed
    const filteredData = rec.filter(
      (data) =>
        !filterRating ||
        (filterRating === "Average" && data.rating < 3) ||
        (filterRating === "Good" && data.rating < 4) ||
        (filterRating === "Best" && data.rating >= 4)
    );

    setNoResults(filteredData.length === 0);
  }, [filterRating, rec]);

  const filterData = rec && rec.filter((item) => {
    const matchesSearch = item.first_name.toLowerCase().includes(searchTop.toLowerCase());
    return matchesSearch;
  });
  useEffect(() => {
    setStartIndex(0);
  }, [searchTop]);

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
  const isRightDisabled = endIndex >= rec.length;
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
      <div style={{ width: "95%", margin: "auto", padding: "10px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <LeftLabel>Top Service Providers</LeftLabel>
          <FilterAltOutlinedIcon
            style={{
              color: "ActiveBorder",
              cursor: "pointer",
              fontSize: "30px",
            }}
            onClick={() => setOpen(true)}
          />
        </div>
      </div>
      {load === true ? (
        <SkeletonProfile />
      ) : (
        noResults ? (
          <p style={{ fontSize: '14px' }}>No providers found with the selected rating.</p>
        ) :
          <TopProvidersPos>
            <ArrowCircleUpIcon
              style={{
                margin: "auto",
                fontSize: "45px",
                color: "#AA222B",
                cursor: isLeftDisabled ? "no-drop" : "pointer",
              }}
              onClick={handlePreviousClick}
              disabled={isLeftDisabled}
            />
            <TopProvidersPosInn>

              {displayedData.length === 0 ? <p style={{ textAlign: 'center', margin: 'auto' }}>No Data Found</p>
                            :
                            displayedData.length > 0 && displayedData.map((data, index) => (
                  <BackCatTop
                    className="moveable-card"
                    style={{ backgroundColor: '#d3d3d3'}}
                    key={index}
                  >
                    <div
                      style={{
                        width: "95%",
                        margin: "auto",
                        padding: "5px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <div style={{ alignSelf: "center" }}>
                          <UserImageTop src={UserImg} />
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignSelf: "center",
                            width: "90%",
                          }}
                        >
                          <NameReTop>.</NameReTop>
                          <NameReTop>{data.first_name} {data.last_name}</NameReTop>
                          {/* <div
                            style={{
                              margin: "auto",
                              width: "80%",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                }}
                              >
                                <StarIcon style={{ color: "#F1B538" }} />
                                <Rating>{data.rating}</Rating>
                              </div>
                              <CategoryRe>{data.category}</CategoryRe>
                            </div>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </BackCatTop>
                ))
              }
            </TopProvidersPosInn>
            <ArrowCircleDownIcon
              style={{
                margin: "auto",
                fontSize: "45px",
                color: "#AA222B",
                cursor: isRightDisabled ? "no-drop" : "pointer",
              }}
              onClick={handleNextClick}
              disabled={isRightDisabled}
            />
          </TopProvidersPos>
      )}
      <FilterModal
        open={open}
        onClose={() => setOpen(false)}
        onFilterChange={setFilterRating}
      />
    </div>
  );
};

export default TopProviders;
