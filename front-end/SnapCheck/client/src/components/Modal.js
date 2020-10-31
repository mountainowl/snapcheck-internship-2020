import React from 'react';
import './Modal.css';
import { Link } from 'react-router-dom';

const Modal = ({ show, close, deleteUser }) => {
  return (
    <div
      className='modal-wrapper'
      style={{
        transform: show ? 'translateY(0vh)' : 'translateY(-100vh)',
        opacity: show ? '1' : '0',
      }}
    >
      <div className='modal-header'>
        {/* <p>Welcome To Our Site</p> */}
        <span onClick={close} className='close-modal-btn'>
          x
        </span>
      </div>
      <div className='modal-content'>
        <div className='modal-body'>
          <p>Are you sure you want to delete this user?</p>
        </div>
        <div style={{ display: 'flex' }} className='modal-footer'>
          <button
            style={{ background: '#eee' }}
            onClick={close}
            className='btn-cancel'
          >
            Cancel
          </button>
          <Link to='/users'>
            <button onClick={deleteUser} className='btn-cancel'>
              Delete
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Modal;
