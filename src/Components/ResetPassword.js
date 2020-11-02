import React, { PureComponent } from "react";

import {
  Label,
  Input,
  Container,
  Row,
  Col,
  Button,
  Alert,
  Toast,
} from "reactstrap";

import axios from "axios";
import { connect } from "react-redux";
class ResetPassword extends PureComponent {
  state = {
    newMessage: "",
    confirmMessage: "",
    visible: false,
    newpassword: "",
    confirmpassword: "",
    isNewValid: false,
    responseToPost:""
  };
  componentWillMount() {
    this.props.changeNav();
  }
  componentWillUnmount() {
    this.props.changeNav();
  }
  handleChange = (e) => {
    let change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
    this.setState({ newMessage: "" });
    this.setState({ confirmMessage: "" });
    this.setState({ visible: false });
    this.setState({ responseToPost: "" });
  };
  handleNew = (e) => {
    if (
      this.state.newpassword.length > 3 &&
      this.state.newpassword.length < 9
    ) {
      this.setState({ newMessage: "", isNewValid: true });
    } else if (this.state.newpassword !== "") {
      this.setState({ newMessage: "Password length should be between 4 to 8" });
      this.setState({ isNewValid: false });
    }
  };
  handleConfirm = (e) => {
    if (this.state.newpassword === this.state.confirmpassword) {
      this.setState({ confirmMessage: "" });
    } else if (this.state.confirmpassword !== "") {
      this.setState({ confirmMessage: "Both passwords should be same" });
    }
  };
  handleSubmit=(e)=>{
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const token=params.get('token')
    const id = params.get('id');
 
    e.preventDefault();
    console.log(this.state.newpassword)
  
    if(this.state.newpassword===""){
      this.setState({newMessage:"This field is required "})
   }
   if(this.state.confirmpassword===""){
    this.setState({confirmMessage:"This field is required "})
   }
  if(this.state.newpassword!==this.state.confirmpassword){
    this.handleConfirm()
  }
    if(this.state.isNewValid===true && this.state.confirmpassword===this.state.newpassword ){

      axios

      .post(
      "http://111.93.169.90:4011/resetPassword",
  
        {
       // userID:this.state.id,
      //  oldPassword:this.state.oldpassword,
       // newPassword:this.state.newpassword
       token:token,
         userID:id,
       password:this.state.newpassword
        }
      )
      .then((response) => {
       
       
       
       this.setState({visible:true})
       this.setState({responseToPost:" Your Password has been sucessfully updated and go to Login page to continue"})
      
     
      })
  
      .catch((error) => {
        console.log(error);
     
      
      });
   }
    
    
    
    
    }
  render() {
   

    return (
      <React.Fragment>
        <Container>
          <h1 style={{ textAlign: "center", marginTop: "70px" }}>
            Reset Password
          </h1>
          <div style={{ marginTop: "40px" }}>
            <Row className="mb-3">
              <Col xs={12} sm={12} md={3} lg={3}>
                <Label className="label-h">New Password:</Label>
              </Col>
              <Col xs={12} sm={12} md={9} lg={7}>
                <Input
                  type="password"
                  placeholder="New Password"
                  name="newpassword"
                  value={this.state.newpassword}
                  onBlur={this.handleNew}
                  onChange={this.handleChange}
                />
                <div
                  className="modaltext "
                  style={{
                    paddingLeft: "6px",
                    color: "#a94442",
                    fontWeight: "bold",
                    fontSize: "0.8em",
                    wordSpacing: "1px",
                    paddingTop: "2px",
                  }}
                >
                  {this.state.newMessage}
                </div>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col xs={12} sm={12} md={3} lg={3}>
                <Label className="label-h"> Confirm New Password:</Label>
              </Col>
              <Col xs={12} sm={12} md={9} lg={7}>
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  value={this.state.confirmpassword}
                  name="confirmpassword"
                  onChange={this.handleChange}
                  onBlur={this.handleConfirm}
                />
                <div
                  className="modaltext "
                  style={{
                    paddingLeft: "6px",
                    color: "#a94442",
                    fontWeight: "bold",
                    fontSize: "0.8em",
                    wordSpacing: "1px",
                    paddingTop: "2px",
                  }}
                >
                  {this.state.confirmMessage}
                </div>
              </Col>
            </Row>
          </div>
          <Button
            type="submit"
            className="submit-btn my-4 col-sm-4 offset-sm-4"
            onClick={this.handleSubmit}
          >
            Submit
          </Button>

          <Alert
            style={{ marginTop: "30px" }}
            className="col-sm-6 offset-sm-3"
            isOpen={this.state.visible}
          >
            <p style={{ textAlign: "center" }}>
             {this.state.responseToPost}
            </p>
          </Alert>
        </Container>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    myName: state.isNav,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    changeNav: () => {
      dispatch({ type: "CHANGE_NAV" });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
