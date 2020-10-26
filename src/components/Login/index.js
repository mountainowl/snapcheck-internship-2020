import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

// context
import { UserContext } from '../../contexts/UserContext';
// constants
import { BACKEND_BASE_URL } from '../../shared/hostnames';
// styling
import { Container, Segment, Form, Button, Message, Dimmer, Loader } from 'semantic-ui-react';

const Login = (props) => {
	const firstName = useFormInput('');
	const lastName = useFormInput('');
	const [hasError, setHasError] = useState(false);
	const [isAuthenticating, setIsAuthenticating] = useState(false)
	const user = useContext(UserContext);
	const history = useHistory();

	const { setIsLoggedIn } = props;

	return (
		<Container 
			style={{
				width: '100%',
				height: '100%',
				padding: '5em',
				textAlign: 'center',
			}}
		>
			<Segment style={{width: '20%', margin: 'auto'}}>
				<Dimmer active={isAuthenticating} inverted>
					<Loader inverted>Authenticating</Loader>
				</Dimmer>
				<Form>
					<Form.Field>
						<label>First Name</label>
						<input placeholder="E.g. Jennifer" {...firstName} />
					</Form.Field>
					<Form.Field>
						<label>Last Name</label>
						<input placeholder="E.g. Gardner" {...lastName} />
					</Form.Field>
					<Message
						hidden={!hasError}
						visible={hasError}
						compact
						error
						content="User could not be verified"
					>
					</Message>
					<Form.Field>
						<Button
							type='submit'
							basic
							color='blue'
							disabled={!firstName.value || !lastName.value}
							onClick={() => {
								setIsAuthenticating(true);
								validateUser(firstName.value, lastName.value);
							}}
						>
							Log In
						</Button>
					</Form.Field>
				</Form>
			</Segment>
		</Container>
	)

	function useFormInput(initialValue) {
		const [value, setValue] = useState(initialValue);
		function handleChange(e) {
			setValue(e.target.value);
		}

		return {
			value, 
			onChange: handleChange
		};
	}	

	// given first & last name, setIsLoggedIn to whether a corresponding user exists
	// if exists, set isLoggedIn to true and set user context values
	// else, setHasError and show a message 
	function validateUser(firstName, lastName) {
		firstName = firstName.trimEnd();
		lastName = lastName.trimEnd();
		axios.get(`${BACKEND_BASE_URL}/users?first_name=${firstName}&last_name=${lastName}`)
			.then((res) => {
				const foundOrders = res.data;
				if (foundOrders && foundOrders.length > 0) {
					setIsLoggedIn(true);
					user.setFirstName(firstName);
					user.setLastName(lastName);
					history.push('/users');
				} else {
					setHasError(true);
				}
			})
			.catch((err) => {
				console.log(err)
			})
			.finally(
				setIsAuthenticating(false)
			)
	}
}

export default Login;