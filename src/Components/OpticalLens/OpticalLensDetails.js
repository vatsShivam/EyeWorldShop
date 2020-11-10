import React,{PureComponent} from 'react';
import { Container, Row, Col, Label, Input, FormGroup } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faStar, faShoppingCart} from '@fortawesome/free-solid-svg-icons';
//import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import {ImagePath} from '../../ImagePath';
import RecentlyViewed from '../../Common/RecentlyViewed';
import BeatLoader from "react-spinners/BeatLoader";
import Reviews from '../../Common/Reviews';
import axios from 'axios';
class  OpticalLensDetails extends PureComponent{

  state={
    productPic:"",
    productPic0:"",
    productPic1:"",
    productPic2:"",
    productPic3:"",
    name:"",
    brand:"",
    pat:localStorage.getItem('patient_account'),
    doc:localStorage.getItem('docs_account'),
    doctorDiscount:"",
    patientDiscount:"",
    mrp:"",
    guestDiscount:"",
    doctorPrice:"",
    guestPrice:"",
    patientPrice:"",
    beat:true,
    minPower:'',
    maxPower:'',
    arr:[],
    cylinder:[],
    lensType:[],
    brandList:[],
    description:"",
    guestPriceStock:"",
    patientPriceStock:"",
    storemrp:"",
    quantity:"",
    id: this.props.match.params.id,
  }
  componentWillMount() {
    window.scrollTo(0, 0)
   this.getDetail();
   this.getBrand()
  }
  handleQuantity = (e) => {
    this.setState({quantity:e.target.value})
    if(this.state.doc == null && this.state.pat == null ){
   var guest =this.state.guestPriceStock;
  var guestfinal =guest*e.target.value;
   this.setState({guestPrice:guestfinal})
   var mar =this.state.storemrp;
   var finals =mar*e.target.value;
   this.setState({mrp:finals})
    }
if(this.state.pat === "patient"){
var patie =this.state.patientPriceStock;
var patientfinal =patie*e.target.value;
 this.setState({patientPrice:patientfinal})
 var patmrp =this.state.storemrp;
 var patm =patmrp*e.target.value;
 this.setState({mrp:patm})

}

};
handleCart=(e)=>{
  alert("HII")
  e.preventDefault()
}
  componentDidUpdate(prevState){
    if(this.state.minPower!==prevState.minPower && this.state.arr.length===0){
      this.renderPower()
    }

    if(this.state.id!==this.props.match.params.id){
      this.getDetail()
    }
  }
  getBrand() {
   

    axios
  
      .get(
        "http://111.93.169.90:4011/getAllBrand"
  
       
      )
      .then((resp) => {
        console.log(resp.data)
        this.setState({brandList:resp.data})
      
     
  
      })
  
      .catch((error) => {
        console.log(error);
      });
  }
  toggle = (event,isin) => {
    //this.setState(prevState => ({ modal: !prevState.modal }));
    console.log(isin)
    this.setState({productPic:isin})

  
  }
  renderPower=(e)=>{
   
    const min=parseFloat(this.state.minPower)
    const max=parseFloat(this.state.maxPower)
   
    for(var i=min;i<=max;i=i+.25 ){
                              
        this.state.arr.push(i)
         }
     
     }
  getDetail() {
    axios

      .post(
        "http://111.93.169.90:4011/getProductbyID",

        {
          id: this.props.match.params.id,
        }
      )
      .then((resp) => {
        console.log(resp.data)
        this.setState({productPic:resp.data.productPic[0],productPic1:resp.data.productPic[1],productPic2:resp.data.productPic[2],productPic3:resp.data.productPic[3],productPic0:resp.data.productPic[0],beat:false,description:resp.data.description})
        this.setState({name:resp.data.name})
      
        
        this.setState({brand:resp.data.brand[0].name})
        
      
        this.setState({mrp:resp.data.price,storemrp:resp.data.price})
        this.setState({doctorDiscount:resp.data.doctorDiscount})
        this.setState({patientDiscount:resp.data.patientDiscount})
        this.setState({guestDiscount:resp.data.guestDiscount})
        if(resp.data.guestDiscount!=""){
       // var gues=parseFloat(this.state.mrp)+parseFloat(this.state.guestDiscount)*parseFloat(this.state.mrp)/100;
        var gues=(((100-parseFloat(this.state.guestDiscount))*parseFloat(this.state.mrp))/100);
        this.setState({guestPrice:gues,guestPriceStock:gues})

        }
        if(resp.data.guestDiscount==""){
          this.setState({guestPrice:this.state.mrp,guestPriceStock:this.state.mrp})
        }
        if(resp.data.patientDiscount!=""){
        //var par=parseFloat(this.state.mrp)+parseFloat(this.state.patientDiscount)*parseFloat(this.state.mrp)/100;
        var par=(((100-parseFloat(this.state.patientDiscount))*parseFloat(this.state.mrp))/100);
        console.log(par)
        this.setState({patientPrice:par,patientPriceStock:par})
        }
        if(resp.data.patientDiscount==""){
          this.setState({patientPrice:this.state.mrp,patientPriceStock:this.state.mrp})
        }
        const obj = JSON.parse(resp.data.attributes);
        if(resp.data.doctorDiscount!=""){
          //var par=parseFloat(this.state.mrp)+parseFloat(this.state.patientDiscount)*parseFloat(this.state.mrp)/100;
          var par=(((100-parseFloat(this.state.doctorDiscount))*parseFloat(this.state.mrp))/100);
        
          this.setState({doctorPrice:par})
          }
          if(resp.data.doctorDiscount==""){
            this.setState({doctorPrice:this.state.mrp})
          }
        this.setState({minPower:obj.minPower})
        this.setState({maxPower:obj.maxPower})
        const cylin =obj.cylinder.split(",");
        this.setState({cylinder:cylin})
        const lentype=obj.lensType.split(",");
        this.setState({lensType:lentype})
      
       // const obj = JSON.parse(resp.data.attributes);
       // console.log(obj.minPower)
      // this.setState({product_id:resp.data._id,product_name:resp.data.name,lens_category:resp.data.category})
      })

      .catch((error) => {
        console.log(error);
      });
  }
  render(){
    console.log(this.state.brandList)
   
  return(
    <React.Fragment>
      <Container className="py-5">
      <div className="pagepath mb-3">
        <NavLink to="/"><FontAwesomeIcon icon={faHome} /></NavLink>
        <NavLink className="active" to="/OpticalLensList">Optical Lens </NavLink>
        <span style={{ textTransform: "uppercase"}}>{this.state.name}</span>
      </div>
      </Container>

      <Container>
        <Row>
        
          
        <Col xs={12} sm={12} md={6} lg={6}>
              <div className="product-show">
        
                <div className="product-largImg mb-2 p-5">
                <BeatLoader
        
      
        color={"#93C8D6"}
        loading={this.state.beat}
      />
                  {this.state.productPic!=="" && 
                  <img
                    src={this.state.productPic}
                    alt="product"
                    className="img-fluid col-sm-12"
                    style={{height:"250px"}}
                    id="article"
                  />
  }
                </div>
                <div className="d-flex">
                {this.state.productPic0!==undefined && 
                <div className="product-thumbnail mx-1 p-3">
                  <BeatLoader
        
      
        color={"#93C8D6"}
        loading={this.state.beat}
      />
                 
                    <img
                      src={this.state.productPic0}
                      alt=""
                      className="img-fluid "
                      style={{height:"100px"}}
                      onClick = {event => this.toggle(event,this.state.productPic0)}
                    />

                  </div>
  }
                  {this.state.productPic1!== undefined && 
                  <div className="product-thumbnail mx-1 p-3">
                  <BeatLoader
        
      
        color={"#93C8D6"}
        loading={this.state.beat}
      />
                 
                    <img
                      src={this.state.productPic1}
                      alt=""
                      className="img-fluid "
                      style={{height:"100px"}}
                      onClick = {event => this.toggle(event,this.state.productPic1)}
                    />

                  </div>
  }
                  {this.state.productPic2!==undefined && 
                  <div className="product-thumbnail mx-1 p-3">
                  <BeatLoader
        
      
        color={"#93C8D6"}
        loading={this.state.beat}
      />   


                    <img
                          src={this.state.productPic2}
                          alt=""
                          className="img-fluid "
                          style={{height:"100px"}}
                          onClick = {event => this.toggle(event,this.state.productPic2)}
                    />

                  </div>
  }
                  {this.state.productPic3!== undefined && 
                  <div className="product-thumbnail mx-1 p-3">
                  <BeatLoader
        
      
        color={"#93C8D6"}
        loading={this.state.beat}
      />    
    
                    <img
                          src={this.state.productPic3}
                          alt=""
                          className="img-fluid  "
                          style={{height:"100px"}}
                          onClick = {event => this.toggle(event,this.state.productPic3)}
                        />

                  </div>
                  }
                </div>
              </div>
            </Col>
          <Col xs={12} sm={12} md={6} lg={6}>
            <div className="product-details mt-4 mt-md-0 mt-lg-0">
              <h1>OPTICAL LENS </h1>
              <h2 className="p-name mt-4 mb-2">{this.state.name}</h2>
              <div className="d-flex align-items-center mb-3">
              <h3 className="product-fild mb-0">
                   {this.state.description}
                  </h3>
           
              </div>
           
              <h3 className="product-fild mb-3"><span>Brand :</span> {this.state.brand}</h3>
              {this.state.pat==='patient' && this.state.patientDiscount!="" && 
             
             (<h3 className="product-fild mb-3"><span>Patient’s Discount :</span> <span className="highlight">{this.state.patientDiscount + "%"}</span></h3>)}
             
             {this.state.doc==='doctor' && this.state.doctorDiscount!="" && 
             
             (<h3 className="product-fild mb-3"><span>Doctor’s Discount :</span> <span className="highlight">{this.state.doctorDiscount + "%"}</span></h3>)}
               {

                 this.state.doc==null && this.state.pat==null && this.state.guestDiscount!="" &&  (<h3 className="product-fild mb-3"><span>Guest’s Discount :</span> <span className="highlight">{this.state.guestDiscount + "%"}</span></h3>)}

             
            </div>
                
            <div className="reviews-count ">
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <NavLink to="#" className="ml-2">486 Reviews</NavLink>
                </div>
          </Col>
        </Row>
      </Container>

      <Container className="my-5">
        <Row className="align-items-center justify-content-center">
          <Col xs={12} sm={12} md={7} lg={7}>
            <div className="eye-power-fildbox">
              <h2 className="p-3">Attributes</h2>
              <div className="p-3 p-sm-4 p-md-4 p-lg-4">
                <FormGroup className="mb-4">
                  <Label>Lens Type :</Label>
                  <Input
                      type="select"
                    
                    
                      name="cylinderLeft"
                    >
                        <option  value="">
                        
                        -- Select Lens --
                      </option>
                           {
      this.state.lensType.map(function(user) {
        return <option key={user._id}
          value={user}>{user}</option>;
      })
    }
                    </Input>
                </FormGroup>
                <FormGroup className="mb-4">
                  <Label>Brand :</Label>
                  <Input
                      type="select"
                    
                    
                      name="cylinderLeft"
                    >
                        <option  value="">
                        
                        -- Select Brand --
                      </option>
                           {
      this.state.brandList.map(function(user) {
        return <option key={user._id}
          value={user.name}>{user.name}</option>;
      })
    }
                    </Input>
                </FormGroup>
              
                <FormGroup className="mb-4">
                  <Label>CYL :</Label>
                  <Input
                      type="select"
                    
                    
                      name="cylinderLeft"
                    >
                         <option  value="">
                        
                        -- Select cylinder --
                      </option>
                           {
      this.state.cylinder.map(function(user) {
        return <option key={user._id}
          value={user}>{user}</option>;
      })
    }
                    </Input>
                </FormGroup>
              
                <FormGroup className="mb-4">
                  <Label> Power :</Label>
                  <Input type="select" name="powerLeft" id="manufacturer-name"  >
                  <option  value="">
                        
                        -- Select Power --
                      </option>
                    {
      this.state.arr.map(function(user) {
        return <option key={user}
          value={user}>{user}</option>;
      })
    }
    }
                      </Input>
                </FormGroup>
                <FormGroup className="mb-4">
                    <Label>Quantity :</Label>
                   
                    <input type="number" className="form-control" placeholder="--Select quantity--"  value={this.state.quantity}  onInput={this.handleQuantity}  />
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
                {

this.state.doc==null && this.state.pat==null &&   <p className="heading4 mb-0">
Price. : <span>$</span> <strong>{this.state.guestPrice}</strong>
</p>  }
{this.state.pat==='patient' && <p className="heading4 mb-0">
Price : <span>$</span> <strong>{this.state.patientPrice}</strong></p>
  }
{this.state.doc==='docs_account' && <p className="heading4 mb-0">
Price : <span>$</span> <strong>{this.state.doctorPrice}</strong></p>
  }

{

this.state.doc==null && this.state.pat==null &&   <p className="heading4 mb-0">
You Save : <span>$</span> <strong>{this.state.mrp-this.state.guestPrice}</strong>
</p>  }
{this.state.pat==='patient' && <p className="heading4 mb-0">
You Save : <span>$</span> <strong>{this.state.mrp-this.state.patientPrice}</strong></p>
  }            
          {this.state.doc==='docs_account' && <p className="heading4 mb-0">
You Save : <span>$</span> <strong>{this.state.mrp-this.state.doctorPrice}</strong></p>
  }            
                            
          
         
            </section>
          </Col>
          <Col xs={12} sm={12} md={6} lg={6}>
            <section className="d-flex justify-content-end mt-3 mt-md-0 mt-lg-0">
              <button className="cart-btn" onClick={this.handleCart}><FontAwesomeIcon icon={faShoppingCart} /> Add To Cart</button>
              <button className="buy-btn ml-2">buy now</button>
            </section>
            <div className="d-flex justify-content-center my-4 blueLightBg py-3">
              <h5>Connect With Us</h5>
              <div className="d-inline social-icons">
                  <NavLink to="#" className="p-2"><FontAwesomeIcon  /></NavLink>
                  <NavLink to="#" className="p-2"><FontAwesomeIcon  /></NavLink>
                  <NavLink to="#" className="p-2"><FontAwesomeIcon  /></NavLink>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <RecentlyViewed />
      <Reviews />

    </React.Fragment>
  )

}
  }

export default OpticalLensDetails;