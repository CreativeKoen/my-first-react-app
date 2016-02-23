'use strict';
import React from 'react';
import Nav from '../../nav/nav';
import Table from '../../table/table';


export default class HomeLayout extends React.Component {
	constructor() {
		super();
		this.state = {
			users: [
				{firstname: 'koen', lastname: 'something', email: 'creativekoen@gmail.com' }
				,{firstname: 'john', lastname: 'do', email: 'johndo@gmail.com' }
			]
		}
	}
	// hier geef je this.props.user naar de table component
	render () {
		// this.setState( { user.firstname: "henk"});
		return (
			<div className="container-fuild">
				<Nav />
				<div className="container-fuild">
					<div className="container">
						<div className="row">
							<div className="col-md-12">
								<Table users={this.state.users} />
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
