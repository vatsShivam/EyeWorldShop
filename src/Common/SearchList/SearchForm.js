import React,{PureComponent} from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input} from 'reactstrap';
class  SearchForm extends PureComponent{
  state={
    manufactureList:[],
    brandList:[],
    typeList:[],
 

  }
  componentWillMount() {
    this.getManufacture();
    this.getBrand();
    this.getType();
 
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
 
  render(){
  return(
    <React.Fragment>
      <section className="search-form py-5">
        <Container>
          <Form>
              <Row>
                  <Col xs={12} sm={6} md={3} lg={3}>
                    <FormGroup>
                      <Label for="manufacturer-name">Manufacturer Name</Label>
                      <Input type="select" name="manufacture" id="manufacturer-name"  onChange={this.props.changes} >
                      <option value="All Manifacture">All Manifacture</option>
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
                      <Input type="select" name="type" id="manufacturer-type"  onChange={this.props.changes} >
                      <option value="All Type">All Type</option>
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
                      <Input type="select" name="brand" id="manufacturer-brand "  onChange={this.props.changes}>
                      <option value="All Brand">All Brand</option>
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
                      <Label>&nbsp;</Label>
                      <Button className="submit-btn"  onClick={this.props.submitBtn}>Submit</Button>
                    </FormGroup>
                  </Col>
              </Row>
            </Form>
        </Container>
      </section>
    </React.Fragment>
  )

}
}
export default SearchForm;