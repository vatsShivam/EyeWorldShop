import React,{PureComponent } from 'react';
import { Button, Label,Input, FormGroup, Alert} from 'reactstrap';
import { NavLink} from 'react-router-dom';
import axios from "axios";
class ForgetPassword extends PureComponent {
  state = {
   
      email:"",
      responseToPost:"",
      visible:false,
      isemailValid:false,
      emailMessage:"",
      classvalidate:"",
      
      
     };
     handleChange = (e) => {
      this.setState({ email: e.target.value });
      this.setState({visible:false})
      this.setState({responseToPost:""})
      this.setState({emailMessage:""})
    
    
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
    handleSubmit=(e)=>{
      if(this.state.email===""){
        this.setState({emailMessage:"This field is required "})
     } 
     if(this.state.isemailValid===true){
      axios

      .post(
      "http://111.93.169.90:4011/forgotPassword",
  
        {
         email:this.state.email
        }
      )
      .then((response) => {
        console.log(response.data.message)
        if(response.data.message==="Mail Sent succesfully"){
       this.setState({visible:true,  classvalidate:"alert alert-success"})
       this.setState({responseToPost:"Password reset steps has been sent to your email inbox and  if not received  Please check your spam folder"})
       this.setState({email:""})
        }
     
      })
  
      .catch((error) => {
        this.setState({visible:true, classvalidate:"alert alert-warning"})
        this.setState({responseToPost:"Your account has not been found please try  with registered email"})
        console.log(error);
     
       
      });
     }
      e.preventDefault();



    }
  render(){
 return(
   <React.Fragment>
    <h4 className="modal-title">Forget Password</h4>
    <p className="modaltext text-center my-3">We’ll send instructions on how to reset your password to the email address you have registered with us</p>

    <FormGroup className="mb-2">
      <Input type="text" placeholder="Enter Email Id "  value={this.state.email} onChange={this.handleChange} onBlur={this.validateEmail} className="emailIcon" />
      <div className="modaltext " style={{   paddingLeft:"6px",  color: "#a94442", fontWeight: "bold",fontSize:"0.8em",wordSpacing:"1px", paddingTop:"2px" }}>{this.state.emailMessage}</div>
    </FormGroup>
    <Alert   style={{marginTop:"20px"}}    className={this.state.classvalidate} isOpen={this.state.visible}>
       
       <p style={{textAlign:"center"}}>
      {this.state.responseToPost}
       </p>
     </Alert>
  
    <Button type="submit" onClick={this.handleSubmit} className="submit-btn my-4">Send</Button>

   </React.Fragment>

 )
  }

}
export default ForgetPassword;