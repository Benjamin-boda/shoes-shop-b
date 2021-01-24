import React, { useEffect, useState } from "react";
import {useSelector, useDispatch} from "react-redux";
import {startRemoveProduct, startEditProduct, startResetProducts} from "../actions/products";
import {startAddOrder} from "../actions/orders";
import products from "../tests/fixtures/products";

export const Bag = () => {
    const [sizeUpdate, setSizeUpdate] = useState("")
    const [productUpdate, setProductUpdate] = useState("")
    const productsInStore  = useSelector(state => state.products)
    const dispatch = useDispatch()

    const sizes = [37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47]
    

    const sizeEdit = (e) => {
        setSizeUpdate(e.target.value)
    }

    useEffect(() => {
        if (productUpdate !== "" & productsInStore.lenght > 0) {
            const filterProductArray = productsInStore.filter((product) => productUpdate === product.name)
            const productEdit = {
                image : {
                    default : filterProductArray[0].image.default
                },
                name : filterProductArray[0].name,
                size : sizeUpdate,
                price : filterProductArray[0].price,
                boughtAt : filterProductArray[0].boughtAt
            }
            const id = filterProductArray[0].id
            dispatch(startEditProduct(id, productEdit))    
        }
    }, [sizeUpdate])

    const paymentOrder = () => {
        productsInStore.map((product) => {
            product.boughtAt = Date()
            dispatch(startAddOrder(product))})
        dispatch(startResetProducts())              
    }

    const sumPrice = productsInStore.length > 0 ? productsInStore.map(product => product.price).reduce((acc, price) => acc + price) : "0"

    return (
        <div className="bag__content">
            <div className="bag__box">
                {productsInStore.length > 0 ?
                    productsInStore.map((product) => 
                        <div className="bag" key={product.name} onMouseEnter={() => setProductUpdate(product.name)}>
                            <img className="bag__image" src={product.image.default}/>
                            <p data-testid={product.name} className="bag__name">{product.name}</p>
                            <select className="bag__select" name="size" onChange={sizeEdit}>
                                <option value={product.size}>{product.size}</option>
                                {sizes.map((size) => 
                                    <option value={size} key={size}>{size}</option>
                                    )}
                            </select>
                            <p className="bag__name">Price : {product.price} €</p>
                            <button className="bag__button" onClick={() => dispatch(startRemoveProduct(product))}><img className="bag__cross__button" src={require("../images/cross button.png").default}/></button>
                        </div>
                    ) : <p className="bag__empty">Nothing in the bag</p>
                }
            </div>
            
            <p className="bag__price">Total price : {sumPrice} €</p>

            <div className="bag__payment__div">
                <button className="bag__payment" onClick={paymentOrder} disabled={productsInStore.length === 0 ? true : false}>Payment</button>
            </div>
            
        </div>
    )
}