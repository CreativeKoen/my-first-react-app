'use strict';
import React from 'react';
import TableRow from './tablerow';

export default class Table extends React.Component {
	constructor() {
		super();
	}

	// foreach user return a table row met de user data en een uid key
	render () {
		return (
			<table className="table table-condensed">
				<thead>
	      	<tr>
		        <th>Firstname</th>
		        <th>Lastname</th>
		        <th>Email</th>
	      	</tr>
	    	</thead>
				<tbody>
					{this.props.users.map( (user) => {
						return <TableRow user={user} key={user.firstname}/>
					})}
				</tbody>
			</table>
		)
	}
}
