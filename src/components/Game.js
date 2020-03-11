import React from "react";
import Store from "./Store";

const Game = ({ game }) => {

  const stores = game.stores;
  return (
    <div className="game">
      <h2>{game.name}</h2>
      <img
        width="200"
        alt={`The game named: ${game.name}`}
        src={game.background_image}
      />
      <div>
        {!stores ? (
          <p>No stores are currently selling this game.</p>
        ) : (
          stores.map((store, index) => (
            <Store key={`${index}-${store.store.name}`} store={store.store} />
          ))
        )}
      </div>
    </div>
  );
};


export default Game;