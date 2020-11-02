import React,{PureComponent} from 'react';
import SearchBanner from '../../Common/SearchList/SearchBanner';
import SearchForm from '../../Common/SearchList/SearchForm';
import { Container, Row, Col, NavItem,Button, Form, FormGroup, Label, Input,} from 'reactstrap';
import {ImagePath} from '../../ImagePath';
import { Link } from 'react-router-dom';
import axios from 'axios';
class  OpticalLensList extends PureComponent{


state={
  manufacture:"All Manifacture",
  brand:"All Brand",
  type:"All Type",
  opticalLensList:"",
  brandList:[],
  count1:"",
  count2:"",
  pat:localStorage.getItem('patient_account'),
  doc:localStorage.getItem('docs_account'),
  
 
  
}

componentWillMount() {

  this.getOpticalList();
  this.getBrand();
}
handleChange=(e)=>{
  let change = {};
  change[e.target.name] = e.target.value;
  this.setState(change);
  
 }
 getBrand() {
   

  axios

    .get(
      "http://111.93.169.90:4011/getAllBrand"

     
    )
    .then((resp) => {
      this.setState({brandList:resp.data})
    
   

    })

    .catch((error) => {
      console.log(error);
    });
}
 getOpticalList() {
       
    
  axios
    .get(
    "http://111.93.169.90:4011/getallOpticalLens"

    )
    .then((resp) => {
      console.log(resp.data)
     this.setState({opticalLensList:resp.data.data})
     this.setState({count1:resp.data.count})
     this.setState({count2:resp.data.count})

    })

    .catch((error) => {
      console.log(error);
    });
}
handleSubmit=(e)=>{

  
    if(this.state.brand=='All Brand'){
      this.setState({brand:"0"})
    }
   
  
  setTimeout(this.handleFilter,300)
    e.preventDefault();
  
}
handleFilter=()=>{
  axios

  .post(
  "http://111.93.169.90:4011/opticalLensFilterProduct",
     
 {
 
  manufacturer:"0",
  brand:this.state.brand,
  type:"0"

  
}

  )
  .then((resp) => {
    console.log(resp)
    this.setState({opticalLensList:resp.data.data})
    this.setState({count2:resp.data.count})
   

  })

  .catch((error) => {
    console.log(error);
  });
}
renderProduct() {
  const product = this.state.opticalLensList;

   if(product.length>0){
   return product.map((element) => {
     const {
       _id,
       name,
       productPic,
       doctorDiscount,
       patientDiscount
     } = element; 
   
     return (
       <Col xs={12} sm={12} md={6} lg={4} className="count">
       <div className="searchBox" style={{height:"260px"}}>
       {doctorDiscount!=="" &&  this.state.doc==='doctor' && <div className="doctor-tag"> <span><strong> {doctorDiscount +"%"} </strong> <br /> for Doctor</span></div>}
          <div className="over">
          {patientDiscount!=="" &&  this.state.pat==='patient' &&  <div className="patients-tag"> <span><strong>{patientDiscount + "%"}</strong> for <br /> Patients</span></div>}
           <Link  to={"/OpticalLensDetails/" +_id}><img src={productPic[0]} alt="search product" style={{height:"260px",width:"100%"}} className="img-fluid" /></Link>
         </div>
       </div>
       <h2 className="product-name my-4">{name}</h2>
     </Col>
     );
   });
 }
 }
  render(){
  
  return(
    <React.Fragment>
      <SearchBanner 
        bannerName="Achromatic Optical"
        bannerHint="Lenses"
        currentPage="Optical Lens"
      />

<React.Fragment>
      <section className="search-form py-5">
        <Container>
          <Form>
              <Row>
                 
                  <Col xs={12} sm={6} md={3} lg={3}>
                    <FormGroup>
                      <Label for="manufacturer-brand ">Brand </Label>
                      <Input type="select" name="brand" id="manufacturer-brand "  onChange={this.handleChange} >
                      <option value="All Brand" >
                      All Brand
                              </option>
                    
                        {
      this.state.brandList.map(function(user) {
        return <option key={user._id}
          value={user.name}>{user.name}</option>;
      })
    }
      
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col xs={12} sm={6} md={3} lg={2}>
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
            <div className="results-Showing">Showing {this.state.count2} of {this.state.count1 +" "}</div>
          </div>

          <Row>
          {this.renderProduct()}
          </Row>

        </Container>
      </section>
                
    </React.Fragment>
  )

}
}
export default OpticalLensList;