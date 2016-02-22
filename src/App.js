'use strict';
import React from 'react';
import HomeLayout from './components/pages/home/home.layout';
import Nav from './components/nav/nav';


class App extends React.Component {
	render () {
		return (
			<HomeLayout />
		)
	}
}

//het wordt de object array users aan this.props gekoppeld door het in te spellen als een attribute
React.render(<App />, document.getElementById('app'))
//React.render(<App contacts={contacts}/>, document.getElementById('app'))
