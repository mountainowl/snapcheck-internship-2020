import { useEffect, useContext } from "react";
import {useParams, Link, useHistory } from 'react-router-dom';
import Datacontext from '../../context/datacontext/context';

import Navbar from '../../components/navbar';
import Modal from "../../components/modal";

const Edit = () => {
    const { userId } = useParams();
    const history = useHistory();
    let {handleSingleItem, singleItem, handleChange, updateUserData, deleteUserData} = useContext(Datacontext)
    useEffect(() => {
        handleSingleItem(userId);
    }, [])

    const handleDelete = () => {
        deleteUserData(userId);
        history.push('/dashboard')
    }

    const handleUpdate = () => {
        updateUserData(userId);
        history.push('/dashboard');
    }

    if(!singleItem) {
        return <h1>Loading.....</h1>
    }
    return (
        <div>
            <Navbar />
            <div className={`form_container`}>
                <div>
                    <label>First Name:</label>
                    <input value={singleItem["first_name"]} name="first_name" onChange={handleChange}/>
                </div>
                <div>
                    <label>Last Name:</label>
                    <input value={singleItem["last_name"]} name="last_name" onChange={handleChange}/>
                </div>
                {singleItem.address &&(
                <div>
                    <label>Address:</label>
                    <input value={singleItem["address"]["address1"]} name="address1" onChange={handleChange}/>
                    <input value={singleItem["address"]["address2"]} name="address2" onChange={handleChange}/>
                    <input value={singleItem["address"]["state"]} name="state" onChange={handleChange}/>
                    <input value={singleItem["address"]["zip"]}  name="zip" onChange={handleChange}/>
                </div>
                )}
                <div>
                    <label>Gender:</label>
                    <input value={singleItem["gender"]} name="gender" onChange={handleChange}/>
                </div>
                <div>
                    <label>Age:</label>
                    <input value={singleItem["age"]} name="age" onChange={handleChange}/>
                </div>
                {singleItem.order_total &&(
                <div>
                    <label>Total Amount: </label>
                    <input value={singleItem["order_total"]["amount"]} type="number"  min="0.01" step="0.01" name="amount" onChange={handleChange}/>
                    <label>{singleItem["order_total"]["currency"]}</label>
                </div>
                )}
            </div>

            <div className={`button_container`}>
 
                <Link to="/dashboard">
                <button className={`primary`}>cancel</button>
                </Link>
                <button className={`success`} onClick={() => handleUpdate()}>save</button>
                <Modal
                    modal={`Delete`}
                    heading={`Are you sure you want to delete ?`}
                >
                <button className={`red`} onClick={() => handleDelete()}>delete</button>
                </Modal>
            </div>

        </div>
    )
}

export default Edit;