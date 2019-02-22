import React, { Component } from 'react';
import { Button, Popup } from 'semantic-ui-react'

export default class NewCompany extends Component{
	state={
		name: "",
		description: ""
	}
	handleChange = (event)=>{
		event.preventDefault()
		this.setState({
			 [event.currentTarget.name]: event.currentTarget.value
		})
	}
	handleClick = (event)=>{
		event.preventDefault()
		fetch('http://localhost:3000/new_company', {
			method: 'POST',
			mode: 'cors',
			headers:{
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: [this.state.name].toString(),
				description: [this.state.description].toString()
			})

		})
			.then(data=>{
				console.log("Sent "+this.state+" as post request.")
			})
			.catch(error=>{
				console.log(error.stack)
			})
	}
	render(){
		return(
			<div>
				<form className="ui form">
						<div className="equal width fields">
							<div className="field">
								<label>Company Name</label>
								<div className="ui fluid input">
									<input type="text" placeholder="Company Name" name="name" onChange={this.handleChange}/>
								</div>
							</div>
						</div>
						<div className="field">
							<label>Description</label>
							<textarea placeholder="Describe your company..." rows="3" name="description" onChange={this.handleChange}></textarea>
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
    							content={<p>Sucessfully Added Company!</p>}
   							 	on='click'
    							position='top right'
  							/>
						</div>
					</form>
		  	</div>
		)
	}
}