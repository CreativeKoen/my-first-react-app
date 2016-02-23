import React from 'react';

export default class Contact extends React.Component {
	// single element of a list
	render () {
		return (
				<li>{this.props.contact.name} - {this.props.contact.phone}</li>
		)
	}
}
