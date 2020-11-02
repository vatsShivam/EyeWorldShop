

import React ,{ PureComponent } from 'react';
import { Button, Label,Input, FormGroup,Alert } from 'reactstrap';
import { NavLink} from 'react-router-dom';
import { Redirect, push } from "react-router-dom";
import axios from "axios";
import {connect} from 'react-redux';
class Login extends PureComponent{
  state = {
  isDoc:true,
  isPat:false,
  email:"",
  pass:"",
  redirect:false,
  dresponseToPost:"",
  emailMessage:"",
  passwordMessage:"",
  visible:false,
  responseToPost:"",
  isemailValid:false,
  isPasswordValid:false,
  classvalidate:"",
    
   };
   validateEmail=(e)=>{
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(this.state.email.match(mailformat)){
      this.setState({emailMessage:"",isemailValid:true})
    }
    else if(this.state.email.length>0){
      this.setState({emailMessage:"Please enter a valid email address"})
      this.setState({isemailValid:false})
    }
   }
   validatePassword=(e)=>{
     if(this.state.pass.length>0){
  
    if(this.state.pass.length>3 && this.state.pass.length<9){
      this.setState({passwordMessage:"", isPasswordValid:true })
     
     
    }
    else {
      this.setState({passwordMessage:"Password length should be between 4 to 8"})
      this.setState({isPasswordValid:false})
    }
  }
   }
    
   handleEmail = (e) => {
    this.setState({ email: e.target.value });
   
    this.setState({visible:false})
    this.setState({responseToPost:""})
    this.setState({ isemailValid:false})
    this.setState({emailMessage:""})
    
  };
  handlePassword = (e) => {
    this.setState({ pass: e.target.value });
  
    this.setState({visible:false})
    this.setState({responseToPost:""})
    this.setState({passwordMessage:""})
  
  };
   handlePatient=()=>{
    this.setState({isPat:true})
    this.setState({isDoc:false})
    this.setState({email:"",pass:"",dresponseToPost:"",emailMessage:"",passwordMessage:"",visible:false,responseToPost:"" ,isemailValid:false, isPasswordValid:false})
    
  }
  handleDoctor=()=>{
    this.setState({isPat:false})
    this.setState({isDoc:true})
    this.setState({email:"",pass:"",dresponseToPost:"",emailMessage:"",passwordMessage:"",visible:false,responseToPost:"", isemailValid:false, isPasswordValid:false})
   
  }
  handleSubmit=(e)=>{
    
    if(this.state.email===""){
      this.setState({emailMessage:"This field is required"})
    }
    if(this.state.pass===""){
      this.setState({passwordMessage:"This field is required"})
    }
   if(this.state.isDoc===true && this.state.isemailValid===true && this.state.isPasswordValid===true){
    axios

    .post(
    "http://111.93.169.90:4011/loginProfile",

      {
      email:this.state.email,
      password:this.state.pass,
      type:1
      }
    )
    .then((response) => {
      console.log(response)
      if(response.data.message==="Login successful")
      {
      localStorage.setItem('user', response.data.userDetails)
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('doctor_account',true );
      localStorage.setItem('docs_account',"doctor");
      this.setState({redirect:true})
      this.props.patientLog();
      this.props.signout();
     
      }
      else if(response.data.message==="Account has not yet approved your request"){
        this.setState({visible:true, classvalidate:"alert alert-warning"})
        this.setState({responseToPost:"Your account has been not activated .You will be notified on the email once it is activated"})

      }
      else if(response.data.message==="Wrong Password"){
        this.setState({visible:true, classvalidate:"alert alert-warning"})
        this.setState({responseToPost:"Your have entered the either wrong password or wrong email Please check it and try again"})

      }
      else{
        this.setState({visible:true, classvalidate:"alert alert-warning"})
        this.setState({responseToPost:"Account does not exist Please try with another Email "})
      }

    })

    .catch((error) => {
      console.log(error);
    

    });
   }
    else if(this.state.isDoc===false && this.state.isemailValid===true && this.state.isPasswordValid===true){
    
    axios

    .post(
   
     "http://111.93.169.90:4011/loginProfile",

      {
      email:this.state.email,
      password:this.state.pass,
      type:2
    
      }
    )
    .then((response) => {
      console.log(response)
      if(response.data.message==="Login successful")
      {
      localStorage.setItem('user', response.data.userDetails)
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('email', this.state.email);
      localStorage.setItem('patient_account',"patient");
      this.setState({redirect:true})
      this.props.patientLog();
      this.props.signout();
    }
    else if(response.data.message==="Wrong Password"){
      this.setState({visible:true, classvalidate:"alert alert-warning"})
      this.setState({responseToPost:"Your have entered the either wrong password or wrong email Please check it and try again"})

    }
    else{
      this.setState({visible:true, classvalidate:"alert alert-warning"})
      this.setState({responseToPost:"Account does not exist Please try with another Email "})
    }
    })

    .catch((error) => {
      console.log(error);
 
    });
    
    }
    e.preventDefault();
  }
 

  render(){
    console.log(this.props.myName)
    if (this.state.redirect) {
      return <Redirect to="/Profile" />;
    } else {
 return(

  
   <React.Fragment>
     
    <h4 className="modal-title">Login</h4>
    <div className="radio-group d-flex justify-content-center mt-5 mb-4">
      <div>
        <Input id="cr1" name="rem" type="radio" className="custom-control-input form-check-input" value="Doctor" checked={this.state.isDoc} />
        <Label for="cr1" className="btn-radio" onClick={this.handleDoctor}>Doctor</Label>
      </div>
      <div>
        <Input id="cr2" name="rem" type="radio" className="custom-control-input form-check-input" value="Patient"checked={this.state.isPat}  />
        <Label for="cr2" className="btn-radio" onClick={this.handlePatient}>Patient</Label>
      </div>
    </div>
      { this.state.isPat && 
      <p>{this.state.dresponseToPost}</p>
      }
    <FormGroup className="mb-4">
      <Input type="text" placeholder="Enter Email Id"  value={this.state.email} onChange={this.handleEmail} onBlur={this.validateEmail}  className="emailIcon" />
      <div className="modaltext " style={{   paddingLeft:"6px",  color: "#a94442", fontWeight: "bold",fontSize:"0.8em",wordSpacing:"1px", paddingTop:"2px"}}>{this.state.emailMessage}</div>
    </FormGroup>
    <FormGroup className="mb-4">
      <Input type="password" placeholder="Password" className="passwordIcon" value={this.state.pass} onChange={this.handlePassword} onBlur={this.validatePassword} />
      <div className="modaltext " style={{   paddingLeft:"6px",  color: "#a94442", fontWeight: "bold",fontSize:"0.8em",wordSpacing:"1px", paddingTop:"2px"}}>{this.state.passwordMessage}</div>
    </FormGroup>

    <div className="modaltext text-center"><a href="#" style={{textDecoration:"none"}}> <p  style={{fontWeight:'bold',color:"#5CC8D7FF"}}onClick={this.props.handleForgot}>Forgot Password ?</p></a></div>

    <Button type="submit" className="submit-btn my-4"onClick={this.handleSubmit}>Submit</Button>
    <Alert   style={{marginTop:"30px"}}  isOpen={this.state.visible}  className={this.state.classvalidate }>
       
       <p>
        {this.state.responseToPost}
       </p>
     </Alert>
    <div className="modaltext text-center">Does not have account ? <a href="#" style={{textDecoration:"none"}}> <span onClick={this.props.handleSign } style={{fontWeight:'bold',color:"#5CC8D7FF"}}>Sign Up</span></a></div>

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

export default connect(mapStateToProps)(Login);