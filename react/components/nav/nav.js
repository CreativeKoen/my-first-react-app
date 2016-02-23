'use strict';
import React from 'react';

export default class Nav extends React.Component {
	constructor() {
		super();
	}

	// foreach user return a table row met de user data en een uid key
	render () {
		return (
			<nav className="navbar navbar-default">
			  <div className="container-fluid">
			    <div className="navbar-header">
			      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
			        <span className="sr-only">Toggle navigation</span>
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span>
			      </button>
			      <a className="navbar-brand" href="#">Table of Knowledge</a>
			    </div>
			    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
			      <ul className="nav navbar-nav">
			        <li><a href="#">Link</a></li>
			        <li><a href="#">Link</a></li>
			        <li><a href="#">Link</a></li>
			        <li><a href="#">Link</a></li>
			      </ul>
			    </div>
			  </div>
			</nav>
		)
	}
}
