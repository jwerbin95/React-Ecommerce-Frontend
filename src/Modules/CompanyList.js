import React, { Component } from 'react';

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
			let returnedData=this.state.data.map((item, i)=>{
				return (
					<div className="ui card" key={i}>
						<div className="content">
							<div className="header">{item.name}</div>
							<div className="description">{item.description}</div>
						</div>
					</div>
				)
			})
			return(
				<div>
					<div className="ui cards">{returnedData}</div>
				</div>
			)
		}else{
			return(
				<div className="ui active centered inline loader"></div>
			)
		}
	}
}