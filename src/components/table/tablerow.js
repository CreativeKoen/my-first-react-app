'use strict';
import React from 'react';

export default class TableRow extends React.Component {
	// hier word de data in de tds gezet
	render () {
		return (
       <tr>
         <td>{this.props.user.firstname}</td>
         <td>{this.props.user.lastname}</td>
         <td>{this.props.user.email}</td>
       </tr>
		)
	}
}
