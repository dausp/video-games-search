import React from "react";

const Store = ({ store }) => {

  // e.g. https://api.rawg.io/api/games/{game-name}/stores
  // return list of links for stores of where to buy the game
  return (
    <h3 className="store">
      {store.name}
    </h3>
  );
};


export default Store;