import { useState } from 'react';
import { MovieCard } from './movie-card/movie-card';
import { MovieView } from './movie-view/movie-view';

export const MainView = () => {
  const [movies, setMovies] = useState([
  	{
  	  id: 1,
  	  title: "The Shawshank Redemption",
  	  director: "Frank Darabont",
  	  genre: "Drama",
  	  description: "Drama movies focus on intense character development and emotional storytelling, exploring real-life struggles, relationships, and personal growth through compelling, often thought-provoking narratives.",
  	  poster: "https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg"
  	},
  	{
  	  id: 2,
  	  title: "The Martian",
  	  director: "Ridley Scott",
  	  genre: "Science Fiction",
  	  description: "The Martian tells the story of astronaut Mark Watney, who is stranded on Mars after a failed mission and must use his ingenuity to survive. Directed by Ridley Scott, the film explores themes of isolation, resilience, and human ingenuity in the face of extreme adversity. Watney must use his knowledge of science to grow food, generate oxygen, and communicate with Earth to survive.",
  	  poster: "https://upload.wikimedia.org/wikipedia/en/c/cd/The_Martian_film_poster.jpg",
  	},
  	{
  	  id: 3,
  	  title: "Point Break",
  	  director: "Kathryn Bigelow",
  	  genre: "Action",
  	  description: "Point Break is an action-packed thriller about an undercover FBI agent, Johnny Utah, who infiltrates a group of surfers suspected of robbing banks. Directed by Kathryn Bigelow, the film blends extreme sports and crime drama, exploring themes of freedom, risk, and loyalty. As Utah forms a bond with the group’s charismatic leader, Bodhi, his own beliefs about life are tested.",
  	  poster: "https://upload.wikimedia.org/wikipedia/en/7/7e/Pointbreaktheatrical.jpg",
  	}
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
  	return (
  	  <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
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