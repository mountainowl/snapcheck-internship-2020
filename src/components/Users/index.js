import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

// hostnames
import { BACKEND_BASE_URL } from '../../shared/hostnames';
// styling
import { Container, Input, Table, Dimmer, Loader } from 'semantic-ui-react';

const Users = () => {
	const [allUsers, setAllUsers] = useState([]);
	const [searchResults, setSearchResults] = useState([]);
	const [ isFetchingUsers, setIsFetchingUsers ] = useState(false);
	const searchPhraseObject = useFormInput('');
	const history = useHistory();

	// on mount, fetch users and store into const users
	useEffect(() => {
		setSearchResults(true);
		axios.get(`${BACKEND_BASE_URL}/users`)
			.then((res) => {
				if (res.data) {
					setAllUsers(res.data);
					setSearchResults(res.data);
				} else {
					console.log("Error in backend/users response");
				}
			})
			.catch((err) => console.log(err))
			.finally(setIsFetchingUsers(false))
	}, [])

	// on search phrase change, load temp search results to displayOrders
	useEffect(() => {
		let searchPhrase = searchPhraseObject.value;
		function filterUsersByPhrase(user) {
			let amountString = amountPipe(user.order_total.amount)
			return (
				user.first_name.toLowerCase().includes(searchPhrase.toLowerCase()) ||
				user.last_name.toLowerCase().includes(searchPhrase.toLowerCase()) ||
				amountString.includes(searchPhrase)	
			)
		}

		let results = allUsers.filter(filterUsersByPhrase);
		setSearchResults(results);
	}, [searchPhraseObject.value, allUsers])

	return (
		<Container style={{overflowY: 'auto', paddingTop: '2em'}}>
			<Dimmer active={isFetchingUsers} inverted>
				<Loader inverted>Fetching users ...</Loader>
			</Dimmer>
			<Input 
				focus 
				placeholder="Search first name, last name, amount" 
				default=''
				{...searchPhraseObject}
				style={{
					width: '30%'
				}}
			/>
			<Table celled>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>Username</Table.HeaderCell>
						<Table.HeaderCell>Address</Table.HeaderCell>
						<Table.HeaderCell>Gender</Table.HeaderCell>
						<Table.HeaderCell>Age</Table.HeaderCell>
						<Table.HeaderCell 
							style={{
								textAlign: 'right'
							}}
						>
							Amount
						</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
				{
					searchResults.length > 0 ? searchResults.map((user) => {
						let amountAndCurrency = `${amountPipe(user.order_total.amount)} ${user.order_total.currency}`;
						return (
							<Table.Row 
								key={user.id}
								onClick={() => changeToEditUser(user.id)}
							>
								<Table.Cell collapsing>{user.first_name}&nbsp;{user.last_name}</Table.Cell>
								<Table.Cell>{addressPipe(user.address)}</Table.Cell>
								<Table.Cell collapsing>{user.gender}</Table.Cell>
								<Table.Cell collapsing>{user.age}</Table.Cell>
								<Table.Cell textAlign='right' collapsing>{amountAndCurrency}</Table.Cell>
							</Table.Row>
						)
					}) : null
				}
				</Table.Body>
			</Table>	
		</Container>
	)

	// on table row click, change to EditUser component with specified id
	// do so by changing the path 
	function changeToEditUser(id) {
		history.push(`/users/${id}`);
	}

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

	// given address, return formatted string
	function addressPipe(address) {
		const { address1, address2, city, state, zip } = address;

		let returnString = `${address1} ${address2} ${city}, ${state} ${zip}`;
		return returnString;
	}
};

// given order_total object, return formatted amount i.e. currency symbol and dec
export function amountPipe(amount) {
	if (amount === null || amount === undefined) {
		return "Null";
	}

	let amountString = amount.toString();
	let amountStringLen = amountString.length;

	if (amountStringLen === 1) {
		amountString = `0.0${amountString}`;
	} else if (amountStringLen === 2) {
		amountString = `0.${amountString}`;
	} else {
		let dotIndex = amountStringLen - 2;
		let temp = amountString.slice(0, dotIndex) + '.' + amountString.slice(dotIndex);
		amountString = temp;
	}

	return amountString
}
	
export default withRouter(Users);