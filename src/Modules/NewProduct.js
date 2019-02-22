import React, { Component } from 'react';
import auth0Client from './Authenticator';
import NavBar from './Navigation'

export default class NewProduct extends Component{
	state={
		company_fk: null,
		name: "",
		description: "",
		price: null,
		stock: null

	}

	handleChange = (event)=>{
		event.preventDefault()
		this.setState({
			 [event.currentTarget.name]: event.currentTarget.value
		})
	}
	handleClick = (event)=>{
		event.preventDefault()
		fetch('http://localhost:3000/new_product', {
			method: 'POST',
			mode: 'cors',
			headers:{
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				company_fk: parseInt([this.state.company_fk].toString()),
				name: [this.state.name].toString(),
				description: [this.state.description].toString(),
				price: parseFloat([this.price].toString()),
				stock: parseInt([this.state.stock].toString())
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
		if(!auth0Client.isAuthenticated()){
			auth0Client.signIn()
			return <div />
		}else{
			return(
				<div>
					<NavBar />
					<form>
						<label>
					    	Company:
					    	<input type="number" name="company_fk" onChange={this.handleChange}/>
					  	</label>
					  	<label>
					    	Name:
					    	<input type="text" name="name" onChange={this.handleChange}/>
					  	</label>
					  	<label>
					    	Description:
					    	<input type="text" name="description" onChange={this.handleChange}/>
					  	</label>
					  	<label>
					    	Price:
					    	<input type="number" name="price" onChange={this.handleChange}/>
					  	</label>
					  	<label>
					    	Stock:
					    	<input type="number" name="stock" onChange={this.handleChange}/>
					  	</label>
					  	<input type="submit" value="Submit" onClick={this.handleClick}/>
					</form>
				</div>
			)
		}
	}
}