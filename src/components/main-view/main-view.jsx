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
  	let similarMovies = movies.filter((movie) => movie.genre === selectedMovie.genre && movie.id !== selectedMovie.id);

    return (
      <>
        <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        <hr />
        <h2>Similar movies:</h2>

        {similarMovies.length > 0 ? (
          similarMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onMovieClick={setSelectedMovie}
            />
          ))
        ) : (
          <div>Based on the genre of the selected movie, no similar movie available in this database...</div>
        )}
      </>
    );
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