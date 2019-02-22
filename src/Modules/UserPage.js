import React, { Component } from 'react';
import auth0Client from './Authenticator';
import Cart from './Cart'
import NavBar from './Navigation'

export default class UserPage extends Component{
	state={
		userData: null
	}
	getUserData = () => {
		fetch(`http://localhost:3000/user/${auth0Client.getProfile().aud}`)
			.then(data=>{
				data.json().then(jsonData=>{
					this.setState({
						userData: jsonData
					})
				})
			})
			.catch(error=>{
				console.log(error.stack)
			})
	}
	render(){
		if(!auth0Client.isAuthenticated()){
			return(
				<div>
					<h1>You neded to sign in to access your profile.</h1>
					<button type="button" onClick={auth0Client.signIn}>Sign In</button>
				</div>
			)
		}
		if(this.state.userData!==null)
		{
			let newData = this.state.userData.map(item=>{
				return (
					<div>
						<NavBar />
						<img src={item.picture} alt={item.user_name}/>
						<p>{item.user_name}</p>
						<p>{item.email}</p>
					</div>
				)
			})
			return(
				auth0Client.isAuthenticated() &&
				<div>
					{this.getUserData()}
					{newData}
					<Cart />
				</div>
			)
		}else{
			return(
				auth0Client.isAuthenticated() &&
				<div>
					{this.getUserData()}
					<h1>Loading...</h1>
				</div>
			)
		}
	}
}