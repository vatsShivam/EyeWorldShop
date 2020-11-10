import React, { PureComponent } from "react";
import { Container, Row, Col, Label, Input, FormGroup } from "reactstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faStar,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import shivama from "../../assets/imgs/lefta.png";
import shivam from "../../assets/imgs/right.png";
//import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { ImagePath } from "../../ImagePath";
import RecentlyViewed from "../../Common/RecentlyViewed";
import BeatLoader from "react-spinners/BeatLoader";
import Reviews from "../../Common/Reviews";
class ContactLensDetails extends PureComponent {
  state = {
    powerLeft: "",
    powerRight: "",
    minPower: "",
    maxPower: "",
    cylinderoption: "",
    axisMessage: "",
    axisMessageR: "",
    cylinderLeft: "",
    cylinderMessage: "",
    cylinderMessageR: "",
    cylinderRight: "",
    axisLeft: "",
    axisRight: "",
    baseLeft: "",
    baseRight: "",
    diameterLeft: "",
    diameterRight: "",
    colorLeft: "",
    colorRight: "",
    product_id: "",
    lens_category: "",
    doctorDiscount: "",
    arr: [],
    cylinder: [],
    basecurve: [],
    color: [],
    diameter: [],
    manufact: "",
    brand: "",
    type: "",
    productPic: "",
    pat: localStorage.getItem("patient_account"),
    doc: localStorage.getItem("docs_account"),
    patientDiscount: "",
    productName: "",
    mrp: "",
    guestDiscount: "",
    guestPrice: "",
    guestPriceStock:"",
    patientPrice: "",
    patientPriceStock:"",
    storemrp:"",
    doctorPrice: "",
    beat: true,
    productPic0: "",
    productPic1: "",
    productPic2: "",
    productPic3: "",
    description: "",
    leftquantity:"",
    rightquantity:"",
    id: this.props.match.params.id,
  };

  componentWillMount() {
    window.scrollTo(0, 0);
 

    //console.log(localStorage.getItem('patient_account'));
  }
  componentDidMount() {
    this.getDetail();
   
  }
  componentDidUpdate(prevProps,prevState) {
    if (
      this.state.minPower !== prevState.minPower &&
      this.state.arr.length === 0
    ) {
      this.renderPower();
      
    }
   // if(prevProps!==this.props){
    //  this.getDetail()
    //}
    if(this.state.id!==this.props.match.params.id){
      this.getDetail()
    }
  }
  handlenull=()=>{
    if(this.state.rightquantity==="" && this.state.leftquantity===""){
      this.setState({mrp:this.state.storemrp,guestPrice:this.state.guestPriceStock})
    }
    }
  
