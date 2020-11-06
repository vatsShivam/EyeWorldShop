import React ,{PureComponent,} from 'react';
import { Redirect, push, Link, NavLink } from "react-router-dom";
import { Container, Row, Col, Button} from 'reactstrap';
import brand1 from '../assets/imgs/brand-1.jpg';
import brand2 from '../assets/imgs/brand-2.jpg';
import brand3 from '../assets/imgs/brand-3.jpg';
import brand4 from '../assets/imgs/brand-4.jpg';
import product1 from '../assets/imgs/product-1.jpg';
import product2 from '../assets/imgs/product-2.jpg';
import product3 from '../assets/imgs/product-3.jpg';
import Mobile from '../assets/imgs/mobile.png';
import Googleplay from '../assets/imgs/google-play.png';
import Appstore from '../assets/imgs/app-store.png';
import Advertise1 from '../assets/imgs/adOne.jpg';
import Advertise2 from '../assets/imgs/adTwo.jpg';
import Advertise3 from '../assets/imgs/adThree.jpg';

import Owlcarausel from './Owlcarausel/owlCarausel';
import CatTab from './CategoryTab/categorytab';
import axios from "axios";
import {connect} from 'react-redux';

class Home extends PureComponent{
    state={
        istoken:localStorage.getItem('token'),
               bannerPics : [],
               products : [],
               count : 0,
               trendingProducts : [],
       
 
    }
   
 componentDidMount()
 {
     this.getAllBanner();
     this.getAllProducts();
 }
   
   getAllBanner()
   {
     axios
 
     .get(
       "http://111.93.169.90:4011/getAllBanner/"
 
      
     )
     .then((resp) => {
       this.setState({bannerPics : resp.data.data})
     
    
 
     })
 
     .catch((error) => {
       console.log(error);
     });
   } 
   getAllProducts()
   {
     axios
 
     .get(
       "http://111.93.169.90:4011/getallProduct/"
 
      
     )
     .then((resp) => {
       this.setState({products : resp.data.data})
     
    
 
     })
 
     .catch((error) => {
       console.log(error);
     });
     var arr = []
     for(var i=0 ; i<this.state.products.length ; i++)
     {
         if(this.state.products[i].isTrending === true)
         { console.log(this.state.products[i],'yesss')
            arr.push(this.state.products[i]);
         }
     }
     console.log(arr,'allll')
     this.setState({trendingProducts : arr});
   }
  
