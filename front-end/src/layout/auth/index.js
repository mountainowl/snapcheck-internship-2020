import {useState, useContext} from 'react';
import {Link} from 'react-router-dom';
import Authcontext from '../../context/authcontext/context';
const AuthPage = () => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');


    const {login, error} = useContext(Authcontext);

    const handleSubmit = (e) => {
        e.preventDefault();
        login(userId, password);
    }
    return (
        <div className={`auth_container`}>
            <form onSubmit={handleSubmit} className={`form_container`}>
                {error && <p className={`red`}>{error}</p>}
                <div>
                    <label>UserId</label>
                    <input value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="User ID" />
                </div>
                <div>
                    <label>Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                </div>
                <div>
                    <button type="submit">submit</button>
                </div>
                <div>
                    <Link to="/dashboard">got back to landing page</Link>
                </div>
            </form>
        </div>
    )
}

export default AuthPage;