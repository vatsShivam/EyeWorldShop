import React from 'react';
import { Container, Row, Col, Button} from 'reactstrap';
import { NavLink} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

const  SearchBanner = (props) =>{
  return(
    <React.Fragment>
      <section className="searchbanner">
        <Container>
            <Row>
                <Col md="12" className="text-center banner-text">
                  <h1 className="mb-3">{props.bannerName} <span>{props.bannerHint}</span></h1>
                  <div className="mb-3 pagination-path"><NavLink to="/"><FontAwesomeIcon icon={faHome} /></NavLink> {props.currentPage}</div>
                </Col>
            </Row>
        </Container>
      </section>
    </React.Fragment>
  )

}

export default SearchBanner;