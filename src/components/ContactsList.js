import React from 'react';
import Contact from './contact';

export default class ContactsList extends React.Component {
	constructor() {
		super();
		this.state = {
			search: ''
		};
	}

	updateSearch(event) {
		this.setState({ search: event.target.value })
	}

	render () {
		let filteredContacts = this.props.contacts.filter(
			(contact) => {
				return contact.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
			}
		);
				// <input type="text" className="form-control" value={this.state.search} onChange={this.updateSearch.bind(this)}/>
				// <hr />
		return (
			<div>
				<ul>
					{filteredContacts.map((contact) => {
						return <Contact contact={contact} key={contact.name}/>
					})}
				</ul>
			</div>
		)
	}
}
