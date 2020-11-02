import React, { PureComponent } from "react";
import SideBar from "../Common/SideBar";
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
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBoxTissue } from "@fortawesome/free-solid-svg-icons";
import { ImagePath } from "../ImagePath";
import axios from "axios";
import { connect } from "react-redux";
import { Redirect, push } from "react-router-dom";

class ProfileEdit extends PureComponent {
  state = {
    sname: "",
    name: "",
    id: localStorage.getItem("user"),
    phone: "",
    email: "",
    adress: "",
    age: "",
    gender: "",
    account_check: false,
    specilization: "",
    education: "",
    degree: "",
    pdf: "",
    selectedFile: null,
    visible: false,
    responseToPost: "",
    token: localStorage.getItem("token"),
    redirect: false,
    isemailValid: true,
    emailMessage: "",
    classvalidate:"",
  };
  validateEmail = (e) => {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (this.state.email.match(mailformat)) {
      this.setState({ emailMessage: "", isemailValid: true });
    } else if (this.state.email.length > 0) {
      this.setState({ emailMessage: "Please enter a valid email address" });
      this.setState({ isemailValid: false });
    }
  };
  componentDidMount() {
    // console.log(this.state.id)
    axios
      .post("http://111.93.169.90:4011/findProfileByID", {
        userID: this.state.id,
      })
      .then((resp) => {
        console.log(resp.data);
        //var final= resp.data.find( ({ email }) => email === localStorage.getItem('email') );
        // console.log(final)
        //localStorage.setItem('name',resp.data.fullName)
        this.setState({ sname: resp.data.fullName });
        this.setState({
          name: resp.data.fullName,
          phone: resp.data.contactNo,
          email: resp.data.email,
          specilization: resp.data.specialization,
          education: resp.data.education,
          degree: resp.data.degree,
          adress: resp.data.address,
          gender: resp.data.gender,
        });
        this.props.changeName(resp.data.fullName);

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
  componentWillMount() {
    if (localStorage.getItem("doctor_account") == "true") {
      this.setState({ account_check: true });
    }
  }
  handleChange = (e) => {
    let change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
    this.setState({ visible: false });
    this.setState({ responseToPost: "" });

    this.setState({ emailMessage: "" });
  };
  redirect = () => {
    this.setState({ redirect: true });
  };

  onChangeHandler = (event) => {
    this.setState({
      selectedFile: event.target.files[0],
    });

    this.setState({ visible: false });
    this.setState({ responseToPost: "" });
  };
  handleImage = (e) => {
    this.setState({ visible: false });
    if (this.state.selectedFile === null) {
      this.setState({ visible: true });
      this.setState({
        responseToPost: "Please select an image to edit profile",
        classvalidate:"alert alert-warning"
      });
    } else if (this.state.selectedFile !== null) {
      this.setState({ responseToPost: "" });
      const formData = new FormData();

      formData.append("userID", this.state.id);
      formData.append("profilePic", this.state.selectedFile);

      axios({
        url: "http://111.93.169.90:4011/imageUpload",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      })
        .then((response) => {
          window.location.reload(false);
          console.log(response);
        })

        .catch((error) => {
          console.log(error);
        });
    }

    e.preventDefault();
  };
  handleSubmit = (e) => {
    if (
      this.state.selectedFile !== null &&
      this.state.selectedFile !== undefined
    ) {
      this.setState({ visible: true });
      this.setState({
        responseToPost: "Upload or clear the selected picture to continue",
        classvalidate:"alert alert-warning"
      });
    } else {
      if (this.state.isemailValid === false) {
        this.setState({ emailMessage: "Please enter a valid email address" });
      } else if (this.state.isemailValid === true) {
        this.setState({ emailMessage: "" });
        axios

          .post(
            "http://111.93.169.90:4011/editProfile",

            {
              userID: this.state.id,
              fullName: this.state.name,
              contactNo: this.state.phone,
              email: this.state.email,
              specialization: this.state.specilization,
              education: this.state.education,
              degree: this.state.degree,
              address: this.state.adress,
              gender: this.state.gender,
              dateOfBirth: this.state.age,
            }
          )
          .then((response) => {
            console.log(response);
            this.setState({ visible: true });
            this.setState({
              responseToPost: " Your Profile has been successfully updated",
              classvalidate:"alert alert-success"
            });
            setTimeout(this.redirect, 2000);
          })

          .catch((error) => {
            console.log(error);
          });
      }
    }
    e.preventDefault();
  };
  render() {
    console.log(this.state.selectedFile);
    if (this.state.token === null) {
      return <Redirect to="/" />;
    } else if (this.state.redirect === true && this.state.token !== null) {
      return <Redirect to="/Profile" />;
    } else {
      return (
        <React.Fragment>
          <Container className="py-5">
            <div className="pagepath mb-3">
              <NavLink to="#">
                <FontAwesomeIcon icon={faHome} />
              </NavLink>
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
                    <h5 className="heading2">{this.state.sname}</h5>
                  </div>
                  <hr />
                  <div className="p-4">
                    <div className="d-flex justify-content-between">
                      <p className="heading3">Personal Info</p>
                      <button className="trns-btn">
                        <img src={ImagePath.editIcon} alt="edit icon" />
                      </button>
                    </div>

                    <Row className="mb-3">
                      <Col xs={12} sm={12} md={3} lg={3}>
                        <Label className="label-h">Full Name :</Label>
                      </Col>
                      <Col xs={12} sm={12} md={9} lg={9}>
                        <Input
                          type="text"
                          placeholder="Enter Full Name"
                          value={this.state.name}
                          onInput={this.handleChange}
                          name="name"
                        />
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col xs={12} sm={12} md={3} lg={3}>
                        <Label className="label-h">Phone No :</Label>
                      </Col>
                      <Col xs={12} sm={12} md={9} lg={9}>
                        <Input
                          type="text"
                          placeholder="Enter Phone No"
                          value={this.state.phone}
                          onInput={this.handleChange}
                          name="phone"
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
                          {this.state.phoneMessage}
                        </div>
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col xs={12} sm={12} md={3} lg={3}>
                        <Label className="label-h">Email Id :</Label>
                      </Col>
                      <Col xs={12} sm={12} md={9} lg={9}>
                        <Input
                          type="tel"
                          placeholder="Enter Email Id"
                          value={this.state.email}
                          onChange={this.handleChange}
                          onBlur={this.validateEmail}
                          name="email"
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
                          {this.state.emailMessage}
                        </div>
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col xs={12} sm={12} md={3} lg={3}>
                        <Label className="label-h">Address :</Label>
                      </Col>
                      <Col xs={12} sm={12} md={9} lg={9}>
                        <Input
                          type="text"
                          placeholder="Enter Address"
                          value={this.state.adress}
                          onInput={this.handleChange}
                          name="adress"
                        />
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col xs={12} sm={12} md={3} lg={3}>
                        <Label className="label-h">Age :</Label>
                      </Col>
                      <Col xs={12} sm={12} md={9} lg={9}>
                        <Input
                          type="date"
                          placeholder="Enter Date Of Birth"
                          value={this.state.age}
                          onInput={this.handleChange}
                          name="age"
                        />
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col xs={12} sm={12} md={3} lg={3}>
                        <Label className="label-h">Gender :</Label>
                      </Col>
                      <Col xs={12} sm={12} md={9} lg={9}>
                        <Input
                          type="text"
                          placeholder="Enter Gender"
                          value={this.state.gender}
                          onInput={this.handleChange}
                          name="gender"
                        />
                      </Col>
                    </Row>

                    {this.state.account_check && (
                      <div>
                        <Row className="mb-3">
                          <Col xs={12} sm={12} md={3} lg={3}>
                            <Label className="label-h">Specilization :</Label>
                          </Col>
                          <Col xs={12} sm={12} md={9} lg={9}>
                            <Input
                              type="text"
                              placeholder="Enter Specilization"
                              value={this.state.specilization}
                              onInput={this.handleChange}
                              name="specilization"
                            />
                          </Col>
                        </Row>
                        <Row className="mb-3">
                          <Col xs={12} sm={12} md={3} lg={3}>
                            <Label className="label-h">Degree :</Label>
                          </Col>
                          <Col xs={12} sm={12} md={9} lg={9}>
                            <Input
                              type="text"
                              placeholder="Enter Degree"
                              value={this.state.degree}
                              onInput={this.handleChange}
                              name="degree"
                            />
                          </Col>
                        </Row>
                        <Row className="mb-3">
                          <Col xs={12} sm={12} md={3} lg={3}>
                            <Label className="label-h">Education :</Label>
                          </Col>
                          <Col xs={12} sm={12} md={9} lg={9}>
                            <Input
                              type="text"
                              placeholder="Enter Education"
                              value={this.state.education}
                              onInput={this.handleChange}
                              name="education"
                            />
                          </Col>
                        </Row>
                      </div>
                    )}
                    <Row className="mb-3">
                      <Col xs={12} sm={12} md={3} lg={3}>
                        <Label className="label-h">Profile Picture :</Label>
                      </Col>
                      <Col xs={12} sm={12} md={9} lg={9}>
                        <div style={{ display: "flex" }}>
                          <Input
                            type="file"
                            placeholder="Choose Image"
                            accept="image/x-png,image/gif,image/jpeg"
                            onInput={this.onChangeHandler}
                            style={{ background: "white" }}
                            name="file"
                          />
                          <Button
                            type="submit"
                            className="submit-btn col-sm-2"
                            onClick={this.handleImage}
                          >
                            Upload
                          </Button>
                        </div>
                      </Col>
                    </Row>

                    <Alert
                     className={this.state.classvalidate+" "+ "col-sm-8 offset-sm-2 "}
                      style={{ marginTop: "20px" }}
                      
                      isOpen={this.state.visible}
                     
                    >
                      <p style={{ textAlign: "center" }}>
                        {this.state.responseToPost}
                      </p>
                    </Alert>

                    <Button
                      type="submit"
                      className="submit-btn my-4 col-sm-3 offset-sm-5"
                      onClick={this.handleSubmit}
                    >
                      Submit
                    </Button>
                  </div>
                </section>
              </Col>
            </Row>
          </Container>
        </React.Fragment>
      );
    }
  }
}
const mapStateToProps = (state) => {
  return {
    myName: state.name,
  };
};

export default connect(mapStateToProps)(ProfileEdit);
