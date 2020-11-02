import React, { PureComponent, Suspense, lazy } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import One from '../Owlcarausel/one';
import Two from '../Owlcarausel/two';
import Three from '../Owlcarausel/three';
import Four from '../Owlcarausel/four';
import axios from 'axios';
import './style.css';

//const CatTab = (props) => {
    class cartTab extends PureComponent{
        state={
            activeTab:'1',
           one:[],
           two: [],
           three:[],
           four:[]
          
        }
      
       componentWillMount(){
          this.getContactList()
        
        }
    componentDidMount(){
        this.getOptical()
        this.getLens()
        this.getEyes()
    }
   getContactList(){
    const params = {
        page:1,
        limit:3,
      };
       

    axios
    .get("http://111.93.169.90:4011/getallContactLens",
    

    )
    .then((resp) => {
      console.log(resp.data);
      //var final= resp.data.find( ({ email }) => email === localStorage.getItem('email') );
      // console.log(final)
      //localStorage.setItem('name',resp.data.fullName)
     this.setState({one:resp.data.data})
    
      })
   
    .catch((error) => {
      // this.setState({ error, isLoading: false })
      console.log(error);
    });


   }
    
getOptical(){
   

    axios
    .get("http://111.93.169.90:4011/getallOpticalLens ", {
    
    })
    .then((resp) => {
    // console.log(resp.data)
     this.setState({two:resp.data.data})
      })
   
    .catch((error) => {
      // this.setState({ error, isLoading: false })
      console.log(error);
    });
}
getLens(){
   

    axios
    .get("http://111.93.169.90:4011/getallLensAccessory ", {
    
    })
    .then((resp) => {
    // console.log(resp.data)
     this.setState({four:resp.data.data})
      })
   
    .catch((error) => {
      // this.setState({ error, isLoading: false })
      console.log(error);
    });
}
   
 getEyes() {

    axios
    .get("http://111.93.169.90:4011/getallEyeWear ", {
    
    })
    .then((resp) => {
    // console.log(resp.data)
     this.setState({three:resp.data.data})
      })
   
    .catch((error) => {
      // this.setState({ error, isLoading: false })
      console.log(error);
    });


 }      
        componentDidUpdate(prevState){

            if(prevState.activeTab!==this.state.activeTab){
                 console.log(this.state.two)
            }
        }
        toggle = (tab )=> {
            // if (activeTab !== tab) setActiveTab(tab);
             if(this.state.activeTab !== tab){
                 this.setState({activeTab:tab})
             }
             
         }
        render(){
  //  const [activeTab, setActiveTab] = useState('1');
 console.log(this.state.activeTab)
   
    return (
       
        <div>
            <Nav tabs className="customTab">
                <NavItem>
                    <NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => {this.toggle('1'); }}>
                        Contact Lens
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggle('2'); }}>
                        Optical Lens
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={classnames({ active: this.state.activeTab === '3' })} onClick={() => { this.toggle('3'); }}>
                        EyeWear
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink className={classnames({ active: this.state.activeTab === '4' })} onClick={() => { this.toggle('4'); }}>
                        Lens Care & Accessory
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                    <Row>
                        <Col md="12">
                         {this.state.activeTab==='1' && 
                      
                         <One act={this.state.one} />
                        }
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId="2">
                    <Row>
                        <Col md="12">
                        {this.state.activeTab==='2' &&  < Two sec={this.state.two}/>}
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId="3">
                    <Row>
                        <Col md="12">
                        {this.state.activeTab==='3' &&  < Three  third={this.state.three}/>}
                           
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId="4">
                    <Row>
                        <Col md="12">
                        {this.state.activeTab==='4' &&  < Four  third={this.state.four}/>}
                           
                        </Col>
                    </Row>
                </TabPane>
            </TabContent>
        </div>
    );
}

    }
export default cartTab