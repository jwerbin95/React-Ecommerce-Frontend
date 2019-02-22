import React, { Component } from 'react';
import NavBar from './Navigation'

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
				<NavBar />
				<form>
					<label>
				    	Name:
				    	<input type="text" name="name" onChange={this.handleChange}/>
				  	</label>
				  	<label>
				    	Description:
				    	<input type="text" name="description" onChange={this.handleChange}/>
				  	</label>
				  	<input type="submit" value="Submit" onClick={this.handleClick}/>
			  	</form>
		  	</div>
		)
	}
}