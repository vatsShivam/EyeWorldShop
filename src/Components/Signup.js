import React ,{ PureComponent } from 'react';
import { Button, Label,Input, FormGroup,Form,Alert } from 'reactstrap';
import { NavLink} from 'react-router-dom';
import axios from "axios";
import modalClose from '../assets/imgs/close.png';
import shivam from "../assets/imgs/eye.svg"
class Signup extends PureComponent {
  state = {
   first_name:"",
   last_name:"",
   email:"",
   password:"",
   cpassword:"",
   phone:"",
   special:[],
   specialization:"",
   responseToPost:"",
   isSpecialForm:true,
   isChecked:true,
   isChecked1:false,
   isPass:false,
   emailMessage:"",
   phoneMessage:"",
   passwordMessage:"",
   isemailValid:false,
   isPhoneValid:false,
   isPasswordValid:false,
   emailNullMessage:"",
   firstMessage:"",
   lastMessage:"",
   specialMessage:"",
   checkMessage:"",
   visible:false,
   isDisabled:false,
   isReset:false,
   hidden: true,
   hiddenc:true,
   classvalidate:"",
  };
  toggleShow=(e)=> {
    this.setState({ hidden: !this.state.hidden });
    e.preventDefault();
  }
  toggleShowc=(e)=> {
    this.setState({ hiddenc: !this.state.hiddenc });
    e.preventDefault();
  }

  handleFirstName = (e) => {
    this.setState({ first_name: e.target.value });
    

      this.setState({firstMessage:""})
    
    this.setState({visible:false})
    this.setState({responseToPost:""})
  };
 
  handleLastName = (e) => {
    this.setState({ last_name: e.target.value });
   

      this.setState({lastMessage:""})
    
    this.setState({visible:false})
    this.setState({responseToPost:""})
  };
  handleEmail = (e) => {
    this.setState({ email: e.target.value });
    this.setState({visible:false})
    this.setState({responseToPost:""})
    this.setState({ isemailValid:false})
    this.setState({emailMessage:""})
    
  };
  handlePassword = (e) => {
    this.setState({ password: e.target.value });
    this.setState({visible:false})
    this.setState({responseToPost:""})
    this.setState({passwordMessage:""})
    this.setState({checkMessage:""})
   
  };
  handlePhone = (e) => {
    this.setState({ phone: e.target.value });
    this.setState({visible:false})
    this.setState({responseToPost:""})
 
    this.setState({phoneMessage:""})
  };
  handleConfirmPassword = (e) => {
    this.setState({ cpassword: e.target.value });
    this.setState({visible:false})
    this.setState({responseToPost:""})
    this.setState({checkMessage:""})
   
  };
  handleSpecial= (e) => {
  this.setState({ specialization: e.target.value });
    
 

    this.setState({specialMessage:""})
  
  };
  checkPassword=(e)=>{
    if(this.state.password==this.state.cpassword){
      this.setState({checkMessage:""})
   
    }
   else{
    this.setState({checkMessage:"Both password should be same "})
   }
  }
  
 validateEmail=(e)=>{
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if(this.state.email.match(mailformat)){
    this.setState({emailMessage:"", isemailValid:true})
  }
  else if(this.state.email.length>0){
    this.setState({emailMessage:"Please enter a valid email address"})
    this.setState({ isemailValid:false})
  }
 }
 validatePhone=(e)=>{
  
  var reg=/^[0-9]*[.]?[0-9]*$/;
  
  console.log()
   {/*
  var phoneno = /^\d{10}$/;
  if(this.state.phone.match(phoneno)  ){
    this.setState({phoneMessage:"", isPhoneValid:true})
   
   
  }
  else{

    this.setState({phoneMessage:"Please enter 10 digit mobile number"})
  
}
*/}
if(this.state.phone.startsWith('09') && this.state.phone.length===8 &&  reg.test(this.state.phone)===true){
  
  this.setState({phoneMessage:"", isPhoneValid:true})
}
else if(this.state.phone.startsWith('09') && this.state.phone.length===11 &&  reg.test(this.state.phone)===true){
  
  this.setState({phoneMessage:"", isPhoneValid:true})
}

else{

  this.setState({phoneMessage:"Please enter a valid mobile number"})
   
  this.setState({ isPhoneValid:false})

}
 }
 validatePassword=(e)=>{
  console.log(this.state.password.length)
  if(this.state.password.length>3 && this.state.password.length<9){
    this.setState({passwordMessage:"", isPasswordValid:true})
   
   
  }
  else {
    this.setState({passwordMessage:"Password length should be between 4 to 8"})
    this.setState({isPasswordValid:false})
  }
 }
  

