import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
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

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        token={token}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      />
      <Row className="justify-content-md-center">
      </Row>



      <Routes>
        <Route
          path="/signup"
          element={
            <>
              {user ? (
                <Navigate to="/" />
              ) : (
                <Row className="justify-content-md-center">
                  <Col md={5}>
                    <h2>New user registration:</h2>
                    <SignupView />
                  </Col>
                </Row>
              )}
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              {user ? (
                <Navigate to="/" />
              ) : (
                <Row className="justify-content-md-center">
                  <Col md={5}>
                    <h2>Existing user login:</h2>
                    <LoginView onLoggedIn={(user, token) => {
                      setUser(user);
                      setToken(token);
                    }}
                    />
                  </Col>
                </Row>
              )}
            </>
          }
        />
        <Route
          path="/movies/:movieId"
          element={
            <>
              {!user ? (
                <Navigate to="/login" replace />
              ) : movies.length === 0 ? (
                <Row className="justify-content-md-center">
                  <Col>The movies list is empty!</Col>
                </Row>
              ) : (
                <Row>
                  <Col md={8}>
                    <MovieView movies={movies} />
                  </Col>
                </Row>
              )}
            </>
          }
        />
        <Route
          path="/"
          element={
          <>
              {!user ? (
                <Navigate to="/login" replace />
              ) : movies.length === 0 ? (
                <Row className="justify-content-md-center">
                  <Col>The movies list is empty!</Col>
                </Row>
              ) : (
                <>
                  <Row>
                    {movies.map((movie) => (                      
                      <Col key= {movie.id} className="mb-4" md={3}>
                        <MovieCard movie={movie} />
                      </Col>                      
                    ))}
                  </Row>
                </>
              )
          }
            </>
          }
        />
      </Routes>
  </BrowserRouter>
  );
};