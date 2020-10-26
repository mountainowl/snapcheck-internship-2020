import React, { createContext } from 'react';

export const UserContext = createContext();

// the data we want to share btwn differ components 
class UserContextProvider extends React.Component {
	constructor() {
		super();
		this.state = {
			firstName: '',
			lastName: '', 
			currency: 'USD'
		}
		this.setFirstName = this.setFirstName.bind(this);
		this.setLastName = this.setLastName.bind(this);
	}

	setFirstName = (value) => {
		this.setState({
			firstName: value
		});
	}

	setLastName = (value) => {
		this.setState({
			lastName: value
		});
	}

	render() {
		return (
			// the provider provides the values in the state
			// ultimately will be processed by the consumer
			<UserContext.Provider 
				value={{
					...this.state, 
					setFirstName: this.setFirstName, 
					setLastName: this.setLastName
				}}
			>
				{this.props.children}
			</UserContext.Provider>
		);
	}
}

export default UserContextProvider;