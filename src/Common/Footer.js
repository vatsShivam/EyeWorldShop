import React,{PureComponent} from 'react';

import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  // NavLink

} from 'reactstrap';

import { NavLink} from 'react-router-dom';

import phoneIcon from '../assets/imgs/phone-icon.png';
import clockIcon from '../assets/imgs/time-icon.png';
import emailIcon from '../assets/imgs/email-icon.png';
import facebookIcon from '../assets/imgs/facebook.png';
import twitterIcon from '../assets/imgs/twitter.png';
import instagramIcon from '../assets/imgs/instagram.png';

import {connect} from 'react-redux';
class Footer extends PureComponent{
    render(){
        if(this.props.myName.isNav===false){
  return(
    <React.Fragment>
      <section className="newsletter py-4">
                <Container>
                    <Row>
                        <Col md="12" className="ml-auto mr-auto">
                            <Form inline>
                                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                                    <Label for="signupInfo" className="mr-sm-2">Sign up for info & offers!</Label>
                                    <Input type="text" name="password" id="signupInfo" placeholder="enter your e-mail" />
                                </FormGroup>
                                <Button>Subscribe</Button>
                            </Form>
                        </Col>
                    </Row>
                    
                </Container>
            </section>
            <footer>
                <Container>
                    <Row>
                        <Col lg="3" md="6" className="mb-2">
                            <h5>Company</h5>
                            <ul className="list-unstyled f-link">
                                <li><NavLink className="nav-link" to="/About">Solutions</NavLink></li>
                                <li><NavLink className="nav-link" to="">Pricing</NavLink></li>
                                <li><NavLink className="nav-link" to="">Contact Us</NavLink></li>
                                <li><NavLink className="nav-link" to="">Terms and Conditions</NavLink></li>
                                <li><NavLink className="nav-link" to="">Privacy Policy</NavLink></li>
                            </ul>
                        </Col>
                        <Col lg="3" md="6" className="mb-2">
                            <h5>Useful Links</h5>
                            <ul className="list-unstyled f-link">
                                <li><NavLink className="nav-link" to="">Terms & Conditions</NavLink></li>
                                <li><NavLink className="nav-link" to="">Privacy Policy</NavLink></li>
                                <li><NavLink className="nav-link" to="">Eye-care</NavLink></li>
                            </ul>
                        </Col>
                        <Col lg="3" md="6" className="padLeft0 mb-2">
                            <h5>Contact Us</h5>
                            <p>Online Sales and Complaints</p>
                            <p><span className="mr-3"><img src={phoneIcon} alt='' className='img-fluid'></img></span> 1234 - 567 - 8900</p>
                            <div className="d-flex">
                                <span className="mr-3"><img src={clockIcon} alt='' className='img-fluid'></img></span>
                                <p className="mt-0">Mon - Sat: 9AM - 10PM <br></br>Sun: 9AM - 9PM </p>
                            </div>
                            <p><span className="mr-3"><img src={emailIcon} alt='' className='img-fluid'></img></span> contact@eyeworlddistribution.com</p>
                        </Col>
                        <Col lg="3" md="6" className="mb-2">
                            <h5>Connect With Us</h5>
                            <NavLink to="" className="d-inline-block nav-link p-2"><img src={facebookIcon} alt='' className='img-fluid'></img></NavLink>
                            <NavLink to="" className="d-inline-block nav-link p-2"><img src={twitterIcon} alt='' className='img-fluid'></img></NavLink>
                            <NavLink to="" className="d-inline-block nav-link p-2"><img src={instagramIcon} alt='' className='img-fluid'></img></NavLink>
                        </Col>
                    </Row>
                </Container>
            </footer>
            <section className="copyrightSection text-center py-3">
                <Container>
                    <Row>
                        <Col>
                            <p className="mb-0">&copy; 2020 eye world distribution. All Rights Reserved. </p>
                        </Col>
                    </Row>
                </Container>
            </section>
    </React.Fragment>
  )
        }
        else if(this.props.myName.isNav===true){
            return(
            null
            )
        }
    }
}
const mapStateToProps=(state)=>{
    return{
      myName:state
    }
  }
export default connect(mapStateToProps) (Footer);