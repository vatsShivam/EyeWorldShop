import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

const  Reviews = () =>{
  return(
    <React.Fragment>
      
      <section className="py-5">
      <Container>
        <h2 className="colored-title mb-4">REVIEWS</h2>
        <div className="review-bg p-4 mb-4">
          <Row className="align-items-center">
            <Col xs={12} sm={12} md={2} lg={2}>
              <div className="reviewImg mx-auto">S</div>
            </Col>
            <Col xs={12} sm={12} md={7} lg={7}>
              <div className="reviewData text-center text-md-left text-lg-left mt-2 mt-md-0 mt-lg-0">
                <h2>Sati Paul <span>Verified Buyer</span></h2>
                <div className="star">
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                </div>
                <p className="review-comment mt-3">Good Service, I got it delivered to my house within 3 days..</p>
              </div>
            </Col>
            <Col xs={12} sm={12} md={3} lg={3}>
              <div className="text-center text-md-right text-lg-right">
                <p className="review-date">07/06/20</p>
                <div className="likeDislike">
                  <span><FontAwesomeIcon icon={faThumbsUp} /> 0 </span>
                  <span><FontAwesomeIcon icon={faThumbsDown} /> 0 </span>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className="review-bg p-4 mb-4">
          <Row className="align-items-center">
            <Col xs={12} sm={12} md={2} lg={2}>
              <div className="reviewImg mx-auto">S</div>
            </Col>
            <Col xs={12} sm={12} md={7} lg={7}>
              <div className="reviewData text-center text-md-left text-lg-left mt-2 mt-md-0 mt-lg-0">
                <h2>Sati Paul <span>Verified Buyer</span></h2>
                <div className="star">
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                </div>
                <p className="review-comment mt-3">Good Service, I got it delivered to my house within 3 days..</p>
              </div>
            </Col>
            <Col xs={12} sm={12} md={3} lg={3}>
              <div className="text-center text-md-right text-lg-right">
                <p className="review-date">07/06/20</p>
                <div className="likeDislike">
                  <span><FontAwesomeIcon icon={faThumbsUp} /> 0 </span>
                  <span><FontAwesomeIcon icon={faThumbsDown} /> 0 </span>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className="review-bg p-4 mb-4">
          <Row className="align-items-center">
            <Col xs={12} sm={12} md={2} lg={2}>
              <div className="reviewImg mx-auto">S</div>
            </Col>
            <Col xs={12} sm={12} md={7} lg={7}>
              <div className="reviewData text-center text-md-left text-lg-left mt-2 mt-md-0 mt-lg-0">
                <h2>Sati Paul <span>Verified Buyer</span></h2>
                <div className="star">
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                </div>
                <p className="review-comment mt-3">Good Service, I got it delivered to my house within 3 days..</p>
              </div>
            </Col>
            <Col xs={12} sm={12} md={3} lg={3}>
              <div className="text-center text-md-right text-lg-right">
                <p className="review-date">07/06/20</p>
                <div className="likeDislike">
                  <span><FontAwesomeIcon icon={faThumbsUp} /> 0 </span>
                  <span><FontAwesomeIcon icon={faThumbsDown} /> 0 </span>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className="review-bg p-4 mb-4">
          <Row className="align-items-center">
            <Col xs={12} sm={12} md={2} lg={2}>
              <div className="reviewImg mx-auto">S</div>
            </Col>
            <Col xs={12} sm={12} md={7} lg={7}>
              <div className="reviewData text-center text-md-left text-lg-left mt-2 mt-md-0 mt-lg-0">
                <h2>Sati Paul <span>Verified Buyer</span></h2>
                <div className="star">
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                </div>
                <p className="review-comment mt-3">Good Service, I got it delivered to my house within 3 days..</p>
              </div>
            </Col>
            <Col xs={12} sm={12} md={3} lg={3}>
              <div className="text-center text-md-right text-lg-right">
                <p className="review-date">07/06/20</p>
                <div className="likeDislike">
                  <span><FontAwesomeIcon icon={faThumbsUp} /> 0 </span>
                  <span><FontAwesomeIcon icon={faThumbsDown} /> 0 </span>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        <h2 className="colored-title mt-5 mb-3">Comment</h2>
        <textarea className="commentbox p-4"></textarea>
        <div className="text-right mt-4">
          <button className="cart-btn">Submit</button>
        </div>
      </Container>
    </section>

    </React.Fragment>
  )

}

export default Reviews;