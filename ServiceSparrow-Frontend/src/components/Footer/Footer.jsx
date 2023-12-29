import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import Logo from '../../Assets/Images/Logo1.jpg'
export default function Footer() {
  return (
    <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
     

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md='3' lg='4' xl='3' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                {/* <MDBIcon color='secondary' icon='gem' className='me-3' /> */}
                <img src={Logo} style={{width:'300px',height:'50px'}}/>
              </h6>
              <p>
              Willkommen auf ServiceSparrow! Ein Online Dienstleistungsportal für Schüler/innen und Student/innen.
              </p>
            </MDBCol>

            <MDBCol md='2' lg='2' xl='2' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Pages</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Home
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                About Us
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                Contact Us
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Settings
                </a>
              </p>
            </MDBCol>

         

            <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p >
                <MDBIcon color='secondary' icon='home'  />
                Wien, W 1220, AUT
              </p>
              <p >
                <MDBIcon color='secondary' icon='envelope'  />
                helpdesk.servicesparrow@gmail.com
              </p>
              <p>
                <MDBIcon color='secondary' icon='phone'/> + 43 681 123456
              </p>
              <p>
                <MDBIcon color='secondary' icon='print' /> + 43 681 123456
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2023 Copyright:
        <a className='text-reset fw-bold'>
          ServiceSparrow.com
        </a>
      </div>
    </MDBFooter>
  );
}