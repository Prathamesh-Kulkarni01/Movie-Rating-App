const BASE_URL = `http://www.omdbapi.com/?apikey=3aaa3db1`;


export const fetchDataFromAPI = async (query) => {
  const response = await fetch(`${BASE_URL}&${query}`);
  const responseJson = await response.json();
  return responseJson;
};
