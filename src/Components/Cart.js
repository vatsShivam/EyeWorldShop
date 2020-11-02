import React from 'react';
import { Container, Table, Input, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faHome } from '@fortawesome/free-solid-svg-icons';
import { ImagePath } from '../ImagePath';
import { NavLink } from 'react-router-dom';

const  Cart = () =>{

  return(
    <React.Fragment>
      <Container className="py-5">
        <div className="pagepath mb-3">
          <NavLink to="/"><FontAwesomeIcon icon={faHome} /></NavLink>
          <NavLink className="active" to="#">Product Details</NavLink>
          <span>Cart</span>
        </div>
        <h1 className="colored-title mb-5">Cart Page</h1>
        <div className="table-responsive">
        <Table bordered>
          <thead>
            <tr>
              <td>&nbsp;</td>
              <td>Image</td>
              <td>Product Name</td>
              <td>Quantity</td>
              <td>Price</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{width:'100px'}} className="text-center"><FontAwesomeIcon icon={faTimes} /></td>
              <td style={{width:'150px'}}><img src={ImagePath.accessory1} alt="product thubline" width="50" height="50" /></td>
              <td>AIR OPTIX</td>
              <td style={{width:'150px'}}><Input type="number" /></td>
              <td style={{width:'150px'}}>$45</td>
            </tr>
            <tr>
              <td style={{width:'100px'}} className="text-center"><FontAwesomeIcon icon={faTimes} /></td>
              <td style={{width:'150px'}}><img src={ImagePath.accessory1} alt="product thubline" width="50" height="50" /></td>
              <td>AIR OPTIX</td>
              <td style={{width:'150px'}}><Input type="number" /></td>
              <td style={{width:'150px'}}>$45</td>
            </tr>
            <tr>
              <td style={{width:'100px'}} className="text-center"><FontAwesomeIcon icon={faTimes} /></td>
              <td style={{width:'150px'}}><img src={ImagePath.accessory1} alt="product thubline" width="50" height="50" /></td>
              <td>AIR OPTIX</td>
              <td style={{width:'150px'}}><Input type="number" /></td>
              <td style={{width:'150px'}}>$45</td>
            </tr>
            <tr>
              <td style={{width:'100px'}} className="text-center"><FontAwesomeIcon icon={faTimes} /></td>
              <td style={{width:'150px'}}><img src={ImagePath.accessory1} alt="product thubline" width="50" height="50" /></td>
              <td>AIR OPTIX</td>
              <td style={{width:'150px'}}><Input type="number" /></td>
              <td style={{width:'150px'}}>$45</td>
            </tr>
          </tbody>
        </Table>
        </div>
        <div className="d-sm-flex justify-content-end">
          <h4 className="mr-2 mb-0">Total Price: $120</h4>
          <button className="buy-btn">Proceed to Checkout</button>
        </div>
      </Container>
    </React.Fragment>
  )

}

export default Cart;