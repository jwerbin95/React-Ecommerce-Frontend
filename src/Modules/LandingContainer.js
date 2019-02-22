import React, { Component } from 'react';
import NavBar from './Navigation'
import auth0Client from './Authenticator';

export default class LandingContainer extends Component{
	state={
		data: null
	}
	handleClick = (event)=>{
		event.preventDefault()
		let newValue = event.currentTarget.value
		fetch(`http://localhost:3000/user/${auth0Client.getProfile().aud}`)
			.then(data=>{
				data.json()
				.then(json=>{
					fetch('http://localhost:3000/add_to_cart', {
						method: 'POST',
						mode: 'cors',
	            		headers:{
	            			'Content-Type': 'application/json'
	           			 },
	           			 body: JSON.stringify({
	            			product_fk: newValue,
	            			cart_fk: json[0].cart_fk
	           			 })
					})
				})
			})
	}
	componentDidMount(){
		fetch('http://localhost:3000/products')
			.then(data=>{
				data.json().then(jsonData=>{
					this.setState({
						data: jsonData
					})
				})
			})
			.catch(error=>{
				console.log(error.stack)
			})
	}
	render() {
		if(this.state.data!==null){
			let returnedData = this.state.data.map(item=>{
				return (
							<li>
							   <p>{item.name}</p>
							   <p>{item.description}</p>
							   <p>{item.price}</p>
							   <p>{item.stock}</p>
							   <button type="button" value={item.product_id} onClick={this.handleClick}>Add to Cart</button>
						   </li>
					   )
			})
			return(
			<div className="landingContainer">
				<NavBar />
				<h1>E-Commerce Website</h1>
				<ul>{returnedData}</ul>
			</div>
			)
		}else{
			return(
				<h1>Loading...</h1>
			)
		}
	}
}