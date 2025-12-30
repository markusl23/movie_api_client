import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export const MainView = () => {
  const [movies, setMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("https://still-depths-22545-dbe8396f909e.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            title: movie.Title,
            director: movie.Director.Name,
            genre: movie.Genre.Name,
            description: movie.Description,
            poster: movie.ImagePath
          };
        });

        setMovies(moviesFromApi);
      });
  }, []);

  if (selectedMovie) {
  	let similarMovies = movies.filter(compareGenres);

    function compareGenres(sameGenreMovie) {
      if (selectedMovie.genre === sameGenreMovie.genre && selectedMovie.title !== sameGenreMovie.title) {
        return sameGenreMovie;
      }
    }

    if (similarMovies !== []) {

        return (
          <>
      	    <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
            <hr />
            <h2>Similar movies:</h2>
            {similarMovies.map((movie) => {
              return <MovieCard
                key={movie.id}
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            })}
          </>
      	);
    } else {
      return (
        <>
          <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
          <hr />
          <h2>Similar movies:</h2>
          <p>No similar movies available in this database</p>
        </>
      )
    }
  }

  if (movies.length === 0) {
  	return <div>The movies list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => {
      	return (
      	  <MovieCard
      	  	key={movie.id}
      	  	movie={movie}
      	  	onMovieClick={(newSelectedMovie) => {
      	  	  setSelectedMovie(newSelectedMovie);
      	  	}}
      	  />
      	);
      })}
    </div>
  );
};