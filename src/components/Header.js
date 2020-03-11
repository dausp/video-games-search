import React from "react";

const Header = (props) => {
  return (
    <header className="header">
      <h1>{props.text}</h1>
      <div className="alpha">
        <p>This application is still in development.</p>
      </div>
    </header>
  );
};

export default Header;