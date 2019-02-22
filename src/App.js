import React, { Component } from 'react';
import './App.css';
import LandingContainer from './Modules/LandingContainer'
import CompanyList from './Modules/CompanyList'
import NewProduct from './Modules/NewProduct'
import NewCompany from './Modules/NewCompany'
import Callback from './Modules/Callback';
import auth0Client from './Modules/Authenticator';
import UserPage from './Modules/UserPage'
import {
  BrowserRouter as Router,
  Route,
  Link, 
} from 'react-router-dom'

class App extends Component {
 	async componentDidMount() {
	    if (window.location.pathname === '/callback') return;
	    try {
	      await auth0Client.silentAuth();
	      this.forceUpdate();
	    } catch (err) {
	      if (err.error !== 'login_required') console.log(err.error);
	    }
	}
  render() {
    return (
      <Router>
      	<div>
		   <Route exact path="/callback" component={Callback}/>
		   <Route exact path="/" component={LandingContainer}/>
		   <Route path="/companies" component={CompanyList}/>
		   <Route path="/new_product" component={NewProduct}/>
		   <Route path="/new_company" component={NewCompany}/>
		   <Route path='/profile' component={UserPage} />
	  	</div>
	  </Router>
    );
  }
}

export default App
