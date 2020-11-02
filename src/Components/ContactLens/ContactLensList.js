import React,{PureComponent }  from 'react';
import axios from "axios";
import SearchBanner from '../../Common/SearchList/SearchBanner';
import SearchForm from '../../Common/SearchList/SearchForm';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input,Alert} from 'reactstrap';
import {ImagePath} from '../../ImagePath';
import { Link,NavLink } from 'react-router-dom';
import InfiniteScroll from "react-infinite-scroll-component";
import BeatLoader from "react-spinners/BeatLoader";
class ContactLensList extends PureComponent {

  state={
    manufactureList:[],
    brandList:[],
    typeList:[],
    items:[],
    contactLensList:"",
    filterList:"",
    manufacture:"All Manufacture",
    brand:"All Brand",
    type:"All Type",
    count1:"",
    count2:"",
    val:true,
    count:0,
    ct:1,
    filter:false,
    loaderMessage:"Loading .....",
    filterArray:[],
    vals:false,
    endMessage2:"",
    contact:false,
    pat:localStorage.getItem('patient_account'),
    doc:localStorage.getItem('docs_account'),
    
  }

  componentWillMount() {
  
    this.getManufacture();
    this.getBrand();
    this.getType();
    this.getContactList();
    this.getCount()
   
  }
componentWillUnmount(){
  this.setState({items:[]})
}
 getCount(){
     
  axios

  .post(
  "http://111.93.169.90:4011/countProductbyCategory",
  {
    category:"Contact Lens"
  }

  )
  .then((resp) => {
   
   //console.log(resp.dat)
   this.setState({count1:resp.data.count})

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
 handleSubmit=(e)=>{
   
  if(this.state.manufacture=='All Manufacture'){
    
    this.setState({manufacture:"0"})
  }
  if(this.state.type=='All Type'){
    this.setState({type:"0"})
  }
  if(this.state.brand=='All Brand'){
    this.setState({brand:"0"})
  }
  this.setState({filter:true,val:true})
  this.setState({filterArray:[],count2:0})
 // this.setState({count1:filterArray.length})
  this.setState({items:"",loaderMessage:"",vals:true})
  
 setTimeout(this.handleFilter,300)
 e.preventDefault();
}
handleFilter=()=>{
  const params = {
    page:1,
    limit:18,
  };
   
  axios

  .post(
  "http://111.93.169.90:4011/contactLensFilterProduct?page={1}&limit={150}",
  
     
 {
 
  manufacturer:this.state.manufacture,
  brand:this.state.brand,
  type:this.state.type

  
}

  )
  .then((resp) => {
    console.log(resp)
   // this.setState({contactLensList:resp.data.data})
   // this.setState({count2:resp.data.count})
  {/* if(this.state.filterArray.length<this.state.count1-1){
   this.setState(prevState => ({
    filterArray: [...prevState.filterArray, ...resp.data.data],
    
}))
   }
  */}
  this.setState({filterArray:resp.data.data})
  var l= this.state.filterArray.length;
  this.setState({count2:l})

  })

  .catch((error) => {
    console.log(error);
  });
}

fetchMoreData = () => {
  
  if (this.state.items.length >=this.state.count1 && this.state.count1>1) {
    this.setState({ val: false });
    
    return;
  }
  // a fake async api call like which sends
  // 20 more records in .5 secs
  else if(this.state.filter===false){
   
  setTimeout(this.getContactList(), 500);
  }
  
 
};
fetchMoreDatas = () => {
  
  if (this.state.filterArray.length>=1) {
    this.setState({ vals: false });
   
    this.setState({endMessage2:"Yay you have seen at all"})
    return;
  }
  // a fake async api call like which sends
  // 20 more records in .5 secs
  else {
    if(this.state.manufacture=='All Manufacture'){
    
      this.setState({manufacture:"0"})
    }
    if(this.state.type=='All Type'){
      this.setState({type:"0"})
    }
    if(this.state.brand=='All Brand'){
      this.setState({brand:"0"})
    }
  setTimeout(this.handleFilter(), 500);
  }
  
 
};
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
 
  getContactList() {
    
           
const params = {
  page:this.state.ct,
  limit:150,
};

 
    axios

      .get(
      "http://111.93.169.90:4011/getallContactLens",
      
      {params}

      )
      .then((resp) => {
        console.log(resp.data)
      //this.setState({contactLensList:resp.data.data})
      
     // this.setState(prevState => ({
     
      //  items: [...prevState.items, ...resp.data.data],
        
   // }))
   this.setState({items:resp.data.data})
    this.setState(prevState => ({
      ct: prevState.ct+1
      
  }))
  
   
  

     // this.setState({count1:9})
      this.setState({count2:this.state.items.length})
      
      })

      .catch((error) => {
        console.log(error);
      });
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
  getType() {
   

    axios

      .get(
        "http://111.93.169.90:4011/getAllType"

       
      )
      .then((resp) => {
        this.setState({typeList:resp.data})

      })

      .catch((error) => {
        console.log(error);
      });
  }

  renderProduct() {
   const product = this.state.items;
   
    if(product.length>0){
    return product.map((element) => {
      const {
        _id,
        name,
        productPic,
        doctorDiscount,
        patientDiscount,
        price
      } = element; 
    console.log(productPic[0])
      return (
        <Col xs={12} sm={12} md={6} lg={4} className="count" >
        <div className="searchBox" style={{height:"260px"}}>
        {doctorDiscount!=="" &&  this.state.doc==='doctor' && <div className="doctor-tag"> <span><strong> {doctorDiscount +"%"} </strong> <br /> for Doctor</span></div>}
          <div className="over">
          {patientDiscount!=="" &&  this.state.pat==='patient' &&  <div className="patients-tag"> <span><strong>{patientDiscount + "%"}</strong> for <br /> Patients</span></div>}
         {/*   <Link  to={{
              pathname:"/ContactLensDetails/"+name,
             // search:_id
              
            

            }}
          */}
   <Link  to={"/ContactLensDetails/" +_id}>
            <img src={productPic[0]} style={{height:"260px",width:"100%"}} className="img-fluid " alt="search product"  /></Link>
          </div>
        </div>
        <h2 className="product-name my-4">{name}</h2>
        <p className="product-name " style={{marginTop:"-10px"}}><span style={{color:"red"}}>$</span> <span style={{color:"#39AACD"}}>{price} </span></p>
      
       {/*  <div className="item">
                        <div className="item-box" >
                            <div className="image-area mb-2"  style={{height:"250px"}}>
                            <NavLink  to={"/ContactLensDetails/" +_id}>   <img src={productPic} alt='' style={{height:"250px"}} className="col-sm-12"/></NavLink>
                                <div className="triangle">
                                    <p><span >{patientDiscount}</span> for Patients</p>
                                </div>
                                <div className="red-star">
                                    <p><span style={{paddingLeft:"5px"}}>{doctorDiscount}</span> for Doctors</p>
                                </div>
                            </div>
                            <div >
                            <p className="prod-name text-center">{name}</p>
                            <p className="prod-price text-center"><span>$</span> 350.00</p>
                            </div>
                        </div>
                    </div>
      */}
      </Col>
      );
    });
  }
  }
  renderProducts() {
    const product = this.state.filterArray;
    
     if(product.length>0){
     return product.map((element) => {
       const {
         _id,
         name,
         productPic,
         doctorDiscount,
         patientDiscount,
         price
       } = element; 
     console.log(productPic[0])
       return (
         <Col xs={12} sm={12} md={6} lg={4} className="count" >
         <div className="searchBox" style={{height:"260px"}}>
           <div className="doctor-tag"><span><strong>{doctorDiscount +"%"} </strong><br /> for Doctor</span></div>
           <div className="over">
             <div className="patients-tag"><span><strong>{patientDiscount + "%"}</strong> for <br /> Patients</span></div>
             <NavLink  to={"/ContactLensDetails/" +_id}><img src={productPic[0]} style={{height:"260px",width:"100%"}} className="img-fluid " alt="search product"  /></NavLink>
           </div>
         </div>
         <h2 className="product-name my-4">{name}</h2>
         <p className="product-name " style={{marginTop:"-10px"}}><span style={{color:"red"}}>$</span> <span style={{color:"#39AACD"}}>{price} </span></p>
       
        {/*  <div className="item">
                         <div className="item-box" >
                             <div className="image-area mb-2"  style={{height:"250px"}}>
                             <NavLink  to={"/ContactLensDetails/" +_id}>   <img src={productPic} alt='' style={{height:"250px"}} className="col-sm-12"/></NavLink>
                                 <div className="triangle">
                                     <p><span >{patientDiscount}</span> for Patients</p>
                                 </div>
                                 <div className="red-star">
                                     <p><span style={{paddingLeft:"5px"}}>{doctorDiscount}</span> for Doctors</p>
                                 </div>
                             </div>
                             <div >
                             <p className="prod-name text-center">{name}</p>
                             <p className="prod-price text-center"><span>$</span> 350.00</p>
                             </div>
                         </div>
                     </div>
       */}
       </Col>
       );
     });
   }
   }
     render(){
    
 console.log(this.state.items)
  return(
    <React.Fragment>
       
      <SearchBanner 
        bannerName="CHOOSE YOUR VISSION WITH"
        bannerHint="CLEARITY"
        currentPage="Contact Lens"
      />
          <React.Fragment>
      <section className="search-form py-5">
        <Container>
          <Form>
              <Row>
                  <Col xs={12} sm={6} md={3} lg={3}>
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
                  <Col xs={12} sm={6} md={3} lg={3}>
                    <FormGroup>
                      <Label for="manufacturer-type">Type</Label>
                      <Input type="select" name="type" id="manufacturer-type"  onChange={this.handleChange} >
                      <option value="All Type" >
                                All Type
                              </option>
                        {
      this.state.typeList.map(function(user) {
        return <option key={user._id}
          value={user.name}>{user.name}</option>;
      })
    } 
                      </Input>
                    </FormGroup>
                  </Col>
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
     
        <Container  >
          <div className="d-md-flex d-lg-flex justify-content-between aign-items-center">
            <h1 className="mb-0">Our <span>Product</span></h1>
            <div className="results-Showing" > Showing {this.state.count2} of {this.state.count1 +" "} Results</div>
          </div>
         
        { this.state.filter==false}{
          <InfiniteScroll
          dataLength={this.state.items.length}
          next={this.fetchMoreData}
          hasMore={this.state.val}
          loader={<h4>{this.state.loaderMessage}</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >  <Row  className="col-sm-12">
          {this.renderProduct()}
          </Row>
        </InfiniteScroll>
     }
         { this.state.filter==true}{
          <InfiniteScroll
          dataLength={this.state.filterArray.length}
          next={this.fetchMoreDatas}
          hasMore={this.state.vals}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>{this.state.endMessage2}</b>
            </p>
          }
        >  <Row  className="col-sm-12">
          {this.renderProducts()}
          </Row>
        </InfiniteScroll>
     }

        </Container>
      </section>
                
    </React.Fragment>
  )
  }
}

export default ContactLensList;