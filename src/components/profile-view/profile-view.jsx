import { useEffect, useMemo, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { MovieCard } from "../movie-card/movie-card";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

export const ProfileView = ({ storedUserId, storedUser, storedToken, movies, onUserUpdated, onLoggedOut }) => {
  const [userId, setUserId] = useState(storedUserId);
  const [username, setUsername] = useState(storedUser);
  const [token, setToken] = useState(storedToken);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null);
  const API_BASE = "https://still-depths-22545-dbe8396f909e.herokuapp.com";

  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!username || !token) return;

    fetch(`${API_BASE}/users/${userId}`, {
      headers: { Authorization: `Bearer ${storedToken}` }
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data) => {
        setProfile(data);
        setEmail(data.Email ?? "");
        setBirthday(data.Birthday ? String(data.Birthday).slice(0, 10) : "");
      })
      .catch(() => setError("Could not load profile."));
  }, [userId, username, token]);

  const favoriteMovieIds = profile?.FavoriteMovies ?? [];

  const favoriteMovies = useMemo(() => {
    return movies.filter((m) => favoriteMovieIds.includes(m.id));
  }, [movies, favoriteMovieIds]);

  const handleUpdate = (e) => {
    e.preventDefault();
    setError(null);
    setInfo(null);

    const payload = {};

    if (username !== profile.Username) {
      payload.Username = username;
    }

    if (email !== profile.Email) {
      payload.Email = email;
    }

    if (birthday !== profile.Birthday) {
      payload.Birthday = birthday;
    }

    if (password) {
      payload.Password = password;
    }

    if (Object.keys(payload).length === 0) {
      setInfo("No changes to save.");
      return;
    }


    fetch(`${API_BASE}/users/${encodeURIComponent(userId)}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${storedToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then(async (res) => {
        const data = await res.json().catch(() => null);

        if (!res.ok) {
          console.error("Update failed:", res.status, data);

        const message =
          data?.errors?.map((e) => `${e.param}: ${e.msg}`).join(" | ") ||
          data?.message ||
          `Request failed with status ${res.status}`;
          
          throw new Error(message);
      }

      return data; // success JSON
      })
      .then((updated) => {
        setProfile(updated);
        setPassword("");
        setInfo("Profile updated.");
        onUserUpdated?.(updated);
      })
      .catch(() => setError("Update failed."));
  };

  const handleRemoveFavorite = async (movieId) => {
    setError(null);
    setInfo(null);

    try {
      const res = await fetch(
        `${API_BASE}/users/${encodeURIComponent(userId)}/FavoriteMovies/${encodeURIComponent(movieId)}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );

      if (!res.ok) throw new Error();

      const updatedUser = await res.json();
      setProfile(updatedUser);
      onUserUpdated?.(updatedUser);
    } catch {
      setError("Could not remove favorite.");
    }
  };

  if (!profile) return <div>Loading profile...</div>;

  return (
    <>
      <h2>Your profile</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {info && <Alert variant="success">{info}</Alert>}

      <div className="mb-4">
        <div><strong>Username:</strong> {profile.Username}</div>
        <div><strong>Email:</strong> {profile.Email}</div>
        <div><strong>Birthday:</strong> {profile.Birthday ? String(profile.Birthday).slice(0, 10) : "-"}</div>
      </div>

      <h3>Update profile</h3>
      <Form onSubmit={handleUpdate} className="mb-4">
        <Form.Group className="mb-2">
          <Form.Label>User name</Form.Label>
          <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Birthday</Form.Label>
          <Form.Control type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>New password (optional)</Form.Label>
          <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>

        <Button type="submit">Save changes</Button>
      </Form>

      <h3>Favorite movies</h3>
      {favoriteMovies.length === 0 ? (
        <div>You have no favorite movies yet.</div>
      ) : (
        <>
          <Row>
            {favoriteMovies.map((m) => (          
              <Col className="mb-4" md={3} key={m.id}>
                <MovieCard movie={m} />
                <br />
                <Button
                  variant="outline-danger"
                  size="sm"
                  className="mt-4"
                  onClick={() => handleRemoveFavorite(m.id)}
                >
                  Remove from favorites
                </Button>
              </Col>
            ))}
          </Row>
        </>
      )}
      <hr />
    </>
  );
};