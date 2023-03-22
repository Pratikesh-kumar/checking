import React, { useEffect, useState } from 'react';

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
 
  const[movies,setMovies]=useState([]);
  const[isLoading,setIsLoading]=useState(false);
  const[error,setError]=useState(null);
  useEffect(()=>{
    fetchMoviesHandler();
  },[])

  async function fetchMoviesHandler(){
    setIsLoading(true);
    setError(null);
    try{
      const response=await fetch('https://swapi.dev/api/films/')
      if(!response.ok){
        throw new Error('something went wrong')
    }
      
      const data = await response.json();
     
     
         const transformedMovies=data.results.map(movieData=>{
           return {
             id:movieData.episode_id,
             title:movieData.title,
             releaseDate:movieData.releaseDate,
             openingText:movieData.opening_crawl
           }
   
         })
         setMovies(transformedMovies);
        } catch(error){
              setError(error.message)
        }
        setIsLoading(false)
      }
        let content = <p>Found no movies.</p>;

       
        if (movies.length > 0) {
          content = <MoviesList movies={movies} />;
        }
      
      
        if (error) {
          content = <p>{error}</p>;
        }
      
        if (isLoading) {
          content = <p>Loading...</p>;
        }
        function CancelHandler(){
          console.log("hee")
        }
        const Retry=()=>{
          setInterval(()=>{
            setMovies(transformedMovies)
            console.log('object')
         
          },5000)

        }

      
  return (
    <React.Fragment>
      <section>
        <button onClick={()=>{fetchMoviesHandler();Retry();}}>Fetch Movies</button>
        <br></br><br></br>
        <button onClick={CancelHandler}>Cancel</button>
      </section>
      <section>
        {/* {!isLoading &&movies.length>0 && <MoviesList movies={movies} />}
        {!isLoading &&movies.length===0 && !error&& <p>found no movies</p>}
       
        {isLoading && <p>waiting...</p>}
        {!isLoading &&error && <p>{error}</p>} */}
        {content}


      </section>
    </React.Fragment>
  );
}

export default App;