  handleQuantityLeft = (e) => {
    this.setState({leftquantity:e.target.value})
    if(this.state.doc == null && this.state.pat == null ){
      
     
    
     
      if(this.state.rightquantity==="" ){
   var guest =this.state.guestPriceStock;
  var guestfinal =guest*e.target.value;
   this.setState({guestPrice:guestfinal})
   var mar =this.state.storemrp;
   var finals =mar*e.target.value;
   this.setState({mrp:finals})
      }
      if(this.state.rightquantity!=="" ){
        var guesta =this.state.guestPriceStock;
        var guestfinals =guesta*e.target.value+ guesta*this.state.rightquantity;
         this.setState({guestPrice:guestfinals})
         var mars =this.state.storemrp;
         var finale =mars*e.target.value+mars*this.state.rightquantity;
         this.setState({mrp:finale})
      }
 
    }
if(this.state.pat === "patient"){
  if(this.state.rightquantity===""){
var patie =this.state.patientPriceStock;
var patientfinal =patie*e.target.value;
 this.setState({patientPrice:patientfinal})
 var patmrp =this.state.storemrp;
 var patm =patmrp*e.target.value;
 this.setState({mrp:patm})
  }
  if(this.state.rightquantity!==""){
    var paties =this.state.patientPriceStock;
    var patientfinals =paties*e.target.value+ paties*this.state.rightquantity;
     this.setState({patientPrice:patientfinals})
     var patmrps =this.state.storemrp;
     var patms =patmrps*e.target.value+patmrps*this.state.rightquantity;
     this.setState({mrp:patms})
  }
}
  }
  handleQuantityRight = (e) => {
    this.setState({rightquantity:e.target.value})
    if(this.state.doc == null && this.state.pat == null ){
      if(this.state.leftquantity===""){
   var guest =this.state.guestPriceStock;
  var guestfinal =guest*e.target.value;
   this.setState({guestPrice:guestfinal})
   var mar =this.state.storemrp;
   var finals =mar*e.target.value;
   this.setState({mrp:finals})
      }
      if(this.state.leftquantity!==""){
        var guesta =this.state.guestPriceStock;
        var guestfinals =guesta*e.target.value+ guesta*this.state.leftquantity;
         this.setState({guestPrice:guestfinals})
         var mars =this.state.storemrp;
         var finale =mars*e.target.value+mars*this.state.leftquantity;
         this.setState({mrp:finale})
      }
 
    }
if(this.state.pat === "patient"){
  if(this.state.leftquantity===""){
    var patie =this.state.patientPriceStock;
    var patientfinal =patie*e.target.value;
     this.setState({patientPrice:patientfinal})
     var patmrp =this.state.storemrp;
     var patm =patmrp*e.target.value;
     this.setState({mrp:patm})
      }
      if(this.state.leftquantity!==""){
        var paties =this.state.patientPriceStock;
        var patientfinals =paties*e.target.value+ paties*this.state.leftquantity;
         this.setState({patientPrice:patientfinals})
         var patmrps =this.state.storemrp;
         var patms =patmrps*e.target.value+patmrps*this.state.leftquantity;
         this.setState({mrp:patms})
      }

}
   
  }
  handleQuantityRightCopy =()=> {
   
    if(this.state.doc == null && this.state.pat == null ){
    
      if(this.state.rightquantity!==""){
        var guesta =this.state.guestPriceStock;
        var guestfinals =guesta*this.state.rightquantity+ guesta*this.state.leftquantity;
         this.setState({guestPrice:guestfinals})
         var mars =this.state.storemrp;
         var finale =mars*this.state.rightquantity+mars*this.state.leftquantity;
         this.setState({mrp:finale})
      }
 
    }
    if(this.state.pat === "patient"){
      if(this.state.rightquantity===""){
    var patie =this.state.patientPriceStock;
    var patientfinal =patie*this.state.leftquantity;
     this.setState({patientPrice:patientfinal})
     var patmrp =this.state.storemrp;
     var patm =patmrp*this.state.leftquantity;
     this.setState({mrp:patm})
      }
      if(this.state.rightquantity!==""){
        var paties =this.state.patientPriceStock;
        var patientfinals =paties*this.state.leftquantity+ paties*this.state.rightquantity;
         this.setState({patientPrice:patientfinals})
         var patmrps =this.state.storemrp;
         var patms =patmrps*this.state.leftquantity+patmrps*this.state.rightquantity;
         this.setState({mrp:patms})
      }
    }
   
  }
  handleQuantityLeftCopy =()=> {
   
    if(this.state.doc == null && this.state.pat == null ){
   
      if(this.state.leftquantity!==""){
        var guesta =this.state.guestPriceStock;
        var guestfinals =guesta*this.state.rightquantity+ guesta*this.state.leftquantity;
         this.setState({guestPrice:guestfinals})
         var mars =this.state.storemrp;
         var finale =mars*this.state.rightquantity+mars*this.state.leftquantity;
         this.setState({mrp:finale})
      }
 
    }
    if(this.state.pat === "patient"){
      if(this.state.leftquantity===""){
    var patie =this.state.patientPriceStock;
    var patientfinal =patie*this.state.leftquantity;
     this.setState({patientPrice:patientfinal})
     var patmrp =this.state.storemrp;
     var patm =patmrp*this.state.leftquantity;
     this.setState({mrp:patm})
      }
      if(this.state.leftquantity!==""){
        var paties =this.state.patientPriceStock;
        var patientfinals =paties*this.state.leftquantity+ paties*this.state.rightquantity;
         this.setState({patientPrice:patientfinals})
         var patmrps =this.state.storemrp;
         var patms =patmrps*this.state.leftquantity+patmrps*this.state.rightquantity;
         this.setState({mrp:patms})
      }
    }
   
  }
  getDetail = () => {
    axios

      .post(
        "http://111.93.169.90:4011/getProductbyID",

        {
          id: this.props.match.params.id,
        }
      )
      .then((resp) => {
        console.log(resp.data);

        this.setState({
          productPic: resp.data.productPic[0],
          productPic1: resp.data.productPic[1],
          productPic2: resp.data.productPic[2],
          productPic3: resp.data.productPic[3],
          productPic0: resp.data.productPic[0],
          beat: false,
          description: resp.data.description,
        });
        this.setState({ productName: resp.data.name });
        this.setState({ doctorDiscount: resp.data.doctorDiscount });
        this.setState({ patientDiscount: resp.data.patientDiscount });
        this.setState({ mrp: resp.data.price ,storemrp:resp.data.price});
        this.setState({ brand: resp.data.brand[0].name });
        this.setState({ type: resp.data.type[0].name });
        this.setState({ guestDiscount: resp.data.guestDiscount });
        if (resp.data.guestDiscount != "") {
          // var gues=parseFloat(this.state.mrp)+parseFloat(this.state.guestDiscount)*parseFloat(this.state.mrp)/100;
          var gues =
            ((100 - parseFloat(this.state.guestDiscount)) *
              parseFloat(this.state.mrp)) /
            100;
          this.setState({ guestPrice: gues, guestPriceStock:gues });
        }
        if (resp.data.guestDiscount == "") {
          this.setState({ guestPrice: this.state.mrp, guestPriceStock:this.state.mrp });
        }
        if (resp.data.patientDiscount != "") {
          //var par=parseFloat(this.state.mrp)+parseFloat(this.state.patientDiscount)*parseFloat(this.state.mrp)/100;
          var par =
            ((100 - parseFloat(this.state.patientDiscount)) *
              parseFloat(this.state.mrp)) /
            100;
          console.log(par);
          this.setState({ patientPrice: par,patientPriceStock:par });
        }
        if (resp.data.patientDiscount == "") {
          this.setState({ patientPrice: this.state.mrp,patientPriceStock:this.state.mrp });
        }
        if (resp.data.doctorDiscount != "") {
          //var par=parseFloat(this.state.mrp)+parseFloat(this.state.patientDiscount)*parseFloat(this.state.mrp)/100;
          var par =
            ((100 - parseFloat(this.state.doctorDiscount)) *
              parseFloat(this.state.mrp)) /
            100;

          this.setState({ doctorPrice: par });
        }
        if (resp.data.doctorDiscount == "") {
          this.setState({ doctorPrice: this.state.mrp });
        }
        const obj = JSON.parse(resp.data.attributes);
        console.log(obj.cylinder);
        this.setState({ minPower: obj.minPower });
        this.setState({ maxPower: obj.maxPower });

        const cylin = obj.cylinder.split(",");
        this.setState({ cylinder: cylin });
        const base = obj.baseCurve.split(",");
        this.setState({ basecurve: base });
        const colo = obj.lensColor.split(",");
        this.setState({ color: colo });
        const dia = obj.diameter.split(",");
        this.setState({ diameter: dia });
        this.setState({
          product_id: resp.data._id,
          lens_category: resp.data.category,
          manufact: resp.data.manufacturedBy[0].name,
        });
      })

      .catch((error) => {
        console.log(error);
      });
  };
  handleChange = (e) => {
    console.log(e.target.value);
    let change = {};
    change[e.target.name] = e.target.value;
    this.setState(change);
    this.setState({ powerMessage: "", powerMessageR: "" });
    this.setState({ axisMessage: "", axisMessageR: "" });
    this.setState({ cylinderMessage: "", cylinderMessageR: "" });
  };

