import React from 'react'
import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Hamburger from '../../Assets/Images/hamburger.png'
import Brand from '../../Assets/Images/Logo1.jpg'
import './Header.css'
import UserMenu from '../Usermenu'
import { BackgroundChecked1, TextChecked } from '../../pages/Home/HomeStyles'
import SearchBarComp from '../SearchBar'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import SearchBarRec from '../SearchBarRecommend'
import SearchBarTop from '../SearchBarTop'
import useMediaQuery from '../../hooks/MediaQuery'

const Data = [
  {
    id: 1,
    label: 'Popular Categories',
    value: 1
  },
  {
    id: 2,
    label: 'Recommendation',
    value: 2
  },
  {
    id: 3,
    label: 'Top Services',
    value: 3
  }
]
const Header = ({ show }) => {
  const [selectedValue, setSelectedValue] = React.useState(null);

  const handleChange = (event, value) => {
    setSelectedValue(value);
  };
  const navigate = useNavigate()
  const [showNavbar, setShowNavbar] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isMobile = useMediaQuery('(min-width: 450px)');

  useEffect(() => {
    const token = localStorage.getItem('@storage_Key');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }

  return (
    <div className='nav-container'>
      <nav className="navbar" >
        <div className="container">
          <div>
            <img src={Brand} className="logo" />
          </div>
          <div className="menu-icon" onClick={handleShowNavbar}>
            <img src={Hamburger} />
          </div>


          <div className={`nav-elements  ${showNavbar && 'active'}`}>
            <ul>
              {show === 'false' ? <></>
                :

                <li style={{ display: 'flex', flexDirection: isMobile ? 'row' :'column' }}>

                  <Autocomplete
                    value={selectedValue}
                    onChange={handleChange}
                    options={Data}
                    sx={{ width: 220, zIndex: 1000 }}
                    size='medium'

                    renderInput={(params) => <TextField {...params} label="Search By"
                      sx={{
                        "& input": { color: '#000', fontSize: '15px', fontWeight: '300' },

                      }}
                    />}
                  />
                  {selectedValue && selectedValue.value === 1 ?

                    <SearchBarComp />
                    :
                    selectedValue && selectedValue.value === 2 ?
                      <SearchBarRec />
                      :
                      selectedValue && selectedValue.value === 3 ?
                      <SearchBarTop />
                      :
                      <></>
                  }


                </li>
              }


              <li>

                <UserMenu />
              </li>
            </ul>

            {/* {isLoggedIn ? (
                  <UserMenu />
                ) : (
                  <BackgroundChecked1 onClick={() => navigate('/register')}>
                    <TextChecked>LOG IN</TextChecked>
                  </BackgroundChecked1>
                )} */}
          </div>

        </div>
      </nav>


    </div>
  )
}

export default Header