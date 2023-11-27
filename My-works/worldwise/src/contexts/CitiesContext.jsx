import { createContext, useState, useEffect, useContext } from "react";

const BASE_URL = "http://localhost:9000";
const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    setIsLoading(true);
    fetch(`${BASE_URL}/cities`)
      .then((res) => res.json())
      .then((data) => {
        setCities(data);
      })
      .finally(() => {
        setIsLoading(false);
      })
      .catch(() => alert("There was an error"));
  }, []);

  function getCity(id) {
    setIsLoading(true);
    fetch(`${BASE_URL}/cities/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCurrentCity(data);
      })
      .finally(() => {
        setIsLoading(false);
      })
      .catch(() => alert("There was an error"));
  }

  function createCity(newCity) {
    setIsLoading(true);
    return fetch(`${BASE_URL}/cities`, {
      method: "POST",
      body: JSON.stringify(newCity),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setCities((cities) => [...cities, data]);
      })
      .finally(() => {
        setIsLoading(false);
      })
      .catch(() => alert("There was an error"));
  }

  function deleteCity(id) {
    setIsLoading(true);
    return fetch(`${BASE_URL}/cities/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setCities((cities) => cities.filter((city) => city.id !== id));
      })
      .finally(() => {
        setIsLoading(false);
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