    render(){
        console.log(this.props.myName.isNav)
        console.log(this.state.trendingProducts,'all');
     /*   if(this.state.istoken!==null){
            return <Redirect to="/Profile" />;
          }
          */
   
return(
<React.Fragment>
  <section className="Homebanner">
                <Container>
                    <Row>
                        <Col md="6" className="text-center banner-text">
                            <h1 className="mb-0">Optimize your</h1>
                            <h2 className="mb-3">eye sight</h2>
                            <Button>Shop Now</Button>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className="Brand-section">
                <Container>
                    <Row>
                        <Col sm="3" className='my-1'>
                            <img src={brand1}></img>
                        </Col>
                        <Col sm="3" className='my-1'>
                            <img src={brand2}></img>
                        </Col>
                        <Col sm="3" className='my-1'>
                            <img src={brand3}></img>
                        </Col>
                        <Col sm="3" className='my-1'>
                            <img src={brand4}></img>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className="categorySection">
                <Container>
                    <Row>
                        <Col lg="12">
                            <h1 className="colored-title">Products</h1>
                        </Col>
                        <Col lg="12">
                      
      
                        <CatTab />
    
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className="trending-product">
                <Container>
                    <Row>
                        <Col lg="12">
                            <h1 className="colored-title">Trending <span>Product</span></h1>
                        </Col>
                        
                        { this.state.products.length > 0 ?
                        this.state.products.map((data,index) => 
                        ( data.isTrending === true && index < 5 ? 
                        <Col md="4" className='my-2'>
                            <div className="item-box">
                                <div className="image-area mb-3">
                          <NavLink to = {data.category === 'Contact Lens' ? "/ContactLensDetails/" + data._id : 
                        data.category === 'Optical Lens' ? "/OpticalLensDetails/" + data._id : 
                        data.category === 'Eye Wear' ? "/EyeWearDetails/" + data._id :
                        "/AccessoryDetails/" + data._id }> 
                          <img src={data.productPic[0]} alt=''></img> </NavLink>
                                    <div className="triangle">
                            <p><span>{data.patientDiscount}%</span>for Patients</p>
                                    </div>
                                    <div className="red-star">
                            <p><span>{data.doctorDiscount}%</span>for Doctors</p>
                                    </div>
                                </div>
                        <p className="prod-name text-center">{data.name}</p>
                        <p className="prod-price text-center"><span>INR</span>{data.price}</p>
                            </div>
                        </Col>
                        : null  
                        )) 
                        : null}
                        <NavLink to = {"/TrendingProduct"}><h5>More</h5></NavLink>
                    </Row>
                </Container>
            </section>
            
            <section className="featured-product">
                <Container>
                <Row>
                        <Col lg="12">
                            <h1 className="colored-title">Featured <span>Product</span></h1>
                        </Col>
                        
                        { this.state.products.length > 0 ?
                        this.state.products.map((data,index) => 
                        ( data.isFeatured === true && index < 5 ? 
                        <Col md="4" className='my-2'>
                            <div className="item-box">
                                <div className="image-area mb-3">
                          <NavLink to = {data.category === 'Contact Lens' ? "/ContactLensDetails/" + data._id : 
                        data.category === 'Optical Lens' ? "/OpticalLensDetails/" + data._id : 
                        data.category === 'Eye Wear' ? "/EyeWearDetails/" + data._id :
                        "/AccessoryDetails/" + data._id }> 
                          <img src={data.productPic[0]} alt=''></img> </NavLink>
                                    <div className="triangle">
                            <p><span>{data.patientDiscount}%</span>for Patients</p>
                                    </div>
                                    <div className="red-star">
                            <p><span>{data.doctorDiscount}%</span>for Doctors</p>
                                    </div>
                                </div>
                        <p className="prod-name text-center">{data.name}</p>
                        <p className="prod-price text-center"><span>INR</span>{data.price}</p>
                            </div>
                        </Col>
                        : null  
                        )) 
                        : null}
                        <NavLink to = {"/FeaturedProduct"}><h5>More</h5></NavLink>
                    </Row>
                </Container>
            </section>
            <section className="download-app">
                <Container>
                    <Row>
                        <Col lg="10" className="ml-auto mr-auto">
                            <Row>
                                <Col sm="4">
                                    <div className="mobile-image">
                                        <img src={Mobile} className="img-fluid" alt=''></img>
                                    </div>
                                </Col>
                                <Col sm="8" className="download-app-right-part">
                                    <h1>Download our <br></br>Application</h1>
                                    <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
                                    <p>
                                        <button className="mr-3"><img src={Googleplay} alt=""></img></button>
                                        <button><img src={Appstore} alt=''></img></button>
                                    </p>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className="advertise-section">
                <Container>
                    <Row>
                    {this.state.bannerPics !== null &&  this.state.bannerPics.length !== 0
                              ?
                              this.state.bannerPics.map((data,index) =>
                              index < 3 ? 
                              <Col sm="4" className="my-3">
                              <div className="adImage">
                                  <img src={data.pic} alt='' className='img-fluid'></img>
                              </div>
                          </Col>  
                                  : null
                              )
                              : null }
                    </Row>
                </Container>
            </section>
</React.Fragment>
)
}
}
const mapStateToProps=(state)=>{
    return{
      myName:state
    }
  }
 
export default connect(mapStateToProps)(Home);