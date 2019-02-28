import React, { Component } from 'react';
import auth0Client from './Authenticator';
import { Button, Popup } from 'semantic-ui-react'

export default class EditUser extends Component{
	state={
		user_name: "",
		email: ""
	}
	handleChange = (event)=>{
		event.preventDefault()
		this.setState({
			 [event.currentTarget.name]: event.currentTarget.value
		})
	}
	handleClick = (event)=>{
		console.log(this.state.user_name)
		event.preventDefault()
		fetch(`http://localhost:3000/edit_user/${auth0Client.getProfile().aud}`, {
			method: 'PUT',
			mode: 'cors',
			headers:{
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				user_name: [this.state.user_name].toString(),
				email: [this.state.email].toString()
			})

		})
			.then(data=>{
				console.log("Sent "+this.state+" as put request.")
			})
			.catch(error=>{
				console.log(error.stack)
			})
	}
	render(){
		return(
			auth0Client.isAuthenticated() &&
			<div>
				<form className="ui form">
					<div className="equal width fields">
						<div className="field">
							<label>New Username</label>
							<div className="ui fluid input">
								<input type="text" placeholder="Username" name="user_name" onChange={this.handleChange}/>
							</div>
						</div>
					</div>
					<div className="field">
						<label>New Email</label>
						<input type="text" placeholder="Email" name="email" onChange={this.handleChange}></input>
					</div>
					<div className="field">
						<div className="ui checkbox">
							<input type="checkbox" className="hidden" readOnly="" tabIndex="0"/>
							<label>I agree to the Terms and Conditions</label>
						</div>
					</div>
					<div className="field">
						<Popup
	    					trigger={<Button content='Submit' onClick={this.handleClick}/>}
	   						content={<p>Sucessfully Changed Profile!</p>}
	   					 	on='click'
	    					position='top right'
	  					/>
					</div>
				</form>
			</div>
		)
	}
}