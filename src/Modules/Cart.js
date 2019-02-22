import React, { Component } from 'react';
import auth0Client from './Authenticator';

export default class Cart extends Component{
	state={
		cartData: null
	}
	handleClick = (event) =>{
		event.preventDefault()
		let newValue = event.currentTarget.value
		console.log(newValue)
		fetch(`http://localhost:3000/remove_from_cart`, {
			method: 'DELETE',
			mode: 'cors',
			headers:{
              'Content-Type': 'application/json'
          	},
			body: JSON.stringify({
				connection: auth0Client.getProfile().aud,
				product_fk: parseInt(newValue)
			})
		})
			.then(data=>{
				this.getCartData()
				console.log("Successfully removed "+data+" from cart!")
			})
			.catch(error=>{
				console.log(error.stack)
			})
	}
	getCartData = () => {
		fetch(`http://localhost:3000/cart/${auth0Client.getProfile().aud}`)
			.then(data=>{
				data.json()
					.then(jsonData=>{
						this.setState({
							cartData: jsonData
						})
					})
			})
	}
	render(){
		if(this.state.cartData===null){
			this.getCartData()
			return(
				<h1>Loading Cart...</h1>
			)
		}else{
			let cart = this.state.cartData.map(item=>{
				return (
						<li>
							<p>{item.name}</p>
							<p>{item.price}</p>
							<button type="button" value={item.product_id} onClick={this.handleClick}>Remove From Cart</button>
						</li>
					)
			})
			return(
				<ul>{cart}</ul>
			)
		}
	}
}