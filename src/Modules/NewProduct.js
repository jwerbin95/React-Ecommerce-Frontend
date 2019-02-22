import React, { Component } from 'react';
import auth0Client from './Authenticator';
import { Button, Popup } from 'semantic-ui-react'

export default class NewProduct extends Component{
	state={
		company_fk: null,
		name: "",
		description: "",
		price: null,
		stock: null,
		photo: ""

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
				price: parseFloat([this.state.price].toString()),
				stock: parseInt([this.state.stock].toString()),
				photo: [this.state.photo].toString()
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
					<form className="ui form">
						<div className="equal width fields">
							<div className="field">
								<label>Company Id</label>
								<div className="ui fluid input">
									<input type="text" placeholder="Company Id" name="company_fk" onChange={this.handleChange}/>
								</div>
							</div>
							<div className="field">
								<label>Product Name</label>
								<div className="ui fluid input">
									<input type="text" placeholder="Product Name" name="name" onChange={this.handleChange}/>
								</div>
							</div>
							<div className="field">
								<label>Price</label>
								<div className="ui fluid input">
									<input type="number" placeholder="Price" name="price" onChange={this.handleChange}/>
								</div>
							</div>
							<div className="field">
								<label>Stock</label>
								<div className="ui fluid input">
									<input type="number" placeholder="Stock" name="stock" onChange={this.handleChange}/>
								</div>
							</div>
							<div className="field">
								<label>Add a Photo</label>
								<div className="ui fluid input">
									<input type="file" placeholder="Photo" name="photo" onChange={this.handleChange}/>
								</div>
							</div>
						</div>
						<div className="field">
							<label>Description</label>
							<textarea placeholder="Describe your product..." rows="3" name="description" onChange={this.handleChange}></textarea>
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
    							content={<p>Sucessfully Added Product To Catalog!</p>}
   							 	on='click'
    							position='top right'
  							/>
						</div>
					</form>
				</div>
			)
		}
	}
}