import React from "react";

const Store = ({ store }) => {

  return (
    <h3 className="store">
      {store.name}
    </h3>
  );
};


export default Store;