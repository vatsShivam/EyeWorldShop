import React from 'react';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input} from 'reactstrap';
const  SearchForm = () =>{
  return(
    <React.Fragment>
      <section className="search-form py-5">
        <Container>
          <Form>
              <Row>
                  <Col xs={12} sm={6} md={3} lg={3}>
                    <FormGroup>
                      <Label for="manufacturer-name">Manufacturer Name</Label>
                      <Input type="select" name="select" id="manufacturer-name">
                        <option>Basuch & Lomb</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col xs={12} sm={6} md={3} lg={3}>
                    <FormGroup>
                      <Label for="manufacturer-type">Type</Label>
                      <Input type="select" name="select" id="manufacturer-type">
                        <option>Soflens 59%</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col xs={12} sm={6} md={3} lg={3}>
                    <FormGroup>
                      <Label for="manufacturer-brand ">Brand </Label>
                      <Input type="select" name="select" id="manufacturer-brand ">
                        <option>Bausch & Lomb</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col xs={12} sm={6} md={3} lg={3}>
                    <FormGroup>
                      <Label>&nbsp;</Label>
                      <Button className="submit-btn">Submit</Button>
                    </FormGroup>
                  </Col>
              </Row>
            </Form>
        </Container>
      </section>
    </React.Fragment>
  )

}

export default SearchForm;