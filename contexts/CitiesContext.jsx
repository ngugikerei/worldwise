import { useEffect, useReducer } from 'react';
import { createContext, useContext } from 'react';

const BASE_URL = 'http://localhost:8000';
const CitiesContext = createContext();

const initialstate = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: '',
};

//reducer for state management
function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true };

    case 'cities/loaded':
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };

    case 'city/loaded':
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };

    case 'city/added':
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case 'city/deleted':
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };

    case 'error':
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error('Unknown action type');
  }
}

// eslint-disable-next-line react/prop-types
function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialstate
  );

  //get city data from API from passed-in id, to display in city item
  async function getCity(id) {
    if (Number(id) === currentCity.id) return;
    dispatch({ type: 'loading' });

    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: 'city/loaded', payload: data });
    } catch (error) {
      dispatch({ type: 'error', payload: 'Error fetching Data' });
    }
  }

  //make POST request to API, to add new city
  async function addCity(newCity) {
    dispatch({ type: 'loading' });
    try {
      const res = await fetch(`${BASE_URL}/cities/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCity),
      });
      const data = await res.json();
      dispatch({ type: 'city/added', payload: data });
    } catch (error) {
      dispatch({ type: 'error', payload: 'Error fetching Data' });
    }
  }

  //make DELETE request to API
  async function deleteCity(id) {
    dispatch({ type: 'loading' });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE',
      });
      dispatch({ type: 'city/deleted', payload: id });
      //setCities((cities) => cities.filter((city) => city.id !== id));
    } catch (error) {
      dispatch({ type: 'error', payload: 'Error fetching Data' });
    }
  }

  //fetch cities data from API
  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: 'loading' });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: 'cities/loaded', payload: data });
      } catch (error) {
        dispatch({ type: 'error', payload: 'There was an error loading data' });
      }
    }

    fetchCities();
  }, []);
  return (
    <CitiesContext.Provider
      value={{ cities, isLoading, currentCity, getCity, addCity, deleteCity }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error('CitiesContext was used outside CitiesProvider');
  return context;
}

export { CitiesProvider, useCities };
