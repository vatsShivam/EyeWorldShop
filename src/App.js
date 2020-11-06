import React from 'react';
import './App.css';
import './assets/css/main.css';

import Header from './Common/Header';
import Footer from './Common/Footer';
import Home from './Components/Home';
import About from './Components/About';
import Contact from './Components/Contact';
import Profile from './Components/Profile';
import ProfileEdit from './Components/ProfileEdit';
import ChangePassword from './Components/ChangePassword';
import SearchList from './Components/SearchList/SearchList';
import ResetPassword from './Components/ResetPassword';
import ContactLensList from './Components/ContactLens/ContactLensList';
import ContactLensDetails from './Components/ContactLens/ContactLensDetails';
import OpticalLensList from './Components/OpticalLens/OpticalLensList';
import OpticalLensDetails from './Components/OpticalLens/OpticalLensDetails';
import AccessoryList from './Components/Accessory/AccessoryList';
import AccessoryDetails from './Components/Accessory/AccessoryDetails';
import EyeWearList from './Components/EyeWear/EyeWearList';
import EyeWearDetails from './Components/EyeWear/EyeWearDetails';
import BrandList from './Components/BrandList/BrandList';
import Cart from './Components/Cart';
import TrendingProducts from './Components/TrendingProduct/TrendingProduct';
import FeaturedProduct from './Components/FeaturedProduct/FeaturedProduct';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


const App = () => {
  return (
    
  <React.Fragment>
    <Header />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/Home" component={Home} />
      <Route exact path="/About" component={About} />
      <Route exact path="/Contact" component={Contact} />
      <Route exact path="/ContactLensList" component={ContactLensList} />
      <Route exact path="/ContactLensDetails/:id" component={ContactLensDetails} />
      <Route exact path="/OpticalLensList" component={OpticalLensList} />
      <Route exact path="/OpticalLensDetails/:id" component={OpticalLensDetails} />
      <Route exact path="/Profile" component={Profile} />
      <Route exact path="/ProfileEdit" component={ProfileEdit} />
      <Route exact path="/ChangePassword" component={ChangePassword} />
      <Route exact path="/SearchList" component={SearchList} />
      <Route exact path="/resetpassword" component={ResetPassword} />
      <Route exact path="/AccessoryList" component={AccessoryList} />
      <Route exact path="/AccessoryDetails/:id" component={AccessoryDetails} />
      <Route exact path="/EyeWearList" component={EyeWearList} />
      <Route exact path="/EyeWearDetails/:id" component={EyeWearDetails} />
      <Route exact path="/Cart" component={Cart} />
      <Route exact path="/Brand" component={BrandList} />
      <Route exact path="/TrendingProduct" component={TrendingProducts} />
      <Route exact path="/FeaturedProduct" component={FeaturedProduct} />
    </Switch>
    <Footer />
    </React.Fragment>
    
  );
}

export default App;
