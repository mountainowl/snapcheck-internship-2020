import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from 'react-avatar';

const UserItem = ({ user }) => {
  return (
    <div className='card text-center '>
      <div className='card'>
        <div className='all-center'>
          <Avatar name={user.first_name} size='150' round='120px' />
          <h1>{user.first_name}</h1>
          <p>Location: {user.address.address1}</p>
          <strong>Order: </strong> {user.order_total.amount}{' '}
          <strong>{user.order_total.currency} </strong>
        </div>
        <Link to={`/users/${user.id}`}>
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
          >
            More
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UserItem;
