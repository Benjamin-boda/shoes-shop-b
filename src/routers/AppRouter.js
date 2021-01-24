import React from "react";
import {Router, Route, Switch} from "react-router-dom";
import {createBrowserHistory} from "history";
import {Homepage} from "../components/Homepage";
import {Shop} from "../components/Shop";
import {ShopItem} from "../components/ShopItem";
import {Bag} from "../components/Bag";
import {UserOrders} from "../components/UserOrders";
import {Contact} from "../components/Contact";
import {Help} from "../components/Help";
import NotFoundPage from "../components/NotFoundPage";
import {AuthProvider} from "../firebase/Auth";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";


export const history = createBrowserHistory();

const AppRouter = () => (
    <Router history={history}>
        <AuthProvider>
            <Switch>
                <PublicRoute path="/" component={Homepage} exact/>
                <PublicRoute path="/contact" component={Contact}/>
                <PublicRoute path="/help" component={Help}/>
                <PrivateRoute path="/shop/:page" component={Shop} />
                <PrivateRoute path="/product/:productnumber" component={ShopItem} />
                <PrivateRoute path="/bag" component={Bag} />
                <PrivateRoute path="/orders" component={UserOrders} />
                <Route component={NotFoundPage} />
            </Switch>
        </AuthProvider>  
    </Router>
)

export default AppRouter;