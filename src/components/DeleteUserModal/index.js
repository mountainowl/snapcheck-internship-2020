import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Modal, Button } from 'semantic-ui-react';

// constant
import { BACKEND_BASE_URL } from '../../shared/hostnames';

const DeleteUserModal = ({setOpen, open, userId}) => {
	const history = useHistory();

	return (
		<Modal
			onClose={() => setOpen(false)}
			onOpen={() => setOpen(true)}
			open={open}
			size='mini'
		>
			<Modal.Header>Delete User</Modal.Header>
			<Modal.Content>
				Are you sure you would like to delete this user? 
			</Modal.Content>
			<Modal.Actions>
				<Button 
					basic
					color='red'
					content='Delete'
					onClick={() => deleteUser()} 
				/>
				<Button 
					basic 
					color='blue' 
					content='Cancel' 
					onClick={() => setOpen(false)}
				/>
			</Modal.Actions>
		</Modal>
	)

	function deleteUser() {
		axios.delete(`${BACKEND_BASE_URL}/users/${userId}`)
			.then((res) => {
				if (res.status === 200) {
					history.push('/users');
				} else {
					console.log("Error in deleting")
				}
			})
			.catch((err) => console.log(err))
			.finally(setOpen(false))
	}
}

export default DeleteUserModal;