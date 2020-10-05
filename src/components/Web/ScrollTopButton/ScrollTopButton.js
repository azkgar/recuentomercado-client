import React, {useState} from "react";

import "./ScrollTopButton.scss";

const ScrollTopButton = () => {
    const [showScroll, setShowScroll] = useState(false);

    const checkScrollTop = () => {
        if(!showScroll && window.pageYOffset > 400){
            setShowScroll(true);
        } else if (showScroll && window.pageYOffset <= 400) {
            setShowScroll(false);
        }
    }

    const scrollTop = () => {
        window.scrollTo({top: 0, behavior: "smooth"});
    }

    window.addEventListener("scroll", checkScrollTop);

    return(
        <div
            className = "scroll-top"
            onClick = {scrollTop}
            style = {{display: showScroll ? "flex" : "none"}}
        >
            <div className = "scroll-top__arrow"></div>
        </div>
    );
}

export default ScrollTopButton;