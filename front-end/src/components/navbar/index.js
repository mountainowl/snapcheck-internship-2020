import {useContext} from 'react'
import Authcontext from '../../context/authcontext/context';
const Navbar = (props) => {
    const {user, logout} = useContext(Authcontext);
    return (
        <header>
            <h2>{user.name}</h2>
            <button className={`red`} onClick={() => logout()}>logout</button>
        </header>
    )
} 

export default Navbar;