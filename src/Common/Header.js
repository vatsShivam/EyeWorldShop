import React, { PureComponent } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Container,
  Row,
  Col,
  Button,
  Modal, ModalBody, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import {connect} from 'react-redux';
import 'antd/dist/antd.css';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import Signup from '../Components/Signup';
import Login from '../Components/Login';
import ForgetPassword from '../Components/ForgetPassword';
import axios from "axios";
import siteLogo from '../assets/imgs/main-logo.png';
import phoneIcon from '../assets/imgs/phone.png';
import searchIcon from '../assets/imgs/search.png';
import cartIcon from '../assets/imgs/cart.png';
import modalClose from '../assets/imgs/close.png';

// import Signup from '../Components/Signup';

import { NavLink} from 'react-router-dom';
import { ImagePath } from '../ImagePath';




import { Redirect, push } from "react-router-dom";



// import Signup from '../Components/Signup';



class Header extends PureComponent{
    state = {
        
        show:false,
        showlogin:false,
        nav:false,
        forgetpass:false,
        signout:false,
        logout:false,
        isref:false,
        ram:localStorage.getItem('token'),
        myAccount:false
      
       };
    componentWillUpdate(){
     // console.log(this.state.ram)
      if(localStorage.getItem('token')!=null){
     this.setState({myAccount:true})
    
      }
    }
       handleShow = (e) => {
        this.setState({show:true})
        
      
      
      };
     
      handleHide = () => {
        this.setState({show:false})
      
      };
      handleLogin = (e) => {
        this.setState({showlogin:true})
        
      
      
      };
      handleForgot=(e)=>{
          this.setState({forgetpass:false})
      }
      handleNav=(e)=>{
          if(this.state.nav===true){
            this.setState({nav:false})
          }
          if(this.state.nav===false){
            this.setState({nav:true})
          }
      }
      handleLoginHide = () => {
        this.setState({showlogin:false})
        
      
      };
        handleSignIn=()=>{
        this.setState({show:false})
        
        setTimeout(this.redirect, 300);
        }

     handleHide=()=>{
         this.setState({show:false})
     }

     forgotShow=()=>{
        this.setState({forgetpass:true})
        this.setState({showlogin:false})
     }
      redirect=()=>{
        this.setState({showlogin:true})
      }
      handleSign=(e)=>{

        this.setState({showlogin:false,show:true})
      }
      handleSignOut=(e)=>{


        axios

        .post(
        "http://111.93.169.90:4011/logoutProfile",
  
          {
          email:localStorage.getItem('email')
          }
        )
        .then((response) => {
          console.log(response);
          this.setState({signout:false})
       
          window.localStorage.removeItem('token');
          window.localStorage.removeItem('user');
          window.localStorage.removeItem('email');
          window.localStorage.removeItem('name');
          localStorage.setItem('doctor_account',false );
          localStorage.removeItem('patient_account');
          localStorage.removeItem('docs_account');
          this.setState({logout:true})
          this.setState({myAccount:false})
          
        })
  
        .catch((error) => {
          console.log(error);
        });
      
      
      
        e.preventDefault();

      }
      handleLogout=(e)=>{
        this.setState({signout:true})
       

      }
    
