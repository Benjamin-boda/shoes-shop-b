import React, {useState} from "react";
import {Link} from "react-router-dom";
import {products} from "../products/products";

export const Shop = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const numberPage = Math.ceil(products.length/4)
    let pages = []

    for (let i = 1; i < numberPage + 1; i++) {
        pages.push(i)
    }

    return (
        <div>
            <div className="shop">
                {products.slice((currentPage - 1) * 4, currentPage * 4)
                    .map((product, index) =>
                    <Link className={`shop__shoes shop__shoes__${index}`} to={`/product/${product.number}`} key={product.number}>
                        <img className="shop__image" src={product.img.default}/>
                        <p className="shop__name">{product.name}</p>
                    </Link>
                )}
            </div>
            
            <div className="shop__pages">
                {pages.map((page) => 
                    <Link className="shop__pages__link" key={page}  onClick={() => setCurrentPage(page)} to={`/shop/${page}`}>
                        {page}
                    </Link>
                    )}
            </div>
            
        </div> 
    )
}