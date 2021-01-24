import React, {useState} from "react";
import { useParams } from "react-router-dom";
import {useDispatch} from "react-redux";
import {products} from "../products/products";
import {startAddProduct} from "../actions/products";

export const ShopItem = () => {
    const [sizeChoice, setSizeChoice] = useState("")
    const [addClicked, setAddClicked] = useState(false)
    const sizes = [37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47]
    const {productnumber} = useParams()
    const dispatch = useDispatch()

    const filterProduct = products.filter((product) => product.number === parseInt(productnumber))
    const userProduct = {
            image : filterProduct[0].img,
            name : filterProduct[0].name,
            size : sizeChoice,
            price : filterProduct[0].price,
            boughtAt : 0
    }

    const sizeOnChange = (e) => {
        setSizeChoice(e.target.value)
    }

    return (
        <div className={`shopitem__content shop__shoes__${Math.floor(Math.random() * 4)}`}>
            <div className="shopitem">
                <div>
                    {products.map((product) => 
                        product.number === parseInt(productnumber) ? 
                        <div key={product.number}>
                            <img className="shopitem__image" src={product.img.default}/>
                            <p className="shopitem__name">{product.name}</p>
                        </div> : undefined
                        )}
                </div>
                
                <div>
                    <div className="shopitem__size">
                        <p className="shopitem__size__text">Size : </p>
                        <select className="shopitem__select" name="size" onChange={sizeOnChange}>
                            <option value="">Select your size</option>
                            {sizes.map((size) => 
                                <option value={size} key={size}>{size}</option>
                                )}
                        </select>
                    </div>
                    
                    <button data-testid="button" className="shopitem__button" onClick={() => sizeChoice !== "" ? 
                        dispatch(startAddProduct(userProduct))
                        : setAddClicked(true)
                    }>
                        Add to bag
                    </button>
                    {sizeChoice === "" & addClicked ? <p>You need to select a size first</p> : undefined}
                </div>
            </div>
        </div>
        
    )
}