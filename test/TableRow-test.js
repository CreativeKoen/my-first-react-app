import React from 'react';
import expect from 'expect';
import {createRenderer} from 'react-addons-test-utils';
import expectJSX from 'expect-jsx';
expect.extend(expectJSX);

import Table from '../src/components/table/table.js';
import TableRow from '../src/components/table/tablerow.js';

let user = [
	{firstname: 'Koen', lastname: 'something', email: 'creativekoen@gmai.com' }
];

describe('tableRow', () => {
  it('should display the user name and email', () => {
    let renderer = createRenderer();

    renderer.render(<TableRow user={user} />);

    let actualElement = renderer.getRenderOutput();

    let expectedElement = <tr>
         <td>{user.firstname}</td>
         <td>{user.lastname}</td>
         <td>{user.email}</td>
       </tr>;
    expect(actualElement).toEqualJSX(expectedElement);
  });
});
