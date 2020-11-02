import React,{ PureComponent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { NavLink} from 'react-router-dom';
import {ImagePath} from "../ImagePath";
import {connect} from 'react-redux';

import shivam from "../assets/imgs/user.png"

import axios from "axios";
  class SideBar extends PureComponent{
    state={
      name:"",
      id:localStorage.getItem('user'),
      imag:shivam,
      location:"Location"
    }
    componentWillMount(){
      // console.log(this.state.id)
      axios
      .post(
         'http://111.93.169.90:4011/findProfileByID',
         {
            userID:this.state.id
         }
       
       
      )
      .then((resp) => {
        console.log(resp.data)
        //var final= resp.data.find( ({ email }) => email === localStorage.getItem('email') );
       // console.log(final)
        localStorage.setItem('name',resp.data.fullName)
        this.setState({name:resp.data.fullName})
        if(resp.data.address!==""){
          this.setState({location:resp.data.address})
        }
        //
       if(resp.data.profilePic!==""){

        this.setState({imag:resp.data.profilePic})

       }
       
        //  
     
        // let Rating = [
        //   { title: "Grntee ", value: res["Grntee"] },
        //   { title: "Rating ", value: res["Rating"] },
        //   { title: "Rating_Agency ", value: res["Rating_Agency"] }
        // ];
      })
      .catch((error) => {
        // this.setState({ error, isLoading: false })
        console.log(error);
      });
     }
 
    render(){
      console.log(this.state.imag)
  return(
    <React.Fragment>
      <section className="sidebar mt-4 mt-md-0 mt-lg-0">
        <div className="top-section pb-3">
            <div className="userphoto"><img style={{  width: "100px", height: "100px",overflow: "hidden"}} src={this.state.imag} alt="user" /></div>
   
            <h2 className="user-name pb-2 pt-3">{this.state.name}</h2>
            <div className="user-location"><FontAwesomeIcon icon={faMapMarkerAlt} />{this.state.location}</div>
        </div>
        <div className="p-3 py-4">
            <ul>
          {/*  <li><NavLink to="/Profile"><img src={ImagePath.dashboardIcon} alt="" /> Dashboard</NavLink></li>*/}
          {/*  <li><NavLink to="/ProfileEdit"><img src={ImagePath.editProfile} alt="" /> Edit Profile</NavLink></li>*/}
            <li><NavLink to="/Profile"><img src={ImagePath.profileIcon} alt="" /> Profile</NavLink></li>
            <li><NavLink to="#"><img src={ImagePath.wishlistIcon} alt="" /> Wishlist</NavLink></li>
            <li><NavLink to="#"><img src={ImagePath.orderIcon} alt="" /> Orders</NavLink></li>
            <li><NavLink to="/ChangePassword"><img src={ImagePath.passwordIcon} alt="" /> Change Password</NavLink></li>
            </ul>
        </div>
        </section>
    </React.Fragment>
  )
  }
}

export default SideBar;