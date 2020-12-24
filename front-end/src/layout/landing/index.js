import React from 'react';
import {Link} from 'react-router-dom';

const Landing = () => {
    return(
        <div>
            <h1>Get Started</h1>
            <Link to="/auth">Go to login</Link>

            <ul>
                <h3>Authentication expample user</h3>
                <li>
                    <code>username:  test</code>
                </li>
                <li>
                    <code>Password:  test</code>
                </li>
            </ul>
            <p className={`warning`}>Json server is deployed on <a href={`https://my-json-server.typicode.com/`} target="/blank">here</a> which is beta version. It is slow,  get route only works well. To see all the funcanility of this application install the jsonserver and run it on <code>http://localhost:3001</code>.</p>
        </div>
    )
}


export default Landing;