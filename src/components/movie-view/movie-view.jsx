import PropTypes from "prop-types";

export const MovieView = ({ movie, onBackClick}) => {
  return (
  	<div>
  	  <div>
  	  	<img src={movie.poster}/>
  	  </div>
  	  <div>
  	  	<strong>Title: </strong>
  	  	<span>{movie.title}</span>
  	  </div>
  	  <div>
  	  	<strong>Director: </strong>
  	  	<span>{movie.director}</span>
  	  </div>
  	  <div>
  	  	<strong>Genre: </strong>
  	  	<span>{movie.genre}</span>
  	  </div>
  	  <div>
  	  	<strong>Description: </strong>
  	  	<span>{movie.description}</span>
  	  </div>
  	  <button onClick={onBackClick}>Back</button>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired
  }),
  onBackClick: PropTypes.func.isRequired
}