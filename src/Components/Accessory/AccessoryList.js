import React, { PureComponent } from 'react';
import SearchBanner from '../../Common/SearchList/SearchBanner';
import SearchForm from '../../Common/SearchList/SearchForm';
import { Container, Row, Col, NavItem,Button,Form, FormGroup, Label, Input} from 'reactstrap';
import {ImagePath} from '../../ImagePath';
import { NavLink,Link } from 'react-router-dom';
import axios from 'axios';
import InfiniteScroll from "react-infinite-scroll-component";
class  AccessoryList extends PureComponent{

state={
  manufacture:"All Manufacture",
  brand:"All Brand",
  type:"All Type",
  accessoryList:[],
  count1:"",
  count2:"",
  manufactureList:[],
  ct:1,
  val:true,
  pat:localStorage.getItem('patient_account'),
  doc:localStorage.getItem('docs_account'),
}

componentWillMount() {

  this.getAccessoryList()
  this.getManufacture()
}
handleSubmit=(e)=>{

  
  if(this.state.manufacture=='All Manufacture'){
    this.setState({manufacture:"0"})
  }
 

setTimeout(this.handleFilter,300)
  e.preventDefault();

}
handleFilter=()=>{
axios

.post(
"http://111.93.169.90:4011/accessoryLensFilterProduct",
   
{

manufacturer:this.state.manufacture,
brand:"0",
type:"0"


}

)
.then((resp) => {
  console.log(resp)
  this.setState({accessoryList:resp.data.data})
  this.setState({count1:resp.data.count})
 

})

.catch((error) => {
  console.log(error);
});
}
getManufacture() {
       
    
  axios

    .get(
    "http://111.93.169.90:4011/getAllManufacturer"

    )
    .then((resp) => {
     
     this.setState({manufactureList:resp.data})

    })

    .catch((error) => {
      console.log(error);
    });
}

handleChange=(e)=>{
  let change = {};
  change[e.target.name] = e.target.value;
  this.setState(change);
  
 }
 getAccessoryList() {
  const params = {
    page:this.state.ct,
    limit:18,
  };  
    
  axios
    .get(
    "http://111.93.169.90:4011/getallLensAccessory",
    {params}

    )
    .then((resp) => {
      console.log(resp.data.count)
     //this.setState({accessoryList:resp.data.data})
    
     this.setState({count2:resp.data.count})
    // this.setState(prevState => ({
     // accessoryList: [...prevState.accessoryList, ...resp.data.data],
      
 // }))
 this.setState({accessoryList:resp.data.data})
  this.setState({count1:this.state.accessoryList.length})
 
    })

    .catch((error) => {
      console.log(error);
    });
}
renderProduct() {
  const product = this.state.accessoryList;

   if(product.length>0){
   return product.map((element) => {
     const {
       _id,
       name,
       doctorDiscount,
       patientDiscount,
       productPic,
       price
     } = element; 
   
     return (
      
        <Col xs={12} sm={12} md={6} lg={4} className="count" >
        <div className="searchBox" style={{height:"260px"}}>
        {doctorDiscount!=="" &&  this.state.doc==='doctor' && <div className="doctor-tag"> <span><strong> {doctorDiscount +"%"} </strong> <br /> for Doctor</span></div>}
          <div className="over">
          {patientDiscount!=="" &&  this.state.pat==='patient' &&  <div className="patients-tag"> <span><strong>{patientDiscount + "%"}</strong> for <br /> Patients</span></div>}
            <NavLink  to={"/AccessoryDetails/" +_id}><img src={productPic[0]} style={{height:"260px",width:"100%"}} className="img-fluid " alt="search product"  /></NavLink>
          </div>
        </div>
        <h2 className="product-name my-4">{name}</h2>
        <p className="product-name " style={{marginTop:"-10px"}}><span style={{color:"red"}}>$</span> <span style={{color:"#39AACD"}}>{price} </span></p>
      
     
      </Col>
     );
   });
 }
 }
  render(){
  return(
    <React.Fragment>
      <SearchBanner 
        bannerName="LENS CARE & "
        bannerHint="Accessory"
        currentPage="Accessory"
      />

<React.Fragment>
      <section className="search-form py-5">
        <Container>
          <Form>
              <Row>
                  <Col xs={12} sm={6} md={3} lg={3} >
                    <FormGroup>
                      <Label for="manufacturer-name">Manufacturer Name</Label>
                      <Input type="select" name="manufacture" id="manufacturer-name"  onChange={this.handleChange} >
                      <option value="All Manufacture" >
                      All Manufacture
                              </option>
                   
                        {
      this.state.manufactureList.map(function(user) {
        return <option key={user._id}
          value={user.name}>{user.name}</option>;
      })
    }    
                      </Input>
                    </FormGroup>
                  </Col>
              
                  <Col xs={12} sm={6} md={3} lg={2} >
                    <FormGroup>
                      <Label>&nbsp;</Label>
                      <Button className="submit-btn" onClick={this.handleSubmit}>Submit</Button>
                   
                    </FormGroup>
                  
                  </Col>
                
                  
              </Row>
            </Form>
        </Container>
      </section>
    </React.Fragment>


      <section className="search-results py-5">
        <Container>
          <div className="d-md-flex d-lg-flex justify-content-between aign-items-center">
            <h1 className="mb-0">Our <span>Product</span></h1>
            <div className="results-Showing">Showing {this.state.count1} of {this.state.count2} Results</div>
          </div>

         
         
          <Row  className="col-sm-12">
          {this.renderProduct()}
          </Row>
   
        </Container>
      </section>
                
    </React.Fragment>
  )

}
}

export default AccessoryList;