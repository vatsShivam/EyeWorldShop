import React,{PureComponent} from 'react';
import SearchBanner from '../../Common/SearchList/SearchBanner';
import SearchForm from '../../Common/SearchList/SearchForm';
import { Container, Row, Col, NavItem,Button, Form, FormGroup, Label, Input,} from 'reactstrap';
import {ImagePath} from '../../ImagePath';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
class  BrandList extends PureComponent{


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
  category : "All",
  url : "",
  currentPage : 1,
  offset : "",
  pageSize : 6,
  pageIndex : 0,

}

componentWillMount() {

  this.getOpticalList();
  this.getBrand();
}
handleChange=(e)=>{
  let change = {};
  change[e.target.name] = e.target.value;
  this.setState(change);
  console.log(this.state);
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
    "http://111.93.169.90:4011/getallProduct/"

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
   if(this.state.category === 'All')
    {
        this.setState({url : '/contactLensFilterProduct'})
    }
    if(this.state.category === 'Contact Lens')
    {
        this.setState({url : '/contactLensFilterProduct'})
    }
    if(this.state.category === 'Optical Lens')
    {
        this.setState({url : '/opticalLensFilterProduct'})
    }
    if(this.state.category === 'Eye Wear ')
    {
        this.setState({url : '/eyeWearLensFilterProduct'})
    }
  
  setTimeout(this.handleFilter,300)
    e.preventDefault();
  
}
handleFilter=()=>{
    console.log(this.state.url);
  axios
  
  .post(
  "http://111.93.169.90:4011" + this.state.url,
     
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
handlePageClick = (event) => {
  //const selectedPage = data.selected;
  //const offset = selectedPage * this.state.perPage;
  this.setState({pageIndex: event.selected })
  console.log(this.state.pageIndex)
}
renderProduct() {
  const product = this.state.opticalLensList;


   if(product.length>0){
   return product.slice(
    this.state.pageIndex * this.state.pageSize,
    this.state.pageIndex * this.state.pageSize + this.state.pageSize
  )
   .map((element) => {
     const {
       _id,
       name,
       productPic,
       doctorDiscount,
       patientDiscount,
       category,
     } = element; 
   
     return (
       <Col xs={12} sm={12} md={6} lg={4} className="count">
       <div className="searchBox" style={{height:"260px"}}>
       {doctorDiscount!=="" &&  this.state.doc==='doctor' && <div className="doctor-tag"> <span><strong> {doctorDiscount +"%"} </strong> <br /> for Doctor</span></div>}
          <div className="over">
          {patientDiscount!=="" &&  this.state.pat==='patient' &&  <div className="patients-tag"> <span><strong>{patientDiscount + "%"}</strong> for <br /> Patients</span></div>}
           {this.state.category === 'All'  &&  category === "Lens Care and Accessory"?
           <Link  to={"/AccessoryDetails/" +_id}><img src={productPic[0]} alt="search product" style={{height:"260px",width:"100%"}} className="img-fluid" /></Link>
             : this.state.category === 'All' && category === 'Optical Lens' ? 
              <Link  to={"/OpticalLensDetails/" +_id}><img src={productPic[0]} alt="search product" style={{height:"260px",width:"100%"}} className="img-fluid" /></Link>
             : this.state.category === 'All' && category === 'Eye Wear' ? 
             <Link  to={"/EyeWearLensDetails/" +_id}><img src={productPic[0]} alt="search product" style={{height:"260px",width:"100%"}} className="img-fluid" /></Link> 
            : this.state.category === 'All' && category === 'Contact Lens' ? 
            <Link  to={"/ContactLensDetails/" +_id}><img src={productPic[0]} alt="search product" style={{height:"260px",width:"100%"}} className="img-fluid" /></Link>
          : this.state.category === 'Eye Wear' ? 
          <Link  to={"/EyeWearLensDetails/" +_id}><img src={productPic[0]} alt="search product" style={{height:"260px",width:"100%"}} className="img-fluid" /></Link>
         :  this.state.category === 'Optical Lens' ? 
         <Link  to={"/OpticalLensDetails/" +_id}><img src={productPic[0]} alt="search product" style={{height:"260px",width:"100%"}} className="img-fluid" /></Link>
        : this.state.category === 'Contact Lens' ? 
         <Link  to={"/ContactLensDetails/" +_id}><img src={productPic[0]} alt="search product" style={{height:"260px",width:"100%"}} className="img-fluid" /></Link>
        : null}
         </div>
       </div>
       <h2 className="product-name my-4">{name}</h2>
     </Col>
     );
   });
 }
 }
  render(){
    let paginationElement;
    if (this.state.count2 > 1) {
      paginationElement = (
        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          //breakLabel={}
          pageCount={this.state.count2/6}
          pageRangeDisplayed = {10}
          onPageChange={(event)=>this.handlePageClick(event)}
          marginPagesDisplayed ={6}
          breakClassName={'page-item'}
          breakLinkClassName={'page-link'}
          containerClassName={'pagination'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-item'}
          previousLinkClassName={'page-link'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link'}
          activeClassName={'active'}
          initialPage = {0}
        />
      );
    }
   const category = [
    
       { id : 1 , name : 'Contact Lens'},
        {id : 2 , name : 'Optical Lens'},
        {id : 3 , name : 'Eye Wear '}
     
    ]
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
                  <Col xs={12} sm={6} md={3} lg={3}>
                    <FormGroup>
                      <Label for="categories">Category</Label>
                      <Input type="select" name="category" id="category "  onChange={this.handleChange} >
                      <option value="All Type" >
                      All Type
                              </option>
                    
                        {
      category.map(function(user) {
        return <option key={user.id}
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
<h1 className="mb-0"><span>{this.state.brand}</span></h1>
            <div className="results-Showing">Showing {this.state.count2} of {this.state.count1 +" "}</div>
          </div>

          <Row>
          {this.renderProduct()}
          </Row>
          <Col>
         <div  className="pager d-flex justify-content-center py-5">
         {paginationElement}
         </div>
         </Col>
        </Container>
      </section>
                
    </React.Fragment>
  )

}
}
export default BrandList;