import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://still-depths-22545-dbe8396f909e.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}`}
    })
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
  }, [token]);

  const similarMovies =
    selectedMovie
    ? movies.filter(
        (movie) => 
          movie.genre == selectedMovie.genre &&
          movie.id !== selectedMovie.id
      )
    : [];

  return (
    <Row className="justify-content-md-center">
      {!user || !token ? (
          <Col md={5}>
            <h2>New user registration:</h2>
            <SignupView />
            <h2>Existing user login:</h2>
            <LoginView
              onLoggedIn={(user, token) => {
                setUser(user);
                setToken(token);
              }}
            />
          </Col>        
        ) : selectedMovie ? (
          <>
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
            <h2>Similar movies:</h2>
            {similarMovies.length > 0 ? (
              similarMovies.map((movie) => {
                return (
                  <Col key={movie.id} md={3} className="mb-5">
                    <MovieCard                      
                      movie={movie}
                      onMovieClick={setSelectedMovie}
                    />
                  </Col>
                )
              })
            ) : (
              <div>Based on the genre of the selected movie, no similar movie available in this database...</div>
            )}
          </>          
        ) : movies.length === 0 ? (          
          <div>The movies list is empty!</div>
        ) : (
          <>
            <Col xs="auto" className="mb-3">
              <Button              
                onClick={() => { 
                  setUser(null);
                  setToken(null);
                  localStorage.clear();
                }}
              >
                Logout
              </Button>
            </Col>
            {movies.map((movie) => {
              return (
                <Col key={movie.id} md={3} className="mb-5">
                  <MovieCard                    
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                      setSelectedMovie(newSelectedMovie);
                    }}
                  />
                </Col>
              );
            })}
          </>
        )}
    </Row>
  );
};