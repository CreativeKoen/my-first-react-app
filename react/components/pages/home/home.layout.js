'use strict';
import React from 'react';
import Nav from '../../nav/nav';
import Table from '../../table/table';
import Todo from '../../todoComponent/todo.component';

export default class HomeLayout extends React.Component {
	constructor(props) {
		super(props);
		this.state = { users: [
			{firstname: 'koen', lastname: 'something', email: 'creativekoen@gmail.com' }
			,{firstname: 'john', lastname: 'do', email: 'johndo@gmail.com' }
			]
		}
	}
	// hier geef je this.props.user naar de table component
	render () {
		return (
			<div className="container-fuild">
				<Nav />
				<div className="container-fuild">
					<div className="container">
						<div className="row">
							<div className="col-md-12">
								<Table users={this.state.users} />
								<Todo url="/api/test" pollInterval={60000} />
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
