import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

// components
import DeleteUserModal from '../DeleteUserModal';

// form & validation
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// style
import { Header, Form, Button, Dimmer, Loader, Message } from 'semantic-ui-react';

import { BACKEND_BASE_URL } from '../../shared/hostnames';
import { amountPipe } from '../Users';

const genderOptions = [
	{ key: 'm', text: 'Male', value: 'Male'},
	{ key: 'f', text: 'Female', value: 'Female'},
	{ key: 'o', text: 'Other', value: 'Other'},
]

const UserFormSchema = yup.object().shape({
	firstName: yup.string().required(),
	lastName: yup.string().required(),
	gender: yup.string().required(),
	age: yup.number().positive().integer().required(),
	address1: yup.string().required(),
	address2: yup.string(),
	city: yup.string().required(),
	state: yup.string().required(),
	zip: yup.number().positive().integer().required(),
	amount: yup.number().positive().required()
})

function ErrorP(message) {
	const red = '#B03060';
	return <p style={{color: red}}>{message}</p>
}

const EditUser = () => {
	const [ isFetchingUser, setIsFetchingUser ] = useState(false);
	const [ deleteModalOpen, setDeleteModalOpen ] = useState(false);
	const [ submitError, setSubmitError ] = useState(false);
	const { userId } = useParams();
	const history = useHistory();
	const { register, handleSubmit, reset, errors } = useForm({
		resolver: yupResolver(UserFormSchema)
	});
	
	// on component mount, async fetch user data and set default form values
	useEffect(() => {
		// async server request and fill up form
		setIsFetchingUser(true);
		axios.get(`${BACKEND_BASE_URL}/users/${userId}`)
			.then((res) => {
				if (res.data) {
					let user = res.data;
					let address = user.address;
					reset({
						id: user.id,
						firstName: user.first_name,
						lastName: user.last_name,
						gender: user.gender,
						age: user.age,
						address1: address.address1,
						address2: address.address2,
						city: address.city,
						state: address.state,
						zip: address.zip,
						amount: amountPipe(user.order_total.amount),
						currency: user.order_total.currency,
					})
				} else {
					console.log("Something went wrong fetching user data from server.")
				}
			})
			.catch((err) => console.log(err))
			.finally(
				setIsFetchingUser(false)
			)
	}, [reset, userId])

	// handle submission button
	// first, transform data
	const onSubmit = data => {
		const uploadData = transformUploadData(data);

		axios.put(`${BACKEND_BASE_URL}/users/${userId}`, uploadData)
			.then((res) => {
				if (res.status === 200) {
					history.push('/users');
				} else {
					setSubmitError(true);
				}
			})
			.catch((err) => console.log(err))
	}

	return (
		<div style={{padding: '2em 30% 0 30%' }}>
			<Dimmer active={isFetchingUser} inverted>
				<Loader inverted>Fetching user data ...</Loader>
			</Dimmer>

			<DeleteUserModal
				setOpen={setDeleteModalOpen}
				open={deleteModalOpen}
				userId={userId}
			/>

			<Header as='h3' style={{marginLeft: 'auto', marginRight: 'auto'}}>Edit User</Header>
			<br />
			<Form onSubmit={handleSubmit(onSubmit)}>
				{/* first and last name */}
				<Form.Group>
					<Form.Field required error={errors.firstName ? true : false} width={8}>
						<label>First Name</label>
						<input name='firstName' ref={register} />
						{errors.firstName && ErrorP(errors.firstName.message)}
					</Form.Field>
					<Form.Field required error={errors.lastName ? true : false} width={8}>
						<label>Last Name</label>
						<input name='lastName' ref={register} />
						{errors.lastName && ErrorP(errors.lastName.message)}
					</Form.Field>
				</Form.Group>

				{/* Gender and Age */}
				<Form.Group>
					<Form.Field required width={10}>
						<label>Gender</label>
						<select name='gender' ref={register}>
						{ genderOptions.map((option) => {
							return (
								<option key={option.key} value={option.value}>{option.text}</option>
							)
						})}
						</select>
					</Form.Field>
					<Form.Field required error={errors.age ? true : false} width={6}>
						<label>Age</label>
						<input name='age' ref={register} />
						{errors.age && ErrorP(errors.age.message)}
					</Form.Field>
				</Form.Group>

				{/* Address Line 1 */}
				<Form.Group>
					<Form.Field required error={errors.address1 ? true : false} width={10}>
						<label>Address 1</label>
						<input name='address1' ref={register} />
						{errors.address1 && ErrorP(errors.address1.message)}
					</Form.Field>
					<Form.Field required error={errors.address2 ? true : false} width={6}>
						<label>Address 2</label>
						<input name='address2' ref={register} />
						{errors.address2 && ErrorP(errors.address2.message)}
					</Form.Field>
				</Form.Group>

				{/* Address Line 2 */}
				<Form.Group>
					<Form.Field required error={errors.city ? true : false} width={7}>
						<label>City</label>
						<input name='city' ref={register} />
						{errors.city && ErrorP(errors.city.message)}
					</Form.Field>
					<Form.Field required error={errors.state ? true : false} width={3}>
						<label>State</label>
						<input name='state' ref={register} />
						{errors.state && ErrorP(errors.state.message)}
					</Form.Field>
					<Form.Field required error={errors.zip ? true : false} width={6}>
						<label>Zip</label>
						<input name='zip' ref={register} />
						{errors.zip && ErrorP(errors.zip.message)}
					</Form.Field>
				</Form.Group>

				{/* Amount  */}
				<Form.Group>
					<Form.Field required error={errors.amount ? true : false} width={10}>
						<label>Order Amount</label>
						<input name='amount' ref={register} />
						{errors.amount && ErrorP(errors.amount.message)}
					</Form.Field>
					<Form.Field disabled error={errors.currency ? true : false} width={6}>
						<label>Currency</label>
						<input name='currency' ref={register} />
					</Form.Field>
				</Form.Group>

				<Message
					error
					header='Something went wrong'
					content='Form was not saved to database'
					visible={submitError}
				/>

				{/* Buttons */}
				<Form.Group style={{padding: '0 0.5em 0 0.5em', display: 'flex', flexDirection: 'row'}}>
					<Button 
						basic 
						color='blue' 
						content='Cancel' 
						type='button'
						onClick={() => handleCancel()} 
					/>
					<div style={{flex: 3}} />
					<Button 
						basic 
						color='red' 
						content='Delete' 
						type='button'
						onClick={() => handleDelete()}
					/>
					<Button 
						basic 
						color='blue' 
						content='Save' 
						type='submit'
					/>
				</Form.Group>
			</Form>
		</div>
	)

	function reverseAmountPipe(amount) {
		let stringToNum = parseFloat(amount);
		let modifiedAmount = stringToNum.toFixed(2).toString();
		let fields = modifiedAmount.split('.');

		return `${fields[0]}${fields[1]}`;
	}

	function transformUploadData(data) {
		const uploadData = {
			id: data.id,
			first_name: data.firstName,
			last_name: data.lastName,
			address: {
				address1: data.address1,
				address2: data.address2,
				city: data.city,
				state: data.state,
				zip: data.zip
			},
			gender: data.gender,
			age: data.age,
			order_total: {
				amount: reverseAmountPipe(data.amount),
				currency: data.currency
			}
		}	

		return uploadData;
	}

	function handleCancel() {
		history.push(`/users`);
	}

	function handleDelete() {
		setDeleteModalOpen(true);
	}
}

export default EditUser;