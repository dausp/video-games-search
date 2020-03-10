import React, { useReducer, useEffect } from "react";
import "../App.css";
import Header from "./Header";
import Game from "./Game";
import GameSearch from "./Search";

const RAWG_API_URL = "https://api.rawg.io/api/games?search=man";

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
        errorMessage: action.error
      };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
      fetch(RAWG_API_URL, {
        method: 'GET',
        headers : {
          'Accept'       : 'application/json',
          'Content-Type' : 'application/json',
          'User-Agent': navigator.userAgent
        }
      })
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.Response === "True") {
          console.log("response was TRUE");
          dispatch({
              type: "SEARCH_GAMES_SUCCESS",
              payload: jsonResponse.Search
          });
        } else {
          console.log("response was FALSE");
          dispatch({
              type: "SEARCH_GAMES_FAILURE",
              error: jsonResponse.Error
          });
        }
      });
  	}, []);

    const search = searchValue => {
    	dispatch({
      	type: "SEARCH_GAMES_REQUEST"
      });

      fetch(`https://api.rawg.io/api/games?search=${searchValue}`)
      	.then(response => response.json())
      	.then(jsonResponse => {
        	if (jsonResponse.Response === "True") {
          	dispatch({
                type: "SEARCH_GAMES_SUCCESS",
                payload: jsonResponse.Search
          	});
        	} else {
          	dispatch({
                type: "SEARCH_GAMES_FAILURE",
                error: jsonResponse.Error
          	});
          }
      	});
	  };

    const { games, errorMessage, loading } = state;
    console.dir(games)
    return (
    <div className="App">
      <Header text="Cheap Games" />
      <p className="App-intro">Just search for a game to find the cheapest way to buy it (powered by <a href="https://api.rawg.io/docs/" target="_blank" rel="noopener noreferrer">RAWG API</a>).</p>
      <GameSearch search={search} />
      <div className="games">
        {loading && !errorMessage ? (
          <p>loading... </p>
        ) : errorMessage ? (
          <div className="errorMessage">
            <p>Oops! {errorMessage}</p>
          </div>
        ) : (
          games.map((game, index) => (
            <Game key={`${index}-${game.id}`} game={game} />
          ))
        )}
      </div>
    </div>
  );
};

export default App;