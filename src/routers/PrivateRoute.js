import React, { useContext, Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../firebase/Auth";
import {Header} from "../components/Header";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
    const {currentUser} = useContext(AuthContext);
    return (
        <Route
            {...rest}
            render={routeProps =>
                !!currentUser ? (
                    <Fragment>
                        <Header/>
                        <RouteComponent {...routeProps} />
                    </Fragment>
                ) : (
                    <Redirect to={"/"} />
                )
            }
        />
    );
};

export default PrivateRoute