  handlePatient=()=>{
    this.setState({isSpecialForm:false})
    this.setState({ isChecked:false})
    this.setState({ isChecked1:true})
 
    this.setState({first_name:"",last_name:"",phone:"",password:"",cpassword:"",email:"",responseToPost:"",isPhoneValid:false,isemailValid:false,emailMessage:"",phoneMessage:"",isPass:false,firstMessage:"",lastMessage:"",specialMessage:"",checkMessage:"",passwordMessage:"",specialization:"",visible:false,isDisabled:false,isReset:false});
  }
  handleDoctor=()=>{
    this.setState({isSpecialForm:true})
    this.setState({ isChecked:true})
    this.setState({ isChecked1:false})
    this.setState({first_name:"",last_name:"",phone:"",password:"",cpassword:"",email:"",responseToPost:"",isemailValid:false,isPhoneValid:false,emailMessage:"",phoneMessage:"",isPass:false,firstMessage:"",lastMessage:"",specialMessage:"",checkMessage:"",passwordMessage:"",specialization:"",visible:false,isDisabled:false,isReset:false});
  }
  handleReset=(e)=>{
    this.setState({first_name:"",last_name:"",phone:"",password:"",cpassword:"",email:"",responseToPost:"",isemailValid:false,isPhoneValid:false,emailMessage:"",phoneMessage:"",isPass:false,firstMessage:"",lastMessage:"",specialMessage:"",checkMessage:"",passwordMessage:"",specialization:"",visible:false,isDisabled:false,isReset:false});
    e.preventDefault();
  }
  handleSubmit=(e)=>{
    if(this.state.email===""){
      this.setState({emailMessage:"This filed is required"})
      
    }
   if(this.state.phone.length==0){

    this.setState({phoneMessage:"This field is required"})
   }
   if(this.state.first_name==""){

    this.setState({firstMessage:"This field is required"})
   }
   if(this.state.last_name==""){

    this.setState({lastMessage:"This field is required"})
   }
   if(this.state.password==""){

    this.setState({passwordMessage:"This field is required"})
   }
   if(this.state.specialization=="" && this.state.isSpecialForm===true){

    this.setState({specialMessage:"This field is required"})
   }
   if(this.state.cpassword==""){
    this.setState({checkMessage:"This field is required"})

   }
   if(this.state.cpassword!==this.state.password){
    this.setState({checkMessage:"Both Password should be same "})

   }
    if(this.state.isSpecialForm===true && this.state.isemailValid===true && this.state.isPhoneValid===true && this.state.isPasswordValid===true && this.state.password===this.state.cpassword && this.state.first_name!=="" && this.state.last_name!=="" && this.state.specialization!==""){
     
      axios

      .post(
      "http://111.93.169.90:4011/registerProfile",

        {
        fullName:this.state.first_name+ " " + this.state.last_name,
        contactNo:this.state.phone,
        email:this.state.email,
        specialization:this.state.specialization,
        password:this.state.password,
        type:1
        }
      )
      .then((response) => {
        console.log(response)
        if(response.data.message==="User sucessfully created")
       {
          
        this.setState({isDisabled:true})
        this.setState({visible:true,classvalidate:"alert alert-success"})
        this.setState({responseToPost:"Congratulations Your account has been successfully created and you will be notified once your account will be activated"})
        this.setState({first_name:"",last_name:"",phone:"",password:"",cpassword:"",email:"",isemailValid:false,isPhoneValid:false,emailMessage:"",phoneMessage:"",isPass:false,firstMessage:"",lastMessage:"",specialMessage:"",checkMessage:"",passwordMessage:"",specialization:"",isDisabled:false,});
        
       }
       else if(response.data.message==="Mail exists"){
        this.setState({visible:true,classvalidate:"alert alert-warning"})
        this.setState({responseToPost:"The email you have entered is already exist Please try with another email"})
       }
        
      })

      .catch((error) => {
        console.log(error);
       
      });
    }
   else if(this.state.isSpecialForm===false && this.state.isemailValid===true && this.state.isPhoneValid===true && this.state.isPasswordValid===true && this.state.password===this.state.cpassword && this.state.first_name!=="" && this.state.last_name!==""){
     
      axios

      .post(
      "http://111.93.169.90:4011/registerProfile",

        {
        fullName:this.state.first_name+this.state.last_name,
        contactNo:this.state.phone,
        email:this.state.email,
        password:this.state.password,
        type:2,
        status:1,
        }
      )
      .then((response) => {
        console.log(response)
        if(response.data.message==="User sucessfully created")
        {
      
        this.setState({isDisabled:true})
        this.setState({visible:true,classvalidate:"alert alert-success"})
       
        this.setState({responseToPost:"Congratulations Your account has been successfully created"})
        this.setState({first_name:"",last_name:"",phone:"",password:"",cpassword:"",email:"",isemailValid:false,isPhoneValid:false,emailMessage:"",phoneMessage:"",isPass:false,firstMessage:"",lastMessage:"",specialMessage:"",checkMessage:"",passwordMessage:"",specialization:"",isDisabled:false});
        }
        else if(response.data.message==="Mail exists"){
          this.setState({visible:true,classvalidate:"alert alert-warning"})
          this.setState({responseToPost:"The email you have entered is already exist Please try with another email"})
         }
        
      })

      .catch((err) => {
   
      });


    }
     e.preventDefault();
  }
 
