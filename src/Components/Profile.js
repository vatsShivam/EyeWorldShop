import React,{ PureComponent }from 'react';
import SideBar from '../Common/SideBar';
import { Label, Container, Row, Col, } from 'reactstrap';
import { NavLink} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Redirect, push } from "react-router-dom";
import {ImagePath} from "../ImagePath";
import axios from "axios";
import {connect} from 'react-redux';


class Profile extends PureComponent{
 state={
   token:localStorage.getItem('token'),
   id:localStorage.getItem('user'),
   name:"",
   mobile:"",
   email:"",
   account_check:false,
   specilization:"",
   education:"",
   degree:"",
   address:"",
   age:"",
   gender:"",
   
 } 
 componentWillMount(){
   if(localStorage.getItem("doctor_account")=="true"){
     this.setState({account_check:true})
   }
 }
 componentDidMount(){
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
    this.setState({name:resp.data.fullName,mobile:resp.data.contactNo,email:resp.data.email,specilization:resp.data.specialization,education:resp.data.education,degree:resp.data.degree,address:resp.data.address,gender:resp.data.gender})
    console.log(resp.data.dateOfBirth)
    if(resp.data.dateOfBirth!==""){
    var today = new Date();
    var birthDate = new Date(resp.data.dateOfBirth);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age = age - 1;
    }
    this.setState({age:age +" "+"years"+ " "+"old" })

  }
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
    console.log(this.state.id)
    if(this.state.token===null){
      return <Redirect to="/" />;
    }
 
 else{
 return(
   <React.Fragment>
    
    <Container className="py-5">
      <div className="pagepath mb-3">
        <NavLink to="#"><FontAwesomeIcon icon={faHome} /></NavLink>
        <span>Profile</span>
      </div>

      <Row>
        <Col xs={12} sm={12} md={3} lg={3}></Col>
        <Col xs={12} sm={12} md={9} lg={9}>
          <h1 className="page-heading mb-5">Profile</h1>
        </Col>
      </Row>

      <Row>
        <Col xs={12} sm={12} md={3} lg={3}>
          <SideBar />
        </Col>
        <Col xs={12} sm={12} md={9} lg={9}>
          <section className="right-section">
            <div className="p-4">
              <h4 className="heading1">Hello.</h4>
              <h5 className="heading2">{this.state.name}</h5>
            </div>
            <hr />
            <div className="p-4">
              <div className="d-flex justify-content-between">
                <p className="heading3">Personal Info</p>
               <NavLink to="/ProfileEdit"> <button className="trns-btn"><img src={ImagePath.editIcon} alt="edit icon" /></button></NavLink>
              </div>

              <Row className="mb-3">
                <Col xs={12} sm={12} md={3} lg={3}>
                  <Label className="label-h">Full Name :</Label>
                </Col>
                <Col xs={12} sm={12} md={9} lg={9}>
                  <Label className="label-v">{this.state.name}</Label>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col xs={12} sm={12} md={3} lg={3}>
                  <Label className="label-h">Phone No :</Label>
                </Col>
                <Col xs={12} sm={12} md={9} lg={9}>
                  <Label className="label-v">{this.state.mobile}</Label>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col xs={12} sm={12} md={3} lg={3}>
                  <Label className="label-h">Email Id :</Label>
                </Col>
                <Col xs={12} sm={12} md={9} lg={9}>
                  <Label className="label-v ">{this.state.email}</Label>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col xs={12} sm={12} md={3} lg={3}>
                  <Label className="label-h">Address :</Label>
                </Col>
                <Col xs={12} sm={12} md={9} lg={9}>
                  <Label className="label-v">{this.state.address}</Label>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col xs={12} sm={12} md={3} lg={3}>
                  <Label className="label-h">Age :</Label>
                </Col>
                <Col xs={12} sm={12} md={9} lg={9}>
                  <Label className="label-v">{this.state.age }</Label>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col xs={12} sm={12} md={3} lg={3}>
                  <Label className="label-h">Gender :</Label>
                </Col>
                <Col xs={12} sm={12} md={9} lg={9}>
                  <Label className="label-v">{this.state.gender}</Label>
                </Col>
              </Row>
               {this.state.account_check && 
                <div >
                  <Row className="mb-3">
                  <Col xs={12} sm={12} md={3} lg={3}>
                    <Label className="label-h">Specilization :</Label>
                  </Col>
                  <Col xs={12} sm={12} md={9} lg={9}>
                    <Label className="label-v">{this.state.specilization}</Label>
                  </Col>
                </Row>
                 <Row className="mb-3">
                 <Col xs={12} sm={12} md={3} lg={3}>
                   <Label className="label-h">Degree :</Label>
                 </Col>
                 <Col xs={12} sm={12} md={9} lg={9}>
                   <Label className="label-v">{this.state.degree}</Label>
                 </Col>
               </Row>
               <Row className="mb-3">
                <Col xs={12} sm={12} md={3} lg={3}>
                  <Label className="label-h">Education :</Label>
                </Col>
                <Col xs={12} sm={12} md={9} lg={9}>
                  <Label className="label-v">{this.state.education}</Label>
                </Col>
              </Row>
               </div>
 }
            </div>
          </section>
        </Col>
      </Row>

    </Container>

   </React.Fragment>
 )
 }
 }
}
const mapStateToProps=(state)=>{
  return{
    myName:state.name
  }
}

export default connect(mapStateToProps)(Profile);