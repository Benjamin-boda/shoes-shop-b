import React, {useState} from "react";
import {wallpapers} from "../products/wallpapers";

export const Homepage = () => {
    const [countHomepageImg, setcountHomepageImg] = useState(1)

    const nextHomepageImg = () => {
        if (countHomepageImg >= 1 & countHomepageImg < 3) {
            setcountHomepageImg(countHomepageImg + 1)
        }
    }

    const precedentHomepageImg = () => {
        if (countHomepageImg > 1 & countHomepageImg <= 3) {
            setcountHomepageImg(countHomepageImg - 1)
        }
    }

    return (
         <div className="homepage__overflow">
            {wallpapers.map((wallpaper) => 
                countHomepageImg === wallpaper.number ? 
                    <div key={wallpaper.number}>
                        <img className="homepage" src={wallpaper.img.default}/>
                        <p className="homepage__text">{wallpaper.description}</p>
                    </div> : undefined
                )}
            <button className="homepage__next" onClick={nextHomepageImg}><img className="homepage__next__image" src={require("../images/left arrow.png").default}/></button>
            <button className="homepage__precedent" onClick={precedentHomepageImg}><img className="homepage__precedent__image" src={require("../images/left arrow.png").default}/></button>
        </div>
    )
   
}