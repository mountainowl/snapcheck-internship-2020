import {useContext} from 'react';
import {Route, Redirect} from 'react-router-dom';
import Authcontext from './context/authcontext/context';

export const OpenRoute = ({ component: Component, ...rest}) => {
    const {authenticated} = useContext(Authcontext);
    return(
        <Route
            {...rest}
            render={(props) => authenticated === true ? <Redirect to="/dashboard" /> : <Component {...props} /> }
        />
    )
}

export const ProtectRoute = ({ component: Component, ...rest}) => {
    const {authenticated} = useContext(Authcontext);
    return(
        <Route
            {...rest}
            render={(props) => authenticated === false ? <Redirect to="/" /> : <Component {...props} /> }
        />
    )
}