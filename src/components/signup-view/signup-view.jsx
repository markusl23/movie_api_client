import { useState } from 'react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
  	event.preventDefault();

  	const data = {
  	  Username: username,
  	  Password: password,
  	  Email: email,
  	  Birthday: birthday
  	};

  	fetch("https://still-depths-22545-dbe8396f909e.herokuapp.com/users", {
  		method: "POST",
  		body: JSON.stringify(data),
  		headers: {
  		  "Content-Type": "application/json"
  		}
  	}).then((response) => {
  	  if (response.ok) {
  	  	alert("Registration successful!");
  	  	navigate("/login");
  	  } else {
  	  	alert(`Registration failed, please use a different username and/or email.`);
  	  }
  	});
  };

  return (
  	<Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Username:</Form.Label>
      	<Form.Control
      	  type="text"
      	  value={username}
      	  onChange={(e) => setUsername(e.target.value)}
      	  required
      	  minLength="3"
      	/>
      </Form.Group>
      <Form.Group>
        <Form.Label>Password:</Form.Label>
      	<Form.Control
      	  type="password"
      	  value={password}
      	  onChange={(e) => setPassword(e.target.value)}
      	  minLength="8"
      	  required
      	/>
      </Form.Group>
      <Form.Group>
        <Form.Label>Email:</Form.Label>
      	<Form.Control
      	  type="email"
      	  value={email}
      	  onChange={(e) => setEmail(e.target.value)}
      	  required
      	/>
      </Form.Group>
      <Form.Group>
        <Form.Label>Birthday:</Form.Label>
      	<Form.Control
      	  type="date"
      	  value={birthday}
      	  onChange={(e) => setBirthday(e.target.value)}
      	  required
      	/>
      </Form.Group>
      <Button variant="primary" type="submit" className="mb-3 mt-3">Submit</Button>
    </Form>
  );
};