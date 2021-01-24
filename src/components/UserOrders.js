import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {sortByDate} from "../actions/filters";
import getVisibleOrders from "../selectors/orders";

export const UserOrders = () => {
    const dispatch = useDispatch()
    const ordersInStore = useSelector(state => getVisibleOrders(state.orders, state.filters))
    const ordersByBoughtDate = Array.from(ordersInStore
        .reduce((index, object) => index.set(object.boughtAt, [...(index.get(object.boughtAt) || []), object]), new Map)
        .values()
    );
    const [displayOrder, setDisplayOrder] = useState("")
    const [dateChange, setDateChange] = useState("")

    useEffect(() => {
        dispatch(sortByDate(dateChange))
        
    }, [dateChange])

    return (
        <div className="order__content">
            <select className="order__select" name="date" onChange={(e) => setDateChange(e.target.value)}>
                <option value="">--Sort by bought date--</option>
                <option value="oldDate">Old to new</option>
                <option value="newDate">New to old</option>
            </select>

            {ordersByBoughtDate.map((orders) => 
                <div className="order" key={orders[0].id}>
                    <p 
                        onClick={() => displayOrder === orders[0].boughtAt ? setDisplayOrder("") : setDisplayOrder(orders[0].boughtAt)} 
                        className="order__date"
                        >
                        {orders[0].boughtAt.substring(0, 15)}
                    </p>

                    <div className="order__group">
                        {orders.map((order) => 
                            displayOrder === order.boughtAt ? 
                                <div className="order__info" key={order.id}>
                                    <img className="order_image" src={order.image.default}/>
                                    <p className="order__text">{order.name}</p>
                                    <p className="order__text">{order.price} €</p> 
                                </div> :undefined
                            )}
                    </div>
                </div>
                )}
        </div>    
    )
}