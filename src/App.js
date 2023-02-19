import { useEffect, useState } from 'react';
import "./App.css";
import SearchIcon from './Search.svg';
import MovieCard  from './MovieCard';



const API_URL = "https://omdbapi.com/?apikey=140b780f"
const Movie1  = {
  "Title": "Batman Begins",
  "Year": "2005",
  "imdbID": "tt0372784",
  "Type": "Action",
  "Poster": "https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
};

const App = () => {

  const [ movies, setMovies] = useState([]);
  const [ search, changeSearch] = useState("");

  const searchMovies = async (title) => {

    // making api request to the obmbd database 
      const response = await fetch(`${API_URL}&s=${title}`);
      // response has various other thing too apart from json like status code , etc..
      
      const data = await response.json();


      // json object which has all data about the title we asked for 
      setMovies(data.Search);
  }

  useEffect( () => {
 
    searchMovies("Christmas");

  }, [])


  return (
      <div className='app'>
        <h1>MovieLand</h1>
        <div className='search'>
          <input placeholder='Search for Movies'
          value={search}
          onChange={(event) => {changeSearch(event.target.value);}}
          ></input>
           <img src={SearchIcon} alt="Search" onClick={ ()=> {
            searchMovies(search)}} >
           </img>
        </div>

  {
      movies.length > 0? <div className='container'> {movies.map((movie) => <MovieCard Movie={movie}/> )}</div> : <div className='empty'><h2>No Movies Found</h2> </div>
  }


       
      </div>

      
  );
}

export default App;
// apikey = 140b780f
