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
        <div className="ui menu">
          <button className="item" onClick={auth0Client.signIn}>Sign In</button>
          <div className="right item">
            <div className="ui action input">
              <input type="text" placeholder="Search..."/>
              <button type="submit" className="ui button">Go</button>
            </div>
          </div>
        </div>
      }
      {
        auth0Client.isAuthenticated() &&
        <div className="ui menu navigation">
          {addUserToDb()}
          <Link to="/">
            <button className="item" type="button">Home</button>
          </Link>
          <Link to="/profile">
            <button className="item" type="button">Profile</button>
          </Link>
          <Link to="/edit_profile">
            <button className="item" type="button">Edit Profile</button>
          </Link>
          <Link to="/new_product">
            <button className="item" type="button">Register A Product With Us</button>
          </Link>
          <Link to="/new_company">
            <button className="item" type="button">Register Your Company With Us</button>
          </Link>
          <Link to="/companies">
            <button className="item" type="button">Company List</button>
          </Link>
          <div className="right item">
            <div className="ui action input">
              <input type="text" placeholder="Search..."/>
              <button type="submit" className="ui button">Go</button>
            </div>
          </div>
          <button className="item" onClick={() => {signOut()}}>Sign Out</button>
        </div>
      }
    </nav>
  );
}

export default withRouter(NavBar);