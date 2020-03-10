import React from "react";

// const PLACEHOLDER_IMG = "placeholder.jpg";

const Game = ({ game }) => {
  // const image = game.background_image === "" ? PLACEHOLDER_IMG : game.background_image;
  return (
    <div className="game">
      <h2>{game.name}</h2>
      <img
        width="200"
        alt={`The game named: ${game.name}`}
        src={game.background_image}
      />
      <p>({game.stores})</p>
    </div>
  );
};


export default Game;