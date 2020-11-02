import React, { PureComponent }  from 'react';
import SideBar from '../Common/SideBar';
import { Label,Input, Container, Row, Col,Button,Alert } from 'reactstrap';
import { NavLink} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
class ChangePassword extends PureComponent{
  state={
    oldpassword:"",
    newpassword:"",
    confirmpassword:"",
    oldMessage:"",
    newMessage:"",
    confirmMessage:"",
  
    isNewValid:false,
    isConfirm:false,
    id:localStorage.getItem('user'),
    visible:false,
    responseToPost:"",
    classvalidate:"",

  }
  handleChange=(e)=>{
    let change = {}
    change[e.target.name] = e.target.value
    this.setState(change)
    this.setState({oldMessage:""})
    this.setState({newMessage:""})
    this.setState({confirmMessage:""})
    this.setState({visible:false})
    this.setState({responseToPost:""})
 
  }

  handleNew=(e)=>{
    
    if(this.state.newpassword.length>3 && this.state.newpassword.length<9){
      this.setState({newMessage:"", isNewValid:true})
     
     
    }
    else if(this.state.newpassword!=="") {
      this.setState({newMessage:"Password length should be between 4 to 8"})
      this.setState({isNewValid:false})
    }
  
 
  }
  handleConfirm=(e)=>{
    
    if(this.state.newpassword===this.state.confirmpassword){
      this.setState({confirmMessage:"",})
     
     
    }
    else if(this.state.confirmpassword!=="") {
      this.setState({confirmMessage:"Both passwords should be same"})
    
    }
  
 
  }
  handleSubmit=(e)=>{
    e.preventDefault();
    console.log(this.state.newpassword)
   if(this.state.oldpassword===""){
    this.setState({oldMessage:"This field is required "})
   }
    if(this.state.newpassword===""){
      this.setState({newMessage:"This field is required "})
   }
   if(this.state.confirmpassword===""){
    this.setState({confirmMessage:"This field is required "})
   }
   if(this.state.newpassword===this.state.confirmpassword && this.state.newpassword.length<=3 && this.state.newpassword.length>=9){
    this.setState({newMessage:"Password length should be between 4 to 8"})


   }
  if(this.state.newpassword!==this.state.confirmpassword){
    this.handleConfirm()
  }
    if(this.state.isNewValid===true && this.state.confirmpassword===this.state.newpassword && this.state.oldpassword!==""){

      axios

      .post(
      "http://111.93.169.90:4011/changePassword",
  
        {
        userID:this.state.id,
        oldPassword:this.state.oldpassword,
        newPassword:this.state.newpassword
        }
      )
      .then((response) => {
        console.log(response)
        if(response.data.message==="Wrong Password"){
          this.setState({visible:true, classvalidate:"alert alert-warning"})
          this.setState({responseToPost:" Please check your old password and try again !"})
        }
        else{
       this.setState({visible:true,classvalidate:"alert alert-success"})
       this.setState({responseToPost:" Your Password has been sucessfully updated"})
       this.setState({oldpassword:"",newpassword:"",confirmpassword:""})
        }
     
      })
  
      .catch((error) => {
        console.log(error);
     
      
      });
   }
    
    
    
    
    }


  
  
  render(){
 return(
   <React.Fragment>
    
    <Container className="py-5">
      <div className="pagepath mb-3">
        <NavLink to="#"><FontAwesomeIcon icon={faHome} /></NavLink>
        <span>Change Password</span>
      </div>

      <Row>
        <Col xs={12} sm={12} md={3} lg={3}></Col>
        <Col xs={12} sm={12} md={9} lg={9}>
          <h1 className="page-heading mb-5">Change <span>Password</span></h1>
        </Col>
      </Row>

      <Row>
        <Col xs={12} sm={12} md={3} lg={3}>
          <SideBar />
        </Col>
        <Col xs={12} sm={12} md={9} lg={9}>
          <section className="right-section">
            <div className="p-4">

              <Row className="mb-3">
                <Col xs={12} sm={12} md={3} lg={3}>
                  <Label className="label-h">Old Password :</Label>
                </Col>
                <Col xs={12} sm={12} md={9} lg={9}>
                  <Input type="password" value={this.state.oldpassword} name="oldpassword" onChange={this.handleChange}  placeholder="Enter Old Password" />
                  <div className="modaltext " style={{   paddingLeft:"6px",  color: "#a94442", fontWeight: "bold",fontSize:"0.8em",wordSpacing:"1px", paddingTop:"2px"}}>{this.state.oldMessage}</div>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col xs={12} sm={12} md={3} lg={3}>
                  <Label className="label-h">New Password :</Label>
                </Col>
                <Col xs={12} sm={12} md={9} lg={9}>
                  <Input type="password" placeholder="Enter New Password" value={this.state.newpassword} name="newpassword" onBlur={this.handleNew} onChange={this.handleChange} />
                  <div className="modaltext " style={{   paddingLeft:"6px",  color: "#a94442", fontWeight: "bold",fontSize:"0.8em",wordSpacing:"1px", paddingTop:"2px"}}>{this.state.newMessage}</div>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col xs={12} sm={12} md={3} lg={3}>
                  <Label className="label-h">Confirm New Password :</Label>
                </Col>
                <Col xs={12} sm={12} md={9} lg={9}>
                  
                  <Input type="password" placeholder="Enter Confirm New Password" value={this.state.confirmpassword} name="confirmpassword" onChange={this.handleChange} onBlur={this.handleConfirm}/>
                  <div className="modaltext " style={{   paddingLeft:"6px",  color: "#a94442", fontWeight: "bold",fontSize:"0.8em",wordSpacing:"1px", paddingTop:"2px"}}>{this.state.confirmMessage}</div>
                </Col>
              </Row>
              <Alert   style={{marginTop:"20px"}} className={this.state.classvalidate+" "+ "col-sm-8 offset-sm-2 "} isOpen={this.state.visible}>
       
       <p style={{textAlign:"center"}}>
      {this.state.responseToPost}
       </p>
     </Alert>
              <Button type="submit" className="submit-btn my-4 col-sm-3 offset-sm-5" onClick={this.handleSubmit}>Submit</Button>
            </div>
          </section>
        </Col>
      </Row>

    </Container>

   </React.Fragment>
 )
 }
}
export default ChangePassword;