import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { NavigationBar } from '../navigation-bar/navigation-bar';
import { ProfileView } from '../profile-view/profile-view';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

export const MainView = () => {
  const storedUserId = localStorage.getItem("userid");
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [userId, setUserId] = useState(storedUserId? storedUserId : null);
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
          setUserId(null);
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      />
      <Container>
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {token ? (
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
                {token ? (
                  <Navigate to="/" />
                ) : (
                  <Row className="justify-content-md-center">
                    <Col md={5}>
                      <h2>Existing user login:</h2>
                      <LoginView onLoggedIn={(userId, user, token) => {
                        setUserId(userId);
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
                {!token ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Row className="justify-content-md-center">
                    <Col>The movies list is empty!</Col>
                  </Row>
                ) : (
                  <Row>
                    <Col md={8}>
                      <MovieView movies={movies} storedUserId={userId} storedToken={token} />
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
                {!token ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Row className="justify-content-md-center">
                    <Col>The movies list is empty!</Col>
                  </Row>
                ) : (
                  <>
                    <Row>
                      {movies.map((movie) => (                      
                        <Col key={movie.id} className="mb-4" md={3}>
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
          <Route
            path="/profile"
            element={
              !token || !userId ? (
                <Navigate to="/login" replace />
              ) : (
                <ProfileView
                  storedUserId={userId}
                  storedUser={user}
                  storedToken={token}
                  movies={movies}
                  onUserUpdated={(updatedUser) => {
                    setUser(updatedUser.Username);
                    localStorage.setItem("user", JSON.stringify(updatedUser.Username));
                    localStorage.setItem("userid", updatedUser._id ?? userId);
                  }}
                  onLoggedOut={() => {
                  setUserId(null);
                  setUser(null);
                  setToken(null);
                  localStorage.clear();
                  }}
                />            
              )
            }
          />
        </Routes>
      </Container>
  </BrowserRouter>
  );
};