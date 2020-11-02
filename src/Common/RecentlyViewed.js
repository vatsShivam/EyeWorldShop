import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import {ImagePath} from '../ImagePath';

const  RecentlyViewed = () =>{
  return(
    <React.Fragment>
      <section className="trending-product">
        <Container>
          <h2 className="colored-title mb-4">Recently Viewed <span>Product</span></h2>
            <Row>
                <Col xs={12} sm={12} md={4} lg={4} className='my-2'>
                    <div className="item-box">
                        <div className="image-area mb-3">
                          <div className="doctor-tag"><span><strong>30% </strong><br /> for Doctor</span></div>
                            <div className="overflow-hidden">
                              <img src={ImagePath.sr1} alt='' className="img-fluid" />
                              <div className="triangle">
                                  <p><span>5%</span> for Patients</p>
                              </div>
                            </div>
                        </div>
                        <p className="prod-name text-center">Product Name</p>
                    </div>
                </Col>
                <Col xs={12} sm={12} md={4} lg={4} className='my-2'>
                    <div className="item-box">
                        <div className="image-area mb-3">
                          <div className="doctor-tag"><span><strong>30% </strong><br /> for Doctor</span></div>
                            <div className="overflow-hidden">
                              <img src={ImagePath.sr2} alt='' className="img-fluid" />
                              <div className="triangle">
                                  <p><span>5%</span> for Patients</p>
                              </div>
                            </div>
                        </div>
                        <p className="prod-name text-center">Product Name</p>
                    </div>
                </Col>
                <Col xs={12} sm={12} md={4} lg={4} className='my-2'>
                    <div className="item-box">
                        <div className="image-area mb-3">
                          <div className="doctor-tag"><span><strong>30% </strong><br /> for Doctor</span></div>
                            <div className="overflow-hidden">
                              <img src={ImagePath.sr3} alt='' className="img-fluid" />
                              <div className="triangle">
                                  <p><span>5%</span> for Patients</p>
                              </div>
                            </div>
                        </div>
                        <p className="prod-name text-center">Product Name</p>
                    </div>
                </Col>
            </Row>
        </Container>
    </section>

    </React.Fragment>
  )

}

export default RecentlyViewed;