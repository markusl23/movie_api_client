import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

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
    <Container>
      {!user || !token ? (
        <Row className="justify-content-md-center">
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
        </Row>       
        ) : selectedMovie ? (
          <Row>            
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
          </Row>          
        ) : movies.length === 0 ? (          
          <div>The movies list is empty!</div>
        ) : (
          <>
            <Row className="mb-3 mt-3">
              <Col xs="auto" className="ms-auto">
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
            </Row>
            <Row>
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
            </Row>
          </>
        )}
    </Container>
  );
};