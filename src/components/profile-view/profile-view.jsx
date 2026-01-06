import { useEffect, useMemo, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ user, token, movies, onUserUpdated, onLoggedOut }) => {
  const username = user?.Username || user?.username; // depending on what your login returns
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null);
  const API_BASE = "https://still-depths-22545-dbe8396f909e.herokuapp.com";

  // form fields (initialize after profile load)
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!username || !token) return;

    fetch(`${API_BASE}/users/${encodeURIComponent(username)}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data) => {
        setProfile(data);
        setEmail(data.Email ?? "");
        setBirthday(data.Birthday ?? "");
      })
      .catch(() => setError("Could not load profile."));
  }, [username, token]);

  const favoriteMovieIds = profile?.FavoriteMovies ?? [];

  const favoriteMovies = useMemo(() => {
    // Your movies already contain `id` mapped from `_id`
    return movies.filter((m) => favoriteMovieIds.includes(m.id));
  }, [movies, favoriteMovieIds]);

  const handleUpdate = (e) => {
    e.preventDefault();
    setError(null);
    setInfo(null);

    const payload = {
      Username: username,
      Email: email,
      Birthday: birthday,
      // only send Password if user entered one
      ...(password ? { Password: password } : {}),
    };

    fetch(`${API_BASE}/users/${encodeURIComponent(username)}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((updated) => {
        setProfile(updated);
        setPassword("");
        setInfo("Profile updated.");

        // Keep app state + localStorage in sync
        onUserUpdated?.(updated);
      })
      .catch(() => setError("Update failed."));
  };

  const handleDeregister = async () => {
    setError(null);
    setInfo(null);

    const ok = window.confirm("Really delete your account? This cannot be undone.");
    if (!ok) return;

    try {
      const res = await fetch(`${API_BASE}/users/${encodeURIComponent(username)}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error();

      // log out client-side
      onLoggedOut?.();
    } catch {
      setError("Account deletion failed.");
    }
  };

  const handleRemoveFavorite = async (movieId) => {
    setError(null);
    setInfo(null);

    try {
      const res = await fetch(
        `${API_BASE}/users/${encodeURIComponent(username)}/FavoriteMovies/${encodeURIComponent(movieId)}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
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
          <Form.Label>Email</Form.Label>
          <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Birthday</Form.Label>
          <Form.Control value={birthday} onChange={(e) => setBirthday(e.target.value)} />
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
        favoriteMovies.map((m) => (
          <div key={m.id} className="mb-3">
            <MovieCard movie={m} />
            <Button
              variant="outline-danger"
              size="sm"
              className="mt-2"
              onClick={() => handleRemoveFavorite(m.id)}
            >
              Remove from favorites
            </Button>
          </div>
        ))
      )}

      <hr />
      <Button variant="danger" onClick={handleDeregister}>
        Delete account
      </Button>
    </>
  );
};