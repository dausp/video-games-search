import React from "react";

const Header = (props) => {
  return (
    <header className="header">
      <h1>{props.text}</h1>
    </header>
  );
};

export default Header;