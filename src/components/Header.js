import React, {useState ,useContext} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {startLogin, startLogout} from "../actions/auth";
import {AuthContext} from "../firebase/Auth";
import {LoginModal} from "./LoginModal";

export const Header = () => {
    const {currentUser} = useContext(AuthContext);
    const [accountHovering, setAccountHovering] = useState(false)
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const productsInStore = useSelector(state => state.products)
    const dispatch = useDispatch()

    const openModal = () => {
        if (!!currentUser) {
            setModalIsOpen(false)
        } else {
            setModalIsOpen(true)
        }
    }

    return (
        <div className="header">
            <img className="header__logo" src={require("../images/logo.png").default}/>
            <Link className="header__link" to="/">Home</Link>
            <Link className="header__link" to={!!currentUser ? "/shop/1" : ""} onClick={openModal}>Shop</Link>
            <Link className="header__link" to="/contact">Contact</Link>
            <Link className="header__link" to="/help">Help</Link>
            
            <div className="header__account">
                <Link 
                    data-testid="account"
                    className="header__link__account"
                    to=""
                    onClick={() => !!currentUser ? undefined : dispatch(startLogin())}
                    onMouseEnter={() => !!currentUser ? setAccountHovering(true) : setAccountHovering(false)}
                >
                    {!!currentUser ? "User account" : "Login"}
                </Link>
                {accountHovering ? 
                    <ul className="header__dropdown" onClick={() => setAccountHovering(false)} onMouseLeave={() => setAccountHovering(false)}>
                        <Link className="header__link__account__dropdown" to="/orders">
                            <li className="header__dropdown__item">My account</li>
                        </Link>
                        <li className="header__dropdown__item" onClick={() => dispatch(startLogout())}>Logout</li>
                        <li className="header__dropdown__item" onClick={() => setAccountHovering(false)}>Close</li>
                    </ul> : undefined
                }
            </div>
            
            <div>
                <Link to={!!currentUser ? "/bag" : ""} onClick={openModal}><img className="header__bag" src={require("../images/bag.png").default}/></Link>
                <p className="header__bag__counter">{productsInStore.length > 0 ? productsInStore.length : 0}</p>
            </div>
            

            <LoginModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}/>
        </div>
    )
}