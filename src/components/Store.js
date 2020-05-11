import React from "react";

const Store = ({ name, url }) => {

  // e.g. https://api.rawg.io/api/games/{game-name}/stores
  // return list of links for stores of where to buy the game
  return (
    <p>
      <a href={url} target="_blank" rel="noopener noreferrer">
        {name}
      </a>
    </p>
  );
};


export default Store;