  handleCopy = (e) => {
    this.setState({
      powerRight: this.state.powerLeft,
      cylinderRight: this.state.cylinderLeft,
      axisRight: this.state.axisLeft,
      baseRight: this.state.baseLeft,
      diameterRight: this.state.diameterLeft,
      colorRight: this.state.colorLeft,
      
    });
    if(this.state.leftquantity!==""){
      this.setState({rightquantity:this.state.leftquantity})
    }
    setTimeout(this.handleQuantityRightCopy,500)
  };
  handleCopyRight = (e) => {
    if(this.state.powerRight!=="" || this.state.cylinderRight!==""|| this.state.axisRight!==""|| this.state.baseRight!==""|| this.state.rightquantity!==""){
    this.setState({
      powerLeft: this.state.powerRight,
      cylinderLeft: this.state.cylinderRight,
      axisLeft: this.state.axisRight,
      baseLeft: this.state.baseRight,
      diameterLeft: this.state.diameterRight,
      colorLeft: this.state.colorRight,
    
    });
    if(this.state.rightquantity!==""){
      this.setState({leftquantity:this.state.rightquantity})
    }
    setTimeout(this.handleQuantityLeftCopy,500)
  }
  };
  handleCart = (e) => {
    e.preventDefault();
  };
  renderPower = (e) => {
    const min = parseFloat(this.state.minPower);
    const max = parseFloat(this.state.maxPower);

    for (var i = min; i <= max; i = i + 0.25) {
      this.state.arr.push(i);
    }
  };
  toggle = (event, isin) => {
    //this.setState(prevState => ({ modal: !prevState.modal }));
    console.log(isin);
    this.setState({ productPic: isin });
  };

