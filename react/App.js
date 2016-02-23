'use strict';
import React from 'react';
import ReactDom from 'react-dom';
import HomeLayout from './components/pages/home/home.layout';
import Nav from './components/nav/nav';

class App extends React.Component {
	render () {
		return (
			<HomeLayout />
		)
	}
}
//ReactDom.render(<App />, document.getElementById('app'))
