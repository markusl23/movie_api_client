import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";

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
  	  	<p>{movie.description}</p>
  	  </div>
  	  <Button onClick={onBackClick}>Back</Button>
      <br />
      <hr />
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