  render() {
    //const pat=localStorage.getItem('patient_account');
    console.log(this.state.productPic3);
    return (
      <React.Fragment>
        <Container className="py-5">
          <div className="pagepath mb-3">
            <NavLink to="/">
              <FontAwesomeIcon icon={faHome} />
            </NavLink>
            <NavLink className="active" to="/ContactLensList">
              Contact Lens
            </NavLink>
            <span style={{ textTransform: "uppercase" }}>
              {this.state.productName}
            </span>
          </div>
        </Container>

        <Container>
          <Row>
            <Col xs={12} sm={12} md={6} lg={6}>
              <div className="product-show">
                <div className="product-largImg mb-2 p-5">
                  <BeatLoader color={"#93C8D6"} loading={this.state.beat} />
                  {this.state.productPic !== "" && (
                    <img
                      src={this.state.productPic}
                      alt="product"
                      className="img-fluid col-sm-12"
                      style={{ height: "250px" }}
                      id="article"
                    />
                  )}
                </div>
                <div className="d-flex">
                {this.state.productPic0 !== undefined && (
                  <div className="product-thumbnail mx-1 p-3">
                    <BeatLoader color={"#93C8D6"} loading={this.state.beat} />
                   
                      <img
                        src={this.state.productPic0}
                        alt=""
                        className="img-fluid "
                        style={{ height: "100px" }}
                        onClick={(event) =>
                          this.toggle(event, this.state.productPic0)
                        }
                      />
                  
                  </div>
                    )}
                  {this.state.productPic1 !== undefined && (
                  <div className="product-thumbnail mx-1 p-3">
                    <BeatLoader color={"#93C8D6"} loading={this.state.beat} />
                
                      <img
                        src={this.state.productPic1}
                        alt=""
                        className="img-fluid "
                        style={{ height: "100px" }}
                        onClick={(event) =>
                          this.toggle(event, this.state.productPic1)
                        }
                      />
                    
                  </div>
                  )}
                  {this.state.productPic2 !== undefined && (
                  <div className="product-thumbnail mx-1 p-3">
                    <BeatLoader color={"#93C8D6"} loading={this.state.beat} />

                  
                      <img
                        src={this.state.productPic2}
                        alt=""
                        className="img-fluid "
                        style={{ height: "100px" }}
                        onClick={(event) =>
                          this.toggle(event, this.state.productPic2)
                        }
                      />
                   
                  </div>
                  )}
                  {this.state.productPic3 !== undefined && (
                  <div className="product-thumbnail mx-1 p-3">
                    <BeatLoader color={"#93C8D6"} loading={this.state.beat} />
                   
                      <img
                        src={this.state.productPic3}
                        alt=""
                        className="img-fluid  "
                        style={{ height: "100px" }}
                        onClick={(event) =>
                          this.toggle(event, this.state.productPic3)
                        }
                      />
                 
                  </div>
                     )}
                </div>
              </div>
            </Col>
            <Col xs={12} sm={12} md={6} lg={6}>
              <div className="product-details mt-4 mt-md-0 mt-lg-0">
                <h1>{this.state.lens_category}</h1>
                <h2 className="p-name mt-4 mb-2">{this.state.productName}</h2>
                <div className="d-flex align-items-center mb-3">
                  <h3 className="product-fild mb-0">
                    {this.state.description}
                  </h3>
                </div>
                <h3 className="product-fild mb-3">
                  <span>Manufacturer :</span> {this.state.manufact}
                </h3>
                <h3 className="product-fild mb-3">
                  <span>Type :</span> {this.state.type}
                </h3>
                <h3 className="product-fild mb-3">
                  <span>Brand :</span> {this.state.brand}
                </h3>

                {this.state.pat === "patient" &&
                  this.state.patientDiscount != "" && (
                    <h3 className="product-fild mb-3">
                      <span>Patient’s Discount :</span>{" "}
                      <span className="highlight">
                        {this.state.patientDiscount + "%"}
                      </span>
                    </h3>
                  )}

                {this.state.doc === "doctor" &&
                  this.state.doctorDiscount != "" && (
                    <h3 className="product-fild mb-3">
                      <span>Doctor’s Discount :</span>{" "}
                      <span className="highlight">
                        {this.state.doctorDiscount + "%"}
                      </span>
                    </h3>
                  )}
                {this.state.doc == null &&
                  this.state.pat == null &&
                  this.state.guestDiscount != "" && (
                    <h3 className="product-fild mb-3">
                      <span>Guest’s Discount :</span>{" "}
                      <span className="highlight">
                        {this.state.guestDiscount + "%"}
                      </span>
                    </h3>
                  )}
              </div>
              <div className="reviews-count ">
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <NavLink to="#" className="ml-2">
                  486 Reviews
                </NavLink>
              </div>
            </Col>
          </Row>
        </Container>

        <Container className="my-5">
          <Row className="align-items-center justify-content-between">
            <Col xs={12} sm={12} md={5} lg={5}>
              <div className="eye-power-fildbox">
                <h2 className="p-3">Right Side</h2>
                <div className="p-3 p-sm-4 p-md-4 p-lg-4">
                  <FormGroup className="mb-4">
                    <Label>Power :</Label>

                    <select
                      className="form-control"
                      value={this.state.powerLeft}
                      onChange={this.handleChange}
                      name="powerLeft"
                      id="manufacturer-name"
                    >
                      <option value=""> -- Select power -- </option>
                      {this.state.arr.map(function (user) {
                        return (
                          <option key={user} value={user}>
                            {user}
                          </option>
                        );
                      })}
                      }
                    </select>
                  </FormGroup>
                  <FormGroup className="mb-4">
                    <Label>Cylinder :</Label>
                    < select
                       value={this.state.cylinderLeft}
                      onChange={this.handleChange}
                      name="cylinderLeft"
                      className="form-control"
                    >
                      <option value=""> -- Select cylinder -- </option>
                      {this.state.cylinder.map(function (user) {
                        return (
                          <option key={user._id} value={user}>
                            {user}
                          </option>
                        );
                      })}
                    </ select>
                  </FormGroup>
                  <FormGroup className="mb-4">
                    <Label>Axis :</Label>
                    <select
                      value={this.state.axisLeft}
                      onChange={this.handleChange}
                      name="axisLeft"
                      className="form-control"
                    >
                      <option value=""> -- Select axis -- </option>
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="30">30</option>
                      <option value="40">40</option>
                    </select>
                    <div
                      style={{
                        paddingLeft: "6px",
                        color: "#a94442",
                        fontWeight: "bold",
                        fontSize: "0.8em",
                        wordSpacing: "1px",
                        paddingTop: "2px",
                      }}
                    >
                      {this.state.axisMessage}
                    </div>
                  </FormGroup>
                  <FormGroup className="mb-4">
                    <Label>Base Curve :</Label>
                    <select
                       value={this.state.baseLeft}
                      onChange={this.handleChange}
                      name="baseLeft"
                      className="form-control"
                    >
                      <option value=""> -- Select base curve -- </option>
                      {this.state.basecurve.map(function (user) {
                        return (
                          <option key={user._id} value={user}>
                            {user}
                          </option>
                        );
                      })}
                    </select>
                  </FormGroup>
                  <FormGroup className="mb-4">
                    <Label>Diameter :</Label>
                    <select
                      value={this.state.diameterLeft}
                      onChange={this.handleChange}
                      name="diameterLeft"
                      className="form-control"
                    >
                      <option value="">-- Select diameter -- </option>
                      {this.state.diameter.map(function (user) {
                        return (
                          <option key={user._id} value={user}>
                            {user}
                          </option>
                        );
                      })}
                    </select>
                  </FormGroup>
                  <FormGroup className="mb-4">
                    <Label>Lens Color :</Label>
                    <select
                       value={this.state.colorLeft}
                      onChange={this.handleChange}
                      name="colorLeft"
                      className="form-control"
                    >
                      <option  value="">
                        
                        -- Select color --
                      </option>
                      {this.state.color.map(function (user) {
                        return (
                          <option key={user._id} value={user}>
                            {user}
                          </option>
                        );
                      })}
                    </select>
                  </FormGroup>
                  <FormGroup className="mb-4">
                    <Label>Quantity :</Label>
                   
                    <input type="number" className="form-control" placeholder="--Select quantity--"  onInput={ this.handleQuantityLeft } value={this.state.leftquantity}/>
                  </FormGroup>
                </div>
              </div>
            </Col>
            <Col xs={12} sm={12} md={2} lg={2} className="text-center">
              <div className="w-100">
                <h4>Copy</h4>

                <img
                  src={shivama}
                  alt="sh"
                  style={{ width: "30px", cursor: "pointer" }}
                  onClick={this.handleCopy}
                />
                <img
                  src={shivam}
                  alt="sh"
                  onClick={this.handleCopyRight}
                  style={{ width: "30px", cursor: "pointer" }}
                />
              </div>
            </Col>
            <Col xs={12} sm={12} md={5} lg={5}>
              <div className="eye-power-fildbox">
                <h2 className="p-3">Left Side</h2>
                <div className="p-3 p-sm-4 p-md-4 p-lg-4">
                  <FormGroup className="mb-4">
                    <Label>Power :</Label>
                    <select
                      value={this.state.powerRight}
                      name="powerRight"
                      id="manufacturer-name"
                      onChange={this.handleChange}
                      className="form-control"
                      stlye={{ height: "40px", overFlow: "scroll" }}
                    >
                      <option value="">-- Select power --</option>
                      {this.state.arr.map(function (user) {
                        return <option value={user}>{user}</option>;
                      })}
                    </select>
                  </FormGroup>
                  <FormGroup className="mb-4">
                    <Label>Cylinder :</Label>
                    <select
                      className="form-control"
                      value={this.state.cylinderRight}
                      onChange={this.handleChange}
                      name="cylinderRight"
                    >
                      <option value=""> -- Select cylinder -- </option>
                      {this.state.cylinder.map(function (user) {
                        return (
                          <option key={user._id} value={user}>
                            {user}
                          </option>
                        );
                      })}
                    </select>
                    <div
                      style={{
                        paddingLeft: "6px",
                        color: "#a94442",
                        fontWeight: "bold",
                        fontSize: "0.8em",
                        wordSpacing: "1px",
                        paddingTop: "2px",
                      }}
                    >
                      {this.state.cylinderMessageR}
                    </div>
                  </FormGroup>
                  <FormGroup className="mb-4">
                    <Label>Axis :</Label>
                    <select
                      className="form-control"
                      value={this.state.axisRight}
                      onChange={this.handleChange}
                      name="axisRight"
                    >
                      {" "}
                      <option value=""> -- Select axis -- </option>
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="30">30</option>
                      <option value="40">40</option>
                    </select>
                  </FormGroup>
                  <FormGroup className="mb-4">
                    <Label>Base Curve :</Label>
                    <select
                      className="form-control"
                      value={this.state.baseRight}
                      onChange={this.handleChange}
                      name="baseRight"
                    >
                      <option value=""> -- Select base curve -- </option>
                      {this.state.basecurve.map(function (user) {
                        return (
                          <option key={user._id} value={user}>
                            {user}
                          </option>
                        );
                      })}
                    </select>
                  </FormGroup>
                  <FormGroup className="mb-4">
                    <Label>Diameter :</Label>
                    <select
                      className="form-control"
                      value={this.state.diameterRight}
                      onChange={this.handleChange}
                      name="diameterRight"
                    >
                      <option value=""> -- Select diameter-- </option>
                      {this.state.diameter.map(function (user) {
                        return (
                          <option key={user._id} value={user}>
                            {user}
                          </option>
                        );
                      })}
                    </select>
                  </FormGroup>
                  <FormGroup className="mb-4">
                    <Label>Lens Color :</Label>
                    <select
                      type="text"
                      value={this.state.colorRight}
                      onChange={this.handleChange}
                      name="colorRight"
                      className="form-control"
                    >
                      <option value=""> -- Select color -- </option>
                      {this.state.color.map(function (user) {
                        return (
                          <option key={user._id} value={user}>
                            {user}
                          </option>
                        );
                      })}
                    </select>
                  </FormGroup>
                  <FormGroup className="mb-4">
                    <Label>Quantity :</Label>
                   
                    <input type="number" className="form-control" placeholder="--Select quantity--" onInput={ this.handleQuantityRight } value={this.state.rightquantity}  />
                  </FormGroup>
                </div>
              </div>
            </Col>
          </Row>
        </Container>

        <Container>
          <Row className="align-items-center">
            <Col xs={12} sm={12} md={6} lg={6}>
              <section className="d-flex justify-content-between">
                <p className="heading4 mb-0">
                  MRP : <span>$</span> <strong>{this.state.mrp}</strong>
                </p>
                {this.state.doc == null && this.state.pat == null && (
                  <p className="heading4 mb-0">
                    Price. : <span>$</span>{" "}
                    <strong>{this.state.guestPrice}</strong>
                  </p>
                )}
                {this.state.pat === "patient" && (
                  <p className="heading4 mb-0">
                    Price : <span>$</span>{" "}
                    <strong>{this.state.patientPrice}</strong>
                  </p>
                )}

                {this.state.doc === "docs_account" && (
                  <p className="heading4 mb-0">
                    Price : <span>$</span>{" "}
                    <strong>{this.state.doctorPrice}</strong>
                  </p>
                )}

                {this.state.doc == null && this.state.pat == null && (
                  <p className="heading4 mb-0">
                    You Save : <span>$</span>{" "}
                    <strong>{this.state.mrp - this.state.guestPrice}</strong>
                  </p>
                )}
                {this.state.pat === "patient" && (
                  <p className="heading4 mb-0">
                    You Save : <span>$</span>{" "}
                    <strong>{this.state.mrp - this.state.patientPrice}</strong>
                  </p>
                )}

                {this.state.doc === "docs_account" && (
                  <p className="heading4 mb-0">
                    You Save : <span>$</span>{" "}
                    <strong>{this.state.mrp - this.state.doctorPrice}</strong>
                  </p>
                )}
              </section>
            </Col>
            <Col xs={12} sm={12} md={6} lg={6}>
              <section className="d-flex justify-content-end mt-3 mt-md-0 mt-lg-0">
                <button className="cart-btn" onClick={this.handleCart}>
                  <FontAwesomeIcon icon={faShoppingCart} /> Add To Cart
                </button>
                <button className="buy-btn ml-2">buy now</button>
              </section>
              <div className="d-flex justify-content-center my-4 blueLightBg py-3">
                <h5>Connect With Us</h5>
                {/*  <div className="d-inline social-icons">
                  <NavLink to="#" className="p-2"><FontAwesomeIcon  /></NavLink>
                  <NavLink to="#" className="p-2"><FontAwesomeIcon  /></NavLink>
                  <NavLink to="#" className="p-2"><FontAwesomeIcon /></NavLink>
              </div>
  */}
              </div>
            </Col>
          </Row>
        </Container>

        <RecentlyViewed />
        <Reviews />
      </React.Fragment>
    );
  }
}
export default ContactLensDetails;
