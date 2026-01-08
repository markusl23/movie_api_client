import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { MovieCard } from '../movie-card/movie-card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export const MovieView = ({ movies, storedUserId, storedToken }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m.id === movieId);
  const API_BASE = "https://still-depths-22545-dbe8396f909e.herokuapp.com";

  if (!movie) {
      return (<div>Loading...</div>);
  }

  const similarMovies = movies.filter(
    (similarMovie) => 
    movie.genre == similarMovie.genre &&
    movie.id !== similarMovie.id
  );

  const handleAddFavorite = async () => {
    const res = await fetch(
      `${API_BASE}/users/${encodeURIComponent(storedUserId)}/FavoriteMovies/${encodeURIComponent(movie.id)}`,
      { method: "PUT", headers: { Authorization: `Bearer ${storedToken}` } }
    );

    if (res.ok) {
      alert("Movie added to favorites!") else (alert("Error!"));
    }
  };

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
      <Link to={`/`}>
        <Button>Back to overview</Button>
      </Link>
      <Button onClick={handleAddFavorite} className="ms-3">Add to favorites</Button>
      <br />
      <hr />
      <h2>Similar movies:</h2>
        <Row>
          {similarMovies.length > 0 ? (similarMovies.map((movie) => {
            return (
              <Col key={movie.id} className="mb-4" md={3}>
                <MovieCard movie={movie} />
              </Col>                      
            )
          })
          ) : (
            <div>Based on the genre of the selected movie, no similar movie available in this database...</div>
          )}
        </Row>
    </div>
  );
};

MovieView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      director: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      poster: PropTypes.string.isRequired
    })
  ).isRequired,

  storedUserId: PropTypes.string.isRequired,
  storedToken: PropTypes.string.isRequired
};