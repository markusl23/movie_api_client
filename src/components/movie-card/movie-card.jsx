import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import React from 'react'
import { useNavigate } from 'react-router-dom'

export const MovieCard =({ movie }) => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/movies/${encodeURIComponent(movie.id)}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          navigate(`/movies/${encodeURIComponent(movie.id)}`);
        }
      }}
    >
      <Card.Img variant="top" src={movie.poster} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.genre}</Card.Text>
      </Card.Body>
    </Card>
  )
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired
  }).isRequired
}