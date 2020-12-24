import {useState, useEffect} from 'react';
import Authcontext from './context';

import {admin} from '../../util/data';

const AuthProvider = ({children}) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState({});
    const [error, setError] = useState('');

    useEffect(() => {
        (async function() {
            const loggedUser = await localStorage.getItem("user");
            const authBool = await localStorage.getItem('authentication');
            if(loggedUser && authBool) {
                const usr = admin.filter((itm) => itm.uid === loggedUser);
                setUser(usr[0]);
                setAuthenticated(true);
            } else {
                setUser('');
                setAuthenticated(false);
            }
        })()
    }, [authenticated])
    const login = (username, password) => {
        const adminUser = admin.filter((itm) => itm.username === username && itm.password === password);
        if(adminUser[0]) {
            localStorage.setItem('user', adminUser[0].uid);
            localStorage.setItem('authentication', true);
            setAuthenticated(true);
        }
        else {
            setError("User or password is incorrect")
        }
    }
    const logout = () => {
        localStorage.clear();
        setUser('');
        setAuthenticated(false);
    }

    const signup = (user, password) => {
        console.log("signup")
    }
    console.log(user)

    return (
        <Authcontext.Provider value={{
            authenticated,
            user,
            error,
            login,
            logout,
            signup,
        }}>
            {children}
        </Authcontext.Provider>
    )
}

export default AuthProvider;