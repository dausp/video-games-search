import React, { useReducer, useEffect } from "react";
import "../App.css";
import Header from "./Header";
import Footer from "./Footer";
import Game from "./Game";
import GameSearch from "./GameSearch";

const RAWG_API_URL = "https://api.rawg.io/api/games";

const initialState = {
  loading: true,
  games: [],
  errorMessage: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_GAMES_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    case "SEARCH_GAMES_SUCCESS":
      return {
        ...state,
        loading: false,
        games: action.payload
      };
    case "SEARCH_GAMES_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: "A matching game could not be found!"
      };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {

    fetch(RAWG_API_URL)
      .then(response => response.json())
      .then(jsonResponse => {
      dispatch({
        type: "SEARCH_GAMES_SUCCESS",
        payload: jsonResponse.results
      });
    });
  }, []);

    const search = searchValue => {
    	dispatch({
      	type: "SEARCH_GAMES_REQUEST"
      });

      fetch(`https://api.rawg.io/api/games?search=${searchValue}`)
      .then(response => response.json())
      .then(jsonResponse => {
        dispatch({
          type: "SEARCH_GAMES_SUCCESS",
          payload: jsonResponse.results
        });
      });
	  };

    const { games, errorMessage, loading } = state;

    return (
    <div className="App">
      <Header text="Games Search" />
      <p className="App-intro">Find out where to buy your favorite games:</p>
      <GameSearch search={search} />
      <div className="games">
        {loading && !errorMessage ? (
          <p>loading...</p>
        ) : errorMessage ? (
          <div className="errorMessage">
            <p>Oops! {errorMessage}</p>
          </div>
        ) : (
          games.map((game, index) => (
            <Game key={`${index}-${game.name}`} game={game} />
          ))
        )}
      </div>
      <Footer />
    </div>
  );
};

export default App;