      componentDidMount(){
        if(this.state.ram!==null){
            this.setState({signout:true})
          }
          
          
      }
 render(){
    console.log(this.state.signout)
         if(this.props.myName.isNav===false){
    if (this.state.logout===true) {
        this.setState({logout:false})
        return <Redirect to="/Home" />;
       
      } else {
   
  return(
    
    <div>
           

    <Modal isOpen={this.state.show} >
<ModalBody className="blue-bg px-5">
 <img src={modalClose} alt="modal close"className="modal-close" onClick={this.handleHide} />
 <Signup  
 handleSign={this.handleSignIn}
 
 
  />



</ModalBody>
</Modal>  


<Modal isOpen={this.state.showlogin} >
<ModalBody className="blue-bg px-5">
 <img src={modalClose} alt="modal close"className="modal-close" onClick={this.handleLoginHide} />
 <Login
 handleForgot={this.forgotShow}
 patientLog={this.handleLoginHide}
 handleSign={this.handleSign}
 signout={this.handleLogout}
 />



</ModalBody>
</Modal>  
<Modal isOpen={this.state.forgetpass} >
<ModalBody className="blue-bg px-5">
 <img src={modalClose} alt="modal close"className="modal-close" onClick={this.handleForgot} />
 <ForgetPassword />



</ModalBody>
</Modal>  


<section className="top-header">
 <Container>
     <Row>
         <Col md="6">
             <p className="my-2 text-white">
                 <span className="mr-2"><img src={phoneIcon} alt=""></img></span>1234 - 567 - 8900 ( Online Sales & Complaints )
             </p>
         </Col>
         <Col md="6">
             {!this.state.signout &&
             <div className="float-right">
                 <Button color="link" onClick={this.handleShow}>Sign Up </Button>
                 <span className="seperator px-1">|</span>
                 <Button color="link" onClick={this.handleLogin} >Sign In</Button>
             </div>
} 
{this.state.signout &&
             <div className="float-right">
                 <Button color="link" onClick={this.handleSignOut}>Sign Out </Button>
                
             </div>
}
         </Col>
     </Row>
 </Container>
</section>
      <header>
          <Navbar color="light" light expand="md">
              <Container>
              <NavLink to="/Home"><img src={siteLogo} alt="logo"></img></NavLink>
                  <NavbarToggler  onClick={this.handleNav} />
                  <Collapse  navbar isOpen={this.state.nav}>
                      <Nav className="ml-auto" navbar>
                          <NavItem>
                              <NavLink className="nav-link" to="/About">About</NavLink>
                          </NavItem>
                          {/* <NavItem>
                              <NavLink className="nav-link" to="">Products</NavLink>
                          </NavItem> */}
                       <NavItem>
                    <div style={{paddingTop:"8px",paddingLeft:"2px",paddingRight:"2px"}}>
    <Dropdown overlay={menu}>
    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
     
     <span style={{color:"#15191c",  textTransform:"uppercase",
    fontWeight: "500"}}>Products   </span> <DownOutlined  /> 
    
    </a>
  
  </Dropdown>
  </div>
  </NavItem>       
                          <NavItem>
                              <NavLink className="nav-link" to="/Brand">Brand</NavLink>
                          </NavItem>
                          <NavItem>
                              <NavLink className="nav-link" to="">Track your order</NavLink>
                          </NavItem>
                          <NavItem>
                              <NavLink className="nav-link" to="/Contact">Contact</NavLink>
                          </NavItem>
                          
                        {/* <NavItem >
                              <NavLink className="nav-link" to="/Profile" >My Account</NavLink>
                          </NavItem>
                        */} 
                         
                      </Nav>
                   
                      <div className="icons-holder">
                        {this.state.myAccount===true &&
                      <NavLink to="/Profile" style={{textDecoration:"none",color:"#15191c" ,paddingTop:"8px",}}> <span style={{    color:" #15191c !important",
    textTransform:"uppercase",
    fontWeight: "500",
   
                        }}>My Account</span></NavLink> }
                          <Button color="link" className="search-icon"><img src={searchIcon} alt=""></img></Button>
                          <Button color="link" className="cart-icon">
                              <img src={cartIcon} alt=""></img>
                              <span className="count">0</span>
                          </Button>
                      </div>
                  </Collapse>
              </Container>
          </Navbar>
      </header>
      </div>
      
    
  )
                        }

} else if(this.props.myName.isNav===true){
   return (
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
const menu = (
  <Menu>
    <Menu.Item>
    <NavLink color="link" to="/ContactLensList" style={{textDecoration:"none"}}>Contact Lens</NavLink>
    </Menu.Item>
    <Menu.Item>
    <NavLink color="link" to="/OpticalLensList" style={{textDecoration:"none"}}>Optical Lens</NavLink>
    </Menu.Item>
    <Menu.Item>
    <NavLink color="link" to="/EyeWearList" style={{textDecoration:"none"}}>Eyewear</NavLink>
    </Menu.Item>
    <Menu.Item>
    <NavLink color="link" to="/AccessoryList" style={{textDecoration:"none"}}>Lens Care & Accessory</NavLink>
    </Menu.Item>
  </Menu>
);
export default connect(mapStateToProps) (Header);