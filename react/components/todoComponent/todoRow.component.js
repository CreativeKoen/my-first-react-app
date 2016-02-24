'use strict';
import React from 'react';

export default class TodoRow extends React.Component {
	// hier word de data in de tds gezet
	render () {
		return (
       <tr>
         <td>{this.props.loading}</td>
         <td>{this.props.error}</td>
         <td>{this.props.todoes.id}</td>
         <td>{this.props.todoes.msg}</td>
       </tr>
		)
	}
}
