import React, { useContext, Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../firebase/Auth";
import {Header} from "../components/Header";

const PublicRoute = ({ component: RouteComponent, ...rest }) => {
    const {currentUser} = useContext(AuthContext);
    return (
        <Route
            {...rest}
            render={routeProps =>
                (
                    <Fragment>
                        <Header/>
                        <RouteComponent {...routeProps} />
                    </Fragment>
                )
            }
        />
    );
};

export default PublicRoute