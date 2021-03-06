'use strict';
import React from 'react';

export default class <% name %> extends React.Component {
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
					this.setState({data: data , ajaxError: null});
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
		console.log('component did mount',Date.now());
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
					{this.state.loading}
					{this.state.error}
					{this.state.data}
			</div>
		)
	}
}
