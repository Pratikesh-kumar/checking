import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  // const dummyMovies = [
  //   {
  //     id: 1,
  //     title: 'Some Dummy Movie',
  //     openingText: 'This is the opening text of the movie',
  //     releaseDate: '2021-05-18',
  //   },
  //   {
  //     id: 2,
  //     title: 'Some Dummy Movie 2',
  //     openingText: 'This is the second opening text of the movie',
  //     releaseDate: '2021-05-19',
  //   },
  // ];
 
  const[movies,setMovies]=useState([])
  const[isLoading,setIsLoading]=useState(false)

  async function fetchMoviesHandler(){
    setIsLoading(true)
   const Response=await fetch('https://swapi.dev/api/films/')
   const data = await Response.json();
   
      const transformedMovies=data.results.map(movieData=>{
        return {
          id:movieData.episode_id,
          title:movieData.title,
          releaseDate:movieData.releaseDate,
          openingText:movieData.opening_crawl
        }

      })
      setMovies(transformedMovies);
      setIsLoading(false)
      
  }
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading &&movies.length>0 && <MoviesList movies={movies} />}
        {!isLoading &&movies.length===0 && <p>nothing is loading</p>}
        {isLoading && <p>waiting...</p>}

      </section>
    </React.Fragment>
  );
}

export default App;