import { useState, useEffect } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

function Rating({ value, text }) {
    // normal variables aren't used in JSX, even if the state isn't changed
    const [stars, setStars] = useState([]);

    // The code was producing 0 stars on reload until I disabled strict mode :/
    useEffect(() => {
      const newStars = [];
      for (let i = 0; i < 5; i++) {
        newStars.push(
          <span key={i}>
            {value >= 1 ? <FaStar /> : value > 0.5 ? <FaStarHalfAlt /> : <FaRegStar />}
          </span> 
        );
        value--;
      }
      setStars(newStars);
    }, [value]); // Update stars on value change

    return(
        <div className="rating">
            {stars}
            <span className="rating-text">{ text ? text : null}</span>
        </div>
    );
}
export default Rating