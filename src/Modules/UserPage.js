import React, { Component } from 'react';
import auth0Client from './Authenticator';
import Cart from './Cart'

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
	componentDidMount(){
		auth0Client.isAuthenticated() &&
		this.getUserData()
	}
	render(){
		if(!auth0Client.isAuthenticated()){
			return(
				<div>
					<h1>You neded to sign in to access your profile.</h1>
				</div>
			)
		}
		if(this.state.userData!==null)
		{
			let newData = this.state.userData.map((item, i)=>{
				return (
					<div key={i}>
						<h3>{auth0Client.getProfile().name}</h3>
						<img className="ui large image" src={item.picture} alt={item.user_name}/>
						<p>User Name: {item.user_name}</p>
						<p>Email: {item.email}</p>
					</div>
				)
			})
			return(
				auth0Client.isAuthenticated() &&
				<div className="ui vertically divided grid userPage">
					<div className="two column row">
						<div className="column">
							{newData}
						</div>
						<div className="column">
							<h3>
								<i aria-hidden="true" class="shopping cart icon"></i>
								Shopping Cart
							</h3>
							<Cart />
						</div>
					</div>
				</div>
			)
		}else{
			return(
				auth0Client.isAuthenticated() &&
				<div>
					{this.getUserData()}
					<div className="ui active centered inline loader"></div>
				</div>
			)
		}
	}
}