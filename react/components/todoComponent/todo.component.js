'use strict';
import React from 'react';
import TodoRow from './todoRow.component';
export default class Todo extends React.Component {
	constructor() {
		super();
		this.state= {
				loading: false,
				error: null,
				ajaxError: null,
				data: []
		};
	}

	loadDataFromServer() {
		this.setState({loading: true});
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
			success: (data) => {
				if (typeof data.error !== 'undefined') {
				 	this.setState({error: data.error});
				} else {
					this.setState({data: data.todoes , ajaxError: null});
				}
			},
			error: (xhr, status, err) => {
				this.setState({ajaxError: err.toString()});
				console.error(this.props.url, status, err.toString());
			},
			complete: () => {
				this.setState({loading: false});
				setTimeout(this.loadDataFromServer, this.props.pollInterval);
			}
		});
	}

	componentDidMount() {
		this.loadDataFromServer();
		// console.log('component did mount',Date.now());
	}
	render () {
		// if loading
		var loading;
		if (this.state.loading) {
			loading = <div className="panel panel-default"><i className="fa fa-spinner fa-spin"></i></div>
		}
		if (this.state.ajaxError) {
			loading = <div className="panel panel-default"><i className="fa fa-exclamation-triangle" title={this.state.ajaxError}></i></div>
		}

		if (this.state.error) {
			return (
				<div className="panel panel-default">
					{loading}
					{this.state.error.type}
					{this.state.error.data}
				</div>
			);
		}

		return (
			<div className="panel panel-default">
				{loading}
				<table className="table table-condensed">
						<thead>
			      	<tr>
				        <th>loading</th>
				        <th>error</th>
				        <th>todo id</th>
				        <th>todo msg</th>
			      	</tr>
			    	</thead>
						<tbody key={this.state.data.id}>
							<TodoRow loading={this.state.loading} error={this.state.error} todoes={this.state.data} />
						</tbody>
				</table>
			</div>
		)
	}
}
