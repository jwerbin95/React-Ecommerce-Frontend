import React, { Component } from 'react';
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
			let returnedData = this.state.data.map((item, i)=>{
				return (
						<div className="ui card" key={i}>
							<img src={item.photo} className="ui image" alt={item.name}/>
							<div className="content">
							   	<div className="header">{item.name}</div>
							   	<div className="description">{item.description}</div>
							   	<div className="description">
							   		<strong>${item.price}</strong>
								</div>
							</div>
							<div className="meta">
							   	<span className="date">Left In Stock: {item.stock}</span>
							</div>
							<div className="extra content">
								<button className="ui button" type="button" value={item.product_id} onClick={this.handleClick}>Add to Cart</button>
							</div>
						</div>
				)
			})
			return(
			<div className="landingContainer">
				<div className="ui six cards">
					{returnedData}
				</div>
			</div>
			)
		}else{
			return(
				<div className="ui active centered inline loader"></div>
			)
		}
	}
}