import React from 'react';
import {
    MDBFooter,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBCol,
    MDBRow,
    MDBBtn
} from 'mdb-react-ui-kit';
import useMediaQuery from '../hooks/MediaQuery';

const Footer = () => {
    const isMobile = useMediaQuery('(min-width: 450px)');

    return (
        <MDBFooter style={{ backgroundColor: '#7476D1' }} className='text-white text-center text-lg-left'>
            <MDBContainer className='p-0' style={{width:'80%',margin:'auto'}}>
                <MDBRow style={{marginTop:'2%'}}>
                 
                    <MDBCol md="2" lg="4" xl="5" className='mx-auto mb-4'>
                        <h5 className='text-uppercase' style={{ textAlign: 'left', fontWeight: 800, fontSize: 30 }}>LOGO</h5>

                        <p style={{ textAlign: 'left', fontWeight: '500', fontSize: 14, width: '80%',flexWrap:'wrap' }}>
                        Willkommen auf ServiceSparrow! Ein Online Dienstleistungsportal für Schüler/innen und Student/innen.
                        </p>

                    </MDBCol>
                  


                    <MDBCol lg='3' md='2' className='mb-4 mb-md-0' style={isMobile ? {width:'20%'} : {}}>
                        <h5 style={{ textDecoration: 'none', textAlign: 'left',fontSize:18,fontWeight:'700'}}>Resources & Support</h5>

                        <ul className='list-unstyled' style={{ textDecoration: 'none', textAlign: 'left' }}>
                            <li>
                                <a href='#!' style={{ textDecoration: 'none'}} className='text-white'>
                                    Newsletter
                                </a>
                            </li>
                            <li>
                                <a href='#!' style={{ textDecoration: 'none' }} className='text-white'>
                                    Case Studies
                                </a>
                            </li>
                            <li>
                                <a href='#!' style={{ textDecoration: 'none' }} className='text-white'>
                                    Career Paths
                                </a>
                            </li>
                            <li>
                                <a href='#!' style={{ textDecoration: 'none' }} className='text-white'>
                                    FAQ
                                </a>
                            </li>
                            <li>
                                <a href='#!' style={{ textDecoration: 'none' }} className='text-white'>
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </MDBCol>
                    <MDBCol lg='2' md='6' className='mb-4 mb-md-0' style={isMobile ? {width:'20%',marginLeft:'1%'} : {}}>
                        <h5 className='' style={{ textDecoration: 'none', textAlign: 'left',fontSize:18,fontWeight:'700' }}>Platform</h5>

                        <ul className='list-unstyled' style={{ textDecoration: 'none', textAlign: 'left' }}>
                            <li>
                                <a href='#!' style={{ textDecoration: 'none', textAlign: 'left' }} className='text-white'>
                                    Browse Mentors
                                </a>
                            </li>
                            <li>
                                <a href='#!' style={{ textDecoration: 'none', textAlign: 'left' }} className='text-white'>
                                    Book a Session
                                </a>
                            </li>
                            <li>
                                <a href='#!' style={{ textDecoration: 'none', textAlign: 'left' }} className='text-white'>
                                    Become a Mentor
                                </a>
                            </li>
                            <li>
                                <a href='#!' style={{ textDecoration: 'none', textAlign: 'left' }} className='text-white'>
                                    Mentorship for Teams
                                </a>
                            </li>
                            <li>
                                <a href='#!' style={{ textDecoration: 'none', textAlign: 'left' }} className='text-white'>
                                    Book a Session
                                </a>
                            </li>
                            
                        </ul>
                    </MDBCol>
                    <MDBCol lg='2' md='8' className='mb-6 mb-md-0' style={isMobile ? {width:'15%',marginLeft:'2%'} : {}}>
                        <h5 className='mb-2' style={{ textDecoration: 'none', textAlign: 'left',fontSize:18 ,fontWeight:'700'}}>Company</h5>

                        <ul className='list-unstyled' style={{ textDecoration: 'none', textAlign: 'left' }}>
                            <li>
                                <a href='#!' style={{ textDecoration: 'none', textAlign: 'left' }} className='text-white'>
                                    About
                                </a>
                            </li>
                            <li>
                                <a href='#!' style={{ textDecoration: 'none', textAlign: 'left' }} className='text-white'>
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a href='#!' style={{ textDecoration: 'none', textAlign: 'left' }} className='text-white'>
                                    Partner Program
                                </a>
                            </li>
                            <li>
                                <a href='#!' style={{ textDecoration: 'none', textAlign: 'left' }} className='text-white'>
                                    Code of Conduct
                                </a>
                            </li>
                            <li >
                                <a href='#!' style={{ textDecoration: 'none', textAlign: 'left' }} className='text-white'>
                                    Privacy Policy
                                </a>
                            </li>
                        </ul>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            <hr style={{
                background: '#EFEFEF',
                color: '#EFEFEF',
                borderColor: '#EFEFEF',
                height: '2px',
            }}
            />
            <div className='text-center p-2' style={{ backgroundColor: '#7476D1' }} >
                {/* &copy; {new Date().getFullYear()} Copyright:{' '} */}
                <a style={{ textDecoration: 'none' }} className='text-white' href='https://mdbootstrap.com/'>
                    © 2023 BusinessName. All Rights Reserved.
                </a>
            </div>
        </MDBFooter>
    );
}
export default Footer;
