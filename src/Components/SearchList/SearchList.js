import React from 'react';
import SearchBanner from './SearchBanner';
import SearchForm from './SearchForm';
import { Container, Row, Col, Button} from 'reactstrap';
import { NavLink} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import {ImagePath} from '../../ImagePath';
const  SearchList = (props) =>{

  return(
    <React.Fragment>
      <SearchBanner 
        bannerName="CHOOSE YOUR VISSION WITH"
        bannerHint="CLEARITY"
        currentPage="Contact Lens"
      />

      <SearchForm />

      <section className="search-results py-5">
        <Container>
          <div className="d-md-flex d-lg-flex justify-content-between aign-items-center">
            <h1 className="mb-0">Our <span>Product</span></h1>
            <div className="results-Showing">Showing 9 of 61 Results</div>
          </div>

          <Row>
            <Col xs={12} sm={12} md={6} lg={4} className="count">
              <div className="searchBox">
                <div className="doctor-tag"><span><strong>30% </strong><br /> for Doctor</span></div>
                <div className="over">
                  <div className="patients-tag"><span><strong>5%</strong> for <br /> Patients</span></div>
                  <img src={ImagePath.sr1} alt="search product" />
                </div>
              </div>
              <h2 className="product-name my-4">Product Name</h2>
            </Col>
            <Col xs={12} sm={12} md={6} lg={4} className="count">
              <div className="searchBox">
              <div className="doctor-tag"><span><strong>30% </strong><br /> for Doctor</span></div>
                <div className="over">
                  <div className="patients-tag"><span><strong>5%</strong> for <br /> Patients</span></div>
                  <img src={ImagePath.sr1} alt="search product" />
                </div>
              </div>
              <h2 className="product-name my-4">Product Name</h2>
            </Col>
            <Col xs={12} sm={12} md={6} lg={4} className="count">
              <div className="searchBox">
              <div className="doctor-tag"><span><strong>30% </strong><br /> for Doctor</span></div>
                <div className="over">
                  <div className="patients-tag"><span><strong>5%</strong> for <br /> Patients</span></div>
                  <img src={ImagePath.sr1} alt="search product" />
                </div>
              </div>
              <h2 className="product-name my-4">Product Name</h2>
            </Col>
          </Row>

        </Container>
      </section>
                
    </React.Fragment>
  )

}

export default SearchList;