import React, { Component } from 'react';
import auth0Client from './Authenticator';

export default class Cart extends Component{
	state={
		cartData: null,
		total: 0
	}
	handleClick = (event) =>{
		event.preventDefault()
		let newValue = event.currentTarget.value
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
				<div className="ui active centered inline loader"></div>
			)
		}else{
			let total = 0
			let cart = this.state.cartData.map((item, i)=>{
				total+=parseFloat(item.price)
				return (
					<div className="ui card" key={i}>
						<div className="content">
							<div className="header">{item.name}</div>
							<div className="description">{item.description}</div>
							<div className="meta">${item.price}</div>
						</div>
						<div className="extra content">
							<button className="ui button" type="button" value={item.product_id} onClick={this.handleClick}>Remove From Cart</button>
						</div>
					</div>
				)
			})
			return(
				<div>
					<div className="ui cards">{cart}</div>
					<h3>Total: ${total}</h3>
				</div>
			)
		}
	}
}