  render(){
  
 return(
   <React.Fragment>
     <div>
    
     <h4 className="modal-title">Sign Up</h4>

<div className="radio-group d-flex justify-content-center mt-5 mb-4">
  <div>
    <Input id="cr1" name="rem" type="radio" className="custom-control-input form-check-input" value="Doctor" checked={this.state.isChecked}/>
    <Label for="cr1" className="btn-radio" onClick={this.handleDoctor} >Doctor</Label>
  </div>
  <div>
    <Input id="cr2" name="rem" type="radio" className="custom-control-input form-check-input" value="Patient" checked={this.state.isChecked1}/>
    <Label for="cr2" className="btn-radio"onClick={this.handlePatient} >Patient</Label>
  </div>
</div>
<Form >
<FormGroup className="mb-4">
  <Input type="text" placeholder="First Name"   onChange={this.handleFirstName}   value={this.state.first_name} className="userIcon" required />
  <div className="modaltext " style={{   paddingLeft:"6px",  color: "#a94442", fontWeight: "bold",fontSize:"0.8em",wordSpacing:"1px", paddingTop:"2px"}}>{this.state.firstMessage}</div>
</FormGroup>
<FormGroup className="mb-4">
  <Input type="text"  onChange={this.handleLastName} placeholder="Last Name"   value={this.state.last_name} className="userIcon"  required/>
  <div className="modaltext " style={{   paddingLeft:"6px",  color: "#a94442", fontWeight: "bold",fontSize:"0.8em" ,wordSpacing:"1px", paddingTop:"2px"}}>{this.state.lastMessage}</div>
</FormGroup>
<FormGroup className="mb-4">
  <Input type="email" onChange={this.handleEmail} placeholder="Email Id" className="emailIcon" onBlur={this.validateEmail} value={this.state.email} required/>
  <div className="modaltext " style={{   paddingLeft:"6px",  color: "#a94442", fontWeight: "bold",fontSize:"0.8em",wordSpacing:"1px", paddingTop:"2px" }}>{this.state.emailMessage}</div>
</FormGroup>
{this.state.isSpecialForm &&

 <FormGroup className="mb-4">
 <Input type="text"  placeholder="Specialization" onChange={this.handleSpecial} className="emailIcon"   value={this.state.specialization} />
 <div className="modaltext " style={{   paddingLeft:"6px",  color: "#a94442", fontWeight: "bold",fontSize:"0.8em",wordSpacing:"1px", paddingTop:"2px" }}>{this.state.specialMessage}</div>
</FormGroup>

}
<FormGroup className="mb-4">

<div style={{display:"flex"}}>
  <Input     type={this.state.hidden ? "password" : "text"} onChange={this.handlePassword} placeholder="Password" onBlur={this.validatePassword} className="passwordIcon"  value={this.state.password} required/>
  <button onClick={this.toggleShow} style={{backgroundColor:"#D6F2FA",height:"42px",border:"1px solid #D6F2FA"}}><img src={shivam}/></button>
  </div>
  <div className="modaltext " style={{   paddingLeft:"6px",  color: "#a94442", fontWeight: "bold",fontSize:"0.8em",wordSpacing:"1px", paddingTop:"2px" }}>{this.state.passwordMessage}</div>
</FormGroup>
<FormGroup className="mb-4">
<div style={{display:"flex"}}>
  <Input type={this.state.hiddenc ? "password" : "text"}  onChange={this.handleConfirmPassword} onBlur={this.checkPassword}  placeholder="Confirm Password" className="passwordIcon"  value={this.state.cpassword} required/>
  <button onClick={this.toggleShowc} style={{backgroundColor:"#D6F2FA",height:"42px",border:"1px solid #D6F2FA"}}><img src={shivam}/></button>
  </div>
  <div className="modaltext " style={{   paddingLeft:"6px",  color: "#a94442", fontWeight: "bold",fontSize:"0.8em",wordSpacing:"1px", paddingTop:"2px" }}>
 {this.state.checkMessage}
</div>

</FormGroup>

<FormGroup className="mb-4">
  <Input type="text"   onInput={this.handlePhone} placeholder="Phone No"  onBlur={this.validatePhone} className="phoneIcon"  value={this.state.phone} />
  <div className="modaltext " style={{   paddingLeft:"6px",  color: "#a94442", fontWeight: "bold",fontSize:"0.8em" ,wordSpacing:"1px", paddingTop:"2px"}}>{this.state.phoneMessage}</div>
</FormGroup>
{/*{this.state.isReset &&  
   <Button type="submit" className="submit-btn my-1" onClick={this.handleReset}>Reset</Button>
}*/}
<Button type="submit" className="submit-btn my-4"onClick={this.handleSubmit} disabled={this.state.isDisabled} >Submit</Button>

<Alert  style={{marginTop:"30px"}}  isOpen={this.state.visible} className={this.state.classvalidate}>
       
       <p>
        {this.state.responseToPost}
       </p>
     </Alert>

</Form>
<div className="modaltext text-center"> Already have an account? <a href="#" style={{textDecoration:"none"}}> <span style={{fontWeight:'bold',color:"#5CC8D7FF"}} onClick={this.props.handleSign}> Sign In</span></a></div>
</div>
   </React.Fragment>
 )
 }
}
export default Signup;