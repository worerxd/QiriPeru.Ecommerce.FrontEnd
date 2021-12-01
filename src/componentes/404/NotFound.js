import React from "react";
import { withRouter } from "react-router";
import "./NotFound.css";

const NotFound = (props) => {
  const handleClick = () => {
    props.history.push("/");
  };

  return (
    <div>
      <h1>404 NOT FOUND</h1>
      <div className="container_404">
        <div>
          <img
            src="https://i.ibb.co/ynY9vBS/Nice-Png-doge-png-2215035.png"
            alt=""
            className="container__image"
          />
        </div>
        <div className="container__text">
          <h1 className="text__title">I have bad news for you</h1>
          <p className="text__description">
            The page you are looking for might be removed or is temporarily
            unavailable
          </p>
          <button className="text__button" onClick={handleClick}>
            BACK TO HOMEPAGE
          </button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(NotFound);
