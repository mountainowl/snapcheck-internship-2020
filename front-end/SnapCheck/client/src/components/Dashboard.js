import React, { useEffect, useState } from 'react';
import UserItem from './UserItem';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState([]);
  const [text, setText] = useState('');

  const onChange = (e) => {
    setText(e.target.value);
    searchUser(text);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setText('');
  };
  // Search user
  const searchUser = (text) => {
    let searchedUser = users.filter(
      (user) =>
        user.first_name.toLowerCase().includes(text.toLowerCase()) ||
        user.last_name.toLowerCase().includes(text.toLowerCase()) ||
        user.order_total.amount.includes(text.toLowerCase())
    );

    setUser(searchedUser);
  };
  // Get all users
  const fatchUsers = async () => {
    const res = await axios.get(`http://localhost:3000/users`);
    setUsers(res.data);
  };

  useEffect(() => {
    fatchUsers();
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      <Link
        style={{
          marginLeft: ' 4rem',
        }}
        onClick={() => setUser([])}
        to='/users'
      >
        Back to users
      </Link>
      <form
        onSubmit={onSubmit}
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <input
          style={{
            width: '35rem',
            marginRight: '2rem',
            alignItems: 'center',
          }}
          type='text'
          name='text'
          value={text}
          placeholder='Search by First name, Last name or the amount....'
          onChange={onChange}
        />

        <button
          style={{
            color: '#fff',
            fontSize: '1rem',
            margin: '1rem',
            padding: '0.7rem 1.5rem',
            border: 'none',
            outline: 'none',
            cursor: 'pointer',
            borderRadius: '20px',
            background: ' #003699',
          }}
          type='submit'
        >
          Search
        </button>
      </form>
      <div className='grid-3'>
        {user.length > 0
          ? user.map((user) => <UserItem user={user} key={user.id} />)
          : users.map((user) => <UserItem user={user} key={user.id} />)}
      </div>
    </div>
  );
};

export default Dashboard;
