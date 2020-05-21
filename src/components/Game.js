import React, { useReducer, useEffect }  from "react";
import Store from "./Store";

const initialState = {
  loading: true,
  stores: [],
  errorMessage: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case "STORES_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    case "STORES_SUCCESS":
      return {
        ...state,
        loading: false,
        stores: action.payload
      };
    case "STORES_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: "Could not get any stores!"
      };
    default:
      return state;
  }
};

const Game = ({ game }) => {

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch(`https://api.rawg.io/api/games/${game.slug}/stores`)
      .then(response => response.json())
      .then(jsonResponse => {
      dispatch({
        type: "STORES_SUCCESS",
        payload: jsonResponse.results
      });
    });
  }, []);

  const { stores, errorMessage, loading } = state;

  return (
    <div className="game">
      <h2>{game.name}</h2>
      <img
        width="200"
        alt={`Thumbnail for: ${game.name}`}
        src={game.background_image}
      />
      <div>
        {loading && !errorMessage ? (
          <p>loading...</p>
        ) : errorMessage ? (
          <div className="errorMessage">
            <p>Oops! {errorMessage}</p>
          </div>
        ) : stores.length === 0 ? (
          <p>This game cannot be found at any store right now.</p>
        ) : (
          stores.map((store, index) => (
            <Store key={`${index}-${store.id}`}
                  url={store.url} />
          ))
        )}
      </div>
    </div>
  );
};


export default Game;