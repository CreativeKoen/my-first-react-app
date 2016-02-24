import React from 'react';
import expect from 'expect';
import {createRenderer} from 'react-addons-test-utils';
import expectJSX from 'expect-jsx';
expect.extend(expectJSX);

import Table from '../react/components/table/table.js';
import TableRow from '../react/components/table/tablerow.js';

let users = [
	{firstname: 'Koen', lastname: 'something', email: 'creativekoen@gmai.com' }
	,{firstname: 'react', lastname: 'something', email: 'creativekoen@gmai.com' }
];

describe('table', () => {
  it('should display a list of rows', () => {
    let renderer = createRenderer();

    renderer.render(<Table users={users} />);

    let actualElement = renderer.getRenderOutput();

    let expectedElement = <table className="table table-condensed">
				<thead>
	      	<tr>
		        <th>Firstname</th>
		        <th>Lastname</th>
		        <th>Email</th>
	      	</tr>
	    	</thead>
				<tbody>
					{users.map( (user) => {
						return <TableRow user={user} key={user.firstname}/>
					})}
				</tbody>
			</table>;

    expect(actualElement).toEqualJSX(expectedElement);
  });
});
