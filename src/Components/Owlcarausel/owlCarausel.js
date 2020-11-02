import React, { Component } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import './owlcarausel.css';

import slide1 from '../../assets/imgs/sliderImg1.jpg';
import slide2 from '../../assets/imgs/sliderImg2.jpg';
import slide3 from '../../assets/imgs/sliderImg3.jpg';


class Owlcarausel extends Component{
    constructor(props){
        super(props)
        this.state={
           
          responsive:{
            0: {
              items: 1,
            },
            481: {
              items: 2,
            },
            767: {
              items: 3,
            },
            992: {
              items: 3,
            },
          }
        }
      }


    render(){
  
        return(
            <div>
                <OwlCarousel className="owl-theme" loop margin={10} nav navText={["", ""]} dotsClass={false} responsive={this.state.responsive} >
                <div className="item">
                        <div className="item-box">
                            <div className="image-area mb-3">
                                <img src={slide1} alt='' />
                                <div className="triangle">
                                    <p><span>5%</span> for Patients</p>
                                </div>
                                <div className="red-star">
                                    <p><span>30%</span> for Doctors</p>
                                </div>
                            </div>
                            <p className="prod-name text-center">Product Name goes here</p>
                            <p className="prod-price text-center"><span>$</span> 350.00</p>
                        </div>
                    </div>
                    <div className="item">
                        <div className="item-box">
                            <div className="image-area mb-3">
                                <img src={slide2} alt='' />
                                <div className="triangle">
                                    <p><span>5%</span> for Patients</p>
                                </div>
                                <div className="red-star">
                                    <p><span>30%</span> for Doctors</p>
                                </div>
                            </div>
                            <p className="prod-name text-center">Product Name goes here</p>
                            <p className="prod-price text-center"><span>$</span> 350.00</p>
                        </div>
                    </div>
                    <div className="item">
                        <div className="item-box">
                            <div className="image-area mb-3">
                                <img src={slide3} alt='' />
                                <div className="triangle">
                                    <p><span>5%</span> for Patients</p>
                                </div>
                                <div className="red-star">
                                    <p><span>30%</span> for Doctors</p>
                                </div>
                            </div>
                            <p className="prod-name text-center">Product Name goes here</p>
                            <p className="prod-price text-center"><span>$</span> 350.00</p>
                        </div>
                    </div>
                    <div className="item-box">
                        <div className="image-area mb-3">
                            <img src={slide1} alt='' />
                            <div className="triangle">
                                <p><span>5%</span> for Patients</p>
                            </div>
                            <div className="red-star">
                                <p><span>30%</span> for Doctors</p>
                            </div>
                        </div>
                        <p className="prod-name text-center">Product Name goes here</p>
                        <p className="prod-price text-center"><span>$</span> 350.00</p>
                    </div>
                </OwlCarousel>
            </div>
        );
    }
}

export default Owlcarausel