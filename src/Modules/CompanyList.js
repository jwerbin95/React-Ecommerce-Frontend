import React, { Component } from 'react';
import NavBar from './Navigation'

export default class CompanyList extends Component{
	state={
		data: null
	}
	componentDidMount(){
		fetch('http://localhost:3000/companies')
			.then(data=>{
				data.json()
					.then(jsonData=>{
						this.setState({
							data: jsonData
						})
					})
			})
			.catch(error=>{
				console.log(error.stack)
			})
	}
	render(){
		if(this.state.data!==null){
			let returnedData=this.state.data.map(item=>{
				return (
					<li>
						<p>{item.name}</p>
						<p>{item.description}</p>
					</li>
				)
			})
			return(
				<div>
					<NavBar />
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