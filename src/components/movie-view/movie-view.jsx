export const MovieView = ({ movie, onBackClick}) => {
  return (
  	<div>
  	  <div>
  	  	<img src={movie.poster}>
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
  	  <button onClick={onBackClick)>Back</button>
    </div>
  );
};