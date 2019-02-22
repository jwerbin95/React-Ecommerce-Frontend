import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import auth0Client from './Authenticator';

function NavBar(props) {
  const signOut = () => {
    auth0Client.signOut();
    props.history.replace('/');
  };
  const addUserToDb = () => {
    fetch(`http://localhost:3000/user/${auth0Client.getProfile().aud}`).then(data=>{
      data.json().then(json=>{
            if(json.length===0){
            fetch('http://localhost:3000/new_user', {
              method: 'POST',
              mode: 'cors',
              headers:{
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user_name: auth0Client.getProfile().nickname,
            email: auth0Client.getProfile().iss,
            picture: auth0Client.getProfile().picture,
            connection: auth0Client.getProfile().aud
          })

        })
          .then(data=>{
            console.log("Sent "+data+" as post request.")
          })
          .catch(error=>{
            console.log(error.stack)
          })
          }
        })
      })
  }
  return (
    <nav className="navbar navbar-dark bg-primary fixed-top">
      {
        !auth0Client.isAuthenticated() &&
        <button className="btn btn-dark" onClick={auth0Client.signIn}>Sign In</button>
      }
      {
        auth0Client.isAuthenticated() &&
        <div>
          {addUserToDb()}
          <label className="mr-2 text-white">{auth0Client.getProfile().name}</label>
          <Link to="/profile">
            <button className="btn btn-dark" type="button">Profile</button>
          </Link>
          <Link to="/new_product">
            <button className="btn btn-dark" type="button">Register A Product With Us</button>
          </Link>
          <Link to="/new_company">
            <button className="btn btn-dark" type="button">Register Your Company With Us</button>
          </Link>
          <Link to="/">
            <button className="btn btn-dark" type="button">Home</button>
          </Link>
          <Link to="/companies">
            <button className="btn btn-dark" type="button">Company List</button>
          </Link>
          <button className="btn btn-dark" onClick={() => {signOut()}}>Sign Out</button>
        </div>
      }
    </nav>
  );
}

export default withRouter(NavBar);