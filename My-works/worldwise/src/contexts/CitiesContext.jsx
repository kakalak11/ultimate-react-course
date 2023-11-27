import { createContext, useEffect, useContext, useReducer } from "react";

const BASE_URL = "http://localhost:9000";
const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };
    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("Unknown action type");
  }
}

function CitiesProvider({ children }) {
  const [{ isLoading, currentCity, cities }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    dispatch({ type: "loading" });
    fetch(`${BASE_URL}/cities`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "cities/loaded", payload: data });
      })
      .catch(() =>
        dispatch({
          type: "rejected",
          payload: "There was an error loading data...",
        })
      );
  }, []);

  function getCity(id) {
    dispatch({ type: "loading" });
    fetch(`${BASE_URL}/cities/${id}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "city/loaded", payload: data });
      })
      .catch(() =>
        dispatch({
          type: "rejected",
          payload: "There was an error loading the city...",
        })
      );
  }

  function createCity(newCity) {
    dispatch({ type: "loading" });
    return fetch(`${BASE_URL}/cities`, {
      method: "POST",
      body: JSON.stringify(newCity),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "city/created", payload: data });
      })
      .catch(() => alert("There was an error"));
  }

  function deleteCity(id) {
    dispatch({ type: "loading" });
    return fetch(`${BASE_URL}/cities/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        dispatch({ type: "city/deleted", payload: id });
      })
      .catch(() => alert("There was an error deleting city"));
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) throw new Error("Cant access this context");
  return context;
}

export { CitiesProvider, useCities };
