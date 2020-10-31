import React, { useEffect, useState, useReducer } from 'react';
import { Link } from 'react-router-dom';
import Avatar from 'react-avatar';
import axios from 'axios';
import Modal from './Modal';

const User = (props) => {
  const id = props.match.params.id;

  const [getUser, setGetUser] = useState({
    first_name: '',
    last_name: '',
    age: '',
    gender: '',
    address: { address1: '', address2: '', city: '', state: '', zip: '' },
    order_total: { amount: 0 },
  });
  const [show, setShow] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  // Format amount currency
  let numUSD = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'GBP',
  });

  const {
    first_name,
    last_name,
    age,
    gender,
    order_total: { amount },
    address: { address1, city, state, zip },
  } = getUser;

  //Get user by ID
  const fatchUserById = async () => {
    const res = await axios.get(`http://localhost:3000/users/${id}`);
    setGetUser(res.data);
  };

  const onChange = (e) => {
    const name = e.target.name;
    if (
      name === 'city' ||
      name === 'zip' ||
      name === 'state' ||
      name === 'address1' ||
      name === 'address2'
    ) {
      setGetUser({
        ...getUser,
        address: {
          ...getUser.address,
          [e.target.name]: e.target.value,
        },
      });
    } else if (name === 'amount') {
      setGetUser({
        ...getUser,
        order_total: {
          ...getUser.order_total,
          [e.target.name]: e.target.value,
        },
      });
    } else {
      setGetUser({
        ...getUser,
        [name]: e.target.value,
      });
    }
  };
  // Modal close method
  const closeModalHandler = () => setShow(false);

  const onSubmit = (e) => {
    e.preventDefault();

    updateUser(getUser);
  };
  //Post update user
  const updateUser = async (user) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    await axios.put(`http://localhost:3000/users/${id}`, getUser, config);
    props.history.push('/users');
  };

  const deleteUser = async () => {
    await axios.delete(`http://localhost:3000/users/${id}`);
  };

  useEffect(() => {
    fatchUserById();
    //eslint-disable-next-line
  }, [id]);

  return (
    <div className='card text-center'>
      <Link to='/users/'>Back to users</Link>
      {isEdit ? (
        <form onSubmit={onSubmit}>
          <input
            style={{ width: '15rem' }}
            type='text'
            name='first_name'
            value={first_name}
            placeholder='Change the first name'
            onChange={onChange}
          />
          <input
            style={{ width: '15rem' }}
            type='text'
            name='last_name'
            value={last_name}
            placeholder='Change the last name....'
            onChange={onChange}
          />
          <input
            style={{ width: '15rem' }}
            type='text'
            name='gender'
            value={gender}
            placeholder='Change the gender....'
            onChange={onChange}
          />
          <input
            style={{ width: '15rem' }}
            type='text'
            name='address1'
            value={address1}
            placeholder='Change the address....'
            onChange={onChange}
          />
          <input
            style={{ width: '15rem' }}
            type='text'
            name='city'
            value={city}
            placeholder='Change the city....'
            onChange={onChange}
          />
          <input
            style={{ width: '15rem' }}
            type='text'
            name='state'
            value={state}
            placeholder='Change the state....'
            onChange={onChange}
          />
          <input
            style={{ width: '15rem' }}
            type='text'
            name='zip'
            value={zip}
            placeholder='Change the zip code....'
            onChange={onChange}
          />
          <input
            style={{ width: '15rem' }}
            type='text'
            name='age'
            value={age}
            placeholder='Change the age....'
            onChange={onChange}
          />

          <input
            style={{ width: '15rem' }}
            type='text'
            name='amount'
            value={amount}
            placeholder='Chnage the amount....'
            onChange={onChange}
          />
          <button
            style={{
              color: '#fff',
              fontSize: '1rem',
              margin: '1rem',
              padding: '0.2rem 1.5rem',
              border: 'none',
              outline: 'none',
              cursor: 'pointer',
              borderRadius: '20px',
              background: ' #003699',
            }}
            type='submit'
          >
            Submit
          </button>
          <Link to={`/users/${id}`} onClick={() => setIsEdit(false)}>
            {' '}
            Cancel{' '}
          </Link>
        </form>
      ) : (
        <>
          <div className='card '>
            <div className='all-center'>
              <Avatar name={first_name} size='150' round='120px' />
              <h1>{`${first_name} ${last_name}`}</h1>
              <strong>Address: </strong>{' '}
              {`${address1} ${city}  ${state}
              ${zip}`}
              <br />
              <strong>Gender: </strong> {gender}
              <br />
              <strong>Age: </strong>
              {age}
              <br />
              <strong>amount: </strong>
              {numUSD.format(amount)}
            </div>
          </div>

          {/* Modal */}
          <div>
            <button
              onClick={() => setShow(true)}
              className='btn-openModal'
              style={{ background: '#d42c2c', color: '#fff' }}
            >
              Delete User
            </button>
            <button
              onClick={() => setIsEdit(!isEdit)}
              className='btn-openModal'
              style={{
                background: 'rgb(47, 194, 108)',
                color: '#fff',
                padding: '.5rem 3.5rem',
              }}
            >
              Edit
            </button>
            <Link to='/users'>Cancel</Link>
            <div>
              {show ? (
                <div onClick={closeModalHandler} className='back-drop'></div>
              ) : null}

              <Modal
                deleteUser={deleteUser}
                show={show}
                close={closeModalHandler}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default User;
